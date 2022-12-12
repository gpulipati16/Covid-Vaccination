const mongoose = require("mongoose");

const loginSchema=new mongoose.Schema({
    telNo:{
        type:Number,
        required:true,
        trim:true
    },
});

const LoginModel=mongoose.model("login",loginSchema)

module.exports=LoginModel