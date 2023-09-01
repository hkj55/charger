import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import location from '../../../src/icons/orange.png'

const Marker = () => (
  <div className='marker'>
    <img className='m-img' src={location} alt="Location Icon" />
  </div>
);


const MapContainer = () => {
  const [clickedLocation, setClickedLocation] = useState(null);

  /* useEffect(() => {
    if (clickedLocation) {
      console.log('clicked');
      console.log(clickedLocation.lat);
      console.log(clickedLocation.lng);
    }
  }, [clickedLocation]); */

  const handleMapClick = ({ lat, lng }) => {
    setClickedLocation({ lat, lng });
  };

  const defaultProps = {
    center: {
      lat: 7.2906, // Kandy, Sri Lanka latitude
      lng: 80.6337, // Kandy, Sri Lanka longitude
    },
    zoom: 10,
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDT_0tiTNzV5dw8Khl-K0cY5kMmrvcmlfA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={handleMapClick}
      >
        {clickedLocation && (
          <Marker lat={clickedLocation.lat} lng={clickedLocation.lng} text="Clicked Location" />
        )}
        {/* <Marker lat={7.2906} lng={80.6337}  /> */}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
