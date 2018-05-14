
const ApiError = require('../model/ApiError');
const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const assert = require('assert');

class Studentenhuis {

    constructor(ID, naam, adres, contact, email) {

        try {
             assert(typeof (ID) === 'number', 'ID moet een nummer zijn');
            assert(typeof (naam) === 'string', 'naam moet een string zijn');
            assert(typeof (adres) === 'string', 'adres moet een string zijn');
            assert(typeof (contact) === 'string', 'contact moet een string zijn');
            assert(typeof (email) === 'string', 'email moet een string zijn');
            assert(regexp.test(email), 'email moet een geldig email adres zijn');

        } catch (ex) {
            throw(new ApiError(ex.message, 422))
        }

        this.ID = ID;
        this.naam = naam;
        this.adres = adres;
        this.contact = contact;
        this.email = email;
    }
    setID(ID) {
        this.ID = ID;
    }

    getID() {
        return this.ID;
    }
    
    

    setName(naam) {
        this.naam = naam;
    }
    setAdres(adres) {
        this.adres = adres;
    }
    setContact(contact) {
        this.contact = contact;
    }
    setEmail(email) {
        this.email = email;
    }
}

module.exports = Studentenhuis;