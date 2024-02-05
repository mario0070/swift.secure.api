const mongoose = require("mongoose")

const schema = mongoose.Schema

const EarnUserSchema = new schema({
    fullname : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    phone : {type : Number, default : null},
    balance : {type : Number, default : 0.00},
    total_ref : {type : Number, default : 0},
    taskTotal : {type : Number, default : 0},
    ref_code : {type : String, required : true},
    account_details : {type : Object, default : null},
},{timestamps : true})

module.exports = mongoose.model("EarnUser", EarnUserSchema)