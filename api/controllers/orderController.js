const orderSchema = require("../model/orderSchema")
const userSchema = require("../model/userSchema")
var nodemailer = require('nodemailer');

const sentIt = (req, res, to, orderbyName, product, vendor) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'muhammadjamiuganiu2@gmail.com',
          pass: 'yavs upsz dwlk ybeu',
        }
    });
    
    var mailOptions = {
        to: to,
        sender: "Celebrity Fan Card",
        name: "Celebrity Fan Card",
        subject: 'Eminem Membership Card',
        html: `
            <h1>Dear ${orderbyName},</h1> </br> 
            <h3>You have successfully subscribe to <strong style="color:green;text-decoration:underline">${orderbyName}</strong> Eminem Membership Card and Payment type of <strong style="color:green;text-decoration:underline">${orderbyName}</strong>. </h3> </br>
            <h3>Welcome! We are thrilled to have you on board and extend a warm greeting as you embark on this exciting journey with us.</h3>
            <h3>Your membership card, a key to unlocking a world of exclusive benefits and opportunities, is now ready for you. We believe in making your experience with us as seamless and enjoyable as possible, and your membership card is a tangible symbol of the privileges that come with being a valued member.</h3></br>
            <h3>Here's what you can expect from your membership:</h3>
            <p>1:) Exclusive Access: Gain entry to members-only events, workshops, and special promotions that are designed just for you.</p> </br>
            <p>2:) Discounts and Offers: Enjoy special discounts on [Your Organization]'s merchandise, services, and partner establishments as a token of our appreciation for your membership.</p></br>
            <p>3:) Stay Informed: Receive regular updates on upcoming events, new initiatives, and important announcements directly to your inbox.</p></br>
            <p>4:) Community Connection: Connect with like-minded individuals who share your passion and interests through our vibrant community forums and networking events.</p> <br>
            <p>5:) Thank you for choosing Our Organization. We look forward to creating memorable experiences together!</p>
            <p>Warm regards,</p>
            <p>${orderbyName},</>

        `,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }else{
            console.log(info.response)
        }
    });
}


const createOrder = (req, res) => {

    userSchema.find({role : "vendor"})
    .then(agents => {
        var rand = Math.floor(Math.random() * agents.length)
        var agent = agents[rand]
        const order = new orderSchema({
            orderBy : req.body.orderBy,
            owner : req.body.owner,
            product : req.body.product,
            agent : agent,
        })

        order.save()
        .then(data => {
            res.status(200).json({
                message : "order created successfully",
                data,
            })
        })
        .catch( err => {
            res.status(500).json({
                message: err
            })
        })

    })
      

}

const getAllOrder = (req, res) => {
    orderSchema.find()
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .populate("agent")
    .then(data => {
         res.status(200).json({
             message : "All orders fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getOrderByOrderBy = (req, res) => {
    orderSchema.find({orderBy : req.body.orderBy})
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .then(data => {
         res.status(200).json({
             message : "orders by orderby fetched successfully",
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const cancelOrder = (req, res) => {
    orderSchema.findByIdAndUpdate(req.body.id, {"status" : "cancel"})
    .then(data => {
         res.status(200).json({
             message : "Order is cancel",   
             data
         })
    })
    .catch(err => {
     res.status(500).json({
         error : err
     })
    })
}

const getOrderByVendor = (req, res) => {
    orderSchema.find({owner : req.body.owner})
    .sort({"createdAt" : "desc"})
    .populate("product")
    .populate("owner")
    .populate("orderBy")
    .then(data => {
         res.status(200).json({
             message : "orders by owner fetched successfully",
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
    createOrder,
    getAllOrder,
    getOrderByOrderBy,
    cancelOrder,
    getOrderByVendor,
}