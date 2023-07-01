import './App.css';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';
import WeatherButton from './components/WeatherButton';
import CivilEventsButton from './components/CivilEventsButton';
import NaturalDisastersButton from './components/NaturalDisastersButton';
import HealthButton from './components/HealthButton';
import { React, useState, useEffect } from 'react';

const MainContainer = styled('div')`
  margin: 20px;
  display: flex;
  gap: 25px;
  align-items: center;
`;

const FiltersContainer = styled('div')`
  height: 100%;
  display: flex;
  gap: 15px;
`

const App = () => {
  const [toggleWeather, setToggleWeather] = useState(false);
  const [toggleNaturalDisasters, setToggleNaturalDisasters] = useState(false);
  const [toggleCivilEvents, setToggleCivilEvents] = useState(false);
  const [toggleHealth, setToggleHealth] = useState(false);

  useEffect(() => {
    console.log(toggleWeather)
  }, [toggleWeather]);

  useEffect(() => {

  }, [toggleNaturalDisasters]);

  useEffect(() => {

  }, [toggleCivilEvents]);

  useEffect(() => {

  }, [toggleHealth]);

  return (
    <>
      <MainContainer>
        <SearchBar/>
        <FiltersContainer>
          <WeatherButton toggleWeather={toggleWeather} setToggleWeather={setToggleWeather}/>
          <NaturalDisastersButton toggleNaturalDisasters={toggleNaturalDisasters} setToggleNaturalDisasters={setToggleNaturalDisasters}/>
          <CivilEventsButton toggleCivilEvents={toggleCivilEvents} setToggleCivilEvents={setToggleCivilEvents}/>
          <HealthButton toggleHealth={toggleHealth} setToggleHealth={setToggleHealth}/>
        </FiltersContainer>
      </MainContainer>
    </>
  );
}

export default App;
