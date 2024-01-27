const express = require("express")
const route = express.Router()
const cardController = require("../controllers/cardController")

route.get("/", cardController.getAllUser)
route.post("/create", cardController.createUser)

module.exports = route