/// create company model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create record schema 
const orderSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    loadSupplier: String,
    carrier: {
        carrierName: String,
        truckAssigned: String
    },
    nr: {type: String, required: true, unique: true},
    commandDate: { type: String, default: Date.now },
    creditNoteNr: String,
    creditNoteDate: { type: String, default: Date.now },
    loadings: [{
        loadCompany: String,
        loadAddress: String
    }],
    unloadings: [{
        unloadCompany: String,
        unloadAddress: String
    }],
    paymentStatus: {
        type: String,
        default: "Not paid"
    },
    km: Number,
    price: Number
});

//export schema
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;


