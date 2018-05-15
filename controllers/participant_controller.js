
const Participant = require('../model/Participant');
const assert = require('assert');
const ApiError = require('../model/ApiError');
const conn = require('../model/database_connection');


module.exports = {
    createParticipant(req, res, next) {
        console.log('participantcontroller.createParticipant');

        let participant = new Participant(req.payload.user.id, req.params.huisId, req.params.maaltijdId, req.payload.user.firstname, req.payload.user.lastname, req.payload.user.email);

        conn.query('SELECT * FROM maaltijd WHERE ID = ? AND StudentenhuisID = ?', [participant.maaltijdID, participant.studentenhuisID], function (err, result) {
            if(result.length > 0) {
                conn.query('SELECT * FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND maaltijdID = ?', [participant.userID, participant.studentenhuisID, participant.maaltijdID], function (err, result) {
                    if(result.length === 0) {

                        let values = [[participant.userID, participant.studentenhuisID, participant.maaltijdID]];

                        conn.query('INSERT INTO deelnemers (UserID, StudentenhuisID, MaaltijdID) VALUES ?', [values], function (err, result) {
                            if (err) {
                                next(new ApiError(err.message, 412));
                            } else {
                                res.status(200).json(participant.toJSON()).end();
                            }
                        });
                    } else {
                        next(new ApiError('Conflict (Gebruiker is al aangemeld)', 409));
                    }
                });
            } else {
                next(new ApiError('Niet gevonden (huisId of maaltijdId bestaat niet)', 404));
            }
        });



    },

    readParticipant(req, res, next) {

        let participant = new Participant(req.payload.user.id, req.params.huisId, req.params.maaltijdId, req.payload.user.firstname, req.payload.user.lastname, req.payload.user.email);

        conn.query('SELECT * FROM view_deelnemers WHERE StudentenhuisID = ? AND MaaltijdID = ?',[participant.studentenhuisID, participant.maaltijdID], function (err, result) {
            if(result.length > 0) {
                if (err) {
                    next(new ApiError(err.message, 412));
                } else {
                    let participants = [];
                    for (let i = 0; i < result.length; i++) {
                        participant = new Participant(0, result[i].StudentenhuisID, result[i].MaaltijdID, result[i].Voornaam, result[i].Achternaam, result[i].Email);
                        participants.push(participant.toJSON());
                    }
                    res.status(200).json(participants).end();
                }
            } else {
                next(new ApiError('Niet gevonden (huisId of maaltijdId bestaat niet)', 404));
            }
        });

    },

    deleteParticipant(req, res, next) {
        let participant = new Participant(req.payload.user.id, req.params.huisId, req.params.maaltijdId, req.payload.user.firstname, req.payload.user.lastname, req.payload.user.email);

        conn.query('SELECT * FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND MaaltijdID = ?', [participant.userID, participant.studentenhuisID, participant.maaltijdID], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {
                if(result.length === 0) {
                    next(new ApiError('Niet gevonden (huisId of maaltijdId bestaat niet)', 404));
                } else {
                    conn.query('DELETE FROM deelnemers WHERE UserID = ? AND StudentenhuisID = ? AND MaaltijdID = ?', [participant.userID, participant.studentenhuisID, participant.maaltijdID], function (err, result) {
                        if (err) {
                            next(new ApiError(err.message, 404));
                        } else {
                            res.status(200).json(new ApiError('de verwijdering is gelukt', 200)).end();
                        }
                    });
                }
            }
        });
    }
    
}