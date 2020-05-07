import React, { Fragment} from "react";
import { Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import easyButton from "leaflet-easybutton"


const MapController = () => {

    const position = [51, -1];
    console.log(easyButton);


    return(
        <Fragment>
            <Map center = {position} zoom = {2} style={{height : '400px'}}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
            </Map>
        </Fragment>
    );
};

export default MapController;