/* eslint-disable no-undef */
import React, { Component } from 'react';
import './CityForm2.css';
import CityView from '../CityView/CityView';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
	button,
	Link,
} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { FaSearch } from 'react-icons/fa';
import AutoComplete from 'react-google-autocomplete';
import PropTypes from 'prop-types';
class CityForm2 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			submitted: false,
			city: 'default',
			state: 'stateDefault',
			found: true,
			selected: false,
		};
	}
	typingTimer = null;
	//sets city everytime there's a change in the textbox
	static contextTypes = {
		router: PropTypes.object,
	};
	componentDidMount() {
		this.geocoder = new google.maps.Geocoder();
	}

	//takes in user input and converts that into a address object that contains a lot of information about the input
	//if the input is a city, it sets the city and state of that location and sends it to the url
	geocodeAddress = (address) => {
		//console.log('PARSE CALLED = ' + address);
		setTimeout(function () {}, 3000);
		this.geocoder.geocode(
			{ address: address },
			function handleResults(results, status) {
				if (status === google.maps.GeocoderStatus.OK) {
					console.log(results);
					console.log(
						'Geocoder results ->' +
							results[0].address_components[0].short_name
					);
					//let place = results[0].address_components[0].long_name;
					//retrn

					this.setState(
						{
							city: results[0].address_components[0].long_name,
							state: results[0].address_components[2].long_name,
							selected: true,
						},
						() => {
							console.log(this.state);
						}
					);
					this.context.router.history.push(
						`/citystate/${this.state.city}&${this.state.state}`
					);
				} else {
					console.log('not ok');
				}
			}.bind(this)
		);
	};

	// receives user-entered input and autocomplete-selected input as 'place.'
	// on submit, if place.formatted_address is undefined, then it was a user-entered input and feeds that info to
	// the geocoder
	// if place is defined, then it is a autocomplete-selected input and feeds it to the geocoder.
	onPlaceSelectedHandler = (place) => {
		console.log(place.formatted_address);
		console.log(place);

		if (place.formatted_address === undefined) {
			console.log('place is undefined');
			//geocode place.name

			this.geocodeAddress(place.name);
		} else {
			console.log('not undefined');
			//geocode formatted_address
			this.geocodeAddress(place.formatted_address);
		}
	};
	handleSubmit = (event) => {
		console.log('submit');

		event.preventDefault();
	};

	render() {
		return (
			<div className="form">
				<form onSubmit={this.handleSubmit} className="search-box2">
					<AutoComplete
						type="text"
						onPlaceSelected={this.onPlaceSelectedHandler}
						className="textbox2"
						placeholder="Enter City"
					/>

					{this.state.selected ? (
						<Link
							to={`/citystate/${this.state.city}&${this.state.state}`}
						>
							<a className="search-btn2">
								<FaSearch /> <button />
							</a>
						</Link>
					) : (
						<a className="search-btn2">
							<FaSearch /> <button />
						</a>
					)}
				</form>
			</div>
		);
	}
}

export default CityForm2;