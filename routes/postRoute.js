const express=require('express');
const { createPost, getPosts, getUserPost, deletePost } = require('../controllers/postController');

const{isAuthenticated,authorizeRoles}=require("../middleware/auth");
const router=express.Router();
router.route("/createPost").post(isAuthenticated,createPost);
router.route("/posts").get(isAuthenticated,getPosts);
router.route("/posts/user").get(isAuthenticated,getUserPost);
router.route("/post/:id").get(isAuthenticated,deletePost);
module.exports=router;