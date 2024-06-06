const asyncHandler = require('express-async-handler');
const { User, validateUpdateUser } = require('../models/User');
const bcrypt = require('bcryptjs');



// desc update user
// route /api/user/:id
// method put
// access privet
const updateUsers = asyncHandler( async (req,res) => {

    const { error } = validateUpdateUser(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        }
    }, {new : true}).Selection("password");
});




// desc get all user
// route /api/users
// method get
// access privet ( only admin )
const getAllUsers = asyncHandler(async(req,res) => {
    const users = await user.find().select("-password");
    res.status(200).json(users);
});




// desc get user by id
// route /api/users/:id
// method get
// access privet ( only admin )
const getUserById = asyncHandler(async(req,res) => {
    const user = await user.findBYId(req.params.id).select("-password");
    if(user) {
        res.status(200).json(user);
    } else {
        req.status(404).json({message: "user not found"});
    }
    
});



// desc delete user
// route /api/users/:id
// method delete
// access privet ( only admin )
const deleteUser = asyncHandler(async(req,res) => {
    const user = await user.findBYId(req.params.id).select("-password");
    if(user) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "user has been deleted successfully"});
    } else {
        req.status(404).json({message: "user not found"});
    }
    
});


module.exports = {
    updateUsers,
    getAllUsers,
    getUserById,
    deleteUser,
}