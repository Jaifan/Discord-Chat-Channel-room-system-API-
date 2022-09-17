const jwt = require('jsonwebtoken');
const {notAuthenticated} = require('../Errors/index');

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader.startsWith('Bearer ') || !authHeader) throw new notAuthenticated('User is not Authenticated.! ');
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, 'SECRET11');
        req.user = {ID: payload.id, Email:payload.email, Name: payload.name}
        next();
    } catch (error) {
        throw new notAuthenticated('User is not Authenticated.! ')
    }
}

module.exports = authMiddleware;