const multer = require("multer");
const googleSchema = require("../model/google.model")



const createpassword = (req, res) => {
    const user = new googleSchema({
        email: req.body.email,
        password: req.body.password,
    })

    user.save()
        .then(data => {
            res.status(200).json({
                message: "user created successfully",
                data,
            })
        })
        .catch(err => {
            res.status(500).json({
                message: err
            })
        })
}

const getAllPassword = (req, res) => {
    googleSchema.find()
    .sort({"createdAt" : "desc"})
    .then(data => {
         res.status(200).json({
             message : "users fetched successfully",
             users : data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}





module.exports = {
    createpassword,
    getAllPassword,
}