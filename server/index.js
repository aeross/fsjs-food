const router = require("express").Router();
const AuthController = require("../controllers/authController");
const ProdController = require("../controllers/prodController");
const Auth = require("../middlewares/auth");

const product = require("./product");
const category = require("./category");

router.get("/pub/product", ProdController.readPublic); // get all products for public site
router.get("/pub/product/:id", ProdController.readByIdPublic); // get product detail by id for public site

router.post(
    "/add-user",
    Auth.authenticate,
    Auth.authoriseAddUser,
    AuthController.addUser
);
router.post("/login", AuthController.login);

router.use(Auth.authenticate);

router.use("/product", product);
router.use("/category", category);

module.exports = router;
