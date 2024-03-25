const express = require("express")
const route = express.Router()
const userController = require("../controllers/userController")

route.get("/", userController.getAllUser)
route.post("/signup", userController.createUser)
route.post("/login", userController.loginUser)
route.post("/get-user", userController.getUserByEmail)

route.post("/owner", userController.loginOwner)
route.post("/create-owner", userController.createOwner)

route.post("/owner2", userController.loginOwner2)
route.post("/create-owner2", userController.createOwner2)


module.exports = route