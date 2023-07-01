const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const emergencyCountries = JSON.parse(
  fs.readFileSync("./emergency.json", "utf8")
);
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

  res.json(ret);
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
