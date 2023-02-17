const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const User=require("../models/userModel");

exports. isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Plese Login",401));
    }
 const decodedData=jwt.verify(token,process.env.JWT_SECRET);
 console.log(decodedData);
  req.user=await User.findById(decodedData.id);
 next();
})
exports.authorizeRoles=(...roles)=>{
    
   return (req,res,next)=>{
    console.log( req.user);
    if(!roles.includes(req.user.role))
    {return next(new ErrorHandler("You are not admin",401));

    }
    next();
   }
}