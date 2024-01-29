const express = require("express")
const route = express.Router()
const chatController = require("../controllers/chatController")

route.post("/create", chatController.createMsg)
route.get("/", chatController.getAllChat)
route.post("/conversation", chatController.getConversation)

module.exports = route