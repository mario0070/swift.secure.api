const mongoose = require("mongoose")

const schema = mongoose.Schema

const googleSchema = new schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
},{timestamps : true})

module.exports = mongoose.model("Google", googleSchema)