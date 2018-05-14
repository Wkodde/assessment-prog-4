
let express = require('express')
let routes = express.Router()
let participantcontroller = require('../controllers/participant_controller')


// hier schrijven we router endpoints

routes.post('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', participantcontroller.createParticipant())
routes.get('/api/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', participantcontroller.readParticipant())
routes.delete('/api/studentenhuis/:huisId/maaltijd/:maaltijdId/deelnemers', participantcontroller.deleteParticipant())


module.exports = routes