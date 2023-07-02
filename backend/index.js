const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = 3000;
const fs = require("fs");

const countries = require("./locations.json");

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
app.get("/weather/:lat/:lon", async (req, res) => {
  // const country = req.params.country;
  // const response = await fetch(`http://localhost:3000/encode/${country}`);
  // const { lat, lon } = await response.json();
  // console.log(lat, lon);
  const lat = req.params.lat;
  const lon = req.params.lon;
  
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

// async function getCountryDescription(countryName) {
//   try {
//     const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${encodeURIComponent(
//       countryName
//     )}`;

//     const response = await fetch(apiUrl);
//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error("Failed to fetch data from the API");
//     }

//     if (!data.query || !data.query.pages) {
//       throw new Error("Invalid response from the API");
//     }

//     const pages = data.query.pages;
//     const pageKeys = Object.keys(pages);

//     if (pageKeys.length === 0) {
//       throw new Error("No data available for the specified country");
//     }

//     const description = pages[pageKeys[0]].extract;

//     // Extract plain text until the first newline character
//     const firstParagraph = description.split("</p>")[1];
//     const pattern = /<.*?>| \(.*?\)|\".*\"|\[.*?\]|>|\)|\n/g;
//     const cleanedText = firstParagraph.replace(pattern, "");

//     return cleanedText;
//   } catch (error) {
//     console.error("Error:", error.message);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// }


async function getCountryInfo(countryName) {
    try {
      const apiUrl = `https://restcountries.com/v3/name/${encodeURIComponent(countryName)}`;
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error("Failed to fetch country information");
      }
  
      const data = await response.json();
      const countryInfo = data[0];
  
      if (!countryInfo) {
        throw new Error("No information available for the specified country");
      }
  
      const { capital, population, languages } = countryInfo;
  
      return {
        "Capital": `${capital?.[0]} (pop. ${population})`,
        "Languages": Object.values(languages).join(", ")
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

for (const country of countries) {
  getCountryInfo(country.name)
    .then(countryInfo => {
      country.capital = countryInfo.Capital;
      country.languages = countryInfo.Languages;
      
      // write updated countries array to the JSON file cuz
      fs.writeFile('locations.json', JSON.stringify(countries), 'utf8', err => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          // console.log('JSON file updated successfully');
        }
      });
    })
    .catch(error => {
      console.error(error);
    });
}





  
  
  
