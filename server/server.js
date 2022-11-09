const express = require('express');
const app = express();
const port = 3300;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');

//app urlencoded for retrieve req.body data
app.use(express.urlencoded({extended: true}));

//cors
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
}));

// dotenv
dotenv.config();

// Connect to MONGODB
require('./config/db')();

// Routes auth
const passport = require('passport');
const session = require('express-session');
app.use(session({
    //secret: process.env.SECRET,
    secret: 'some secret',
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
app.use(passport.initialize());
app.use(passport.session());

//import routes
const indexRoute = require('./routes/index');
const dashboardRoute = require('./routes/dashboard');
app.use('/', indexRoute);
app.use('/dashboard', dashboardRoute);

// Routes
app.get('/', (req, res) => {
    res.send({Message : 'Hello World!'});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});