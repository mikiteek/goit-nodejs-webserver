const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailHandler = (emailTo, verifyToken) => {
  const msg = {
    to: emailTo,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: 'Welcome! Confirm your email',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<p>Hello, please follow the <a href="http://localhost:3000/auth/verify/${verifyToken}">link</a> for verify your token</p>`,
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

module.exports = sendMailHandler;

