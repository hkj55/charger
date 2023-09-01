import React from 'react';
import GoogleMapReact from 'google-map-react';
import { PlacesData } from '../../Data/Data';
import Marker from './Marker';

const MapContainer = () => {

  const markers = PlacesData;

  const defaultProps = {
    center: {
      lat: 7.2906, // Kandy, Sri Lanka latitude
      lng: 80.6337, // Kandy, Sri Lanka longitude
    },
    zoom: 10, // Default zoom level
  };

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  return (
    <div className='main-map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDT_0tiTNzV5dw8Khl-K0cY5kMmrvcmlfA' }} // Replace with your API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        distanceToMouse={distanceToMouse}
      >
        {markers.map((marker, index) => (
        <Marker key={index} lat={marker.lat} lng={marker.lng} text={`${index + 1}`} />
      ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
