const mongoose = require('mongoose');
const Joi = require('joi');


const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Author"
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
    },
    price: {
        type: String,
        required: true,
        min: 0,
    },
    cover: {
        type: String,
        required: true,
        enum: ["soft cover","hard cover"]
    }
}, {timestamps: true});

const Book = mongoose.model("Book", BookSchema);



// validate create book
function validateCreateBook(boj) {
    const schema = Joi.objectSchema({
        title: Joi.string().trim().min(3).max(200).required(),
        author: Joi.string().required(),
        description: Joi.string().trim().min(3).max(200).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid("soft cover","hard cover").required(),
    });
    return schema.validate(obj);
}




// validate update book
function validateUpdateBook(boj) {
    const schema = Joi.objectSchema({
        title: Joi.string().trim().min(3).max(200),
        author: Joi.string().trim().min(3).max(200),
        description: Joi.string().trim().min(5),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover","hard cover"),
    });
    return schema.validate(obj);
}




module.exports = {
    Book,
    validateCreateBook,
    validateUpdateBook
}