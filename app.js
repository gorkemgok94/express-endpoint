// app.js
require('dotenv').config();
const express = require('express');
const { Resend } = require('resend');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const db = require('./db');
const sendOrderEmail = require('./sendOrder');
app.use(cors());
app.use(express.json());
const resend = new Resend(process.env.RESEND_API_KEY);

// Basic route - remains the same
app.get('/', (req, res) => {
  res.send('Welcome to the API for products of Nil Gastronomie')
});

// NEW ROUTE: To send the product list as JSON
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

app.post('/api/order', async (req, res) => {
  const { name, cart, address } = req.body;

  try {
    await resend.emails.send({
      from: 'Abi Store <onboarding@resend.dev>',
      to: 'gorkemgok2019@gmail.com',
      subject: `Neue Bestellung von ${name}`,
      html: `
        <h2>Bestellung von ${name}</h2>
        <p>Lieferadresse: ${address}</p>
        <ul>
          ${cart.map(item => `<li>${item.name} × ${item.quantity}</li>`).join('')}
        </ul>
      `,
    });

    res.json({ success: true });
    console.log(cart.map(item => `${item.name} × ${item.quantity}`).join(', '));
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Access products at /api/products`);
});

