const {StatusCodes} =require('http-status-codes');
const {badRequest,notAuthenticated,nullFound} = require('../Errors/index')
const User = require('../Models/user');

const createUser=async(req,res)=>{
    //Checking request body
    const {firstName,secondName,email,password} = req.body;
    if(!firstName || !secondName || !email || !password) throw new badRequest('Please fillup requirement.!'); 
    let isMailExists = await User.findOne({email}).lean();
    if(isMailExists) throw new badRequest('Email already taken.!');
    if(password.length<6) throw new badRequest('Password should be more than 5 characters.!');
    
    //excute command
    let response = await User.create({firstName,secondName,email,password});
    res.status(StatusCodes.OK).json({Message: response}) ;
};

const loginUser=async(req,res)=>{
    //checking request body
    const {email, password} = req.body;
    if(!email || !password) throw new badRequest('Please enter email and password.!');
    let checkMail = await User.findOne({email});
    if(!checkMail) throw new nullFound('Email not found.!');
    let validUser = await checkMail.passMatching(password);
    if(!validUser) throw new notAuthenticated('Invalid User.!');

    //user verification and json web token creating
    let token = checkMail.createJWT();
    res.status(StatusCodes.OK).json({Message: 'Login Successfull.!', token});
}

const getAll=async(req,res)=>{
    let users = await User.find().lean();
    res.status(StatusCodes.OK).json({users, nbit: users.length});
}

const deleteAll=async(req,res)=>{
    let users = await User.deleteMany();
    res.status(StatusCodes.OK).json({users});
}

module.exports={
    createUser,
    loginUser,
    getAll,
    deleteAll
}