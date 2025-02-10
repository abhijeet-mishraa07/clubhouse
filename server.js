const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Piyush@01',
    database: 'event_registration'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/register', (req, res) => {
    const { branch, year, section, rollNo, phoneNumber, gmail } = req.body;
    const query = 'INSERT INTO registrations (branch, year, section, rollNo, phoneNumber, gmail) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [branch, year, section, rollNo, phoneNumber, gmail], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving registration.');
        } else {
            res.status(200).send('Registration successful.');
        }
    });
});


app.listen(3000, () => {
    console.log('Server running on port 3000');
});
