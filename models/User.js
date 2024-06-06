const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


//user Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});



//generate token
UserSchema.method.generateToken = function() {
    return jwt.sign({ id: this._id, isAdmin: this.isAdmin }, process.env.JWT_SECRET_KEY);
}


const User = mongoose.model("User", UserSchema);



//validate register user
function validateRegisterUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).man(100).required().email(),
        username: Joi.string().trim().min(2).man(200).required(),
        password: Joi.string().trim().min(6).required(),
});
return schema.validate(obj);
}



//validate login user
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).man(100).required().email(),
        password: Joi.string().trim().min(6).required(),
});
return schema.validate(obj);
}



//validate change password
function validateChangePassword(obj) {
    const schema = Joi.object({
        password: Joi.string().trim().min(6).required(),
});
return schema.validate(obj);
}



//validate update user
function validateUpdateUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).man(100).required().email(),
        username: Joi.string().trim().min(2).man(200),
        password: Joi.string().trim().min(6),
});
return schema.validate(obj);
}



module.exports = {
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
    validateChangePassword,
}