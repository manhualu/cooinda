import { Tooltip } from "@mui/material";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  Graticule,
} from "react-simple-maps";

const OurMap = ({
  handleOpenCountryModal,
  weatherMarkers,
  naturalDisastersMarkers,
  civilEventsMarkers,
  healthMarkers,
}) => {
  //   const getCountryCoords = async (countryName) => {
  //     const res = await fetch(`http://localhost:3000/encode/${countryName}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const nutz = await res.json();
  //     return nutz;
  //   };

  const geoUrl =
    "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

  const handleClick = async (geo) => {
    handleOpenCountryModal(geo.properties.name);
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
        background: "#e1eaf5",
      }}
    >
      <div style={{ width: "1500px" }}>
        <ComposableMap
          data-tip=""
          fill="black"
          projectionConfig={{
            rotate: [-10, 0, 0],
          }}
        >
          <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
          <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // const isClicked = clickedCountry === geo.properties.name;
                return (
                  <>
                    <Tooltip title={geo.properties.name} placement="bottom">
                      <Geography
                        key={geo.rsmKey}
                        stroke="#b1b1b1"
                        strokeWidth={0.5}
                        geography={geo}
                        style={{
                          default: {
                            fill: "white",
                            outline: "none",
                          },
                          hover: {
                            fill: "#578653",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#578653",
                            outline: "none",
                          },
                        }}
                        onClick={() => handleClick(geo)}
                      />
                    </Tooltip>
                  </>
                );
              })
            }
          </Geographies>
          {weatherMarkers.map(({ name, coordinates, markerOffset, colour }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={3} fill={colour} stroke="#fff" strokeWidth={1} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontSize: "0.4rem",
                  fontFamily: "Monserrat",
                  fill: "#5D5A6D",
                }}
              >
                {name}
              </text>
            </Marker>
          ))}
          {naturalDisastersMarkers.map(
            ({ name, coordinates, markerOffset, colour }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={3} fill={colour} stroke="#fff" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{
                    fontSize: "0.4rem",
                    fontFamily: "Monserrat",
                    fill: "#5D5A6D",
                  }}
                >
                  {name}
                </text>
              </Marker>
            )
          )}
          {civilEventsMarkers.map(
            ({ name, coordinates, markerOffset, colour }) => (
              <Marker key={name} coordinates={coordinates}>
                <circle r={3} fill={colour} stroke="#fff" strokeWidth={1} />
                <text
                  textAnchor="middle"
                  y={markerOffset}
                  style={{
                    fontSize: "0.4rem",
                    fontFamily: "Monserrat",
                    fill: "#5D5A6D",
                  }}
                >
                  {name}
                </text>
              </Marker>
            )
          )}
          {healthMarkers.map(({ name, coordinates, markerOffset, colour }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={3} fill={colour} stroke="#fff" strokeWidth={1} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{
                  fontSize: "0.4rem",
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
