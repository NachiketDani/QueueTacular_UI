require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // use 465 for secure
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  // verify connection configuration
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });

  // send mail with defined transport object
  const mailOptions = {
    from: 'Queue-Tacular <spaceforcegroup@gmail.com>', // sender address
    to: 'spaceforcegroup@gmail.com', // list of receivers
    subject: 'Hello World!', // Subject line
    text: 'Hello world?', // plain text body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

sendEmail().catch(console.error);
