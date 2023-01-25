// routes
const express = require('express');
const router = express.Router();

const Company = require('../models/company');
const Order = require('../models/order');

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
    if(foundUser.loadSuppliers.find(supplier => supplier.name === req.params.name)) {   
        res.json({ loadSupplier: foundUser.loadSuppliers.find(supplier => supplier.name === req.params.name) })
    } else {
        res.json({ message: "No supplier with that name" })
    }
});

router.post('/suppliers', async (req, res) => {
    const foundUser = req.user;
    const { name, country, city, street, number, zip, currentTrucksAssigned } = req.body;
    const supplierData = {
        name,
        address: {
            country,
            city,
            street,
            number,
            zip,
        },
        currentTrucksAssigned
    }
    try {
        foundUser.loadSuppliers.push(supplierData);
        foundUser.trucks.forEach(truck => {
            currentTrucksAssigned.forEach(truckAssigned => {
                if (truck.number === truckAssigned.truckNr) {
                    truck.currentLoadSupplier = name;
                }
            })
        })

        await foundUser.save();
        res.json({ message: "Supplier created" });
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
        foundUser.trucks.forEach(truck => {
            currentTrucksAssigned.forEach(truckAssigned => {
                if (truck.number === truckAssigned.truckNr) {
                    truck.currentLoadSupplier = name;
                }
                else if (truck.currentLoadSupplier === req.params.name) {
                    truck.currentLoadSupplier = "";
                }
            })
        })
        await foundUser.save();
        res.json({ message: "Supplier updated" });
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
        foundUser.trucks.forEach(truck => {
            if (truck.currentLoadSupplier == req.params.name) {
                truck.currentLoadSupplier = "";
            }
        })

        await foundUser.save();
        res.json({ message: "Supplier deleted" });
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
        foundUser.drivers.forEach(driver => {
            if (driver.name === currentDriver) {
                driver.currentTruck = number;
            }
        })
        foundUser.loadSuppliers.forEach(supplier => {
            if (supplier.name === currentLoadSupplier) {
                supplier.currentTrucksAssigned.push({ truckNr: number })
            }
        })
        await foundUser.save();
        res.json({ message: "Truck created" });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Could not create truck' })
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
        foundUser.drivers.forEach(driver => {
            if (driver.name === currentDriver) {
                driver.currentTruck = number;
            }
        })
        foundUser.loadSuppliers.forEach(supplier => {
            if (supplier.name === currentLoadSupplier) {
                supplier.currentTrucksAssigned.push({ truckNr: number })
            }
        })
        await foundUser.save();
        res.json({ message: "Truck updated" });
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

router.delete('/trucks/:number', async (req, res) => {
    const foundUser = req.user;
    try {
        foundUser.trucks.forEach(truck => {
            if (truck.number === req.params.number) {
                truck.remove();
            }
        })
        foundUser.drivers.forEach(driver => {
            if (driver.currentTruck === req.params.number) {
                driver.currentTruck = '';
            }
        })
        foundUser.loadSuppliers.forEach(supplier => {
            if (supplier.currentTrucksAssigned.includes(req.params.number)) {
                supplier.currentTrucksAssigned = supplier.currentTrucksAssigned.filter(truck => truck !== req.params.number);
            }
        })

        await foundUser.save();
        res.json({ message: "Truck deleted" });
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
        foundUser.trucks.forEach(truck => {
            if (truck.number === currentTruck) {
                truck.currentDriver = name
            }
        })
        await foundUser.save();
        res.json({ message: "Driver created" });
    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});
router.put('/drivers/:name', async (req, res) => {
    const foundUser = req.user;
    const { currentTruck } = req.body;
    console.log('currentTruck', currentTruck)
    try {
        
        foundUser.drivers.forEach(driver => {
            if (driver.name === req.params.name) {
                foundUser.trucks.forEach(truck => {
                    if (truck.currentDriver === req.params.name) {
                        truck.currentDriver = ''
                    }
                })
                driver.currentTruck = currentTruck
            }
        })
        foundUser.trucks.forEach(truck => {
            if (truck.number === currentTruck) {
                truck.currentDriver = req.params.name
            }
        })
        
        await foundUser.save();
        res.json({ message: "Driver updated" });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Could not update driver' })
    }
});

router.delete('/drivers/:name', async (req, res) => {
    const foundUser = req.user;
    try {
        foundUser.drivers.forEach(driver => {
            if (driver.name === req.params.name) {
                driver.remove();
            }
        })
        foundUser.trucks.forEach(truck => {
            if (truck.currentDriver === req.params.name) {
                truck.currentDriver = ''
            }
        })
        await foundUser.save();
        res.json({ message: "Driver deleted" });
    } catch (error) {
        console.log(error);
        res.json({ error: "Could not delete driver" })
    }
});

/// GET ALL orderS
router.get('/orders', async (req, res) => {
    const foundUser = req.user;
    const orders = await Order.find({ 'carrier.carrierName': foundUser.name });
    res.json({ orders: orders })
});

router.get('/orders/:id', async (req, res) => {
    const foundUser = req.user;
    const userOrders = await Order.find({ 'carrier.carrierName': foundUser.name });
    const foundOrder = userOrders.find(order => order.nr == req.params.id);
    res.json({ order: foundOrder })
});

router.post('/orders', async (req, res) => {
    const foundUser = req.user;
    const { loadSupplier, truckAssigned, nr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price, } = req.body;

    const neworder = {
        loadSupplier, carrier: { carrierName: foundUser.name, truckAssigned }, truckAssigned, nr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price
    }

    try {
        const order = await Order.create(neworder);
        await order.save();
        foundUser.orders.push(order._id);
        await Company.findOneAndUpdate({ name: foundUser.name }, { $inc: { currentRevenue: price } });
        await foundUser.save();
        console.log('price', price)
        console.log('foundUser.currentRevenue', foundUser.currentRevenue)
        res.json({ message: "order created" });
    }
    catch (error) {
        console.log(error);
        res.json({ error: 'Could not create order' })
    }
});
router.put('/orders/:id', async (req, res) => {
    const foundUser = req.user;
    const { loadSupplier, truckAssigned, nr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price, } = req.body;
    const neworder = {
        loadSupplier, truckAssigned, nr, commandDate, creditNoteNr, creditNoteDate, loadings, unloadings, paymentStatus, km, price
    }
    try {
        const foundOrder = await Order.findOne({ nr: req.params.id });
        if (foundOrder.carrier.carrierName === foundUser.name) {
            foundOrder.loadSupplier = loadSupplier;
            foundOrder.truckAssigned = truckAssigned;
            foundOrder.nr = nr;
            foundOrder.commandDate = commandDate;
            foundOrder.creditNoteNr = creditNoteNr;
            foundOrder.creditNoteDate = creditNoteDate;
            foundOrder.loadings = loadings;
            foundOrder.unloadings = unloadings;
            foundOrder.paymentStatus = paymentStatus;
            foundOrder.km = km;
            foundOrder.price = price;
            await foundOrder.save();
            await Company.findOneAndUpdate({ name: foundUser.name }, { $inc: { currentRevenue: price } });
            res.json({ message: "order updated" });
        } else {
            res.json({ error: "You can't edit this order" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: 'Could not edit this order' })
    }
});

router.delete('/orders/:id', async (req, res) => {
    const foundUser = req.user;
    const foundOrder = await Order.findOne({ nr: req.params.id });
    console.log('foundOrder', foundOrder)
    try {
        foundUser.orders.forEach(order => {
            if (order == foundOrder.id) {
                order.remove();
            }
        })
        await foundUser.save();
        await Order.findByIdAndDelete(foundOrder.id);

        res.json({ message: "order deleted" });
    }
    catch (error) {
        console.log(error);
        res.json({ error: 'Could not delete order' })
    }
});

/// GET Revenue

router.get('/revenue', async (req, res) => {
    const foundUser = req.user;
    try {
        res.json({ revenue: foundUser.currentRevenue })
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
        foundUser.currentRevenue = revenue;
        await foundUser.save();
        res.json({ message: "Revenue updated" });
    }
    catch (error) {
        console.log(error);
        res.json({ error: error })
    }
});

module.exports = router;