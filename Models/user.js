const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Provide First Name.'],
        maxlength: [20, 'Not More Then 20 Characters.'],
        minlength:[2, 'Not More Then 2 Characters.'],
        trim: true
    },
    secondName:{
        type: String,
        required: [true, 'Provide Second Name.'],
        maxlength: [20, 'Not More Then 20 Characters.'],
        minlength:[2, 'Not More Then 2 Characters.'],
        trim: true
    },
    email:{
        type : String,
        required : [true, 'Please provide email'],
        minlength : 6,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        unique : true,
    },
    password:{
        type : String,
        required : [true, 'please provide password']
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

userSchema.methods.passMatching = async function(password){
   return await bcrypt.compare(password, this.password);
}

userSchema.methods.fullName = function(){
    return `${this.firstName} ${this.secondName}`;
}

userSchema.methods.createJWT = function(){
    return jwt.sign({
        id: this.id,
        email: this.email,
        name: this.fullName()
    },"SECRET11",{expiresIn: '24h'});
}


module.exports = mongoose.model('User', userSchema);