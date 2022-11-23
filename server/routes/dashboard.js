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


router.get('/profile', async (req, res) => {
    const foundUser = req.user;
    try {
        res.json({ profile: foundUser })
    } catch (err) {
        res.json({ message: err })
    }
});

router.put('/profile', async (req, res) => {

});

/// GET ALL LOAD SUPPLIERS

router.get('/suppliers', async (req, res) => {
    const foundUser = req.user;
    res.json({ loadSuppliers: foundUser.loadSuppliers })
});

router.get('/suppliers/:name',  async (req, res) => {
    const foundUser = req.user;
    if (jwt.verify)
        if(foundUser.loadSuppliers.find(supplier => supplier.name === req.params.name)) {   
            res.json({ loadSupplier: foundUser.loadSuppliers.find(supplier => supplier.name === req.params.name) })
        } else {
            res.json({ message: "No supplier with that name" })
        }
});

router.post('/suppliers', async (req, res) => {
    const foundUser = req.user;
    const { name, country, city, street, number, zip } = req.body;
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
        foundUser.loadSuppliers.push(supplierData);
        await foundUser.save();
        res.json({ loadSuppliers: foundUser.loadSuppliers });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/suppliers/:name', async (req, res) => {
    const foundUser = req.user;
    const { name, country, city, street, number, zip, currentTrucksAssigned } = req.body;
    try {
        foundUser.loadSuppliers.forEach(supplier => {
            if (supplier.name == req.params.name) {
                supplier.name = name;
                supplier.address.country = country;
                supplier.address.city = city;
                supplier.address.street = street;
                supplier.address.number = number;
                supplier.address.zip = zip;
                supplier.currentTrucksAssigned = currentTrucksAssigned;
            }
        })
        await foundUser.save();
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }

});

router.delete('/suppliers/:name', async (req, res) => {
    const foundUser = req.user;
    try {
        foundUser.loadSuppliers.forEach(supplier => {
            if (supplier.name == req.params.name) {
                supplier.remove();
            }
        })
        await foundUser.save();
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});


/// GET ALL TRUCKS
router.get('/trucks', async (req, res) => {
    const foundUser = req.user;
    res.json({ trucks: foundUser.trucks })
});
router.get('/trucks/:number', async (req, res) => {
    const foundUser = req.user;
    const truck = foundUser.trucks.find(truck => truck.number === req.params.number);
    res.json({ truck: truck })
});

router.post('/trucks', async (req, res) => {
    const foundUser = req.user;
    const { number, brand, model, year, currentDriver, currentLoadSupplier } = req.body;
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
        res.json({ error: error })
    }
});
router.put('/trucks/:number', async (req, res) => {
    const foundUser = req.user;
    const { number, brand, model, year, currentDriver, currentLoadSupplier } = req.body;
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
            if (truck.number == req.params.number) {
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
        res.json({ error: error })
    }
});

router.delete('/trucks/:number', async (req, res) => {
    const foundUser = req.user;
    try {
        foundUser.trucks = foundUser.trucks.forEach(truck => {
            if (truck.number === req.params.number) {
                foundUser.trucks.splice(truck, 1)
            }
        })

        await foundUser.save();
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});


/// GET ALL DRIVERS
router.get('/drivers', async (req, res) => {
    const foundUser = req.user;
    res.json({ drivers: foundUser.drivers })
});
router.get('/drivers/:name', async (req, res) => {
    const foundUser = req.user;
    const foundDriver = foundUser.drivers.find(driver => driver.name === req.params.name)
    res.json({ driver: foundDriver })
});

router.post('/drivers', async (req, res) => {
    const foundUser = req.user;
    const { name, currentTruck } = req.body;
    const newDriver = {
        name,
        currentTruck
    }
    try {
        foundUser.drivers.push(newDriver);
        await foundUser.save();
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});
router.put('/drivers/:name', async (req, res) => {
    const foundUser = req.user;
    const { currentTruck } = req.body;
    const newDriver = {
        currentTruck
    }
    try {
        foundUser.drivers.forEach(driver, async () => {
            if (driver.name === req.params.name) {
                driver.currentTruck = newDriver.currentTruck
                await foundUser.save();
            } else {
                res.json({ error: 'Driver not found' })
            }
        })
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

router.delete('/drivers/:name', async (req, res) => {
    const foundUser = req.user;
    const foundDriver = foundUser.drivers.find(driver => driver.name === req.params.name)
    try {
        foundUser.drivers.splice(foundDriver, 1)
        await foundUser.save();
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

/// GET ALL RECORDS
router.get('/records', async (req, res) => {
    const foundUser = req.user;
    const recordsId = foundUser.records;
    const records = await Record.find({ _id: { $in: recordsId } });
    res.json({ records: records })
});
router.get('/records/:id', async (req, res) => {
    const foundUser = req.user;
    const foundRecord = await Record.findById(req.params.id);
    res.json({ record: foundRecord })
});

router.post('/records', async (req, res) => {
    const foundUser = req.user;
    const { loadSupplier, truckAssigned, commandNr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price, } = req.body;
    const newRecord = {
        loadSupplier, carrierName: foundUser.name, truckAssigned, commandNr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price
    }
    try {
        const record = await Record.create(newRecord);
        await record.save();
        foundUser.records.push(record._id);
        await foundUser.save();
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});
router.put('/records/:id', async (req, res) => {
    const foundUser = req.user;
    const { loadSupplier, truckAssigned, commandNr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price, } = req.body;
    const newRecord = {
        loadSupplier, truckAssigned, commandNr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price
    }
    try {
        const foundRecord = await Record.findById(req.params.id);
        if (foundRecord.carrierName === foundUser.name) {
            foundRecord.loadSupplier = loadSupplier;
            foundRecord.truckAssigned = truckAssigned;
            foundRecord.commandNr = commandNr;
            foundRecord.commandDate = commandDate;
            foundRecord.creditNoteNr = creditNoteNr;
            foundRecord.creditNoteDate = creditNoteDate;
            foundRecord.loadings = loadings;
            foundRecord.unloadings = unloadings;
            foundRecord.paymentStatus = paymentStatus;
            foundRecord.km = km;
            foundRecord.price = price;
            await foundRecord.save();
        } else {
            res.json({ error: "You can't edit this record" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

router.delete('/records/:id', async (req, res) => {
    const foundUser = req.user;
    try {
        const foundRecord = await Record.findById(req.params.id);
        if (foundRecord.carrierName === foundUser.name) {
            await Record.findByIdAndDelete(req.params.id);
        } else {
            res.json({ error: "You can't delete this record" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

/// GET Revenue

router.get('/revenue', async (req, res) => {
    const foundUser = req.user;
    try {
        res.json({ revenue: foundUser.revenue })
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});
router.put('/revenue', async (req, res) => {
    const foundUser = req.user;
    const { revenue } = req.body;
    try {
        foundUser.revenue = revenue;
        await foundUser.save();
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

module.exports = router;