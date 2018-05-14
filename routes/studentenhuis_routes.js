
let express = require('express')
let routes = express.Router()
let studentenhuiscontroller = require('../controllers/studentenhuis_controller')


// hier schrijven we router endpoints

routes.post('/api/studentenhuis', studentenhuiscontroller.createStudenthuis())
routes.get('/api/studentenhuis', studentenhuiscontroller.readStudentenhuis())
routes.get('/api/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById())
routes.put('/api/studentenhuis/:id', studentenhuiscontroller.updateStudentenhuis())
routes.delete('/api/studentenhuis/:id', studentenhuiscontroller.deleteStudentenhuis())


module.exports = routes