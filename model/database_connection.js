let mysql = require('mysql');
let config = require('../config/config');

let connection = mysql.createConnection({
    host: process.env.DB_HOST || config.DB_HOST,
    user: process.env.DB_USER || config.DB_USER,
    password: process.env.DB_PASSWORD || config.DB_PASSWORD,
    database: process.env.DB_DATABASE || config.DB_DATABASE
});

connection.connect(function(error){
    if(error){
        console.log("Can't connect!");
        return;
    } else {
        console.log("Connected!");
    }
});

module.exports = connection;