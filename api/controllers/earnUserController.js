const EarnUserSchema = require("../model/earnUserSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


const createUser = (req, res) => {
    code = generateString(15);
    EarnUserSchema.find({email : req.body.email})
    .then(result => {
       if(result.length >= 1){
            res.status(200).json({
                message : "user already exist"
            })
       }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(hash){
                    const user = new EarnUserSchema({
                        fullname : req.body.fullname,
                        password : hash,
                        email : req.body.email,
                        phone : req.body.phone,
                        ref_code : code,
                    })
                
                    user.save()
                    .then(data => {
                        const token = jwt.sign({ 
                            fullname : req.body.fullname,
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
    EarnUserSchema.find({email : req.body.email})
    .then(user => {
       if(user.length >= 1){
            bcrypt.compare(req.body.password, user[0].password, (err , bol) => {
                if(bol){
                   const token = jwt.sign({
                        email : user[0].email, 
                        fullname : user[0].fullname,}, "secret", {expiresIn : "12h"}
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
   EarnUserSchema.find()
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
    createUser, 
    getAllUser,
    loginUser,
}