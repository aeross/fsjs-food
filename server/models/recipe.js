"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Recipe extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { foreignKey: "userId" });
            this.hasMany(models.FoodRecipes, { foreignKey: "recipeId" });
        }
    }
    Recipe.init(
        {
            name: DataTypes.STRING,
            instructions: DataTypes.STRING,
            imageUrl: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Recipe",
        }
    );
    return Recipe;
};
