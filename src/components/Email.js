//const nodemailer = require('nodemailer');
// const gulp = require('gulp');
// const mail = require('gulp-mail');

require('dotenv').config();

export default async function sendEmail() {
  const templateParams = {
    to_name: 'James',
    queue_name: 'Disneyland',
  };

  window.emailjs
    .send('default_service', 'template_serving_queue', templateParams)
    .then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );
}

// Attempt 2.
// export default async function sendEmail(queueName) {
//   //console.log('Sending email...');

//   const smtpInfo = {
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//     host: 'smtp.163.com',
//     secureConnection: true,
//     port: 465,
//   };

//   gulp.task('mail', function () {
//     return gulp.src('./emailTemplate.html').pipe(
//       mail({
//         subject: 'Surprise!?',
//         to: ['spaceforcegroup@gmail.com'],
//         from: 'Queue-Tacular <spaceforcegroup@gmail.com>',
//         smtp: smtpInfo,
//       })
//     );
//   });
// }

// export default sendEmail;

// Attempt 1.

// create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     // host: 'smtp.gmail.com',
//     // port: 465, // use 465 for secure
//     // secure: true, // true for 465, false for other ports
//      service: 'gmail',
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD,
//     },
//   });

// verify connection configuration
//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Server is ready to take our messages');
//     }
//   });

//   // send mail with defined transport object
//   const mailOptions = {
//     from: 'Queue-Tacular <spaceforcegroup@gmail.com>', // sender address
//     to: 'spaceforcegroup@gmail.com', // list of receivers
//     subject: 'Its Your turn!', // Subject line
//     text: `It is your turn in the queue ${queueName}`, // plain text body
//   };

//   await transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
//}

// sendEmail().catch(console.error);
