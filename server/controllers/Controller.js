const { Recipe, FoodRecipes, Food } = require("../models/index");

class Controller {
    static async login(req, res, next) {}

    static async register(req, res, next) {}

    static async getRecipes(req, res, next) {
        try {
            const data = await Recipe.findAll({
                include: {
                    model: FoodRecipes,
                    include: Food,
                },
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async addRecipe(req, res, next) {
        try {
            const { id } = req.loginInfo;
            const { name, instructions, imageUrl, foods } = req.body;
            // foods is an array of objects, with keys { name": "cooked rice", "calories",
            // "protein", "carbohydrate", "fat", "fiber", "sugar", "sodium", "cholesterol", "grams" }
            const newRecipe = await Recipe.create({ name, instructions, imageUrl, id });
            await FoodRecipes.create({});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
