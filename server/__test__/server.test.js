const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");
const JWTHelper = require("../helpers/jwt");
const BcryptHelper = require("../helpers/bcrypt");

beforeAll(async () => {
    // up seeding
    let data = require("../data/users.json");
    data = data.map((d) => {
        d.password = BcryptHelper.hashPassword(d.password);
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Users", data);

    data = require("../data/recipes.json");
    data = data.map((d) => {
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Recipes", data);

    data = require("../data/nutrients.json");
    data = data.map((d) => {
        d.createdAt = new Date();
        d.updatedAt = new Date();
        return d;
    });
    await sequelize.queryInterface.bulkInsert("Nutrients", data);
});

afterAll(async () => {
    // down seeding
    await sequelize.queryInterface.bulkDelete("Users", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Recipes", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
    await sequelize.queryInterface.bulkDelete("Nutrients", null, {
        truncate: true,
        cascade: true,
        restartIdentity: true,
    });
});

const payload = { id: 1 };
const token = JWTHelper.encode(payload);

describe("CRUD Testing", () => {
    it("should read all recipes correctly", async () => {
        const response = await request(app).get("/recipes").set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("error read all recipes not logged in", async () => {
        const response = await request(app).get("/recipes");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should read recipe by id correctly", async () => {
        const response = await request(app)
            .get("/recipes/1")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error read recipe by id not found", async () => {
        const response = await request(app)
            .get("/recipes/100")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error read recipe by id not logged in", async () => {
        const response = await request(app).get("/recipes/100");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("complete profile success", async () => {
        const body = { name: "andrew", gender: "Male", age: 34, height: 132, weight: 43 };
        const response = await request(app)
            .put("/complete-profile")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("complete profile invalid input", async () => {
        const body = { name: "andrew", gender: "Male", age: "string", height: 132, weight: 43 };
        const response = await request(app)
            .put("/complete-profile")
            .set("authorization", `Bearer ${token}`)
            .send(body);

        expect(response.status).toBe(400);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("should delete a recipe based on id", async () => {
        const response = await request(app)
            .del("/recipes/1")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("error delete - not logged in", async () => {
        const response = await request(app).get("/recipes");

        expect(response.status).toBe(401);
        expect(response.body).toBeInstanceOf(Object);
    });

    it("get user info", async () => {
        const response = await request(app)
            .get("/user-info")
            .set("authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});
