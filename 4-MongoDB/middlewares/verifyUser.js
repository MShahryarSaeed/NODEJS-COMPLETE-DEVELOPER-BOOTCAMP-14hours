// verifyUser.js
const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../common/errors/NotAuthorizedError');

const verifyUser = (req, res, next) => {

    try {

        const accessToken = req.cookies.accessToken;

        if (!accessToken) {
            throw new NotAuthorizedError();
        }

        jwt.verify(accessToken, process.env.SECRET, (error, user) => {
            if (error) {
                throw new NotAuthorizedError();
            }
            req.user = user;
            next();
        });
        
    } catch (error) {
        next(error);
    }
};

module.exports = verifyUser;
