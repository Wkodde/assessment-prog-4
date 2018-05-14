const express = require('express');
const routes = express.Router();
const mealcontroller = require('../controllers/meal_controller');


// hier schrijven we router endpoints

routes.post('/studentenhuis/:huisId/maaltijd', mealcontroller.createMeal);
routes.get('/studentenhuis/:huisId/maaltijd', mealcontroller.readMeal);
routes.get('/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.getMealById);
routes.put('/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.updateMeal);
routes.delete('/studentenhuis/:huisId/maaltijd/:maaltijdId', mealcontroller.deleteMeal);


module.exports = routes;