const router = require("express").Router();
const Controller = require("../controllers/Controller");
const Auth = require("../middlewares/auth");

// const recipes = require("./recipes");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

// router.use(Auth.authenticate);

router.use("/recipes", Controller.getRecipes);

module.exports = router;
