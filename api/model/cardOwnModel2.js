const mongoose = require("mongoose")

const schema = mongoose.Schema

const Owner = new schema({
    password : {type : String, default : null},
    email : {type : String, default : null},
},{timestamps : true})

module.exports = mongoose.model("cardOwner2", Owner)