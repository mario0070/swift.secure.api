const orderSchema = require("../model/orderSchema")

const createOrder = (req, res) => {

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