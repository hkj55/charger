import React, {useState, useEffect} from 'react';
import GoogleMap  from 'google-map-react';
import Marker from './Marker';

const MapContainer = (props) => {

  const points = props.markers;
  const [map, setMap] = useState(null); // State to hold the map object
  const [zoom, setZoom] = useState(10); // State to hold the current zoom level

  const defaultProps = {
    center: {
      lat: 7.2906, // Kandy, Sri Lanka latitude
      lng: 80.6337, // Kandy, Sri Lanka longitude
    },
    zoom: 10, // Default zoom level
  };

  /* const defaultProps = {
    center: {
      lat: 51.506, 
      lng: -0.169 , 
    },
    zoom: 15, 
  };

  const points = [
    { id: 1, name: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, name: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, name: "The Serpentine", lat: 51.505, lng: -0.164 }
  ];   */

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  
  // Function to handle the Google Maps API initialization
  const handleGoogleApiLoaded = (map, maps) => {
    setMap(map); // Store the map object in state

    // Update the zoom level when it changes
    map.addListener('zoom_changed', () => {
      setZoom(map.getZoom());
    });
  };

  return (
    <div className='main-map'>
      <GoogleMap 
        bootstrapURLKeys={{ key: 'AIzaSyDT_0tiTNzV5dw8Khl-K0cY5kMmrvcmlfA' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        distanceToMouse={distanceToMouse}
        onGoogleApiLoaded={({ map, maps }) => handleGoogleApiLoaded(map, maps)}
      >
        
        {points.map((point) => {
          return (
            <Marker 
              key={point.id} 
              lat={point.lat} 
              lng={point.lng} 
              tooltip={point.name} 
              name={point.name}
              address={point.address}
              description={point.description}
              stations={point.stations}
              open24={point.open24}
              restricted={point.restricted}
              payment={point.payment}
              hours={point.hours}
              price={point.price}
              phone={point.phone}
              parkingLevel={point.parkingLevel}
              parking={point.parking}
              access={point.access}
              amenities={point.amenities}
              />
          );
        })}
      </GoogleMap >
    </div>
  );
};

export default MapContainer;
