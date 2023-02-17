const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post=require("../models/postModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
exports.createPost=catchAsyncErrors(async(req,res,next)=>{
    const{heading,category,body}=req.body;
    const post=await Post.create({
        heading:heading,
        body:body,
        category:category,
        user:req.user._id,
        username:req.user.username,
        email:req.user.email
    });
    res.status(200).json({
            success:true,
            post
    })
})
exports.getPosts=catchAsyncErrors(async(req,res,next)=>{
    const apiFeatures=new ApiFeatures(Post.find(),req.query).search();
    const posts=await apiFeatures.query;
    if(!posts)
    {
        return next(new ErrorHandler("No Posts Found",404))
    }
    res.status(200).json({
        success:true,
        posts
    })
})
exports.getUserPost=catchAsyncErrors(async(req,res,next)=>{
    console.log(req.user._id);
    const posts=await Post.find({user:req.user._id});
    if(!posts)
    {
        return next(new ErrorHandler("No Posts Found",404))
    }
    res.status(200).json({
        success:true,
        posts
    })
})
exports.deletePost=catchAsyncErrors(async(req,res,next)=>
{
    const posts=await Post.findById(req.params.id);
    if(!posts)
    {
        return next(new ErrorHandler("No Posts Found",404))
    }
    await posts.remove();
    res.status(200).json({
        success:true,
        message:"Post Deleted"
    })
})