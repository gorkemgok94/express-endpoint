// db.js
const Database = require('better-sqlite3');
const db = new Database('products.db'); // this file will be created if not exists

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    price REAL,
    available INTEGER,
    imageUrl TEXT
  )
`).run();

// Seed initial data if empty
const existing = db.prepare('SELECT COUNT(*) AS count FROM products').get();
if (existing.count === 0) {
  const insert = db.prepare(`
    INSERT INTO products (name, category, price, available, imageUrl)
    VALUES (?, ?, ?, ?, ?)
  `);

  insert.run('Baum Tomaten', 'Drinks', 1.50, 1, 'https://imgur.com/KYjyxbM');
  insert.run('Eisberg Salat', 'Vegetables', 2.20, 1, null);
  insert.run('Pizza Karton', 'Packaging', 0.10, 1, null);
  insert.run('Milk (1L)', 'Dairy', 0.99, 0, null);
  insert.run('Organic Eggs (6-pack)', 'Dairy', 3.49, 1, null);
  insert.run('Baguette', 'Bakery', 1.20, 1, null);
}

module.exports = db;
