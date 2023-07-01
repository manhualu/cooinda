const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const emergencyCountries = JSON.parse(fs.readFileSync("./data.json", "utf8"));
function getEmergency(country) {
  for (const eachCountry of emergencyCountries) {
    if (eachCountry.Country.Name.toLowerCase() === country.toLowerCase()) {
      return {
        Police: eachCountry.Police.All[0],
        Ambulance: eachCountry.Ambulance.All[0],
        Fire: eachCountry.Fire.All[0],
      };
    }
  }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// e.g. http://localhost:3000/encode/cuba -> {"lat": "23.0131338","lon": "-80.8328748"}
app.get("/encode/:country", async (req, res) => {
  const country = req.params.country;
  const response = await fetch(
    `https://geocode.maps.co/search?country=${country}`
  );
  const data = await response.json();
  const ret = {
    lat: data[0].lat,
    lon: data[0].lon,
  };
  console.log(data);
  console.log(ret);
  res.json(ret);
});

const API_key = "278d110822688566d186c07c3d9630c8";
app.get("/weather/:country", async (req, res) => {
  const country = req.params.country;
  const response = await fetch(`http://localhost:3000/encode/${country}`);
  const { lat, lon } = await response.json();
  console.log(lat, lon);
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`;
  const response2 = await fetch(apiUrl);
  const data = await response2.json();
  //const data = "lol";
  res.json(data);
});

app.get("/deeznutz", (req, res) => {
  res.json({ yourMum: "nuts" });
});

app.get("/when", (req, res) => {
  res.json({ did: "iAsk" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/help/:country", (req, res) => {
  const country = req.params.country;
  res.json(getEmergency(country));
});
