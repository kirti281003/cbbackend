const mongoose=require("mongoose");
const subSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.ObjectId,
        ref:"Post",
        required:true
    },
    postname:{
        type:String,
        ref:"Post",
        required:true

    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    image:{
        type:String,
    
    },
    links:[{
        url:{
            type:String,
        },
        title:{
            type:String,
        }
    }],
  
    accepted:{
        type:String,
        default:"waiting",
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model("Submission",subSchema);