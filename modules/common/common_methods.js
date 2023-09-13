
var api_response_format = function (status, data, message, status_code='200', error='', callback) {

    if(status_code == '')
    {
        status_code = 200;
    }

    if(data == '')
    {
        data = {};
    }

    return callback({
        status: status,
        data: data,
        status_code: status_code,
        error: error,
        message: message
    });
};

var sendResponse = function(res, status, statusCode='200', data,message='', errorMsg='') {

    if(statusCode == '')
    {
        statusCode = 200;
    }

    if(data == '')
    {
        data = {};
    }

    const response = {
      status,
      statusCode,
      data,
      error: errorMsg,
      message,
    };
    res.status(statusCode).json(response);
  }


module.exports = {
	api_response_format: api_response_format,
    sendResponse:sendResponse
}