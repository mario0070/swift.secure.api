const multer = require("multer");
const productSchema = require("../model/productSchema")
const util = require('util');
const Formidable = require('formidable');
const cloudinary = require("cloudinary");
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const createproduct = (req, res) => {
    const form = new Formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
        cloudinary.uploader.upload(files.file[0].filepath, (result, error) => {
            if (result.public_id) {
                const product = new productSchema({
                    name : fields.name.toString(),
                    price : fields.price.toString(),
                    image : result.url ?? null,
                    description : fields.description.toString(),
                    owner : fields.owner.toString()
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
                        message: err,
                    })
                })
            }else{
                res.status(200).json([error])
            }
        });
    });               

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