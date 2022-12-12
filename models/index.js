const mongoose = require("mongoose");

const indexSchema=new mongoose.Schema({
    date:{
        type:Date,
        required:true,
        trim:true
    },
    vaccine:{
        type:String,
        required:true,
        trim:true 
    },
});

const IndexModel=mongoose.model("index",indexSchema)

module.exports=IndexModel