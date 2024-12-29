const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

//connect to this uri
mongoose.connect('mongodb://127.0.0.1:27017/contactDance');

//define mongoose schema
var contactSchema = new mongoose.Schema({
    name : String, phone : String, email: String, address : String, desc: String
});


var contact = mongoose.model('contact', contactSchema);

//express specific stuff
app.use("/static",express.static('static'));
// app.use("/static",express.static('static',options));
// app.use(express.urlencoded());
//providing extended option to true
//Attention: With express version => 4.16.0 the body-parser middleware was added back under methods express.urlencoded() and express.json()
app.use(express.urlencoded({extended:true}));
// It can also be used as 
//app.use(express.json())

//pug specific stuff
app.set("view engine","pug");
app.set("views",path.join(__dirname,'views'));

//Endpoints
app.get("/",(req,res)=>{
    const params = {};
    res.status(200).render("index.pug", params);
    console.log("get request is there")
})

app.get("/contact",(req,res)=>{
    const params = {};
    res.status(200).render("contact.pug");
    console.log(" Your contact us form has been rendered ");
})

app.post("/contact",(req,res)=>{
    const params = {};
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send(" This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render("contact.pug",params);
    // console.log(" Your form has been successfully submitted ");
})



app.get("/home",(req,res)=>{
    const params = {};
    res.status(200).render("home.pug");
    console.log(" Your form has been successfully submitted ");
})
app.get("/base",(req,res)=>{
    const params = {};
    res.status(200).render("base.pug");
    console.log(" Your form has been successfully submitted ");
})

app.listen(port, ()=>{
    console.log(`The application started on port ${port}`);
})