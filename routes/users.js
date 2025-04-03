const express = require("express");
const router = express.Router();
const mysql = require("mysql");
require("dotenv").config();

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Get all users
router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

// Add a new user
router.post("/", (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "User added successfully", userId: result.insertId });
        }
    );
});

module.exports = router;
