const express = require('express');
const loginController = require('../Controller/loginController');
const registerController = require('../Controller/registerController');
const { loginUser, logoutUser } = require("../Controller/userController");
const router = express.Router();


router.post("/login",loginController.login)
router.post("/signin",registerController.store)
router.post("/googlelogin",loginUser)
router.post("/logout", logoutUser);

module.exports = router;