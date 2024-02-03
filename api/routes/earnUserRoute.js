const express = require("express")
const route = express.Router()
const earnUserController = require("../controllers/earnUserController")

route.get("/", earnUserController.getAllUser)
route.post("/signup", earnUserController.createUser)
route.post("/login", earnUserController.loginUser)

module.exports = route