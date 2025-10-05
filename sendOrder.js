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

  // Use a default callback if none is provided
  const cb = typeof callback === 'function' ? callback : (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  };

  transporter.sendMail(mailOptions, cb);
}

module.exports = sendOrderEmail;