// app.js
const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('I love you so much!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});