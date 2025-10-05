const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nilgastrobestellung@gmail.com', // your Gmail address
    pass: 'sczx mttj yhmt xeor',   // the app password you generated
  },
});

function sendOrderEmail(name, cart, callback) {
  const mailOptions = {
    from: 'nilgastrobestellung@gmail.com',
    to: 'gorkemgok2019@gmail.com',
    subject: 'New Order',
    text: `Name: ${name}\nOrder:\n${cart.join('\n')}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    // This will call the callback you provide from app.js
    callback(error, info);
  });
}

module.exports = sendOrderEmail;