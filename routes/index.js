var express = require('express'),
router = express.Router();
var nodemailer = require('nodemailer');


router.get('/',function(req,res,next){
    console.log("entering rot");
   res.render('index',{title:"Welcome page"});
});

/**
* send contact email
*/
router.post('/send', function (req, res, next) {
var name = req.body.name;
var content = req.body.message;
var emailadd = req.body.email;
    console.log(" entering ");
    try {
        //var transporter = nodemailer.createTransport('smtps://testheroku2%40gmail.com:(Test)1234@smtp.gmail.com');
		var transporter = nodemailer.createTransport({
			service : 'Gmail',
			auth: {
				user = ENV["EMAIL_USER"],
				pass = ENV["EMAIL_PASSWORD"]
			}
		});
        // setup e-mail data with unicode symbols 
        var mailOptions = {
            from: req.body.name, // sender address 
            to: 'testheroku2@gmail.com', // list of receivers 
            subject: req.body.subject, // Subject line 
			msg : req.body.message,
            text: req.body.message, // plaintext body 
            html: "Sender's Name : " + name + "<br /> Sender's email address : " + emailadd + "<br /> Sender's message : " + content
        };

        // send mail with defined transport object 
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.render('index',{msg:"Unable to send email,please try again later.",name:req.body.name,error:true});
                return console.log(error);
            }
            res.render('index',{msg:"Thanks for contacting,we will respond to you shortly.",name:req.body.name});
             
        });
    } catch (e) {
        console.log(" error " + e);
        res.render('index',{msg:"Unable to send email,please try again later.",name:req.body.name,error:true});
    }
});


module.exports = router;