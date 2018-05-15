/**
 * -------------------
 * GLOBAL VARIABLES
 * -------------------
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require("./config/config");
const port = process.env.PORT || config.port || 3000;
const ApiError = require('./model/ApiError');
const studenthuis_routes = require('./routes/studentenhuis_routes');
const authentication_routes = require('./routes/authentication_routes');
const meal_routes = require('./routes/meal_routes');
const authentication_controller = require('./controllers/authentication_controller');
const participant_routes = require('./routes/participant_routes');

/**
 * -------------------
 * INITIALIZATION AND SETTINGS SERVER
 * ------------------- 
 */
let app = express()

app.use(bodyParser.json());
app.use(morgan('dev'));

/**
 * -------------------
 * ROUTES
 * -------------------
 */

app.use('/api', authentication_routes);

app.all('*', authentication_controller.validateToken);

app.use('/api', studenthuis_routes);
app.use('/api', participant_routes);

app.use('/api', meal_routes);




app.use((err, req, res, next) => {
    
    res.status(err.code || 400).json(err).end();
})




 /**
 * -------------------
 * START SERVER
 * -------------------
 */

app.listen(port, () => {
	console.log('The server is listening on port : ' + port)
})

module.exports = app;