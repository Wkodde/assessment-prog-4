const User = require('../model/User');
const assert = require('assert');
const auth = require('../model/authentication');
const ApiError = require('../model/ApiError');



module.exports = {
    createUser(req, res, next) {
        console.log('authenticationcontroller.createUser');

    },

    readUser(req, res, next) {

    },

    validateToken(req, res, next){
        console.log('ValidateToken called');
        const token = req.header('x-access-token') || '';

        auth.decodeToken(token, (err, payload) => {
            if(err){
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                req.user = payload.sub;
                next();
            }
        });

    }

}