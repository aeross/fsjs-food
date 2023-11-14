const { Recipe, FoodRecipes, Food } = require("../models/index");

class Controller {
    static async login(req, res, next) {}

    static async register(req, res, next) {}

    static async getRecipes(req, res, next) {
        await Recipe.findAll({
            includes: {
                model: FoodRecipes,
                includes: Food,
            },
        });
    }
}

module.exports = Controller;
