const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

const connectDatabase=()=>
{
mongoose.connect("mongodb+srv://kirti2810:FFjzeXT8SvM7xE9l@cluster0.1xw1f7v.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>
{console.log(`Functional database:${data.connection.host}`);

})

}
module.exports=connectDatabase;