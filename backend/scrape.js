const data = require("./countries.json");
const fetch = require("node-fetch");
const fs = require("fs");

const url = "http://localhost:3000/encode";

const test = data;

const scrape = async () => {
  const result = [];
  // const country = "Afghanistan";

  //console.log(test);

  for (const country of test) {
    try {
      console.log(country.name);
      const response = await fetch(
        `https://geocode.maps.co/search?country=${country.name}`
      );
      const data = await response.json();
      const ret = {
        lat: data[0].lat,
        lon: data[0].lon,
      };

      const obj = {
        name: country.name,
        code: country.code,
        coordinates: ret
      }

      //   console.log(data);
      console.log(obj);
      result.push(obj);
    } catch (e) {
      //console.log(e);
    }
  }

  // const response = await fetch(
  //   `https://geocode.maps.co/search?country=${country}`
  // );
  // const data = await response.json();
  // const ret = {
  //   lat: data[0].lat,
  //   lon: data[0].lon,
  // };

  // const obj = {
  //   country: country,
  //   location: ret,
  // };
  // //   console.log(data);

  console.log(result);
  const dataToWrite = JSON.stringify(result);

  // writing the JSON string content to a file
  fs.writeFile("locations.json", dataToWrite, (error) => {
    // throwing the error
    // in case of a writing problem
    if (error) {
      // logging the error
      console.error(error);

      throw error;
    }

    console.log("data.json written correctly");
  });
};
// for (const country of data) {
//console.log(country.name);

scrape();
// }

// const dataStore = {
//   France: {
//     description: lkjsdflksdj,
//     population: skejrhsekj,
//     location: skjfhsdk,
//     alerts: skdflksdf,
//   },
//   Australia: {
//     description: lkjsdflksdj,
//     population: skejrhsekj,
//     location: skjfhsdk,
//     alerts: skdflksdf,
//   },
//   China: {
//     description: lkjsdflksdj,
//     population: skejrhsekj,
//     location: skjfhsdk,
//     alerts: skdflksdf,
//   },
// };
