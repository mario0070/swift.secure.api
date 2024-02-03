const express = require("express")
const app = express()
const morgan = require("morgan")
const userRoutes = require("./api/routes/userRoute")
const productRoute = require("./api/routes/productRoute")
const orderRoute = require("./api/routes/orderRoute")
const cardRoute = require("./api/routes/cardRoute")
const chatRoute = require("./api/routes/chatRoute")
const earnUserRoute = require("./api/routes/earnUserRoute")
const cors = require("cors")
const multer = require("multer")
const path = require('path')
const bodyParser = require('body-parser');
const util = require('util');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config()
const { Configuration, OpenAIApi, OpenAI } = require("openai");  
require("dotenv").config();


let APIcall = () => { 
    const openai = new OpenAI({ apiKey: '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' });
    const completion = openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
    });
    
    console.log(completion.choices[0]);
}; 

app.get("/test",(req, res) => {
    APIcall();
})

app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )

    if(req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    }
    next()
})

app.get("/", (req, res) => {
    res.status(200).json({
        message : "welcome to food delivery web app api",
        version : "1.0",
        author : "muhammadjamiu"
    })
})

app.use("/user", userRoutes)
app.use("/chat", chatRoute)
app.use("/card", cardRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)
app.use("/earn", earnUserRoute)

app.use((req, res) => {
    res.status(404).json({
        message : "Endpoint not found"
    })
})

module.exports = app