const orderSchema = require("../model/orderSchema")
var nodemailer = require('nodemailer');


const sentIt = (req, res, to) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'muhammadjamiuganiu2@gmail.com',
          pass: 'zgns ddlm yvot vvjy'
        }
    });
    
    var mailOptions = {
        to: to,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(405).json({error})
        } else {
            res.status(200).json({msg : info.response})
        }
    });
}

const createOrder = (req, res) => {
    // sentIt(req, res, "ganiujamiu03@gmail.com")
    const order = new orderSchema({
        orderBy : req.body.orderBy,
        owner : req.body.owner,
        product : req.body.product,
    })

    order.save()
    .then(data => {
        res.status(200).json({
            message : "order created successfully",
            data,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
               

}

const getAllOrder = (req, res) => {
    orderSchema.find()
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .then(data => {
         res.status(200).json({
             message : "All orders fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getOrderByOrderBy = (req, res) => {
    orderSchema.find({orderBy : req.body.orderBy})
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .then(data => {
         res.status(200).json({
             message : "orders by orderby fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const cancelOrder = (req, res) => {
    orderSchema.findByIdAndUpdate(req.body.id, {"status" : "cancel"})
    .then(data => {
         res.status(200).json({
             message : "Order is cancel",   
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getOrderByVendor = (req, res) => {
    orderSchema.find({owner : req.body.owner})
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .then(data => {
         res.status(200).json({
             message : "orders by owner fetched successfully",
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
    createOrder,
    getAllOrder,
    getOrderByOrderBy,
    cancelOrder,
    getOrderByVendor,
}