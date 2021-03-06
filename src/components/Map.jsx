import { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfoBox from './LocationInfoBox';

// define constants
const NATURAL_EVENT_WILDFIRES = 8;

const Map = ({ eventData, center, zoom }) => {
	const [locationInfo, setLocationInfo] = useState(null);

	const markers = eventData.map((ev, index) => {
		if (ev.categories[0].id === NATURAL_EVENT_WILDFIRES) {
			return (
				<LocationMarker
					key={index}
					lat={ev.geometries[0].coordinates[1]}
					lng={ev.geometries[0].coordinates[0]}
					onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
				/>
			);
		}
		return null;
	});

	return (
		<div className='map'>
			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyB6D12i6ScymPuwjMCUAdC-Ko9RUzRFPAk' }}
				defaultCenter={center}
				defaultZoom={zoom}
			>
				{markers}
			</GoogleMapReact>
			{locationInfo && <LocationInfoBox info={locationInfo} />}
		</div>
	);
};

Map.defaultProps = {
	center: {
		lat: 39.0742,
		lng: 21.8243,
	},
	zoom: 6,
};

export default Map;
