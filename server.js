/**
 * -------------------
 * GLOBAL VARIABLES
 * -------------------
 */
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require("./config/config")
const port = process.env.PORT || config.port || 3000
const ApiError = require('./model/ApiError')
const studenthuis_routes = require('./routes/studentenhuis_routes')


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

 //app.use('/api/', auth);

app.use('*', function(req, res, next){
    next()
})


app.use('/api', studenthuis_routes)



app.use((err, req, res, next) => {
    console.log('Catch-all error handler was called.')
    console.log(err.toString())

    const error = new ApiError(err.toString(), 404)

    res.status(404).json(error).end()
})




 /**
 * -------------------
 * START SERVER
 * -------------------
 */

app.listen(port, () => {
	console.log('The server is listening on port : ' + port)
})