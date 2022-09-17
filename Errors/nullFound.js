const {StatusCodes} = require('http-status-codes');
const CustomAPI = require('./customAPI');

class NullFound extends CustomAPI {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.NOT_FOUND;
    }
}

module.exports = NullFound;