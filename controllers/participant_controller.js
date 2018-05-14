
let Participant = require('../model/Participant')
const assert = require('assert')

let participantList = [];

module.exports = {
    createParticipant(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis');

    },

    readParticipant(req, res, next) {
        res.status(200).json(participantList).end();
    },

    deleteParticipant(req, res, next) {

    }
    
}