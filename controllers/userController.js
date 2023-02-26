const User=require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
exports.registerUser=catchAsyncErrors(async(req,res,next)=>
{
    const{name,email,password,username}=req.body;
    const user=await User.create({
        name:name,
        email:email,
        password:password,
        username:username
        
      
    });
   
    sendToken(user,201,res);
})
//Login User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>
{
    const{email,password}=req.body;
    if(!email||!password)
    {
        return next(new ErrorHandler("Please enter all details",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user)
    {
        return next(new ErrorHandler("User not found",401))
    }
    const isMatch=await user.comparePassword(password);
    console.log(isMatch);
    if(!isMatch)
    {return next(new ErrorHandler("User not found",401))

    }
   sendToken(user,200,res);

})
//Logout
exports.logout=catchAsyncErrors(async(req,res,next)=>
{req.user=null;
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httponly:true
    })
    res.status(200).json({
        success:true,
        message:"LoggedOut"
    })
})

exports.getUser=catchAsyncErrors(async(req,res,next)=>
{const user=await User.findById(req.user._id);
    if(!user)
    {
        return next(new ErrorHandler("User Not Found",404))
    }

  
    res.status(200).json({
        success:true,
        user
    })
})