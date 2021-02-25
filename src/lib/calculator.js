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

        if (!this.validateDateFormat(this.investmentDate)) {
            return {
                valid: false,
                message: 'invalid date format [investmentDate]'
            };
        }

        if (!this.validateDateFormat(this.currentDate)) {
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

    validateDateFormat(date) {
        return moment(date, 'YYYY-MM-DD', true).isValid();
    }

    getCDIListBetweenTwoValues() {

    }

    getCDITaxValue() {

    }

    getTCDITaxAccumulatedValue() {

    }

}

module.exports = Calculator;
