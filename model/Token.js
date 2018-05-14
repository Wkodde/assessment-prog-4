

class Token {
    
    constructor(token, email) {
        this.token = token;
        this.email = email;
    }
    
    isValid() {
        return true;
    }
}

module.exports = Token;