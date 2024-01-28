const express = require("express")
const app = express()
const morgan = require("morgan")
const userRoutes = require("./api/routes/userRoute")
const productRoute = require("./api/routes/productRoute")
const orderRoute = require("./api/routes/orderRoute")
const cardRoute = require("./api/routes/cardRoute")
const cors = require("cors")
const multer = require("multer")
const path = require('path')
const bodyParser = require('body-parser');
const util = require('util');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

app.get("/test", (req, res) => {
    const form = new Formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        cloudinary.uploader.upload(files.file[0].filepath, (result, error) => {
            if (result.public_id) {
                res.status(200).json([result])
            }else{
                res.status(200).json([error])
            }
        });
    });
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
app.use("/card", cardRoute)
app.use("/product", productRoute)
app.use("/order", orderRoute)

app.use((req, res) => {
    res.status(404).json({
        message : "Endpoint not found"
    })
})

module.exports = app