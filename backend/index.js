const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(cors());

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

async function getCountryDescription(countryName) {
    const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${encodeURIComponent(
        countryName
    )}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const pages = data.query.pages;
    const description = pages[Object.keys(pages)[0]].extract;

    // Extract plain text until the first newline character
    const firstParagraph = description.split("</p>")[1];
    const pattern = /<.*?>| \(.*?\)|\".*\"|\[.*?\]|>|\)|\n/g;
    const cleaned_text = firstParagraph.replace(pattern, "");

    return cleaned_text;
}

async function getCountryInfo(countryName) {
    const apiUrl = `https://restcountries.com/v3/name/${encodeURIComponent(countryName)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
  
    const countryInfo = data[0]; 
    const { name, capital, population, languages } = countryInfo;
    const description = await getCountryDescription(countryName);
  
    console.log("Country Name:", name.common);
    console.log(`Description: ${description}`);
    console.log(`Capital: ${capital[0]} (pop. ${population})`);
    console.log("Languages:", Object.values(languages).join(", "));
    
}
  
getCountryInfo("Mexico");


  
  
  
