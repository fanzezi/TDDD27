import React, { Fragment, useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { connect } from "react-redux";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapController = props => {
  const [country, setCountry] = useState("");
  const [userData, setData] = useState([]);

  const { loginUser } = props.auth;
  const id = loginUser.id;
  let highlighted = [""];

  if (userData[0] !== undefined) {
    highlighted = userData[0].map;
  }

  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/user/${id}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const updateMap = async e => {
    var map = [""];

    if (userData[0].map != null) {
      map = userData[0].map;
    }

    if (map.includes(country)) {
      const index = map.indexOf(country);
      if (index > -1) {
        map.splice(index, 1);
      }
    } else {
      map.push(country);
    }

    try {
      const body = { map, id };
      const response = await fetch(`http://localhost:5000/map`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log(userData);

  return (
    <Fragment>
      <ComposableMap height={400}>
        <Geographies geography={geoUrl} stroke="#FFF" strokeWidth={0.5}>
          {({ geographies }) =>
            geographies.map(geo => {
              let isHighlighted = "";
              if (highlighted != null) {
                isHighlighted =
                  highlighted.indexOf(geo.properties.ISO_A3) !== -1;
              }

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isHighlighted ? "blue" : ""}
                  onMouseDown={() => {
                    setCountry(geo.properties.ISO_A3);
                  }}
                  style={{
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "yellow",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <button
        type="button"
        className="btn btn-dark btn-sm"
        value={country}
        onClick={e => updateMap(e.target.value)}
      >
        Add/Remove chosen country
      </button>
    </Fragment>
  );
};

// get auth from reducers to access user ID
const mapStateToProps = state => ({
  auth: state.isLogged
});

export default connect(mapStateToProps, {})(MapController);
