const Meal = require('../model/Meal');
const assert = require('assert');
const conn = require('../model/database_connection');
const ApiError = require('../model/ApiError');
const moment = require('moment');

module.exports = {
    createMeal(req, res, next) {

        let houseId = req.params.huisId;
        let name = req.body.name;
        let description = req.body.description;
        let ingredients = req.body.ingredients;
        let allergie = req.body.allergie;
        let price = req.body.price;

        try {
            assert(houseId, 'huisId is vereist');
            assert(name, 'name is vereist');
            assert(description, 'description is vereist');
            assert(ingredients, 'ingredients is vereist');
            assert(allergie, 'allergie is vereist');
            assert(price, 'price is vereist');
            assert(typeof (price) === 'number', 'price moet een nummer zijn');
        } catch (ex) {
            throw new ApiError(ex.message, 412);
        }

        let meal = new Meal(0, name, description, ingredients, allergie, price);

        conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [houseId], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if (result.length === 0) {
                    next(new ApiError("huisId bestaat niet", 404));
                    return;
                }
                result.forEach(item => {

                    let values = [[meal.name, meal.description, meal.ingredients, meal.allergie, meal.price, req.payload.user.id, item.ID]];

                    conn.query('INSERT INTO maaltijd (Naam, Beschrijving, Ingredienten, Allergie, Prijs, UserID, StudentenhuisID) VALUES ?', [values], function (err, result) {
                        if (err) {
                            next(new ApiError(err.message, 412));
                        } else {
                            meal.ID = result.insertId;
                            res.status(200).json(meal).end();
                        }
                    });

                });

            }
        });

    },

    readMeal(req, res, next) {

        let houseId = req.params.huisId;

        try {
            assert(houseId, 'huisId is vereist');
        } catch (ex) {
            throw new ApiError(ex.message, 412);
        }

        conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [houseId], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if (result.length === 0) {
                    next(new ApiError("Studentenhuis bestaat niet", 404));
                    return;
                }

                conn.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ?', [houseId], function (err, result) {
                    if (err) {
                        next(new ApiError(err.message, 412));
                        return;
                    } else {

                        let mealList = [];

                        result.forEach(item => {

                            let meal = new Meal(item.ID, item.Naam, item.Beschrijving, item.Ingredienten, item.Allergie, item.Prijs);

                            mealList.push(meal);

                        });

                        res.status(200).json(mealList).end();

                    }
                });

            }
        });


    },

    updateMeal(req, res, next) {

        let houseId = req.params.huisId;
        let mealId = req.params.maaltijdId;

        let name = req.body.name;
        let description = req.body.description;
        let ingredients = req.body.ingredients;
        let allergie = req.body.allergie;
        let price = req.body.price;

        try {
            assert(houseId, 'huisId is vereist');
            assert(mealId, 'maaltijdId is vereist');
            assert(name, 'name is vereist');
            assert(description, 'description is vereist');
            assert(ingredients, 'ingredients is vereist');
            assert(allergie, 'allergie is vereist');
            assert(price, 'price is vereist');
            assert(typeof (price) === 'number', 'price moet een nummer zijn');

        } catch (ex) {
            throw new ApiError(ex.message, 412);
        }

        conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [houseId], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if (result.length === 0) {
                    next(new ApiError("Studentenhuis bestaat niet", 404));
                    return;
                }

                conn.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?', [houseId, mealId], function (err, result) {
                    if (err) {
                        next(new ApiError(err.message, 412));
                        return;
                    } else {

                        if (result.length === 0) {
                            next(new ApiError("Maaltijd bestaat niet", 404));
                            return;
                        }

                        if (result[0].UserID !== req.payload.user.id) {
                            next(new ApiError("Je hebt geen rechten om deze data te wijzigen", 409));
                            return;
                        }

                        conn.query('UPDATE maaltijd SET Naam = ?, Beschrijving = ?, Ingredienten = ?, Allergie = ?, Prijs = ? WHERE StudentenhuisID = ? AND ID = ?', [name, description, ingredients, allergie, price, houseId, mealId], function (err, result) {
                            if (err) {
                                next(new ApiError(err.message, 412));
                                return;
                            } else {

                                let meal = new Meal(mealId, name, description, ingredients, allergie, price);

                                res.status(200).json(meal).end();

                            }
                        });

                    }
                });

            }
        });

    },

    deleteMeal(req, res, next) {

        let houseId = req.params.huisId;
        let mealId = req.params.maaltijdId;

        try {
            assert(houseId, 'huisId is vereist');
            assert(mealId, 'maaltijdId is vereist');
        } catch (ex) {
            throw new ApiError(ex.message, 412);
        }

        conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [houseId], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if (result.length === 0) {
                    next(new ApiError("Studentenhuis bestaat niet", 404));
                    return;
                }

                conn.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?', [houseId, mealId], function (err, result) {
                    if (err) {
                        next(new ApiError(err.message, 412));
                        return;
                    } else {

                        if (result.length === 0) {
                            next(new ApiError("Maaltijd bestaat niet", 404));
                            return;
                        }

                        if (result[0].UserID !== req.payload.user.id) {
                            next(new ApiError("Je hebt geen rechten om deze data te wijzigen", 409));
                            return;
                        }

                        conn.query('DELETE FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?', [houseId, mealId], function (err, result) {
                            if (err) {
                                next(new ApiError(err.message, 412));
                                return;
                            } else {

                                let json = {
                                    message: "De verwijdering is gelukt",
                                    code: 200,
                                    datetime: moment()
                                };

                                res.status(200).json(json).end();

                            }
                        });

                    }
                });

            }
        });

    },

    getMealById(req, res, next) {

        let houseId = req.params.huisId;
        let mealId = req.params.maaltijdId;

        try {
            assert(houseId, 'huisId is vereist');
            assert(mealId, 'maaltijdId is vereist');
        } catch (ex) {
            throw new ApiError(ex.message, 412);
        }

        conn.query('SELECT * FROM studentenhuis WHERE ID = ?', [houseId], function (err, result) {
            if (err) {
                next(new ApiError(err.message, 412));
            } else {

                if (result.length === 0) {
                    next(new ApiError("Studentenhuis bestaat niet", 404));
                    return;
                }

                conn.query('SELECT * FROM maaltijd WHERE StudentenhuisID = ? AND ID = ?', [houseId, mealId], function (err, result) {
                    if (err) {
                        next(new ApiError(err.message, 412));
                        return;
                    } else {

                        if (result.length === 0) {
                            next(new ApiError("Maatlijd bestaat niet", 404));
                            return;
                        }

                        let mealList = [];

                        result.forEach(item => {

                            let meal = new Meal(item.ID, item.Naam, item.Beschrijving, item.Ingredienten, item.Allergie, item.Prijs);

                            mealList.push(meal);

                        });

                        res.status(200).json(mealList).end();

                    }
                });
            }
        });

    }
}