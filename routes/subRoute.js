const express=require("express");
const { setSubmission } = require("../controllers/submissionController");
const { isAuthenticated } = require("../middleware/auth");
const router=express.Router();
router.route("/setSubmission").post(isAuthenticated,setSubmission);