const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Submission = require("../models/submissionModel");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name:"dlgp2ufmn",
    api_key:"738354633193825",
    api_secret:"SzqyhWymF0CoH2bbDut25UzhTPQ"
})

exports.setSubmission=catchAsyncErrors(async(req,res,next)=>{
    if(req.files)
    {
     const file=req.files.photo;
    
    cloudinary.uploader.upload(file.tempFilePath,async(err,result)=>{
    const{body,links}=req.body;
    const sub=await Submission.create(
        {
            body:body,
            image:result.url,
            user:req.user._id,
            username:req.user.username,
            post:req.params.id,
            links:JSON.parse(links),
            postname:req.params.name


        }
    )
    res.status(200).json(
        {
            success:true,
            sub
        }
    )
    })
}
    else{
        const{body,links}=req.body;
        const sub=await Submission.create(
            {
                body:body,
                user:req.user._id,
                username:req.user.username,
                post:req.params.id,
                links:links

    
            }
        )
        res.status(200).json(
            {
                success:true,
                sub
            }
        )
    }

})

exports.getSubmission=catchAsyncErrors(async(req,res,next)=>{
    const sub=await Submission.findById(req.params.id);
    if(!sub)
    {
        return next(new ErrorHandler("No Submission Found",404))
    }
    res.status(200).json({
        success:true,
        sub
    })
})

exports.submissions=catchAsyncErrors(async(req,res,next)=>{
    const sub=await Submission.find({post:req.params.id});
    if(!sub)
    {
        return next(new ErrorHandler("No Submission Found For This Post",404))
    }
    res.status(200).json({
        success:true,
        sub
    })
})

exports.submissionAccepted=catchAsyncErrors(async(req,res,next)=>{
    const sub=await Submission.findById(req.params.id);
    const message=req.params.message;
    if(message==="accept")
    {
        sub.accepted=true;
    }
    else{
        sub.accepted=false;
    }
   
    await sub.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:"Accept Invitation Send"
    })
})

exports.submissionRejected=catchAsyncErrors(async(req,res,next)=>{
    const sub=await Submission.findById(req.params.id);
    sub.accepted=false;
    await sub.save({validateBeforeSave:false});
    res.status(200).json({
        success:true,
        message:"Accept Invitation Send"
    })
})

exports.getAccepted=catchAsyncErrors(async(req,res,next)=>{
    const subs=await Submission.find({user:req.user._id});
    const sub=[];
    subs.forEach(rev=>{
        if(rev.accepted==="true")
        {sub.push(rev);

        }
    });
    res.status(200).json({
        success:true,
        sub
    })
})

exports.userSubmissions=catchAsyncErrors(async(req,res,next)=>{
    const sub=await Submission.find({user:req.user._id});
    res.status(200).json({
        success:true,
        sub
    })
})