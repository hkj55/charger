import React from "react";
import redMarker from '../../icons/red.png';

const Marker = ({ tooltip}) => {



  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div  >{/* 
      <span className="circleText" title={tooltip} /> */}
      <img onClick={handleClick} alt="marker" src={redMarker} className={ "circle"} title={tooltip}/>
    </div>
  );
};

export default Marker;
