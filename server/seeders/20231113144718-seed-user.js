"use strict";

const Bcrypt = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * We seed only one user at first, by default.
         */
        await queryInterface.bulkInsert("Users", [
            {
                name: "Peter Parker",
                email: "spooderman@mail.com",
                password: Bcrypt.hash("peter-tingle"),
                gender: "Male",
                age: 18,
                height: 177,
                weight: 80,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        // let data = require("../data/users.json");
        // data = data.map((d) => {
        //     d.password = Bcrypt.hash(d.password);
        //     d.createdAt = new Date();
        //     d.updatedAt = new Date();
        //     return data;
        // });
        // await queryInterface.bulkInsert("Users", data);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
