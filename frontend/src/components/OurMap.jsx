import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
  ZoomableGroup,
} from "react-simple-maps";
import ReactToolTip from "react-tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const markers = [
  {
    markerOffset: -15,
    name: "Sau Paulo",
    coordinates: [-58.816, -34.6037],
  },
];

const OurMap = () => {
  const [countryName, setCountryName] = useState("");
  const [clickedCountry, setClickedCountry] = useState("");

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const handleClick = (geo) => {
    setCountryName(geo.properties.name);
    setClickedCountry(geo.properties.name);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Our Map</h1>
      <div style={{ width: "1400px", borderStyle: "double" }}>
        <div>{countryName}</div>
        <ComposableMap data-tip="">
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const isClicked = clickedCountry === geo.properties.name;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      fill={isClicked ? "#BED7C0" : "#EAEAEC"}
                      stroke="#D6D6DA"
                      geography={geo}
                      style={{
                        default: {
                          fill: "#EEE",
                          outline: "none",
                        },
                        hover: {
                          fill: "#C7E0C4",
                          outline: "none",
                        },
                        pressed: {
                          fill: "#BED7C0",
                          outline: "none",
                        },
                      }}
                      onClick={() => handleClick(geo)}
                    />
                  );
                })
              }
            </Geographies>
            {markers.map(({ name, coordinates, markerOffset }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                >
                  {name}
                </text>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>
    </div>
  );
};

export default OurMap;
