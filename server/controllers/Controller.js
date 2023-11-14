const JWTHelper = require("../helpers/jwt");
const ErrorHandler = require("../middlewares/errorHandler");
const { User, Recipe, Nutrient } = require("../models/index");
const { OAuth2Client } = require("google-auth-library");

class Controller {
    static async googleLogin(req, res, next) {
        try {
            const { token } = req.headers;
            if (!token) throw new Error(ErrorHandler.Authentication);

            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: { email: payload.email, password: "password-google" },
            });

            const accessToken = JWTHelper.encode({ id: user.id });
            res.status(200).json(accessToken);
        } catch (error) {
            next(error);
        }
    }

    static async getRecipes(req, res, next) {
        try {
            const data = await Recipe.findAll({
                include: Nutrient,
            });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async getRecipesById(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Recipe.findOne({
                include: Nutrient,
                where: { id },
            });

            if (!data) throw new Error(ErrorHandler.DataNotFound);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async addRecipe(req, res, next) {
        try {
            // const { id } = req.loginInfo;
            const id = 1;

            const {
                name,
                instructions,
                imageUrl,
                ingredients,
                calories,
                carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol,
            } = req.body;

            // create new recipe
            const newRecipe = await Recipe.create({
                name,
                instructions,
                imageUrl,
                ingredients,
                userId: id,
            });

            // create new nutrients for that recipe
            await Nutrient.create({
                calories,
                carbs,
                protein,
                fat,
                sugar,
                fiber,
                sodium,
                cholesterol,
                recipeId: newRecipe.id,
            });

            const returnVal = await Recipe.findOne({
                include: Nutrient,
                where: { id: newRecipe.id },
            });

            res.status(201).json(returnVal);
        } catch (error) {
            next(error);
        }
    }

    static async deleteRecipe(req, res, next) {
        try {
            const { id } = req.params;
            const data = await Recipe.findOne({
                include: Nutrient,
                where: { id },
            });

            if (!data) throw new Error(ErrorHandler.DataNotFound);

            // delete nutrient first, then recipe
            await Nutrient.destroy({ where: { recipeId: id } });
            await Recipe.destroy({ where: { id } });

            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async uploadImage(req, res, next) {
        try {
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;
