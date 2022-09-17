const {StatusCodes} = require('http-status-codes');
const CustomAPI = require('./customAPI');

class BadRequest extends CustomAPI {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.BAD_REQUEST;
    }
}

module.exports = BadRequest;