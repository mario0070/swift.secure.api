const mongoose = require("mongoose")

const schema = mongoose.Schema

const EarnUserSchema = new schema({
    fullname : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    phone : {type : Number, required : true}
},{timestamps : true})

module.exports = mongoose.model("EarnUser", EarnUserSchema)