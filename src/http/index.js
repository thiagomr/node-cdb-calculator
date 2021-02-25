const successResponse = body => {
    return {
        statusCode: 200,
        body: body ? JSON.stringify(body) : null
    };
};

const serverErrorResponse = () => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            message: 'server error'
        })
    };
};

const invalidRequestResponse = message => {
    return {
        statusCode: 400,
        body: JSON.stringify({
            message
        })
    };
};

module.exports = {
    successResponse,
    invalidRequestResponse,
    serverErrorResponse
};
