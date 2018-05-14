
let Studentenhuis = require('../model/Studentenhuis');
const assert = require('assert');
const moment = require('moment');
const ApiError = require('../model/ApiError');
const connection = require('../model/database_connection');

let studentenhuisList = [];

module.exports = {
    createStudenthuis(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis');

        try {
            const naam = req.body.naam;
            const adres = req.body.adres;

            const ID = req.user.id;
            const contact = req.user.firstname + " " + req.user.lastname;
            const email = req.user.email;

            
            assert(naam, 'Naam is vereist');
            assert(adres, 'adres is vereist');

            let studenthuis = new Studentenhuis(0, naam, adres, contact, email);

            let values = [[studenthuis.naam, studenthuis.adres, ID]];

            conn.query('INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES ?', [values], function (err, result) {
                if (err){
                    next(new ApiError(err.message, 412));
                } else {
                    studenthuis.setID(result.insertId);
                    console.log("Success!");
                }
            });

            res.status(200).json(studenthuis).end();
        } catch (ex) {
            throw(new ApiError(ex.message, 412))
        }


    },

    readStudentenhuis(req, res, next) {

        connection.query('SELECT * FROM view_studentenhuis', function (err, result) {

            if (err){
                next(new ApiError(err.message, 412));
            } else {
                result.forEach(item => {
                    console.log(item);
                    let studentenhuis = new Studentenhuis(item.ID, item.Naam, item.Adres, item.Contact, item.Email);
                    res.status(200).json(studentenhuis);
                });
            }
        });
    },

    updateStudentenhuis(req, res, next) {
        let studentenhuis;
        const huisId = req.params.id;

        if(typeof huisId !== 'undefined' && huisId) {

            conn.query('SELECT * FROM studentenhuis WHERE ID = ?', req.params.id, function (err, result) {
                if (err) {
                    next(new ApiError(err.message, 404));
                } else {
                    if (result.UserID === req.user.id) {

                        const naam = req.body.naam;
                        const adres = req.body.adres;

                        conn.query('UPDATE studentenhuis SET Naam = ?, Adres = ? WHERE ID = ?', [naam, adres, req.params.id], function (err, result) {
                            if (err) {
                                next(new ApiError(err.message, 409));
                            } else {
                                conn.query('SELECT * FROM view_studentenhuis WHERE ID = ?', req.params.id, function (err, result) {
                                    if (err) {
                                        next(new ApiError(err.message, 404));
                                    } else {
                                        studentenhuis = new Studentenhuis(result.ID, result.Naam, result.Adres, result.Contact, result.Email);
                                        res.status(200).json(studentenhuis).end();
                                    }
                                });
                            }
                        });
                    } else {
                        next(new ApiError('Conflict (Gebruiker mag deze data niet wijzigen)', 409));
                    }
                }
            });
        } else {
            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412));
        }
    },

    deleteStudentenhuis(req, res, next) {
        const huisId = req.params.id;

        if(typeof huisId !== 'undefined' && huisId) {

            conn.query('SELECT * FROM studentenhuis WHERE ID = ?', huisId, function (err, result) {
                if (err) {
                    next(new ApiError(err.message, 404));
                } else {
                    if (result.UserID === req.user.id) {
                        conn.query('DELETE FROM studentenhuis WHERE ID = ?', huisId, function (err, result) {
                            if(err) {
                                next(new ApiError(err.message, 404));
                            } else {
                                res.status(200).json(new ApiError('de verwijdering is geluk', 200)).end();
                            }
                        });
                    } else {
                        next(new ApiError('Conflict (Gebruiker mag deze data niet verwijderen)', 409));
                    }
                }
            });
        } else {
            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412));
        }
    },

    getStudentenhuisById(req, res, next) {
        let studentenhuis;

        const huisId = req.params.id;
        if(typeof huisId !== 'undefined' && huisId ) {
            connection.query('SELECT * FROM view_studentenhuis WHERE ID = ?', req.params.id, function (err, result) {

                if (err) {
                    next(new ApiError(err.message, 412));
                } else {
                    if(result.length === 0) {
                        next(new ApiError('Niet gevonden (huisId bestaat niet)', 404))
                    } else {
                        result.forEach(item => {
                            studentenhuis = new Studentenhuis(item.ID, item.Naam, item.Adres, item.Contact, item.Email);
                        });
                    }
                }
                res.status(200).json(studentenhuis).end();
            });
        } else {
            next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412));
        }
    }
}