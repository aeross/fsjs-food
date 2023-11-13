"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("FoodRecipes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            foodId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Food",
                    key: "id",
                },
            },
            recipeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Recipes",
                    key: "id",
                },
            },
            grams: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("FoodRecipes");
    },
};
