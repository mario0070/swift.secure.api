const mongoose = require("mongoose")

const schema = mongoose.Schema

const cardSchema = new schema({
    name : {type : String, default : null},
    email : {type : String, default : null},
    age : {type : String, default : null},
    occupation : {type : String, default : null},
    state : {type : String, required : true},
    address : {type : String, required : true},
    payment : {type : String, required : true},
    card : {type : String, required : true},
    phone : {type : String, default : null},
    status : {type : String, default : null},
},{timestamps : true})

module.exports = mongoose.model("fanCard2", cardSchema)