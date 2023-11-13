"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class FoodRecipes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Recipe, { foreignKey: "recipeId" });
            this.belongsTo(models.Food, { foreignKey: "foodId" });
        }
    }
    FoodRecipes.init(
        {
            foodId: DataTypes.INTEGER,
            recipeId: DataTypes.INTEGER,
            grams: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "FoodRecipes",
        }
    );
    return FoodRecipes;
};
