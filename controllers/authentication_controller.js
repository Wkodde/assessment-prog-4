const User = require('../model/User');
const assert = require('assert');
const auth = require('../model/authentication');
const ApiError = require('../model/ApiError');
const Bcrypt = require('bcrypt');
const conn = require('../model/database_connection');

module.exports = {
    createUser(req, res, next) {

        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let email = req.body.email;
        let password = req.body.password;

        try {
            assert(firstname, 'firstname is vereist');
            assert(lastname, 'lastname is vereist');
            assert(email, 'email is vereist');
            assert(password, 'password is vereist');
        } catch (ex){
            throw new ApiError(ex.message, 412);
        }

        
        let salt = Bcrypt.genSaltSync(10);
        let hash = Bcrypt.hashSync(password, salt);
       
        let user = new User(0, firstname, lastname, email, hash);

        conn.query('SELECT * FROM user WHERE Email = ?', [email], function (err, result) {
            if (err){
                next(new ApiError(err.message, 412));
            } else {

                if(result.length > 0){
                    next(new ApiError('email is al in gebruik', 412));
                    return;
                }

                values = [[user.firstname, user.lastname, user.email, user.password]];

                conn.query('INSERT INTO user (Voornaam, Achternaam, Email, Password) VALUES ?', [values], function (err, result) {
                    if (err){
                        next(new ApiError(err.message, 412));
                    } else {
                        console.log("Success!");
                    }
                });
        
        
                let token = auth.encodeToken({
                    user: user
                });
        
                let json = {
                    token: token,
                    email: user.email
                };
        
                res.status(200).json(json).end();

            }
        });

    },

    readUser(req, res, next) {

        let email = req.body.email;
        let password = req.body.password;

        try {
            assert(email, 'email is vereist');
            const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            assert(regexp.test(email), 'email moet een geldig email adres zijn');
            assert(password, 'password is vereist');
        } catch (ex){
            throw new ApiError(ex.message, 412);
        }

        conn.query('SELECT * FROM user WHERE email = ?', [email], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if(result.length === 0){
                    next(new ApiError("email adres bestaat niet", 412));
                    return;
                }

                result.forEach(item => {

                    user = new User(item.ID, item.Voornaam, item.Achternaam, item.Email, item.Password);

                    if(!Bcrypt.compareSync(password, user.password)){
                        next(new ApiError("password is niet correct", 401));
                        return;
                    }
    
                    let token = auth.encodeToken({
                        user: user
                    });
            
                    let json = {
                        token: token,
                        email: user.email
                    };
            
                    res.status(200).json(json).end();
                });

            }
        });

    },

    validateToken(req, res, next){
        const token = req.header('x-access-token') || '';

        auth.decodeToken(token, (err, payload) => {
            if(err){
                const error = new ApiError(err.message || err, 401);
                next(error);
            } else {
                req.payload = payload;
                next();
            }
        });

    }

}