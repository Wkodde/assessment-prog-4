const express = require('express');
const routes = express.Router();
const participantcontroller = require('../controllers/participant_controller');


// hier schrijven we router endpoints

routes.post('/studentenhuis/:huisId/maaltijd/:maaltijdId', participantcontroller.createParticipant);
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', participantcontroller.readParticipant);
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', participantcontroller.deleteParticipant);


module.exports = routes;