const assert = require('assert');
const ApiError = require('./ApiError');

class User {

    constructor(id, firstname, lastname, email, password) {

        try {
            assert(typeof (id) === 'number', 'id moet een nummer zijn');
            assert(typeof (firstname) === 'string', 'firstname moet een string zijn');
            assert(typeof (lastname) === 'string', 'lastname moet een string zijn');
            assert(firstname.trim().length > 1, 'firstname moet minimaal 2 karakters lang zijn');
            assert(lastname.trim().length > 1, 'lastname moet minimaal 2 karakters lang zijn');
            const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            assert(typeof (email) === 'string', 'email moet een string zijn');
            assert(regexp.test(email), 'email moet een geldig email adres zijn');
            assert(typeof (email) === 'string', 'firstname moet een string zijn');
        }
        catch (ex) {
            throw(new ApiError(ex.message, 412));
        }

        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

module.exports = User;