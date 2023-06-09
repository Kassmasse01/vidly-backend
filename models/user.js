const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
    //im  complex app use
    //roles: [],
    //and in even more complex app use
    //operations: []
});

//Information Expert Principle
userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({ _id: this._id, isAdmin:this.isAdmin }, 'jwtPrivateKey');
    return token;
}

const User = mongoose.model('User', userSchema );

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    
    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
