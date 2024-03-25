const cardSchema = require("../model/cardSchema2")
var nodemailer = require('nodemailer');


const sentIt = (req, res, to, name, card, payment) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'celebrityfancard027@gmail.com',
          pass: 'yavs upsz dwlk ybeu',
        }
    });
    
    var mailOptions = {
        to: to,
        sender: "Celebrity Fan Card",
        name: "Celebrity Fan Card",
        subject: 'Eminem Membership Card',
        html: `
            <h1>Dear ${name},</h1> </br> 
            <h3>You have successfully subscribe to <strong style="color:green;text-decoration:underline">${card}</strong> Eminem Membership Card and Payment type of <strong style="color:green;text-decoration:underline">${payment}</strong>. </h3> </br>
            <h3>Welcome! We are thrilled to have you on board and extend a warm greeting as you embark on this exciting journey with us.</h3>
            <h3>Your membership card, a key to unlocking a world of exclusive benefits and opportunities, is now ready for you. We believe in making your experience with us as seamless and enjoyable as possible, and your membership card is a tangible symbol of the privileges that come with being a valued member.</h3></br>
            <h3>Here's what you can expect from your membership:</h3>
            <p>1:) Exclusive Access: Gain entry to members-only events, workshops, and special promotions that are designed just for you.</p> </br>
            <p>2:) Discounts and Offers: Enjoy special discounts on [Your Organization]'s merchandise, services, and partner establishments as a token of our appreciation for your membership.</p></br>
            <p>3:) Stay Informed: Receive regular updates on upcoming events, new initiatives, and important announcements directly to your inbox.</p></br>
            <p>4:) Community Connection: Connect with like-minded individuals who share your passion and interests through our vibrant community forums and networking events.</p> <br>
            <p>5:) Thank you for choosing Our Organization. We look forward to creating memorable experiences together!</p>
            <p>Warm regards,</p>
            <p>${name},</>

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

const createUser = (req, res) => {
    const user = new cardSchema({
        name : req.body.name,
        age : req.body.age,
        email : req.body.email,
        occupation : req.body.occupation,
        state : req.body.state,
        address : req.body.address,
        phone : req.body.phone,
        card : req.body.card,
        payment : req.body.payment,
        status : req.body.status
    })

    user.save()
    .then(data => {
        sentIt(req, res, req.body.email, req.body.name, req.body.card, req.body.payment)
        res.status(200).json({
            message : "user created successfully",
            data,
        })
    })
    .catch( err => {
        res.status(500).json({
            message: err
        })
    })
               

   
}

const getAllUser = (req, res) => {
    cardSchema.find()
    .sort({"createdAt" : "desc"})
    .then(data => {
         res.status(200).json({
             message : "users fetched successfully",
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
    createUser,
    getAllUser,
}