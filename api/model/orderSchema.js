const mongoose = require("mongoose")

const schema = mongoose.Schema

const orderSchema = new schema({
    orderBy : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "User"},
    status : {type : String , default : "active"},
    owner : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "User"},
    product : {type : mongoose.SchemaTypes.ObjectId, required : true, ref : "Product"},
},{timestamps : true})

module.exports = mongoose.model("Order", orderSchema)