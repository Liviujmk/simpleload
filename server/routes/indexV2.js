const express = require('express');
const router = express.Router();
const Company = require('../models/company');

//import auth middleware
const authController = require('../controllers/authControllers');
const logoutController = require('../controllers/logOutControllers');
const refreshTokenController = require('../controllers/refreshTokenController');
const registerController = require('../controllers/registerController');

//register
router.post('/register', registerController.handleNewUser);

router.post('/login', authController.handleLogin);

// logout
router.get('/logout', logoutController.handleLogout);

// refresh token
router.get('/refresh', refreshTokenController.handleRefreshToken);

module.exports = router;