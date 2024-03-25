const express = require("express")
const route = express.Router()
const cardController = require("../controllers/cardController2")

route.get("/get2", cardController.getAllUser)
route.post("/create2", cardController.createUser)

module.exports = route