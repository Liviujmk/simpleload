/// create company model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create company schema
var companySchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email: String,
    password: String,
    hash: String,
    auth: {
        refreshToken: String,
        accessToken: String,
    },
    salt: {
        type: String,
        default: "salt"
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
        currentTrucksAssigned: [{truckNr: String}],
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
    currentRevenue: {
        type: Number,
        default: 0,
    }
});

//export schema
var Company = mongoose.model('Company', companySchema);
module.exports = Company;


