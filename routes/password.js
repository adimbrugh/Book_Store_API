const express = require('express');
const { getForgotPasswordView, sendForgotPasswordLink } = require('../controllers/passwordController');
const router = express.Router();



// /password/forgot-password
router.route("/forgot-password")
            .get(getForgotPasswordView)
            .post(sendForgotPasswordLink);



// /password/reset-password/:user:Id/:token
router.route("/reset-password/:userId/:token")
            .get(getResetPasswordView)
            .post(sendThePassword);


module.exports = router;