const chatSchema = require("../model/chatModel")

const createMsg = (req, res) => {
    const msg = new chatSchema({
        sender : req.body.sender,
        recipient : req.body.recipient,
        msg : req.body.msg,
    })

    msg.save()
    .then(data => {
        res.status(200).json({
            message : "msg created successfully",
            data,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
               

}

const getAllChat = (req, res) => {
    chatSchema.find()
    .sort({"createdAt" : "desc"})
    .populate("sender")
    .populate("recipient")
    .then(data => {
         res.status(200).json({
             message : "All Chat fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getConversation = (req, res) => {
    chatSchema.find()
    .sort({"createdAt" : "desc"})
    .populate("sender")
    .populate("recipient")
    .then(data => {
        var total = []
         res.status(200).json({
            message : "All Conversation fetched successfully",
            data : data.map((val, index) => {
                if((val.sender._id == req.body.sender || val.sender._id == req.body.recipient) &&  (val.recipient._id == req.body.sender || val.recipient._id == req.body.recipient)){
                    total.push(val)
                    return val
                }
            }),
            total: total.length,

         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}



module.exports = {
    createMsg,
    getAllChat,
    getConversation
}