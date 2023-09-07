import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const MapContainer = (props) => {
  const [clickedLocation, setClickedLocation] = useState(null);

  /* useEffect(() => {
    
  }, []); */

  const defaultProps = {
    center: {
      lat: 7.2906, // Kandy, Sri Lanka latitude
      lng: 80.6337, // Kandy, Sri Lanka longitude
    },
    zoom: 10,
  };

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  const handleMapClick = ( {lat, lng} ) => {
    setClickedLocation({ lat, lng });
    props.setLat(lat)
    props.setLng(lng)
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDT_0tiTNzV5dw8Khl-K0cY5kMmrvcmlfA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        distanceToMouse={distanceToMouse}
        onClick={handleMapClick}
      >
        {clickedLocation && (
          <Marker lat={clickedLocation.lat} lng={clickedLocation.lng} tooltip={"New Location" } />
        )}
        {/* <Marker lat={7.2906} lng={80.6337}  /> */}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
