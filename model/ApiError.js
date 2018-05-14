class ApiError {


    constructor(message, code){
        this.message = message;
        this.code = code;
    }

    getCode(){
        return this.code;
    }

    getMessage(){
        return this.message;
    }
    
}

module.exports = ApiError;