const express = require("express");

const app = express();

const { LocalStorage } = require("node-localstorage")

const localStorageLocation = "./storage"

const localStorage = new LocalStorage(localStorageLocation);

const ROUTER = 3005;

app.use(express.json());

app.get("/country/:country", (req, res) => {

    let country = req.params.country;

    let countryStored = JSON.parse(localStorage.getItem(country));

    // if the country is already saved in the storage folder, it will run to get information about the country's capital city
    if (countryStored) {

        console.log("country exists");

        if (country) {

            res.send(`the capital city of ${country} is ` + JSON.parse(localStorage.getItem(country)));

        }
    }
    else {
        console.log("country does not exist");

        res.status(404).send(`${country} does not exist`);
    }
});


app.post("/country", (req, res) => {

    const { country, city } = req.body;

    let storedCities = JSON.parse(localStorage.getItem(country));


    // checks if country exist in storage
    if (storedCities) {

        //if country already exists, it will give an error message
        res.status(409).send("Country already exists");

    } else {

        localStorage.setItem(country, JSON.stringify(city));
    }

    // sends message to user that a new object of country with capital city has been created
    res.send(`Stored ${city} as the capital of ${country}`);

})


app.listen(ROUTER, () => {
    console.log(`http://localhost:${ROUTER}`);
});