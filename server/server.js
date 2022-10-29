const express = require('express');
const app = express();
const port = 3300;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// dotenv
dotenv.config();

// Connect to MONGODB
require('./config/db')();

// Routes
app.get('/', (req, res) => {
    res.send({'Hello World!' : 'Hello World!'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});