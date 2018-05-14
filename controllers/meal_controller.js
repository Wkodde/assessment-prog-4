
let Meal = require('../model/Meal')
const assert = require('assert')

let mealList = [];

module.exports = {
    createMeal(req, res, next) {
        console.log('studentenhuiscontroller.createStudentenhuis');

    },

    readMeal(req, res, next) {
        res.status(200).json(mealList).end();
    },

    updateMeal(req, res, next) {

    },

    deleteMeal(req, res, next) {

    },

    getMealById(req, res, next) {

    }
}