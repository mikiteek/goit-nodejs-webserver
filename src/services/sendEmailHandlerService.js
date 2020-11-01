const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailHandlerService = () => {
  const msg = {
    to: 'mikiteek@gmail.com',
    from: 'mikiteek@icloud.com',
    subject: 'Sending with SendGrid is Fun',
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

sendMailHandlerService();

module.exports = sendMailHandlerService;

