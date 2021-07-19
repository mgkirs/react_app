/**
 *  @author Eugene Terentev <eugene@terentev.net>
 */

//import React from 'react';

import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

import Drivers from "./Drivers";

import GMap from "./GMap";

class MyComponents extends Component {

	render() {
		return (
				<LoadScript
				googleMapsApiKey={process.env.GMAP_KEY}
					>
				<Drivers />
				</LoadScript>
		)
	}
};

/* <GoogleMap
mapContainerStyle={this.containerStyle}
center={this.center}
zoom={10}
>
{ }
</GoogleMap>*/

ReactDOM.render(<MyComponents />, document.getElementById("w0"));
