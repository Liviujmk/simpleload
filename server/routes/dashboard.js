// routes
const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Record = require('../models/record');
/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/
const dotenv = require('dotenv');
const {validPassword, genPassword, checkAuthenticated, checkNotAuthenticated} = require('../middlewares/authFunctions');
const passport = require('passport');



///// ROUTES for DASHBOARD /////
//router.all('/*', checkAuthenticated)



router.get('/'/*, checkAuthenticated*/, passport.authenticate('jwt', {session: false}) , async(req, res) => {
    const user = req.user
    /*res.send(
        `<h1>Dashboard</h1>
        <p>Dashboard for ${req.user.name}</p>
        <br>
        <a href="/dashboard/suppliers">Suppliers</a>
        <br>
        <br>
        <form action="/logout" method="POST">
            <input type="submit" value="Logout">
        </form>
    `);*/
    res.json(user.loadSuppliers);
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

router.post('/suppliers', async(req, res) => {
    const user = await Company.findOne({name: req.user.name});
    const {name, country, city, street, number, zip} = req.body;
    const supplierData = {
        name,
        address: {
            country,
            city,
            street,
            number,
            zip
        }
    }
    try {
        user.loadSuppliers.push(supplierData);
        await user.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.redirect('/dashboard/suppliers');
    }
});

module.exports = router;