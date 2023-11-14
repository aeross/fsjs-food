const Controller = require("../controllers/Controller");
const router = require("express").Router();

router.get("/", Controller.getRecipes);
router.post("/", Controller.addRecipe);
router.get("/:id", Controller.getRecipesById);
router.delete("/:id", Controller.deleteRecipe);
// router.patch("/:id", Controller.uploadImage);

module.exports = router;
