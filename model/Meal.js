class Meal {

    constructor(ID, name, description, ingredients, allergie, price ) {
        this.ID = ID;
        this.name = name;
        this.description = description;
        this.ingredients = ingredients;
        this.allergie = allergie;
        this.price = price;
    }

}

module.exports = Meal;