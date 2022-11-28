const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require("../models/company");

const handleNewUser = async (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) return res.status(400).json({ 'message': 'name, email and password are required.' });
    const hash = await bcrypt.hash(password, 13)
    const newCompany = {
        name,
        email,
        password: hash,

    }
    const checkCompanyName = await Company.findOne({name})
    if(!checkCompanyName) {
        Company.findOne({
        //ensure company name is unique, i.e the company name is not already in the database
        email
        })
        .then(company =>  {
            //if the companyname is unique 
            if (!company) {
            //if the companyname is unique go ahead and create newCompany after hashing password and salt
                Company.create(newCompany)
                .then(newCompany => {
                    console.log(newCompany);
                    res.json({ statusOk: newCompany.email + 'Registered!' })
                })
            } else {
            //if the companyname is not unique, display that company name is already registered with an account
            res.json({ emailAlready: 'A company with  =' + email + '=  email is already registered with an account' })
            }
        })
        .catch(err => {
            //display error if an error occured
            res.send('error:' + err)
        })
    } else { 
        res.json({ nameAlready: 'A company with  =' + name + '=  name is already registered with an account' })
    }
}

module.exports = { handleNewUser };