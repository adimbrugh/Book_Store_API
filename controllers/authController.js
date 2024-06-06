const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs'); 
const { User,
    validateRegisterUser,
    validateLoginUser, 
    validateUpdateUser } = require('../models/User');



// desc register new user
// route /api/register
// method post
// access public

module.exports.register = expressAsyncHandler(async (req,res) => {
    const { error } = validateRegisterUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).json({message: "this user already registered"});
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });

    const result = await this.use.save();
    const token = user.generateToken();

    const { password, ...other } = result._doc;

    res.status(201).json({...other, token});
});



// desc login user
// route /api/login
// method post
// access public

module.exports.login = asyncHandler(async (req,res) => {
    const { error } = validateLoginUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    let user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).json({message: "invalid email or password"});
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);

    if(!isPasswordMatch) {
        return res.status(400).json({message: "invalid email or password"});
    }
    const token = user.generateToken();
    const { password, ...other } = user._doc;

    res.status(200).json({...other, token});
});

