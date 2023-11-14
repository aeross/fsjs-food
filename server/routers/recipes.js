const Controller = require("../controllers/Controller");
const Auth = require("../middlewares/auth");
const router = require("express").Router();

router.get("/", Controller.getRecipes);
router.post("/", Controller.addRecipe);
router.get("/:id", Auth.authorise, Controller.getRecipesById);
router.delete("/:id", Auth.authorise, Controller.deleteRecipe);
// router.patch("/:id", Controller.uploadImage);

module.exports = router;
