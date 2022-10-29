/// create company model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create company schema
var companySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    appAuth: {
        email: String,
        hash: String,
        salt: String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        country:  String,
        city:  String,
        street:  String,
        number:  Number,
        zip:  String
    },
    loadSuppliers: [{
        name: String,
        address: {
            country:  String,
            city:  String,
            street:  String,
            number:  Number,
            zip:  String
        },
        contact: {
            name: String,
            phone: String,
            email: String
        },
        currentTrucks: [{truckNr: String}],
    }],
    trucks: [{
        number:  Number,
        brand:  String,
        model:  String,
        year:  Number,
        currentDriver:  String,
        currentLoadSupplier:  String
    }],
    drivers: [{ 
        name: String,
        currentTruck:  String,
    }],
    records: [{
        type: Schema.Types.ObjectId,
        ref: 'Record',
    }],
    currentRevenue: Number
});

//export schema
var Company = mongoose.model('Company', companySchema);
module.exports = Company;


