import React, {useState, useEffect} from 'react';
import GoogleMapReact from 'google-map-react';/* 
import { PlacesData } from '../../Data/Data'; */
import Marker from './Marker';
import api from '../../api/axios'

const MapContainer = () => {

  const [markers, setMarkers] = useState([]);

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
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('/locations');
        setMarkers(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchLocations();
  }, [])

  return (
    <div className='main-map'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDT_0tiTNzV5dw8Khl-K0cY5kMmrvcmlfA' }} // Replace with your API key
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        distanceToMouse={distanceToMouse}
      >
        {markers.map((marker, index) => (
        <Marker key={index} lat={marker.lat} lng={marker.lng} />
      ))}
      </GoogleMapReact>
    </div>
  );
};

export default MapContainer;
