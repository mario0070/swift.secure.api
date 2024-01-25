const express = require("express")
const route = express.Router()
const productController = require("../controllers/productController")

route.get("/", productController.getAllProduct)
route.post("/create", productController.createproduct)
route.get("/show", productController.show)
route.post("/delete", productController.deleteProduct)
route.get("/search-product", productController.searchProduct)
route.get("/vendor-product", productController.getProductByOwner)

module.exports = route