const JWTHelper = require("../helpers/jwt");
const ErrorHandler = require("./errorHandler");
const { User, Product, Category } = require("../models/index");

class Auth {
    static async authenticate(req, res, next) {
        try {
            // get access token from req.headers
            const bearerToken = req.headers.authorization;
            if (!bearerToken) throw new Error(ErrorHandler.Authentication);
            const accessToken = bearerToken.split(" ")[1];

            // decode and verify access token
            const decoded = JWTHelper.decode(accessToken); // contains { id: ..., username: ..., iat: ... }
            const user = await User.findOne({ where: { id: decoded.id } });
            if (!user) throw new Error(ErrorHandler.DataNotFound);

            // save user data
            req.loginInfo = {
                userId: decoded.id,
                username: decoded.username,
                role: user.role,
            };

            next();
        } catch (error) {
            next(error);
        }
    }

    static async authoriseAddUser(req, res, next) {
        try {
            const role = req.loginInfo.role;
            if (role !== "admin") throw new Error(ErrorHandler.Authorization);
            next();
        } catch (error) {
            next(error);
        }
    }

    static async authoriseProductAccess(req, res, next) {
        try {
            const { id } = req.params;
            const { userId, username, role } = req.loginInfo;
            if (role !== "admin") {
                //1. find product based on id param
                const product = await Product.findOne({ where: { id } });

                //2. handle error kalo ga ketemu productnya
                if (!product) throw new Error(ErrorHandler.DataNotFound);

                //3. compare userId with product.authorId
                if (userId != product.authorId) {
                    throw new Error(ErrorHandler.Authorization);
                }
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Auth;
