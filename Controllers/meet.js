const {StatusCodes} =require('http-status-codes');
const {badRequest,notAuthenticated,nullFound} = require('../Errors/index');
const Meet = require('../Models/meet');
const User = require('../Models/user')
const createMeet=async(req,res)=>{
    //Middleware req manageing
    const {meetName,meetPassword} = req.body;
    const {ID} = req.user;
    if(!meetName || !meetPassword) throw new badRequest('Please provide a meet room name & password.!');
    
    //Meet room created.!
    const meetname = await Meet.findOne({meetName})
    if(meetname) throw new nullFound('Meet name already taken');
    const meet = await Meet.create({owner: ID,meetName,meetPassword,messageList:[]});
    res.status(StatusCodes.OK).json({Message: 'Meet Room Created.!', meet});

}
const getAllMeet=async(req,res)=>{
    const {ID} = req.user;
    let meets = await Meet.find({$or:[{owner: ID},{members:{$in:[ID]}}]}).lean();
    if(!meets) throw new nullFound('Meet not exists for you.!');
    res.status(StatusCodes.OK).json({Message: "Own & Members Meets",meets, nbit: meets.length});
}
const getMeet=async(req,res)=>{
    let {ID} = req.user;
    let {meetid}=req.params;
    const meet = await Meet.findOne({_id:meetid, members: {$in:[ID]}});
    if(!meet) throw new nullFound('Meet no exists for you.!');
    res.status(StatusCodes.OK).json({Message: "Single Meets", meet});
}
const addMember=async(req,res)=>{
    const {meetName, meetPassword} = req.body;
    const{ID}= req.user;
    if(!meetName ||!meetPassword) throw new badRequest('Please provide meet name & password');
    const meet = await Meet.findOne({meetName});
    if(!meet) throw new nullFound('Meet does not exists.!');
    let alreadyMember = await Meet.findOne({_id:meet._id,members:{$in:[ID]}});
    if(alreadyMember) throw new nullFound('User Already a member of meet room.!');
    let validMember = await meet.passMatching(meetPassword);
    if(!validMember) throw new notAuthenticated('Password is Invalid.!');

    let updateMeet = await Meet.findByIdAndUpdate({_id: meet._id},{$push: {members:ID}},{new:true});
    res.status(StatusCodes.OK).json({Message: "Hello",updateMeet});
}
const removeMember=async(req,res)=>{
    const {meetid} = req.params;
    const {ID} = req.user;
    let meet = await Meet.findOne({_id: meetid, members:{$in:[ID]}});
    if(!meet) throw new nullFound('No Meet Exists for you.!');
    let updateMeet= await Meet.findByIdAndUpdate(meetid,{$pull:{members:ID}},{new:true});
    res.status(StatusCodes.OK).json({Message: "User removed from meet room.!", updateMeet});

}
const removeMemberByOwner=async(req,res)=>{
    const {meetid,userid} = req.params;
    const {ID} = req.user;
    let user = await User.findById(userid);
    if(!user) throw new nullFound('User does not exists.!');
    let meet = await Meet.findOne({_id: meetid, members:{$in:[userid]}});
    if(!meet) throw new nullFound('No Meet Exists for you.!');
    if(ID == meet.owner._id){
        let updateMeet= await Meet.findByIdAndUpdate(meetid,{$pull:{members:userid}},{new:true});
        res.status(StatusCodes.OK).json({Message: "User removed from meet room.!", updateMeet});
    }else{
        res.status(StatusCodes.OK).json({Message: "You are not owner to remove mambers.!"});
    }

}
const sendMessage=async(req,res)=>{
    const {ID}= req.user;
    const {meetid}  = req.params;
    const {message} = req.body;
    if(!message) throw new badRequest('Please set a message.!');
    const updateMeet = await Meet.findOneAndUpdate({_id:meetid,members:{$in:[ID]}},{
        $push:{messageList:{message,messageSender:ID}}
    },{new:true});
    if(!updateMeet) throw new badRequest('Meet does not exists.!');

    res.status(StatusCodes.OK).json({Message: "Message Send successfull.!", updateMeet});
}

const removeMessage=async(req,res)=>{
    const {meetid,msgid}=req.params;
    const {ID}=req.user;
    console.log(meetid,ID,msgid);
    let meet = await Meet.findOneAndUpdate({messageList:{$elemMatch:{messageSender:ID,_id:msgid}}},{$pull:{messageList:{_id:msgid}}},{new:true});
    if(!meet) throw new nullFound('Meet or message does not exists.!');
    console.log(meet);
    res.status(StatusCodes.OK).json({Message: "Message Removed.!", meet});
}


module.exports={
    createMeet,
    getAllMeet,
    getMeet,
    addMember,
    removeMember,
    sendMessage,
    removeMessage,
    removeMemberByOwner
}