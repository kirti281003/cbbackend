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
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://localhost:3000"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
  app.options("*", (req, res) => {
    console.log("preflight");
    if (
      req.headers.origin === "https://localhost:3000" &&
      allowMethods.includes(req.headers["access-control-request-method"]) &&
      allowHeaders.includes(req.headers["access-control-request-headers"])
    ) {
      console.log("pass");
      return res.status(204).send();
    } else {
      console.log("fail");
    }});
  app.use(cors());
module.exports=app;