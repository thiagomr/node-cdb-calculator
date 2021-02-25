const moment = require('moment-timezone');

exports.validateDateFormat = (date, format = 'YYYY-MM-DD') => {
    return moment(date, format, true).isValid();
};
