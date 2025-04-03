const express = require('express');
const { Sequelize } = require('sequelize');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Database Connection
const sequelize = new Sequelize('railway_db', 'root', 'Divya@22', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    connectTimeout: 60000, // Optional: increase connection timeout
  },
  logging: false, // Disable SQL logging in the console
});

// Test database connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

// Middleware
app.use(express.json()); // Parse JSON requests

// Sample Route
app.get('/', (req, res) => {
  res.send('Hello, Node.js with MySQL!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
