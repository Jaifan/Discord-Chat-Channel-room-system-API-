const {StatusCodes} = require('http-status-codes');
const {customAPI} = require('../Errors/index');

const errorHandleMiddleware=(err,req,res,next)=>{
    if(err instanceof customAPI){
        return res.status(err.StatusCodes).json({Message: err.message});
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({Message: err});
}

module.exports = errorHandleMiddleware;