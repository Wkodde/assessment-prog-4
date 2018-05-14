
class Studentenhuis {

    constructor(ID, name, address, contact, email) {
        this.ID = ID;
        this.name = name;
        this.address = address;
        this.contact = contact;
        this.email = email;
    }

    getID() {
        return this.ID;
    }
}

module.exports = Studentenhuis;