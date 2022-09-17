const {StatusCodes} = require('http-status-codes');

class CustomAPI extends Error {
    constructor(message){
        super(message);
    }
}

module.exports = CustomAPI;