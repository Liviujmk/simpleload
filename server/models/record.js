/// create company model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create record schema 
const recordSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    loadSupplier: String,
    carrier: {
        carrierName: String,
        truckAssigned: String
    },
    commandNr: {type: String, required: true, unique: true},
    commandDate: { type: Date, default: Date.now },
    creditNoteNr: String,
    creditNoteDate: { type: Date, default: Date.now },
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
const Record = mongoose.model('Record', recordSchema);
module.exports = Record;


