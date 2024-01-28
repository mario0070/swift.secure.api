const cardSchema = require("../model/cardSchema")

const createUser = (req, res) => {
    const user = new cardSchema({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        occupation : req.body.occupation,
        state : req.body.state,
        address : req.body.address,
        phone : req.body.phone,
        card : req.body.card,
        payment : req.body.payment,
        status : req.body.status
    })

    user.save()
    .then(data => {
        res.status(200).json({
            message : "user created successfully",
            data,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
               

   
}

const getAllUser = (req, res) => {
    cardSchema.find()
    .sort({"createdAt" : "desc"})
    .then(data => {
         res.status(200).json({
             message : "users fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
 }

module.exports = {
    createUser,
    getAllUser,
}