import './Main.css'
import React, {useEffect, useState} from 'react'
import MapContainer from '../Map/MapContainer '
import FloatingNav from '../FloatingNav/FloatingNav';
import api from '../../api/axios'

const Main = () => {
  
  const [allMarkers, setAllMarkers] = useState([])
  const [markers, setMarkers] = useState([]);
  const [plugs, setPlugs] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await api.get('/locations');
        setAllMarkers(response.data);

      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchLocations();
  }, [isAdd])

  useEffect(() => {

    //filter from plug type
    if(plugs.length !== 0){

      const filteredByPlugs = allMarkers.filter(location =>
        location.stations.some(station => plugs.includes(station.plug))
      );

      //filter from plug and amenities
      if(amenities.length !== 0){

        const filteredLocations = filteredByPlugs.filter(location =>
          location.amenities.some(amenity =>
            amenities.includes(amenity)
          )
        );
        setMarkers(filteredLocations) 
      }else{
        setMarkers(filteredByPlugs)
      }
      
    //filter from amenities  
    }else if( amenities.length !== 0 && plugs.length === 0){
      const filteredLocations = allMarkers.filter(location =>
        location.amenities.some(amenity =>
          amenities.includes(amenity)
        )
      );
      setMarkers(filteredLocations)
    }else{
      setMarkers(allMarkers)
    }
    
  }, [plugs, amenities, allMarkers])

  return (
    <div class="main-con">
        <MapContainer
          markers={markers}
          setMarkers={setMarkers}
         />
        <div className='floating-div'>
          <FloatingNav 
            isAdd={isAdd}
            setIsAdd={setIsAdd}
            plugs={plugs}
            setPlugs={setPlugs}
            amenities={amenities}
            setAmenities={setAmenities}
          />
        </div>
    </div>    
  )
}

export default Main