// mongoose database export
var mongoose = require('mongoose');
//dotenv
require('dotenv').config();

module.exports = () => new Promise(async (resolve, reject) => {
    try {
        // Connect to MONGODB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('SUCCESFULLY Connected to MongoDB');
        resolve(true);
    } catch (error) {
        console.log('ERROR When connecting to MongoDB: ', error);
        reject(error);
    }
});
