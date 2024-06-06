const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middleware/verifyToken');
const { updateUsers, getAllUsers, getUserById, deleteUser } = require('../controllers/userController');



// api/user
router.route("/")
            .get(verifyTokenAndAdmin, getAllUsers);


// api/user/:id
router.route("/:id")
            .put(verifyTokenAndAdmin, updateUsers)
            .get(verifyTokenAndAdmin, getUserById)
            .delete(verifyTokenAndAdmin, deleteUser);


module.exports = router;