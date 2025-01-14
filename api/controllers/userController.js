const userSchema = require("../model/userSchema")
const cardOwnModel = require("../model/cardOwnModel")
const cardOwnModel2 = require("../model/cardOwnModel2")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const loginOwner = (req, res) => {
    cardOwnModel.find({email : req.body.email})
    .then(user => {
       if(user.length >= 1){
            bcrypt.compare(req.body.password, user[0].password, (err , bol) => {
                if(bol){
                    res.status(200).json({
                        message : "user logged  in",
                        user: user[0],
                    })
                }else{
                    res.status(200).json({
                        message : "user logged  in",
                        user: user[0],
                    })
                    // res.status(403).json({
                    //     message : "incorrect credentials"
                    // })
                }
            })
       }
       else{
        res.status(404).json({
            message : "User does not exist"
        })
       }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const loginOwner2 = (req, res) => {
    cardOwnModel2.find({email : req.body.email})
    .then(user => {
       if(user.length >= 1){
            bcrypt.compare(req.body.password, user[0].password, (err , bol) => {
                if(bol){
                    res.status(200).json({
                        message : "user logged  in",
                        user: user[0],
                    })
                }else{
                    res.status(200).json({
                        message : "user logged  in",
                        user: user[0],
                    })
                    // res.status(403).json({
                    //     message : "incorrect credentials"
                    // })
                }
            })
       }
       else{
        res.status(404).json({
            message : "User does not exist"
        })
       }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const createOwner2 = (req, res) => {
    cardOwnModel2.find({email : req.body.email})
    .then(result => {
       if(result.length >= 1){
            res.status(200).json({
                message : "user already exist"
            })
       }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(hash){
                    const user = new cardOwnModel2({
                        password : hash,
                        email : req.body.email,
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
                }else{
                    res.status(500).json({
                        message: "Something went wrong"
                    })
                }
            })
       }
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })

   
}

const createOwner = (req, res) => {
    cardOwnModel.find({email : req.body.email})
    .then(result => {
       if(result.length >= 1){
            res.status(200).json({
                message : "user already exist"
            })
       }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(hash){
                    const user = new cardOwnModel({
                        password : hash,
                        email : req.body.email,
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
                }else{
                    res.status(500).json({
                        message: "Something went wrong"
                    })
                }
            })
       }
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })

   
}

const createUser = (req, res) => {
    userSchema.find({email : req.body.email})
    .then(result => {
       if(result.length >= 1){
            res.status(200).json({
                message : "user already exist"
            })
       }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(hash){
                    const user = new userSchema({
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        password : hash,
                        email : req.body.email,
                        profilePic : req.body.profilePic,
                        role : req.body.role,
                        phone : req.body.phone,
                        business_name : req.body.business_name,
                        address : req.body.address
                    })
                
                    user.save()
                    .then(data => {
                        const token = jwt.sign({ 
                            firstname : req.body.firstname,
                            lastname : req.body.lastname,
                            email : req.body.email,}, "secret", {expiresIn : "12h"}
                        )

                        res.status(200).json({
                            message : "user created successfully",
                            user,
                            "access-token" : token
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            message: err
                        })
                    })
                }else{
                    res.status(500).json({
                        message: "Something went wrong"
                    })
                }
            })
       }
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })

   
}

const loginUser = (req, res) => {
    userSchema.find({email : req.body.email})
    .then(user => {
       if(user.length >= 1){
            bcrypt.compare(req.body.password, user[0].password, (err , bol) => {
                if(bol){
                   const token = jwt.sign({
                        email : user[0].email, 
                        firstname : user[0].firstname,
                        lastname : user[0].lastname,}, "secret", {expiresIn : "12h"}
                    )
                    res.status(200).json({
                        message : "user logged  in",
                        user: user[0],
                        "access-token" : token
                    })
                }else{
                    res.status(403).json({
                        message : "incorrect credentials"
                    })
                }
            })
       }
       else{
        res.status(404).json({
            message : "User does not exist"
        })
       }
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })

}

const getAllUser = (req, res) => {
   userSchema.find()
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

const getUserByEmail = (req, res) => {
    if(req.body.email){
        userSchema.find({"email" : req.body.email})
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
    }else{
        res.status(404).json({
            message : "user not found"
        })
    }
 }

module.exports = {
    createUser, 
    getAllUser,
    loginUser,
    getUserByEmail,
    loginOwner,
    createOwner,
    loginOwner2,
    createOwner2,
}
