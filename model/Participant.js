const ApiError = require('../model/ApiError');
const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const assert = require('assert');

class Participant {

    constructor(userID, studentenhuisID, maaltijdID, voornaam, achternaam, email) {

        try {
            assert(typeof (userID) === 'number', 'ID moet een nummer zijn');
            assert(typeof (voornaam) === 'string', 'contact moet een string zijn');
            assert(typeof (achternaam) === 'string', 'email moet een string zijn');
            assert(typeof (email) === 'string', 'email moet een string zijn');
            assert(regexp.test(email), 'email moet een geldig email adres zijn');

        } catch (ex) {
            throw (new ApiError(ex.message, 422))
        }

        this.userID = userID;
        this.studentenhuisID = studentenhuisID;
        this.maaltijdID = maaltijdID;
        this.voornaam = voornaam;
        this.achternaam = achternaam;
        this.email = email;
    }

    toJSON() {
        return {
            "voornaam" : this.voornaam,
            "achternaam" : this.achternaam,
            "email" : this.email
        }
    }

}

module.exports = Participant;