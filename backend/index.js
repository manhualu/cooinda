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


  
  
  
