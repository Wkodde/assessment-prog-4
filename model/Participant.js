class Participant {

    constructor(userID, studentenhuisID, maaltijdID, voornaam, achternaam, email) {
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