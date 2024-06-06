const mongoose = require('mongoose');


 async function connectToDB() {
    try {
        await connect(process.env.MONGO_URI)
        then( () => console.log("connected to mongoDB ... "))
    } catch (error) {
        console.log("connection filed to mongoDB!", error);
    }
    
}

module.exports = connectToDB;



// mongoose
//     .connect(process.env.MONGO_URI)
//     .then( () => console.log("connected to mongoDB ... "))
//     .catch( (error) => console.log("connection filed to mongoDB!", error));
