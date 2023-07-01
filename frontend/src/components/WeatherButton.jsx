import { Button } from "../styles/Button";
import { React } from "react";

const WeatherButton = ({ toggleWeather, setToggleWeather }) => {
  const toggle = () => {
    setToggleWeather(!toggleWeather);
  };

  return (
    <Button
      onClick={toggle}
      style={
        toggleWeather
          ? { background: "#375380", color: "white" }
          : { background: "white", color: "#333333" }
      }
    >
      🌤️ Weather
    </Button>
  );
};

export default WeatherButton;
