import "./App.css";
import SearchBar from "./components/SearchBar";
import styled from "styled-components";
import WeatherButton from "./components/WeatherButton";
import CivilEventsButton from "./components/CivilEventsButton";
import NaturalDisastersButton from "./components/NaturalDisastersButton";
import HealthButton from "./components/HealthButton";
import { React, useState, useEffect } from "react";
import logo from "./assets/logo.png";
import OurMap from "./components/OurMap";
import data from "./data.json";

const MainContainer = styled("div")`
  margin: 20px;
  display: flex;
  gap: 25px;
  align-items: center;
  position: absolute;
  z-index: 100;
`;

const FiltersContainer = styled("div")`
  height: 100%;
  display: flex;
  gap: 15px;
`;

const markerColours = {
  weather: "#375380",
  natural: "#a13b3b",
  civil: "#2a612d",
  health: "#d6a11a",
};

const App = () => {
  const [toggleWeather, setToggleWeather] = useState(true);
  const [toggleNaturalDisasters, setToggleNaturalDisasters] = useState(true);
  const [toggleCivilEvents, setToggleCivilEvents] = useState(true);
  const [toggleHealth, setToggleHealth] = useState(true);

  const [country, setCountry] = useState("");
  const [openCountryModal, setOpenCountrymodal] = useState(false);

  const [weatherMarkers, setWeatherMarkers] = useState([]);
  const [naturalDisastersMarkers, setNaturalDisastersMarkers] = useState([]);
  const [civilEventsMarkers, setCivilEventsMarkers] = useState([]);
  const [healthMarkers, setHealthMarkers] = useState([]);

  const handleOpenCountryModal = (newCountry) => {
    if (newCountry !== '') {
      setCountry(newCountry);
      setOpenCountrymodal(true);
    }
  };
  const handleCloseCountryModal = () => setOpenCountrymodal(false);

  // const getWeather = async (lat, lon) => {
  //   const response = await fetch(`http://localhost:3000/weather/${lat}/${lon}`);
  //   const data = await response.json();
  //   return {
  //     temp: data.list[0].main.temp,
  //     description: data.list[0].weather.description,
  //   };
  // };

  useEffect(() => {
    const weatherAlerts = [];
    const naturalDisastersAlerts = [];
    const civilEventsAlerts = [];
    const healthAlerts = [];
    for (const country of data) {
      let random1 = Math.random() * 1000;
      let random2 = Math.random() * 1000;
      for (const alert of country.alerts) {
        if (alert.type === "natural") {
          naturalDisastersAlerts.push({
            markerOffset: -10,
            name: alert.name,
            coordinates: [
              (parseFloat(country.coordinates.lon) + random1).toString(),
              (parseFloat(country.coordinates.lat) + random2).toString(),
            ],
            colour: markerColours[alert.type],
          });
        }
        if (alert.type === "civil") {
          civilEventsAlerts.push({
            markerOffset: -10,
            name: alert.name,
            coordinates: [
              (parseFloat(country.coordinates.lon) + random1).toString(),
              (parseFloat(country.coordinates.lat) + random2).toString(),
            ],
            colour: markerColours[alert.type],
          });
        }
        if (alert.type === "health") {
          healthAlerts.push({
            markerOffset: -10,
            name: alert.name,
            coordinates: [
              (parseFloat(country.coordinates.lon) + random1).toString(),
              (parseFloat(country.coordinates.lat) + random2).toString(),
            ],
            colour: markerColours[alert.type],
          });
        }
      }
      // const weather = await getWeather(country.coordinates.lat, country.coordinates.lon);
      // weatherAlerts.push(
      //   {
      //     markerOffset: -10,
      //     name: weather.description,
      //     coordinates: [(parseFloat(country.coordinates.lon) + random1).toString(), (parseFloat(country.coordinates.lat) + random2).toString()],
      //     colour: markerColours.weather,
      //   }
      // );
    }
    setWeatherMarkers(weatherAlerts);
    setNaturalDisastersMarkers(naturalDisastersAlerts);
    setCivilEventsMarkers(civilEventsAlerts);
    setHealthMarkers(healthAlerts);
  }, []);

  useEffect(() => {
    if (toggleWeather) {
      const weatherAlerts = [];
      for (const country of data) {
        for (const alert of country.alerts) {
          let random1 = Math.random() * 10 + Math.random();
          let random2 = Math.random() * 10 + Math.random();
          if (alert.type === "weather") {
            weatherAlerts.push({
              markerOffset: -10,
              name: alert.name,
              coordinates: [
                (parseFloat(country.coordinates.lon) + random1).toString(),
                (parseFloat(country.coordinates.lat) + random2).toString(),
              ],
              colour: markerColours[alert.type],
            });
          }
        }
      }
      setWeatherMarkers(weatherAlerts);
    } else {
      setWeatherMarkers([]);
    }
  }, [toggleWeather]);

  useEffect(() => {
    if (toggleNaturalDisasters) {
      const naturalDisastersAlerts = [];
      for (const country of data) {
        for (const alert of country.alerts) {
          let random1 = Math.random();
          let random2 = Math.random();
          if (alert.type === "natural") {
            naturalDisastersAlerts.push({
              markerOffset: -10,
              name: alert.name,
              coordinates: [
                (parseFloat(country.coordinates.lon) + random1).toString(),
                (parseFloat(country.coordinates.lat) + random2).toString(),
              ],
              colour: markerColours[alert.type],
            });
          }
        }
      }
      setNaturalDisastersMarkers(naturalDisastersAlerts);
    } else {
      setNaturalDisastersMarkers([]);
    }
  }, [toggleNaturalDisasters]);

  useEffect(() => {
    if (toggleCivilEvents) {
      const civilEventsAlerts = [];
      for (const country of data) {
        for (const alert of country.alerts) {
          let random1 = Math.random();
          let random2 = Math.random();
          if (alert.type === "civil") {
            civilEventsAlerts.push({
              markerOffset: -10,
              name: alert.name,
              coordinates: [
                (parseFloat(country.coordinates.lon) + random1).toString(),
                (parseFloat(country.coordinates.lat) + random2).toString(),
              ],
              colour: markerColours[alert.type],
            });
          }
        }
      }
      setCivilEventsMarkers(civilEventsAlerts);
    } else {
      setCivilEventsMarkers([]);
    }
  }, [toggleCivilEvents]);

  useEffect(() => {
    if (toggleHealth) {
      const healthAlerts = [];
      for (const country of data) {
        for (const alert of country.alerts) {
          // let precision = 100; // 2 decimals
          let random1 = Math.random();
          let random2 = Math.random();
          if (alert.type === "health") {
            healthAlerts.push({
              markerOffset: -10,
              name: alert.name,
              coordinates: [
                (parseFloat(country.coordinates.lon) + random1).toString(),
                (parseFloat(country.coordinates.lat) + random2).toString(),
              ],
              colour: markerColours[alert.type],
            });
          }
        }
      }
      setHealthMarkers(healthAlerts);
    } else {
      setHealthMarkers([]);
    }
  }, [toggleHealth]);

  return (
    <div style={{ overflowY: "hidden", height: "100%" }}>
      <MainContainer>
        <a href="/">
          <img src={logo} alt="cooinda" height={36} />
        </a>
        <SearchBar
          country={country}
          openCountryModal={openCountryModal}
          handleOpenCountryModal={handleOpenCountryModal}
          handleCloseCountryModal={handleCloseCountryModal}
        />
        <FiltersContainer>
          <WeatherButton
            toggleWeather={toggleWeather}
            setToggleWeather={setToggleWeather}
          />
          <NaturalDisastersButton
            toggleNaturalDisasters={toggleNaturalDisasters}
            setToggleNaturalDisasters={setToggleNaturalDisasters}
          />
          <CivilEventsButton
            toggleCivilEvents={toggleCivilEvents}
            setToggleCivilEvents={setToggleCivilEvents}
          />
          <HealthButton
            toggleHealth={toggleHealth}
            setToggleHealth={setToggleHealth}
          />
        </FiltersContainer>
      </MainContainer>
      <OurMap
        handleOpenCountryModal={handleOpenCountryModal}
        weatherMarkers={weatherMarkers}
        naturalDisastersMarkers={naturalDisastersMarkers}
        civilEventsMarkers={civilEventsMarkers}
        healthMarkers={healthMarkers}
      />
    </div>
  );
};

export default App;
