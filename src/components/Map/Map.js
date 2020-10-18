import React from 'react';

import {GoogleMapContainer} from './MapStyles.js';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleeMap = (props) => {
	
		return (
			<GoogleMapContainer>
				<GoogleMap
				    defaultZoom={8}
				    defaultCenter={{ lat: -34.397, lng: 150.644 }} >
				    {
				    	this.props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />
				    }
				 </GoogleMap>
			</GoogleMapContainer>
			)

}




export default withScriptjs((props) => withGoogleMap((props) => GoogleeMap));





