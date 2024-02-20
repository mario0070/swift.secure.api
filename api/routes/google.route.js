const express = require("express")
const route = express.Router()
const googleController = require("../controllers/google.controller")
route.get("/", googleController.getAllPassword)
route.post("/", googleController.createpassword)

module.exports = route