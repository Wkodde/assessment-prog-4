
let Studentenhuis = require('../model/Studentenhuis')
const assert = require('assert')

let studentenhuisList = [];

module.exports = {
    createStudenthuis(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis');

    },

    readStudentenhuis(req, res, next) {
        res.status(200).json(studentenhuisList).end();
    },

    updateStudentenhuis(req, res, next) {

    },

    deleteStudentenhuis(req, res, next) {

    },

    getStudentenhuisById(req, res, next) {

    }
}