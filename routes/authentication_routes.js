const express = require('express');
const routes = express.Router();
const authenticationcontroller = require('../controllers/authentication_controller');


// hier schrijven we router endpoints

routes.post('/login', authenticationcontroller.readUser);
routes.post('/register', authenticationcontroller.createUser);
routes.all('*', authenticationcontroller.validateToken);



module.exports = routes;