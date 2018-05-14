const moment = require('moment');

class ApiError {


    constructor(message, code){
        this.message = message;
        this.code = code;
        this.datetime = moment();
    }
    
}

module.exports = ApiError;