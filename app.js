// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const db = require('./db');
const sendOrderEmail = require('./sendOrder');
app.use(cors());
app.use(express.json());

// Basic route - remains the same
app.get('/', (req, res) => {
  res.send('Welcome to the API for products of Nil Gastronomie')
});

// NEW ROUTE: To send the product list as JSON
app.get('/api/products', (req, res) => {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

app.post('/api/order', (req, res) => {
  const { name, cart } = req.body;
  sendOrderEmail(name, cart);
  res.status(200).json({ message: 'Order sent!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Access products at /api/products`);
});

