"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Food extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.FoodRecipe, { foreignKey: "foodId" });
        }
    }
    Food.init(
        {
            name: DataTypes.STRING,
            calories: DataTypes.INTEGER,
            protein: DataTypes.INTEGER,
            carbohydrate: DataTypes.INTEGER,
            fat: DataTypes.INTEGER,
            fiber: DataTypes.INTEGER,
            sugar: DataTypes.INTEGER,
            sodium: DataTypes.INTEGER,
            cholesterol: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Food",
        }
    );
    return Food;
};
