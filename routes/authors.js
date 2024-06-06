const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { getAllAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');



router.route("/")
           .get(getAllAuthors)
           .get(verifyTokenAndAdmin, createAuthor);



router.route("/:id")
            .post(getAuthorById)
            .put(verifyTokenAndAdmin, updateAuthor)
            .delete(verifyTokenAndAdmin, deleteAuthor);