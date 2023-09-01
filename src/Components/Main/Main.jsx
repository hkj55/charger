import './Main.css'
import React, {Component, useEffect, useState} from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import MapContainer from '../Map/MapContainer '
import FloatingNav from '../FloatingNav/FloatingNav';
import { PlacesData } from '../../Data/Data';

const Main = () => {
  
  /* const [places, setPlaces] = useState(PlacesData)

  useEffect(() => {
    localStorage.setItem('places', JSON.stringify(places))   
    console.log(places) 
  }, [places]); */

  return (
    <div class="main-con">
        <MapContainer />
        <div className='floating-div'>
          <FloatingNav />
        </div>
    </div>    
  )
}

export default Main