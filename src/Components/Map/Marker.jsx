import React,{useState} from "react";
import redMarker from '../../icons/red.png';
import Station from './Station'

const Marker = ({ tooltip, name, address, description, stations, open24,
                  restricted, payment, hours, price, phone, parkingLevel,
                  parking, access, amenities
                }) => {

  const [show, setShow] = useState(false);  

  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => {
    setShow(true)
  };

  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
    handleShow()
  };

  return (
    <div  >{/* 
      <span className="circleText" title={tooltip} /> */}
      <img onClick={handleClick} alt="marker" src={redMarker} className={ "circle"} title={tooltip}/>
        <Station
          show={show}
          handleClose={handleClose}
          name={name}
          address={address}
          description={description}
          stations={stations}
          open24={open24}
          restricted={restricted}
          payment={payment}
          hours={hours}
          price={price}
          phone={phone}
          parkingLevel={parkingLevel}
          parking={parking}
          access={access}
          amenities={amenities}
        />      
    </div>
  );
};

export default Marker;
