// routes
const express = require('express');
const router = express.Router();

const Company = require('../models/company');
const Record = require('../models/record');

const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const checkAuthenticated = require('../middlewares/checkAuthJWT');


// @route   GET api/dashboard
///// ROUTES for DASHBOARD /////

router.all('/*', checkAuthenticated)


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

router.put('/profile', async(req, res) => {
    
});

/// GET ALL LOAD SUPPLIERS

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
router.get('/suppliers/:id', async(req, res) => {
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
        res.json({ loadSupplier: foundUser.loadSuppliers.id(req.params.id)})
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
        res.json({loadSuppliers: user.loadSuppliers});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Server error'});
    }
});

router.put('/suppliers/:id', async(req, res) => {
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
    if(jwt.verify){
        const {name, country, city, street, number, zip, currentTrucksAssigned} = req.body;
        try {
            foundUser.loadSuppliers.forEach(supplier => {
                if(supplier._id == req.params.id){
                    supplier.name = name;
                    supplier.address.country = country;
                    supplier.address.city = city;
                    supplier.address.street = street;
                    supplier.address.number = number;
                    supplier.address.zip = zip;
                    supplier.currentTrucksAssigned = currentTrucksAssigned;
                }})
            await foundUser.save();
        } catch (error) {
            console.log(error);
            res.json({error: error})
        }
    }
        
});

router.delete('/suppliers/:id', async(req, res) => {
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
    if(jwt.verify){
        try {
            foundUser.loadSuppliers.forEach(supplier => {
                if(supplier._id == req.params.id){
                    supplier.remove();
                }})
            await foundUser.save();
        } catch (error) {
            console.log(error);
            res.json({error: error})
        }
    }
});


/// GET ALL TRUCKS
router.get('/trucks', async(req, res) => {
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
    if(jwt.verify){
        res.json({ trucks: foundUser.trucks})
    }
});
router.get('/trucks/:id', async(req, res) => {
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
    if(jwt.verify){
        const truck = foundUser.trucks.find(truck => truck._id == req.params.id);
        res.json({ truck: truck})
    }
});

router.post('/trucks', async(req, res) => {
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
    if(jwt.verify){
        const {number, brand, model, year, currentDriver, currentLoadSupplier } = req.body;
        const newTruck = {
            number,
            brand,
            model,
            year,
            currentDriver,
            currentLoadSupplier
        }
        try {
            foundUser.trucks.push(newTruck);
            await foundUser.save();
        } catch (error) {
            console.log(error);
            res.json({error: error})
        }
    }
});
router.put('/trucks/:id', async(req, res) => {
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
    if(jwt.verify){
        const {number, brand, model, year, currentDriver, currentLoadSupplier } = req.body;
        const editTruck = {
            number,
            brand,
            model,
            year,
            currentDriver,
            currentLoadSupplier
        }
        try {
            foundUser.trucks.forEach(truck => {
                if(truck._id == req.params.id){
                    truck.number = editTruck.number
                    truck.brand = editTruck.brand
                    truck.model = editTruck.model
                    truck.year = editTruck.year
                    truck.currentDriver = editTruck.currentDriver
                    truck.currentLoadSupplier = editTruck.currentLoadSupplier
                }
            })
            await foundUser.save();
        } catch (error) {
            console.log(error);
            res.json({error: error})
        }
    }
});

router.delete('/trucks/:id', async(req, res) => {
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
    if(jwt.verify){
        try {
            foundUser.trucks = foundUser.trucks.forEach(truck => {
                if(truck._id === req.params.id){
                    foundUser.trucks.splice(truck, 1)
                }
            })
            
            await foundUser.save();
        } catch (error) {
            console.log(error);
            res.json({error: error})
        }
    }
});


/// GET ALL DRIVERS
router.get('/drivers', async(req, res) => {});
router.get('/drivers/:id', async(req, res) => {});

router.post('/drivers', async(req, res) => {});
router.put('/drivers/:id', async(req, res) => {});

router.delete('/drivers/:id', async(req, res) => {});

/// GET ALL RECORDS
router.get('/records', async(req, res) => {});
router.get('/records/:id', async(req, res) => {});

router.post('/records', async(req, res) => {});
router.put('/records/:id', async(req, res) => {});

router.delete('/records/:id', async(req, res) => {});

/// GET Revenue

router.get('/revenue', async(req, res) => {});
router.post('/revenue', async(req, res) => {});




module.exports = router;