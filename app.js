// app.js
const express = require('express');
const app = express();
// Replit assigns a random port through process.env.PORT.
// We use 3000 as a fallback for local development.
const port = process.env.PORT || 3000;

// Define your product list
const products = [
  { id: 1, name: 'Cola', category: 'Drinks', price: 1.50, available: true },
  { id: 2, name: 'Eisberg Salat', category: 'Vegetables', price: 2.20, available: true },
  { id: 3, name: 'Pizza Karton', category: 'Packaging', price: 0.10, available: true },
  { id: 4, name: 'Milk (1L)', category: 'Dairy', price: 0.99, available: false }, // Example of an unavailable product
  { id: 5, name: 'Organic Eggs (6-pack)', category: 'Dairy', price: 3.49, available: true },
  { id: 6, name: 'Baguette', category: 'Bakery', price: 1.20, available: true }
];

// Basic route - remains the same
app.get('/', (req, res) => {
  res.json(products);
});

// NEW ROUTE: To send the product list as JSON
app.get('/api/products', (req, res) => {
  // res.json() automatically sets the Content-Type header to application/json
  // and converts the JavaScript object/array into a JSON string.
  res.json(products);
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Access products at /api/products`);
});
