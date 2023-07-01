import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const OurMap = ({ handleOpenCountryModal, setTooltipContent }) => {
  const [clickedCountry, setClickedCountry] = useState("");
  const [markers, setMarkers] = useState([]);


  const getCountryCoords = async (countryName) => {
    const res = await fetch(`http://localhost:3000/encode/${countryName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const nutz = await res.json();
    return nutz;
  };

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const handleClick = async (geo) => {
    setClickedCountry(geo.properties.name);
    const coords = await getCountryCoords(geo.properties.name);
    // setMarkers([
    //   {
    //     markerOffset: -10,
    //     name: geo.properties.name,
    //     coordinates: [coords.lon, coords.lat],
    //   },
    // ]);
    handleOpenCountryModal(geo.properties.name);
    setClickedCountry('');
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
      <div style={{ width: "1400px" }}>
        <ComposableMap data-tip="" fill="black">
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isClicked = clickedCountry === geo.properties.name;
                return (
                  <Geography
                    key={geo.rsmKey}
                    stroke="#D6D6DA"
                    geography={geo}
                    style={
                      isClicked
                        ? {
                            default: {
                              fill: "#BED7C0",
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
                          }
                        : {
                            default: {
                              fill: "#EAEAEC",
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
                          }
                    }
                    onClick={() => handleClick(geo)}
                    onMouseEnter={() => {
                      setTooltipContent(`${geo.properties.name}`);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={3} fill="#1e5220" stroke="#fff" strokeWidth={1} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontSize: "0.6rem",
                  fontFamily: "Monserrat",
                  fill: "#5D5A6D",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
    </div>
  );
};

export default OurMap;
