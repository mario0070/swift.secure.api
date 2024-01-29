const mongoose = require("mongoose")

const schema = mongoose.Schema

const chatSchema = new schema({
    sender : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "User"},
    msg : {type : String, required : true,},
    recipient : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "User"},
},{timestamps : true})

module.exports = mongoose.model("Chat", chatSchema)