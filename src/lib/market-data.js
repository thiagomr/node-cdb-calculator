const fs = require('fs');
const moment = require('moment-timezone');
const { validateDateFormat } = require('./helper');

exports.getJSONPricesFromCsv = async (path) => {
    let prices = {}, data, delimiter;

    try {
        data = (await fs.promises.readFile(path)).toString();
    } catch (error) {
        throw new Error('invalid csv path');
    }

    if (data.indexOf('\r\n') > -1) {
        delimiter = '\r\n';
    } else {
        delimiter = '\n';
    }

    data = data.split(delimiter).map(item => item.split(','));

    for (let row of data) {
        if (!row || !row[0]) {
            continue;
        }

        if (!validateDateFormat(row[1], 'DD/MM/YYYY')) {
            continue;
        }

        prices[moment(row[1], 'DD/MM/YYYY').format('YYYY-MM-DD')] = parseFloat(row[2]);
    }

    return prices;
};
