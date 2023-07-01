const express = require("express");
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

const emergencyCountries = JSON.parse(fs.readFileSync('./emergency.json', 'utf8'));
function getEmergency(country) {
    for (const eachCountry of emergencyCountries) {
        if (eachCountry.Country.Name.toLowerCase() === country.toLowerCase()) {
            return({"Police": eachCountry.Police.All[0],
                    "Ambulance": eachCountry.Ambulance.All[0],
                    "Fire": eachCountry.Fire.All[0]});
        }
    }
}

app.get("/", (req, res) => {
  res.send("Hello World!");
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