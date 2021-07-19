
import React, { Component } from 'react';

import ReactDOM from 'react-dom';

import { GoogleMap, LoadScript, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';

import Drivers from "./Drivers";

class GMap extends Component {
	constructor (props) {
		super(props)

		this.propsrender

		this.state = {
			index: [],
			indexD: '',
			response: null,
			isRequsted: false,
			destination: '',
			origin: '',
			travelMode: 'DRIVING',
			waypoints:[],
			renderStatments: false,
		}

		this.directionsCallback = this.directionsCallback.bind(this)
		this.setRoute = this.setRoute.bind(this)
		this.setIndex = this.setIndex.bind(this)
		this.getOrigin = this.getOrigin.bind(this)
		this.getDestination = this.getDestination.bind(this)
		this.onClick = this.onClick.bind(this)
		this.onMapClick = this.onMapClick.bind(this)

	}

	componentDidMount() {
		if(this.state.renderStatments === false && this.props.driverroute != undefined && this.state.isRequsted === false){
			this.setRoute(this.props);
		}
	}

	shouldComponentUpdate(nextProps, nextState){
		if(this.props !== nextProps){
			return true;
		} else {
		if(nextState.indexD in nextState.index){
			return true;
		} else {
			if (this.state.isRequsted === false && nextState.isRequsted === true){
				return true;
			} else {
				if(this.state.indexD !== nextState.indexD){
					return true;
				} else if(this.state.renderStatments === false && nextState.renderStatments !== false)
				{ 
					return true;
				}
				else{
					return false;
				}
			}
		}}
	}

	componentDidUpdate(oldProps, oldState) {
		if (this.props.driverroute !== oldProps.driverroute){
			this.setRoute(this.props);
			clearTimeout(this.propsrender);
			this.propsrender = setTimeout(function() {
				this.setRoute(this.props);
			}.bind(this), 1000)
		}
	}

	setIndex(newProps){
		var indexDir = '';
		var indexX = newProps.driverroute.driver.driver_id ;
		indexDir += newProps.driverroute.locations.map(
				(key)=>{
					return indexX + '_' + key.location_id + '^' + key.status + '^' + key.lat+key.lng;
				}
		);
		return indexDir;
	}

	setRoute(newProps){
		if(newProps.driverroute != undefined){
			var pr = this.setIndex(newProps);
			if(pr in this.state.index){
				this.setState(function(state, props) {
					return {
						response: null,
						indexD: pr,
						isRequsted: false,
						renderStatments: 0,
					}
				});

			} else {
				this.setState(function(state, props) {
					var o, d;
					var oi = 0;
					var di = 0;
					var wp = [];
					newProps.driverroute.locations.map(
							(key)=>{
								var l = key.lat + ',' + key.lng;
								if(key.status==2&&oi<1){
									oi++;
									o = l;
								}else if(key.status==3&&di<1){
									di++;
									d = l;
								}else{
									var sv = key.status!=1?true:false;
									wp.push({location: l, stopover: sv});
								};
							});

					if(oi>1||di>1){console.log('Direction Error: Check point to DB.')}
					return {
						origin: o,
						destination: d,
						waypoints: wp,
						response: null,
						indexD: pr,
						isRequsted: false,
						renderStatments: 0,
					}
				});
			}}
	}

	directionsCallback (qq, response) {
		if(qq in this.state.index){
		}else{
			if (response !== null) {
				if (response.status === 'OK'){
					if(this.state.isRequsted === false) {
						this.setState(
								function(state, props) {
									//var id = that.setIndex(props);
									var d = qq;
									var i = state.index;
									i[d] = response;
									return {
										index: i,
										response: response,
										indexD: d,
										isRequsted: true,
										renderStatments: 0,
									}
								});
					} else {
						this.setState(
								function(state, props) {
									var d = qq;
									var i = state.index;
									i[d] = response;
									return {
										index: i,
										renderStatments: false,
									}
								});
					}
				} else {
					console.log('response: ', response);
				}
			} else {
				console.log(this.state.isRequsted  + 'NULL: '+ qq , response);
				this.setState(
						function(state, props) {
							var d = qq;
							return {
								renderStatments: false,
							}
						});
			}
		}
	}

	getOrigin (ref) {
		this.origin = ref
	}

	getDestination (ref) {
		this.destination = ref
	}

	onClick () {
		if (this.origin.value !== '' && this.destination.value !== '') {
			this.setState(
					() => ({
						origin: this.origin.value,
						destination: this.destination.value
					})
			)
		}
	}

	onMapClick (...args) {
		console.log('onClick args: ', args)
	}

	render () {
		var directionRender, directionServices;
		var inxD = this.state.indexD;
		if(this.state.indexD in this.state.index){
			console.log("  " + this.state.indexD);
			directionRender = <DirectionsRenderer
			// required
			options={{

				directions: this.state.index[this.state.indexD]
			}}
			onLoad={directionsRenderer => {

			}}

			onUnmount={directionsRenderer => {
				this.setState(
						function(state, props) {
							return {
								renderStatments: 0,
							}
						});
			}}
			/>;
		} else if(this.state.destination != '' && this.state.origin != '' && this.state.renderStatments !== false){

			directionServices = <DirectionsService options={{
				destination: this.state.destination,
				origin: this.state.origin,
				travelMode: this.state.travelMode,
				waypoints: this.state.waypoints,

			}} callback={this.directionsCallback.bind(this, this.state.indexD)}
			onLoad={directionsService => {
			}
			}
			// optional
			onUnmount={directionsService => {
			}}/>;
		} else {
		}

		return (
				<GoogleMap
				id='direction-example'
					mapContainerStyle={{
						height: '400px',
						width: '100%'
					}}
				onClick={this.onMapClick}
				onLoad={map => {
				}}
				onUnmount={map => {
				}}
				>
				{directionServices}
				{directionRender}
				</GoogleMap>
		)
	}
}

export default GMap;