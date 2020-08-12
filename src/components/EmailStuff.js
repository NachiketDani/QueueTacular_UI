require('dotenv').config();

const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

async function main() {
  const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID, // ClientID
    process.env.EMAIL_CLIENT_SECRET, // Client Secret
    'https://developers.google.com/oauthplayground' // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });
  const accessToken = await oauth2Client.getAccessToken();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GOOGLE_USER,
      clientId: process.env.EMAIL_CLIENT_ID,
      clientSecret: process.env.EMAIL_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
    tls: {
      rejectUnauthorized: false,
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
    subject: 'Hello World!!!!', // Subject line
    text: 'Node.js Email with Secure OAuth', // plain text body
  };

  transporter.sendMail(mailOptions, (error, response) => {
    error ? console.log(error) : console.log(response);
    transporter.close();
  });
}

main().catch((err) => console.log(err));
// transporter.sendMail(mailOptions, (error, response) => {
//   error ? console.log(error) : console.log(response);
//   transporter.close();
// });

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });

// console.log('Message sent: %s', info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

// Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

// main();

// const templateParams = {
//   to_name: 'James',
//   queue_name: 'Disneyland',
// };

// emailjs.send(default_service, 'template_serving_queue', templateParams).then(
//   function (response) {
//     console.log('SUCCESS!', response.status, response.text);
//   },
//   function (error) {
//     console.log('FAILED...', error);
//   }
// );
