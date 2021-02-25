const { validateDateFormat } = require('./helper');
const moment = require('moment-timezone');

class Calculator {
    constructor(cdbRate, investmentDate, currentDate, cdiPrices) {
        this.cdbRate = cdbRate;
        this.investmentDate = investmentDate;
        this.currentDate = currentDate;
        this.cdiPrices = cdiPrices;
    }

    validateParams() {
        if (!this.cdbRate) {
            return {
                valid: false,
                message: 'missing parameter [cdbRate]'
            };
        }

        if (!this.investmentDate) {
            return {
                valid: false,
                message: 'missing parameter [investmentDate]'
            };
        }

        if (!this.currentDate) {
            return {
                valid: false,
                message: 'missing parameter [currentDate]'
            };
        }

        if (!validateDateFormat(this.investmentDate)) {
            return {
                valid: false,
                message: 'invalid date format [investmentDate]'
            };
        }

        if (!validateDateFormat(this.currentDate)) {
            return {
                valid: false,
                message: 'invalid date format [currentDate]'
            };
        }

        if (typeof this.cdbRate !== 'number') {
            return {
                valid: false,
                message: 'invalid cdbRate value'
            };
        }

        if (+new Date(this.currentDate) < +new Date(this.investmentDate)) {
            return {
                valid: false,
                message: 'invalid date error [currentDate must be greater than invesmentDate]'
            };
        }

        return {
            valid: true,
            message: null
        };
    }

    getCDITaxValue(price) {
        const value = (Math.pow(price / 100 + 1, 1 / 252) - 1).toFixed(8);
        return parseFloat(value);
    }

    getCDITaxHistory() {
        const firstDate = moment(this.investmentDate);
        const lastDate = moment(this.currentDate);
        const result = [];
        let accumulated = 1;

        while (firstDate <= lastDate) {
            let key = firstDate.format('YYYY-MM-DD');

            if (this.cdiPrices[key]) {
                const tcdi = this.getCDITaxValue(this.cdiPrices[key]);
                accumulated = this.getTCDIAccumulatedValue(accumulated, tcdi, this.cdbRate);

                result.push({
                    date: firstDate.format('YYYY-MM-DD'),
                    unitPrice: 1000 * parseFloat(accumulated.toFixed(8))
                });
            }

            firstDate.add(1, 'day');
        }

        return result;
    }

    getTCDIAccumulatedValue(accumulatedValue, tcdValue, cdbRateValue) {
        return accumulatedValue * (1 + tcdValue * cdbRateValue / 100);
    }
}

module.exports = Calculator;
