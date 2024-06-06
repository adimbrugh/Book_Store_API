const { book, Book } = require('./models/Book');
const { Author } = require('./models/Author');
const { books, authors } = require('./data');
const connectToDB = require('./config/db');
const { connection } = require('mongoose');
require("dotenv").config();




//connection to db
connectToDB();


//import books (seeding the data)
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Book Imported");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



//import authors (seeding the data)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors Imported");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



//remove books (seeding the data)
const removeBooks = async () => {
    try {
        await Book.deleteMany(books);
        console.log("Book removed");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}



if(process.argv[2] === "-import") {
    importBooks();
} else if(process.argv[2] === "-remove") {
    removeBooks();
} else if(process.argv[2] === "-import-authors") {
    importAuthors();
}