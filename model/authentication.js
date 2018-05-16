const config = require('../config/config');
const moment = require('moment');
const jwt = require('jwt-simple');

function encodeToken(data) {
    const playload = {
        exp: moment().add(10, 'days').unix(),
        iat: moment().unix(),
        sub: data  
    };
    return jwt.encode(playload, config.secretkey);
}

function decodeToken(token, callback) {

    try {
        const payload = jwt.decode(token, config.secretkey);

        const now = moment().unix();
        if (now > payload.exp) {
            callback('Token has expired!', null);
        } else {
            callback(null, payload.sub);
        }
    } catch (err) {
        callback(err, null);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};