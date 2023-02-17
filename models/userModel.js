const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Enter Your Name"],
            maxLength:[30,"Dont exceed 30"],
            minLength:[4,"Not Less than 4"]
        },
        email:{
            type:String,
            required:[true,"Enter Email"],
            unique:true,
            validate:[validator.isEmail,"Enter valid email"]
        },
        password:{
            type:String,
            required:[true,"Enter password"],
            minLength:[8,"Minimum8 characters in password"],
            select:false
        },
        role:{
            type:String,
            default:"user"
        },
        username:{
            type:String,
            required:true
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date

    }
)
userSchema.pre("save",async function(next){//not using arrow function as we have to use this
if(!this.isModified("password"))
 {next();
 }
    this.password=await bcrypt.hash(this.password,10);
  

 })
//JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })

}
userSchema.methods.comparePassword=async function(enteredPassword)
{console.log(enteredPassword,this.password);
   return await bcrypt.compare(enteredPassword,this.password) ;

}
// userSchema.methods.getResetPasswordToken=function()
// {
//     const resetToken=crypto.randomBytes(20).toString("hex");
//     const tokenCrypto=crypto.createHash("sha256").update(resetToken).digest("hex");
//     this.resetPasswordToken=tokenCrypto;
//     this.resetPasswordExpire=Date.now()+15*60*1000;
//     return resetToken;

// }
module.exports=mongoose.model("User",userSchema);