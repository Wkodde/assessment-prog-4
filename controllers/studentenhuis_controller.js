let Studentenhuis = require('../model/Studentenhuis');
const assert = require('assert');
const ApiError = require('../model/ApiError');
const conn = require('../model/database_connection');

module.exports = {
    createStudenthuis(req, res, next) {

        try {
            const naam = req.body.naam;
            const adres = req.body.adres;

            const ID = req.payload.user.id;
            const contact = req.payload.user.firstname + " " + req.payload.user.lastname;
            const email = req.payload.user.email;

            
            assert(naam, 'Naam is vereist');
            assert(adres, 'adres is vereist');

            let studenthuis = new Studentenhuis(0, naam, adres, contact, email);

            let values = [[studenthuis.naam, studenthuis.adres, ID]];

            conn.query('INSERT INTO studentenhuis (Naam, Adres, UserID) VALUES ?', [values], function (err, result) {
                if (err){
                    next(new ApiError(err.message, 412));
                } else {
                    studenthuis.ID = result.insertId;

                    res.status(200).json(studenthuis).end();                    
                }
            });

        } catch (ex) {
            throw(new ApiError(ex.message, 412))
        }


    },

    readStudentenhuis(req, res, next) {

        conn.query('SELECT * FROM view_studentenhuis', function (err, result) {

            if (err){
                next(new ApiError(err.message, 412));
            } else {
                let studentenhuizen = [];
                for(let i = 0; i < result.length; i++) {
                    let studentenhuis = new Studentenhuis(result[i].ID, result[i].Naam, result[i].Adres, result[i].Contact, result[i].Email);
                    studentenhuizen.push(studentenhuis);
                }
                res.status(200).json(studentenhuizen).end();
            }
        });
    },

    updateStudentenhuis(req, res, next) {
        let studentenhuis;
        const huisId = req.params.id;

        if(typeof huisId !== 'undefined' && huisId) {

            conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [req.params.id], function (err, result) {
                if(result.length > 0) {
                    result = result[0];
                    if (err) {
                        next(new ApiError(err.message, 404));
                    } else {
                        if (result.UserID === req.payload.user.id) {

                            try {

                                const naam = req.body.naam;
                                const adres = req.body.adres;

                                if(typeof naam === 'undefined' || typeof adres === 'undefined') {
                                    next(new ApiError('Een of meer properties in de request body ontbreken of zijn foutief', 412));
                                    return;
                                }
                                assert(naam, 'Naam is vereist');
                                assert(adres, 'adres is vereist');

                                conn.query('UPDATE studentenhuis SET Naam = ?, Adres = ? WHERE ID = ?', [naam, adres, req.params.id], function (err, result2) {

                                    if (err) {
                                        next(new ApiError(err.message, 409));
                                    } else {
                                        conn.query('SELECT * FROM view_studentenhuis WHERE ID = ?', [req.params.id], function (err, result3) {
                                            result3 = result3[0];
                                            if (err) {
                                                next(new ApiError(err.message, 404));
                                            } else {
                                                studentenhuis = new Studentenhuis(result3.ID, result3.Naam, result3.Adres, result3.Contact, result3.Email);
                                                res.status(200).json(studentenhuis).end();
                                            }
                                        });
                                    }
                                });
                            } catch (ex) {
                                throw(new ApiError(ex.message, 412));
                            }

                        } else {
                            next(new ApiError('Conflict (Gebruiker mag deze data niet wijzigen)', 409));
                        }
                    }
                } else {
                    next(new ApiError('Niet gevonden (huisId bestaat niet)', 404));
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
                if(result.length > 0) {
                    result = result[0];
                    if (err) {
                        next(new ApiError(err.message, 404));
                    } else {
                        if (result.UserID === req.payload.user.id) {
                            conn.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ?', huisId, function (err, result) {
                                if (err) {
                                    next(new ApiError(err.message, 404));
                                } else {
                                    if(result.length === 0) {
                                        conn.query('DELETE FROM studentenhuis WHERE ID = ?', huisId, function (err, result) {
                                            if (err) {
                                                next(new ApiError(err.message, 404));
                                            } else {
                                                res.status(200).json(new ApiError('de verwijdering is gelukt', 200)).end();
                                            }
                                        });
                                    } else {
                                        next(new ApiError('Conflict (Studentenhuis bevat maaltijden)', 409));
                                    }
                                }
                            });
                        } else {
                            next(new ApiError('Conflict (Gebruiker mag deze data niet verwijderen)', 409));
                        }
                    }
                } else {
                    next(new ApiError('Niet gevonden (huisId bestaat niet)', 404));
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
            conn.query('SELECT * FROM view_studentenhuis WHERE ID = ?', req.params.id, function (err, result) {

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