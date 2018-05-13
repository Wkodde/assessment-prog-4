/**
 * -------------------
 * GLOBAL VARIABLES
 * -------------------
 */
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require("./config/config");
const port = process.env.PORT || config.port || 3000


/**
 * -------------------
 * INITIALIZATION AND SETTINGS SERVER
 * ------------------- 
 */
let app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

/**
 * -------------------
 * ROUTES
 * -------------------
 */

 //app.use('/api/', auth);







 /**
 * -------------------
 * START SERVER
 * -------------------
 */

app.listen(port, () => {
	console.log('The server is listening on port : ' + port)
})