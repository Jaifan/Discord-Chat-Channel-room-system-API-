const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const meetSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    meetName: {
        type: String,
        required: [true, 'Please Provide a meet room name.!'],
        trim: true,
        maxlength: [20, 'Not more than 20 characters.!'],
        minlength: [5, 'Not more than 5 characters.!']
    },
    meetPassword: {
        type : String,
        required : [true, 'please provide password']
    },
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    messageList:[{
        message: {
            type: String,
            required: [true, 'Please Set a Message for Meet Room.']
        },
        messageSender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Sender Must be required.!']
        },
        messageTime : {
            type: Date,
            default: Date.now()
        }
    }]
},{timestamps: true})

meetSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.meetPassword = await bcrypt.hash(this.meetPassword,salt);
    this.members = [this.owner];
})

meetSchema.methods.passMatching = async function(password){
    return await bcrypt.compare(password,this.meetPassword)
}

module.exports = mongoose.model('Meet', meetSchema);