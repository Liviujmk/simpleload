// routes
const express = require('express');
const router = express.Router();
const Company = require('../models/company');
const Record = require('../models/record');
const dotenv = require('dotenv');

//import auth middleware
const {validPassword, genPassword, checkAuthenticated, checkNotAuthenticated} = require('../middlewares/authFunctions');
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require('../middlewares/passport');
const flash = require('express-flash');
router.use(flash());

initializePassport(
    passport,
    email => Company.findOne({email: email}),
    id => Company.findOne({_id: id})
)

/* -------->>> INDEX'S ROUTES <<<---------- */

router.get('/', (req, res) => {
    res.send({Message : 'Homey route'});
});


// authentication routing
router.get('/register', checkNotAuthenticated, (req, res) => {
    res.send(`
    <h1>Register</h1>
    <p>Register a new company.</p>
    <br>
    <form action="/register" method="POST">
        <label for="name">Name</label>
        <br>
        <input type="text" name="name" placeholder="Your company's name">
        <br>
        <label for="email">Email</label>
        <br>
        <input type="email" name="email">
        <br>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password">
        <br>
        <br>    
        <input type="submit" value="Submit">
    `);
});

router.post('/register', checkNotAuthenticated, async(req, res) => {
    const {name, email, password} = req.body;
    const saltHash = genPassword(req.body.password);
    const hash = await bcrypt.hash(req.body.password, 12)
    const companyData = {
        name,
        email,
        password: hash,

    }
    Company.findOne({
    //ensure companyname is unique, i.e the companyname is not already in the database
    name
    })
    .then(company => {
        //if the companyname is unique 
        if (!company) {
        //if the companyname is unique go ahead and create companyData after hashing password and salt
            Company.create(companyData)
            .then(company => {
                //after successfully creating companyData display registered message
                res.redirect('/login')
            })
            .catch(err => {
                //if an error occured while trying to create companyData, go ahead and display the error
                res.send('error:' + err)
            })
        } else {
        //if the companyname is not unique, display that companyname is already registered with an account
        res.json({ error: 'The companyname ' + req.body.name + ' is registered with an account' })
        }
    })
    .catch(err => {
        //display error if an error occured
        res.send('error:' + err)
    })
})

router.get('/login', checkNotAuthenticated, (req, res) => {
    res.send(`
    <h1>Login</h1>
    <p>Login to your account.</p>
    <br>
    ${req.flash('error')}
    <form action="/login" method="POST">
        <label for="email">Email</label>
        <br>
        <input type="email" name="email">
        <br>
        <label for="password">Password</label>
        <br>
        <input type="password" name="password">
        <br>
        <br>
        <input type="submit" value="Submit">
    `);
});

router.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
}));

router.post("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})



module.exports = router;