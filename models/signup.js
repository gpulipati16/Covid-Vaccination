const mongoose = require("mongoose");

const signupSchema=new mongoose.Schema({
    first:{
        type:String,
        required:true,
        trim:true
    },
    last:{
        type:String,
        required:true,
        trim:true
    },
    telNo:{
        type:Number,
        required:true,
        trim:true
    },
    Aadhar:{
        type:Number,
        required:true,
        trim:true
    },
    date:{
        type:Date,
    },
});

const SignupModel=mongoose.model("signup",signupSchema)

module.exports=SignupModel