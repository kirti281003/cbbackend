const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const fileUpload=require('express-fileupload');
const errorMiddleware=require("./middleware/errors");
const bodyParser=require("body-parser");
const cors=require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
const user=require("./routes/userRoute");
const post=require("./routes/postRoute");
const sub=require("./routes/subRoute");
app.use(fileUpload({
    useTempFiles:true
}))
app.use("/api/v1",user);
app.use("/api/v1",post);
// app.use("/api/v1",sub);
app.use(errorMiddleware);
app.use(function (request, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
response.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
  app.use(cors());
module.exports=app;