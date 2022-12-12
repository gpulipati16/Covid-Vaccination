const mongoose = require("mongoose");

const otpSchema=new mongoose.Schema({
    telNo:{
        type:Number,
        required:true,
        trim:true
    },
});

const OtpModel=mongoose.model("otp",otpSchema)

module.exports=OtpModel