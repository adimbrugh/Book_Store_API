const expressAsyncHandler = require('express-async-handler');
const {validateCreateBook,validateUpdateBook, Book} = require('../models/Book');




// desc get all books
// route /api/books
// method get
// access public
const getAllBooks = asyncHandler(async (req,res) => {
        const books = await book.find().populate("author",[
            "_id",
            "firstName",
            "lastName",
        ]);
        res.status(200).json(books);
    });



// desc get book by id
// route /api/books/:id
// method get
// access public

const getBookById = asyncHandler (async (req,res) => {
    const book = await Book.findById(req.params.body).populate("author");
    if (book) {
        res.status(200).json(book);
    } else {
        res.status(404).json({message: "book not found"});
    }
});    



// desc create new book
// route /api/books
// method post
// access privet (only admin)

const createBook = asyncHandler (async (req,res) => {
    const { error } = validateCreateBook(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover
    }
    const result = await book.save();
    res.status(201).json(result);
});



// desc update a books
// route /api/books/:id
// method put 
// access private (only admin)

const updateBook = asyncHandler (async (req,res) => {
    const { error } = validateUpdateBook(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }
    
    const updateBook = await Book.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover
        }
    }, {timestamps: true});
    
    res.status(200).json(updateBook);
});



// desc delete a books
// route /api/books/:id
// method delete
// access private (only admin)

const deleteBook = asyncHandler(async (req,res) => {
    const book = await Book.findById(req.params.id);
    if(book) {
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "book has been deleted"});
    } else {
        res.status(404).json({message: "book not found"});
    }
});



module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
}