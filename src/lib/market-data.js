const fs = require('fs');
const { validateDateFormat } = require('./helper');

exports.getJSONPricesFromCsv = async (path) => {
    let prices = {}, data;

    try {
        data = (await fs.promises.readFile(path)).toString();
    } catch (error) {
        throw new Error('invalid csv path');
    }

    data = data.split('\r\n').map(item => item.split(','));

    for (let row of data) {
        if (!row || !row[0]) {
            continue;
        }

        if (!validateDateFormat(row[1], 'DD/MM/YYYY')) {
            continue;
        }

        prices[row[1]] = parseFloat(row[2]);
    }

    return prices;
};
