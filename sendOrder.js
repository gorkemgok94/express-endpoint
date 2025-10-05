const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendOrderEmail(name, cart) {
  try {
    await resend.emails.send({
      from: 'gorkemgok2019@gmail.com',
      to: 'gorkemgok2019@gmail.com',
      subject: 'New Order',
      text: `Name: ${name}\nOrder:\n${cart.join('\n')}`,
    });
    console.log('Email sent!');
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

module.exports = sendOrderEmail;