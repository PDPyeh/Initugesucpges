const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'meraklangka1',
    database: 'kocakamt'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Serve static files (e.g., HTML, CSS, JS) from the current directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle PHP files
app.get('/*.php', (req, res) => {
    const phpFile = path.join(__dirname, req.path); // Get the PHP file path
    exec(`php ${phpFile}`, (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(`Error executing PHP: ${error.message}`);
            return;
        }
        if (stderr) {
            res.status(500).send(`PHP stderr: ${stderr}`);
            return;
        }
        res.send(stdout); // Send the PHP output to the browser
    });
});

// Endpoint to handle form submission
app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    const sql = 'INSERT INTO kocak (name, email) VALUES (?, ?)';
    db.query(sql, [name, email], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error);
            return res.status(500).json({ message: 'Error inserting data' });
        }
        res.json({ message: 'Data berhasil di tambahkan' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});