/*const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://sample2022:sample2022@cluster0.vrfu87h.mongodb.net/mernstack",
{useNewUrlParser: true},
{useUnifiedTopology: true})

const notesSchema={
    title: String,
    content: String,
}

const Note=mongoose.model("Note",notesSchema);

app.get("/",(req,res) => {
    res.sendFile(__dirname+"/index.html");
})


app.post("/",(req,res)=>{
    let newNote=new Note({
        title: req.body.title,
        content: req.body.content,
    });
    newNote.save();
    res.redirect('/');
})

app.listen(3000,()=>{
    console.log(`server is running at port no 3000`);
})
*/


const mongoose=require("mongoose");
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const SignupModel=require("./models/signup")
const LoginModel=require("./models/login")
const IndexModel=require("./models/index")
const OtpModel=require("./models/otp")
const SlotbookModel=require("./models/slotbook")

app.use(bodyParser.urlencoded({extended: true}));
const dbUrl="mongodb+srv://sample2022:sample2022@cluster0.vrfu87h.mongodb.net/mernstack"
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(dbUrl,connectionParams)
    .then(()=>{
        console.info("Connected to the DB");
    })
    .catch((e)=>{
        console.log("Error:",e);
    });

    
    
app.get("/",(req,res) => {
    res.sendFile(__dirname+"/index.html");
})
    
app.get("/signup",(req,res) => {
    res.sendFile(__dirname+"/signup.html");
})

app.get("/login",(req,res) => {
    res.sendFile(__dirname+"/login.html");
})

app.get("/otp",(req,res) => {
    res.sendFile(__dirname+"/otp.html");
})

app.get("/slotbook",(req,res) => {
    res.sendFile(__dirname+"/slotbook.html");
})
app.get("/getotp",(req,res) => {
    res.sendFile(__dirname+"/models/phoneotp.js");
})

app.post("/",(req,res)=>{
    let indexModel=new IndexModel({
        date: req.body.date,
        vaccine: req.body.vaccine,
    });
    indexModel.save();
    res.redirect('/');
})


app.post("/signup",(req,res)=>{
    let signupModel=new SignupModel({
        first: req.body.first,
        last: req.body.last,
        telNo: req.body.telNo,
        Aadhar: req.body.Aadhar,
        date: req.body.date,
    });
    signupModel.save();
    res.redirect('/slotbook');
})

app.post("/login",(req,res)=>{
    let loginModel=new LoginModel({
        telNo: req.body.telNo,
    });
    loginModel.save();
    res.redirect('/otp');
})

app.post("/otp",(req,res)=>{
    let otpModel=new OtpModel({
        telNo: req.body.telNo,
    });
    otpModel.save();
    res.redirect('/slotbook');
})

app.post("/slotbook",(req,res)=>{
    let slotbookModel=new SlotbookModel({
        time:req.body.time,
        dosage:req.body.dosage,
        district:req.body.district,
        pincode:req.body.pincode,
    });
    slotbookModel.save();
    res.redirect('/slotbook');
})


app.listen(3000,()=>{
    console.log(`server is running at port no 3000`);
})



