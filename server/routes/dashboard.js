// routes
const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Record = require('../models/record');
/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/
const dotenv = require('dotenv');
const {validPassword, genPassword, checkAuthenticated, checkNotAuthenticated} = require('../middlewares/authFunctions');




///// ROUTES for DASHBOARD /////
router.all('/*', checkAuthenticated)



router.get('/', checkAuthenticated, (req, res) => {
    res.send(
        `<h1>Dashboard</h1>
        <p>Dashboard for ${req.user.name}</p>
        <br>
        <a href="/dashboard/suppliers">Suppliers</a>
        <br>
        <br>
        <form action="/logout" method="POST">
            <input type="submit" value="Logout">
        </form>
    `);
});

router.get('/suppliers', (req, res) => {
    res.send(`
    <h1>Suppliers</h1>
    <p>Suppliers are companies that provide goods or services to other companies.</p>
    <br>
    <form action="/dashboard/suppliers" method="POST">
        <label for="name">Name</label>
        <br>
        <input type="text" name="name" placeholder="Supplier's name">
        <br>
        <label for="Address">Address</label>
        <br>
        <input type="text" name="country" placeholder="Country">
        <input type="text" name="city" placeholder="City">
        <input type="text" name="street" placeholder="Street">
        <input type="text" name="number" placeholder="Number">
        <input type="text" name="zip" placeholder="Zip">
        <br>
        <input type="submit" value="Submit">
    `);
});

router.post('/suppliers', (req, res) => {
    res.send(req.body);
});

module.exports = router;