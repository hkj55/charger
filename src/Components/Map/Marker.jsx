import React from "react";
import location from '../../../src/icons/red.png'

const Marker = ({ text, tooltip, $hover }) => {
  const handleClick = () => {
    console.log(`You clicked on ${tooltip}`);
  };

  return (
    <div className='marker'>
      <img className='m-img' src={location} alt="Location Icon" />
    </div>
    
  );
};

export default Marker;
