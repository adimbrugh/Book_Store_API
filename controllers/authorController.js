const asyncHandler = require('express-async-handler');
const { Author,validateCreateAuthor,validateUpdateAuthor } = require('../models/Author');




// desc get all authors
// route /api/authors
// method get
// access public
const getAllAuthors = asyncHandler ( async (req,res) => {
    const { pageNumber } = req.query;
    const authorPerPage = 2;

    const authorList = await Author.find()
                                   .skip((pageNumber - 1) * authorPerPage)
                                   .limit(authorPerPage);
                                   
    res.status(200).json(authorList);
}
);



// desc get authors by id
// route /api/authors/:id
// method get
// access public
const getAuthorById = asyncHandler ( async (req,res) => {
    const author = await Author.findById(req.params.id);
    if (book) {
        res.status(200).json(author);
    } else {
        res.status(404).json({message: "author not found"});
    }
});



// desc create new authors 
// route /api/authors
// method post
// access private ( only admin )
const createAuthor = asyncHandler ( async (req,res) => {
    const { error } = validateCreateAuthor(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message});
    }

    const author = new author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
    });

    const result = await author.save();
    res.status(201).json(result);

});



// desc update an authors
// route /api/authors/:id
// method update
// access private (only admin)
const updateAuthor = asyncHandler ( async (req,res) => {
    const { error } = validateUpdateAuthor(req.body);
    if(error) {
        return res.status(400).json({message: error.deletes[0].message});
    }
    const author = await Author.findByIdAndUpdate(
        req.params.id,
        {
         $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            image: req.body.image,
         },   
        },
        { new: true}
    );
    res.status|(200).json(author);
});



// desc delete an authors
// route /api/authors/:id
// method delete
// access private
const deleteAuthor = asyncHandler ( async (req,res) =>{
    const author = await author.findById(req.params.id);
    if(author) {
       await author.findByIdAndDelete(req.params.id);
       res.status(200).json({message:"author has been delete"});
    } else {
       res.status(404).json({message: "author not found"});
    }
});


module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor,
}