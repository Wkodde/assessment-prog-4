const express = require('express');
const routes = express.Router();
const mealcontroller = require('../controllers/meal_controller');


// hier schrijven we router endpoints

routes.post('/api/studentenhuis/:huisId/maaltijd', mealcontroller.createMeal);
routes.get('/api/studentenhuis/:huisId/maaltijd', mealcontroller.readMeal);
routes.get('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.getMealById);
routes.put('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.updateMeal);
routes.delete('/api/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.deleteMeal);


module.exports = routes;