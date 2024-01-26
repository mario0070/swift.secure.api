const multer = require("multer");
const productSchema = require("../model/productSchema")

const createproduct = (req, res) => {
    // if (!req.file) {
    //     // res.status(404).json({message : "no file found"})
    //     var image = null;
    // } else {
    //     // res.status(200).json({message : req.file.filename})
    //     var image = req.file.filename;
    // }

    const product = new productSchema({
        name : req.body.name,
        price : req.body.price,
        image : req.file.filename,
        description : req.body.description,
        owner : req.body.owner
    })

    product.save()
    .then(data => {
        res.status(200).json({
            message : "product created successfully",
            data,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
               

}

const getAllProduct = (req, res) => {
    productSchema.find()
    .sort({"createdAt" : "desc"})
    .populate("owner")
    .then(data => {
         res.status(200).json({
             message : "All products fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const show = (req, res) => {
    productSchema.find({_id : req.body.id})
    .populate("owner")
    .then(data => {
         res.status(200).json({
             message : "single products fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const searchProduct = (req, res) => {
    productSchema.find({name : { $regex: req.body.name}})
    .sort({"createdAt" : "desc"})
    .populate("owner")
    .then(data => {
         res.status(200).json({
             message : "single products fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const deleteProduct = (req, res) => {
    productSchema.findByIdAndDelete({_id : req.body.id})
    .then(data => {
         res.status(200).json({
             message : "product deleted successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getProductByOwner = (req, res) => {
    productSchema.find({owner : req.body.id})
    .sort({"createdAt" : "desc"})
    .populate("owner")
    .then(data => {
         res.status(200).json({
             message : "vendor products fetched successfully",
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
    createproduct,
    getAllProduct,
    show,
    searchProduct,
    deleteProduct,
    getProductByOwner,
}