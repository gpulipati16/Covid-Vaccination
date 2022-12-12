const mongoose = require("mongoose");

const slotbookSchema=new mongoose.Schema({
    time:{
        type:String,
        required:true,
        trim:true
    },
    dosage:{
        type:String,
        required:true,
        trim:true
    },
    district:{
        type:String,
        required:true,
        trim:true
    },
    pincode:{
        type:Number,
        required:true,
        trim:true
    },
});

const SlotbookModel=mongoose.model("slot",slotbookSchema)

module.exports=SlotbookModel