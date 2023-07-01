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

const App = () => {
  const [toggleWeather, setToggleWeather] = useState(false);
  const [toggleNaturalDisasters, setToggleNaturalDisasters] = useState(false);
  const [toggleCivilEvents, setToggleCivilEvents] = useState(false);
  const [toggleHealth, setToggleHealth] = useState(false);

  const [country, setCountry] = useState({});
  const [openCountryModal, setOpenCountrymodal] = useState(false);

  const handleOpenCountryModal = (newCountry) => {
    console.log(newCountry);
    if (newCountry) {
      setCountry(newCountry);
      setOpenCountrymodal(true);
    }
  };
  const handleCloseCountryModal = () => setOpenCountrymodal(false);

  useEffect(() => {
    console.log(toggleWeather);
  }, [toggleWeather]);

  useEffect(() => {}, [toggleNaturalDisasters]);

  useEffect(() => {}, [toggleCivilEvents]);

  useEffect(() => {}, [toggleHealth]);

  return (
    <div style={{ overflowY: 'hidden', height: '100%' }}>
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
      <OurMap />
    </div>
  );
};

export default App;
