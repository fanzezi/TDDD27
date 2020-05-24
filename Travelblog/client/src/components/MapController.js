import React, { Fragment, useState, useEffect} from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup, Line} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Dropdown from 'react-bootstrap/Dropdown'
import getCurrentUser from './Login';

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const MapController = () => {

    //Countrycode that must be connected to the user somehow?
    const highlighted = [
        "BRA",
        "VNM",
        "COL",
      ];

    const [content, setContent] = useState("");

    return(
        <Fragment>
            <ComposableMap height = {400}>
                    <Geographies geography = {geoUrl} stroke="#FFF" strokeWidth={0.5}>
                    {({ geographies }) =>
                        geographies.map(geo => 
                            {const isHighlighted = highlighted.indexOf(geo.properties.ISO_A3) !== -1;
                                return(
                                    <Geography 
                                    key={geo.rsmKey} 
                                    geography={geo}
                                    fill={isHighlighted ? "blue" : ""}
                                    onMouseEnter = {() => {
                                        const {NAME} = geo.properties;
                                        setContent(`${NAME}`);
                                        
                                    }}
                                    onMouseLeave = {() => {
                                        setContent("");
                                    }}
                                    style={{
                                        hover: {
                                          fill: "#F53",
                                          outline: "none"
                                        },
                                        pressed: {
                                          fill: "#E42",
                                          outline: "none"
                                        }
                                      }}
                                    />
                                );
                            }
                       )
                    }
                    </Geographies>              
            </ComposableMap>
            <div className = "col text-right">
            <Dropdown>
                <Dropdown.Toggle variant="dark" size="sm" id = "dropdown-basic">
                Edit map 
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item 
                        data-toggle = "modal"  
                        >Remove Country
                    </Dropdown.Item>
                    <Dropdown.Item 
                        data-toggle = "modal"  
                        >Add Country
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </Fragment>
    );
};
export default MapController;