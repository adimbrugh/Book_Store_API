const mongoose = require('mongoose');
const Joi = require('joi');



const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    image: {
        type: String,
        default: "default-avatar.png"
    },
}, {
    timestamps: true
})

const Author = mongoose.model("Author", AuthorSchema);




// validate create Author
function validateCreateAuthor(boj) {
    const schema = Joi.objectSchema({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().trim().min(3).max(200).required(),
        description: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}




// validate update Author
function validateUpdateAuthor(boj) {
    const schema = Joi.objectSchema({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(3).max(500),
        price: Joi.number().min(0),
        cover: Joi.string().trim(),
    });
    return schema.validate(obj);
}



module.exports = {
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}