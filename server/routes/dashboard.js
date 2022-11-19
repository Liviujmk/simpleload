// routes
const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Record = require('../models/record');
/*const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');*/
const dotenv = require('dotenv');
const {validPassword, genPassword, checkNotAuthenticated} = require('../middlewares/authFunctions');
const passport = require('passport');

const jwt = require('jsonwebtoken');
const checkAuthenticated = require('../middlewares/checkAuthJWT');
///// ROUTES for DASHBOARD /////

router.all('/*', checkAuthenticated)



router.get('/suppliers', async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await Company.findOne ({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
        }
    );
    if(jwt.verify)
        res.json({ loadSuppliers: foundUser.loadSuppliers})
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


router.get('/profile', async(req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await Company
        .findOne
        ({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden

    // evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded.email
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
        }
    );
    if(jwt.verify)
        res.json({ profile: foundUser })
});


module.exports = router;