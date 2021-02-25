const { invalidRequestResponse, successResponse, serverErrorResponse } = require('./http');
const { getJSONPricesFromCsv } = require('./lib/market-data');
const Calculator = require('./lib/calculator');

module.exports.cdb = async(event) => {
    let parsedBody, responseBody, prices;

    try {
        parsedBody = JSON.parse(event.body) || {};
    } catch (error) {
        console.error('JSON parse error', error);
        return invalidRequestResponse('invalid json body');
    }

    try {
        prices = await getJSONPricesFromCsv('./data/cdi-prices.csv');
    } catch (error) {
        return invalidRequestResponse(error.message);
    }

    const calculator = new Calculator(parsedBody.cdbRate, parsedBody.investmentDate, parsedBody.currentDate, prices);
    const checkParams = calculator.validateParams();

    if (!checkParams.valid) {
        return invalidRequestResponse(checkParams.message);
    }

    try {
        responseBody = calculator.getCDITaxHistory();
    } catch (error) {
        return serverErrorResponse();
    }

    return successResponse(responseBody);
};
