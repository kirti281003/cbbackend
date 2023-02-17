const express=require('express');
const { registerUser, loginUser, logout, getUser, } = require('../controllers/userController');
const{isAuthenticated,authorizeRoles}=require("../middleware/auth");
const router=express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/user").get(isAuthenticated,getUser);
module.exports=router;