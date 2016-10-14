var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('nodemailer');
var nodemailer = require('nodemailer');
var routes = require('./routes/index');

var app = express();
 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

 
// create reusable transporter object using the default SMTP transport 
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

router.post('/send', function (req, res, next) {
var name = req.body.name;
var content = req.body.message;
var emailadd = req.body.email;
    console.log(" entering ");
    try {
		var MAILID = ENV['EMAIL_USER'];
		var PWD = ENV['EMAIL_PASSWORD'];
        var transporter = nodemailer.createTransport('smtps://testheroku2%40gmail.com:(Test)1234@smtp.gmail.com');
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


//module.exports = router;

module.exports = app;