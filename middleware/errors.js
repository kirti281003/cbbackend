const ErrorHandler=require("../utils/errorHandler");
module.exports=(err,req,res,next)=>
{
    err.statusCode=err.statusCode||500;
    err.message=err.message ||"Internal Server Error";
    //mongodb error
    if(err.name==="CastError")
    {
        const message="Resource not found";
        err=new ErrorHandler(message,400);
    }
    if(err.code===11000)
    {
        const message="Already Existing user";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="JsonWenTokenError")
    {
        const message="Try Again, jwt is invalid";
        err=new ErrorHandler(message,400);
    }
    if(err.name==="TokenExpiredError")
    {
        const message="Token Expired";
        err=new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
}