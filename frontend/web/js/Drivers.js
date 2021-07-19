import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import GMap from "./GMap";

import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

class Drivers extends Component {
	constructor(props) {
		super(props);

		this.state = {
				isLoaded: false,
				drivers: [],
				selectedKey: 0,
				selectedRecipe: 0,
				driver: undefined,
		};

		this.keySelected = this.keySelected.bind(this);
		this.stopRoute = this.stopRoute.bind(this);
		this.stopDriver = this.stopDriver.bind(this);
		this.addDriver = this.addDriver.bind(this);
		this.recipeSelected = this.recipeSelected.bind(this);
	}

	componentDidMount() {
		fetch("http://yii2-starter-kit.localhost/map/map/index")
		.then(response => response.json())
		.then((result) => {
			if(result[Object.keys(result)[0]].driver.driver_id!=undefined){
			var sk = (result[Object.keys(result)[0]].driver.driver_id)?result[Object.keys(result)[0]].driver.driver_id+'':null;
			var sr = (result[Object.keys(result)[0]].locations[0].location_id)?result[Object.keys(result)[0]].locations[0].location_id+'':null;
			this.setState({
				isLoaded: true,
				drivers: result,
				selectedKey: sk,
				selectedRecipe: sr
			});

		(error) => {
			this.setState({
				isLoaded: true,
				error
			});
		}}}
		);
	}

	keySelected(event) {
		this.setState({selectedKey: event.target.value});
	}

	recipeSelected(event) {
		this.setState({selectedRecipe: event.target.value});
	}

	addDriver(event) {
		fetch("http://yii2-starter-kit.localhost/map/map/addriver")
		.then(response => response.json())
		.then((result) => {
			var k = result.driver.driver_id;
			this.setState(
					function(state, props) {
						state.drivers[k] = result;
						var q = state.drivers;
						
						return {
							isLoaded: true, 
							drivers: q,
							selectedKey: k
						}
					});
			this.setState(
					function(state, props) {
						return {
							selectedKey: k
						}
					});
		})
	}
		
	stopRoute(event) {
		var key = this.state.selectedKey;
		fetch("http://yii2-starter-kit.localhost/map/map/stoproute?status=" + this.state.drivers[key].driver.status+ "&driver_id=" + this.state.selectedKey)
		.then(response => response.json())
		.then((result) => {
			this.setState(
					function(state, props) {
						state.drivers[key].driver.status = result;
						return {
							isLoaded: true, 
							drivers: state.drivers }
					});
		})
	}

	stopDriver(event) {
		var key = this.state.selectedKey;
		fetch("http://yii2-starter-kit.localhost/map/map/stopdriver?driver_id=" + this.state.selectedKey)
		.then(response => response.json())
		.then((result) => {
			this.setState(
					function(state, props) {
						delete state.drivers[key];
						if(Object.keys(state.drivers).length>0){
							return {
								isLoaded: true,
								drivers: state.drivers,
								selectedKey: Object.keys(state.drivers)[0]
							}
						} else {
							return {
								isLoaded: true,
								drivers: state.drivers
							}
						}
			});
		})
	}

	render() {
		var status;
		var keys=this.props.keys,
		recipes=this.props.recipes,
		drivers=this.state.drivers,
		selectedKey=this.state.selectedKey,
		selectedRecipe=this.state.selectedRecipe;
		var makeOption=function(val, discription) {
			return <option key={val} value={val}>{discription}</option>
		};

		var recipesOptions = []; 
		var driverRoute = new Array();
		driverRoute.length = 0;

		var keysOptions = [];
		var count = 0;
		for (let key in drivers){
			count++;
			keysOptions.push(makeOption(drivers[key].driver.driver_id, drivers[key].driver.driver_id +' status: ' + (drivers[key].driver.status==1?'go':'stop')));
			recipesOptions[drivers[key].driver.driver_id] = (drivers[key].locations.map(
					(k)=>{
						return makeOption(k.location_id, k.location_id + ' location ' + k.lat+k.lng);
					})
			);
		}
		var gmaps;
		var select;
		var button;
		if(selectedKey in drivers){
			status = <h1>{(drivers[selectedKey].driver.status==1)?drivers[selectedKey].driver.driver_id +' go':drivers[selectedKey].driver +' stop'}</h1>;
			select = <select className={"custom-select"} onChange={this.recipeSelected} size={drivers[selectedKey].locations.length} value={selectedRecipe}>{recipesOptions[selectedKey]}</select>;
			gmaps =	<GMap driverroute={drivers[selectedKey]} />;
			button = <button onClick={this.stopRoute} type="button" className={"btn btn-primary"}>{(drivers[selectedKey].driver.status==1?'stop':'go')}</button>;

			} else {
				gmaps = <div />;
				status = <div />;	   
			}
			return (
					<div>
					<div className="row">
					<div className="col">
					<div className="btn-group-vertical">
					{button}
					<button onClick={this.stopDriver} type="button" className={"btn btn-primary"}>remoove</button>
					<button onClick={this.addDriver} type="button" className={"btn btn-primary"}>add</button>
				    <select onChange={this.keySelected} size={count} className={"custom-select"} value={selectedKey}>{keysOptions}</select>
					</div>
					</div>
					<div className="col-10">
					{select}
					{gmaps}	
					</div></div>
					</div>
			);
		}
	}

	export default Drivers;