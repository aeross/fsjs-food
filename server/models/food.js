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
            this.hasMany(models.FoodRecipes, { foreignKey: "foodId" });
        }
    }
    Food.init(
        {
            name: DataTypes.STRING,
            calories: DataTypes.FLOAT,
            protein: DataTypes.FLOAT,
            carbohydrate: DataTypes.FLOAT,
            fat: DataTypes.FLOAT,
            fiber: DataTypes.FLOAT,
            sugar: DataTypes.FLOAT,
            sodium: DataTypes.FLOAT,
            cholesterol: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: "Food",
        }
    );
    return Food;
};
