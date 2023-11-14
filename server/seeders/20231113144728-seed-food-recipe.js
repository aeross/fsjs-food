"use strict";
// const data = require("../data/recipes.json");
// console.log(data[0]);

/**
 * The recipes data contains a list of ingredients for each recipe.
 * It is named `strIngredient1` to `strIngredient20` as keys. If a recipe contains
 * less than 20 ingredients, however much ingredients that are not used will be undefined.
 * Each recipe also contains measures for each of its ingredients, named
 * `strMeasure1` to `strMeasure20`. However, for the sake of simplicity, I'll just generate
 * random values (in grams) between 5 and 100.
 */
// function fetchFoodFromRecipes() {
//     const food = [];
//     // const measures = [];

//     // ingredients 1 to 20
//     for (let i = 1; i <= 20; i++) {
//         let foodName = data[0][`strIngredient${i}`];
//         if (foodName == null) break;

//         // get nutritional facts from API
//         // await axios.get(...)
//     }
// }

// function seedRecipes() {
//     const recipes = [
//         {
//             name: data[0].strMeal,
//             instructions: data[0].strInstructions,
//             imageUrl: data[0].strMealThumb,
//             userId: 1,
//         },
//     ];

//     return recipes;
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Food", [
            {
                name: "cooked rice",
                calories: 1.3,
                protein: 0.269,
                carbohydrate: 2.82,
                fat: 0.028,
                fiber: 0.04,
                sugar: 0.005,
                sodium: 0.1,
                cholesterol: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert("Recipes", [
            {
                name: "100 grams of rice",
                instructions: "Take 100 grams of rice, then cook it. Serve hot.",
                imageUrl:
                    "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2020/04/How-to-Cook-Rice-8.jpg",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        await queryInterface.bulkInsert("FoodRecipes", [
            {
                foodId: 1,
                recipeId: 1,
                grams: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("FoodRecipes", null, {});
        await queryInterface.bulkDelete("Food", null, {});
        await queryInterface.bulkDelete("Recipes", null, {});
    },
};
