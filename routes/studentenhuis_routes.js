const express = require('express');
const routes = express.Router();
const studentenhuiscontroller = require('../controllers/studentenhuis_controller');


// hier schrijven we router endpoints

routes.post('/studentenhuis', studentenhuiscontroller.createStudenthuis);
routes.get('/studentenhuis', studentenhuiscontroller.readStudentenhuis);
routes.get('/studentenhuis/:id', studentenhuiscontroller.getStudentenhuisById);
routes.put('/studentenhuis/:id', studentenhuiscontroller.updateStudentenhuis);
routes.delete('/studentenhuis/:id', studentenhuiscontroller.deleteStudentenhuis);


module.exports = routes;