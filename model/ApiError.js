class ApiError {


    constructor(code, message){
        this.code = code;
        this.message = message;
    }

    getCode(){
        return this.code;
    }

    getMessage(){
        return this.message;
    }
    
}

module.exports = ApiError;