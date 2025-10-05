const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nilgastrobestellung@gmail.com', // your Gmail address
    pass: 'sczx mttj yhmt xeor',   // the app password you generated
  },
});

function sendOrderEmail(name, cart) {
  const mailOptions = {
    from: 'nilgastrobestellung@gmail.com',
    to: 'gorkemgok2019@gmail.com', // or another recipient
    subject: 'New Order',
    text: `Name: ${name}\nOrder:\n${cart.join('\n')}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
}

module.exports = sendOrderEmail;