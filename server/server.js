// dotenv
require('dotenv').config();

const express = require('express');
const app = express();
const port = 3300;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');

app.use(credentials)



//app urlencoded for retrieve req.body data
app.use(express.urlencoded({extended: true}));
app.use(express.json())
//cors
const cors = require('cors');
app.use(cors(corsOptions));


// Connect to MONGODB
require('./config/db')();

// Routes auth
/*const session = require('express-session');
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
require('./middlewares/passport')*/

//import routes
app.use(cookieParser());
const indexRoute = require('./routes/indexV2');
const dashboardRoute = require('./routes/dashboard');
app.use('/', indexRoute);
app.use('/dashboard', dashboardRoute);

// Routes
app.get('/', (req, res) => {
    res.send({Message : 'Hello World!'});
});

app.use(verifyJWT);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});