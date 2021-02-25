const { invalidRequestResponse, successResponse, serverErrorResponse } = require('./http');
const Calculator = require('./lib/calculator');

module.exports.cdb = async(event) => {
    let parsedBody, responseBody;

    try {
        parsedBody = JSON.parse(event.body) || {};
    } catch (error) {
        console.error('JSON parse error', error);
        return invalidRequestResponse('invalid json body');
    }

    const calculator = new Calculator(parsedBody.cdbRate, parsedBody.investmentDate, parsedBody.currentDate);
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
