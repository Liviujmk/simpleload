const Company = require('../models/company');
const jwt = require('jsonwebtoken');

module.exports = checkAuthenticated = async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await Company.findOne ({ refreshToken });
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
    
    if(IfDecoded)
        return next();
    else res.json({'error': 'you are not authenticated'});
}