const moment = require('moment-timezone');

/**
 *
 * @param {string} date
 * @param {string} format
 *
 * @returns {boolean}
 */
exports.validateDateFormat = (date, format = 'YYYY-MM-DD') => {
    return moment(date, format, true).isValid();
};
