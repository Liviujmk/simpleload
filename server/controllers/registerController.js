const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require("../models/company");

const handleNewUser = async (req, res) => {
    const {name, email, password} = req.body;
    //const saltHash = genPassword(req.body.password);
    const hash = await bcrypt.hash(password, 12)
    const companyData = {
        name,
        email,
        password: hash,

    }
    Company.findOne({
    //ensure companyname is unique, i.e the companyname is not already in the database
    email
    })
    .then(company => {
        //if the companyname is unique 
        if (!company) {
        //if the companyname is unique go ahead and create companyData after hashing password and salt
            Company.create(companyData)
        } else {
        //if the companyname is not unique, display that companyname is already registered with an account
        res.json({ error: 'The companyname ' + req.body.name + ' is registered with an account' })
        }
    })
    .catch(err => {
        //display error if an error occured
        res.send('error:' + err)
    })
}

module.exports = { handleNewUser };