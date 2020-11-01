const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailHandlerService = () => {
  const msg = {
    to: 'mikiteek@gmail.com',
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: 'Welcome! Confirm your email',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>Hi there, send grid has send you message</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    });
}

module.exports = sendMailHandlerService;

