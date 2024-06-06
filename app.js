const express = require('express');
const logger = require('./middleware/logger');
const { notFound, errorHandler } = require('./middleware/errors');
require('dotenv').config();
const connectToDB = require('./config/db');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');



//connection to database
connectToDB();


// Init App
const app = express();


//static folder
app.use(express.static(path.join(__dirname, "images")));


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(logger);


// helmet
app.use(helmet());


// cors policy
app.use(connectToDB());


// set view engine
app.set('view engine', 'ejs');


//Routes
app.use("/api/books", require('./routes/books'));
app.use("/api/authors", require('./routes/authors'));
app.use("/api/auth", require('./routes/auth'));
app.use("/api/users", require('./routes/users'));
app.use("/api/upload", require('./routes/upload'));
app.use("/password", require('./routes/password'));


//error handler middleware
app.use(notFound);
app.use(errorHandler);


//Running the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));