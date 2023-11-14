"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Food", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
            },
            calories: {
                type: Sequelize.FLOAT,
            },
            protein: {
                type: Sequelize.FLOAT,
            },
            carbohydrate: {
                type: Sequelize.FLOAT,
            },
            fat: {
                type: Sequelize.FLOAT,
            },
            fiber: {
                type: Sequelize.FLOAT,
            },
            sugar: {
                type: Sequelize.FLOAT,
            },
            sodium: {
                type: Sequelize.FLOAT,
            },
            cholesterol: {
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable("Food");
    },
};
