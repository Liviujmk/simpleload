const Company = require('../models/company');
const jwt = require('jsonwebtoken');

module.exports = checkAuthenticated = async (req, res, next) => {
    const cookies = await req.cookies;
    if ( /*!cookies.accessToken ||*/ !cookies?.jwt ) return res.json({ 'message': cookies });
    const refreshToken = cookies.accessToken ?? cookies.jwt;
    const foundUser = await Company.findOne ({ auth: {refreshToken} });
    if (!foundUser) return res.sendStatus(403); //Forbidden
    // evaluate jwt 
    let IfDecoded = false;
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
            IfDecoded = true;
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
    if(IfDecoded){
        req.user = foundUser;
        return next();
    }
    else return res.json({'error': 'You are not authenticated'});
}