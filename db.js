// db.js
const Database = require('better-sqlite3');
const db = new Database('products.db'); // this file will be created if not exists

// Create table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    category TEXT,
    price REAL,
    available INTEGER,
    imageUrl TEXT
  )
`).run();

// --- Improved Seeding Logic ---

// 1. Define the initial data in an array
const initialProducts = [
  { name: 'Baum Tomaten', category: 'Drinks', price: 1.50, available: 1, imageUrl: 'https://imgur.com/KYjyxbM' },
  { name: 'Eisberg Salat', category: 'Vegetables', price: 2.20, available: 1, imageUrl: null },
  { name: 'Pizza Karton', category: 'Packaging', price: 0.10, available: 1, imageUrl: null },
  { name: 'Milk (1L)', category: 'Dairy', price: 0.99, available: 0, imageUrl: null },
  { name: 'Organic Eggs (6-pack)', category: 'Dairy', price: 3.49, available: 1, imageUrl: null },
  { name: 'Baguette', category: 'Bakery', price: 1.20, available: 1, imageUrl: null }
];

// 2. Prepare the statements for checking and inserting
const findProduct = db.prepare('SELECT * FROM products WHERE name = ?');
const insertProduct = db.prepare(`
  INSERT INTO products (name, category, price, available, imageUrl)
  VALUES (@name, @category, @price, @available, @imageUrl)
`);

// 3. Loop through each product and add it only if it doesn't exist
console.log('Running database seeder...');
for (const product of initialProducts) {
  const existing = findProduct.get(product.name);
  if (!existing) {
    insertProduct.run(product);
    console.log(` -> Added product: ${product.name}`);
  }
}
console.log('Seeder finished.');


module.exports = db;
