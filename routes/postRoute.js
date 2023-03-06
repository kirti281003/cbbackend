const express=require('express');
const { createPost, getPosts, getUserPost, deletePost,post } = require('../controllers/postController');
const { setSubmission, getSubmission, submissions, submissionAccepted, getAccepted, userSubmissions, deleteSub } = require('../controllers/submissionController');

const{isAuthenticated,authorizeRoles}=require("../middleware/auth");
const router=express.Router();
router.route("/createPost").post(isAuthenticated,createPost);
router.route("/posts").get(isAuthenticated,getPosts);
router.route("/posts/user").get(isAuthenticated,getUserPost);
router.route("/post/:id").get(isAuthenticated,post);
router.route("/post/delete/:id").get(isAuthenticated,deletePost);
router.route("/setSubmission/:id").post(isAuthenticated,setSubmission);
router.route("/getSubmission/:id").get(isAuthenticated,getSubmission);
router.route("/submissions/:id").get(isAuthenticated,submissions);
router.route("/getSubmission/:id/:message").put(isAuthenticated,submissionAccepted);
router.route("/accepted/submissions").get(isAuthenticated,getAccepted);
router.route("/user/submissions").get(isAuthenticated,userSubmissions);
router.route("/sub/delete/:id").get(isAuthenticated,deleteSub);
module.exports=router;