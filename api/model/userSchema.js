const mongoose = require("mongoose")

const schema = mongoose.Schema

const userSchema = new schema({
    firstname : {type : String, default : null},
    lastname : {type : String, default : null},
    business_name : {type : String, default : null},
    address : {type : String, default : null},
    email : {type : String, required : true},
    password : {type : String, required : true},
    profilePic : {type : String, default : null},
    role : {type : String, default : "user"},
    phone : {type : Number, default : null}
},{timestamps : true})

module.exports = mongoose.model("User", userSchema)