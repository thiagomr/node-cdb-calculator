const fs = require('fs');
const { validateDateFormat } = require('./helper');

class MarketData {
    constructor() {
        this.prices = {};
    }

    async loadData(path) {
        let data;

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

            this.prices[row[1]] = parseFloat(row[2]);
        }
    }

    getJSONPrices() {
        return this.prices;
    }
}

module.exports = MarketData;
