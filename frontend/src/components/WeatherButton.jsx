import styled from 'styled-components';
import { Button } from '../styles/Button';
import { React, useState } from 'react';

const WeatherButton = ({ toggleWeather, setToggleWeather }) => {
  const toggle = () => {
    setToggleWeather(!toggleWeather);
  }

  return (
    <Button onClick={toggle}>
      🌤️ Weather
    </Button>
  );
}

export default WeatherButton;