/*
High BMI:
high protein, low sugar, carb, and fat diet.

Normal BMI:
balanced diet.

Low BMI:
high protein, high carb, moderate fat diet.
*/
// const fs = require("fs");
// let data = require("../data/users.json");
// let count = 1;
// data = data.map((d) => {
//     d.email = `anon${count}@mail.com`;
//     d.height = Math.round(d.height * 100);
//     d.weight = Math.round(d.weight);
//     count++;
//     return d;
// });

// fs.writeFileSync("./data/users.json", JSON.stringify(data, null, 4));

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const axios = require("axios");

// get BMI from users data, using the fitness-calculator API.
async function getBMI(usersData) {
    const promises = usersData.map(async (user) => {
        return await requestAPI(user);
    });

    return await Promise.all(promises); // after 1 hour of frustration yay thanks google
}

async function requestAPI(user) {
    try {
        const options = {
            method: "GET",
            url: "https://fitness-calculator.p.rapidapi.com/bmi",
            params: {
                age: user.age,
                weight: user.weight,
                height: user.height,
            },
            headers: {
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST,
            },
        };
        const { data } = await axios.request(options);
        return { id: user.id, bmi: data.data.bmi, health: data.data.health };
    } catch (error) {
        console.log(error);
    }
}

module.exports = getBMI;
