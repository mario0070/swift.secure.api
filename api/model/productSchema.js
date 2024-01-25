const mongoose = require("mongoose")

const schema = mongoose.Schema

const productSchema = new schema({
    name : {type : String, required : true},
    price : {type : String, required : true},
    image : {type : String, default : null},
    description : {type : String, required : true},
    owner : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "User"},
},{timestamps : true})

module.exports = mongoose.model("Product", productSchema)