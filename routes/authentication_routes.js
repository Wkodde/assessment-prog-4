
let express = require('express')
let routes = express.Router()
let authenticationcontroller = require('../controllers/authentication_controller')


// hier schrijven we router endpoints

routes.post('/api/login', authenticationcontroller.readUser())
routes.post('/api/register', authenticationcontroller.createUser())



module.exports = routes