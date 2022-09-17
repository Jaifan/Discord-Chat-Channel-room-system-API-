const {StatusCodes} = require('http-status-codes');
const CustomAPI = require('./customAPI');

class NotAuthenticated extends CustomAPI {
    constructor(message){
        super(message);
        this.StatusCodes = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = NotAuthenticated;