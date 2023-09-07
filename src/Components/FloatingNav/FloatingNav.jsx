import React, {useState, useEffect} from 'react'
import Fab from '@mui/material/Fab';
import { MdAddLocationAlt, MdAdminPanelSettings } from 'react-icons/md';
import {FaFilter} from 'react-icons/fa';
import AddNew from '../FloatingNav/AddNew';
import Row from 'react-bootstrap/Row';
import Filter from './Filter';
import Admin from '../Admin/Admin';

const FloatingNav = ({isAdd, setIsAdd, plugs, setPlugs, amenities, setAmenities}) => {
  
  const [showAdd, setShowAdd] = useState(false)
  const [show, setShow] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false)

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    
    // Check if the checkbox is being checked or unchecked
    if (checked) {
      // Add the checkbox value to the array
      setCheckedItems([...checkedItems, id]);
    } else {
      // Remove the checkbox value from the array
      setCheckedItems(checkedItems.filter(item => item !== id));
    }
  };

  const handleAdd = () => {
    setShowAdd(true)
  };

  const handleAdmin = () => setShowAdmin(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div >   
    <AddNew
      show={showAdd}
      onHide={() => setShowAdd(false)}
      isAdd={isAdd}
      setIsAdd={setIsAdd}
    />    
    <Admin
      show={showAdmin}
      onHide={() => setShowAdmin(false)}
    />  
    <Filter
      show={show}
      handleClose={handleClose}
      plugs={plugs}
      setPlugs={setPlugs}
      amenities={amenities}
      setAmenities={setAmenities}
    /> 
    <Row className='m-1'>
    <Fab 
      color='error' 
      aria-label="edit"
      onClick={handleAdmin}>
      <MdAdminPanelSettings size={25}/>
    </Fab>      
    </Row>
    <Row className='m-1'>
    <Fab 
      color="secondary" 
      aria-label="edit"
      onClick={handleAdd}
    >
      <MdAddLocationAlt 
        size={25}
      />
    </Fab> 
    </Row>
    <Row className='m-1'>
    <Fab 
      color="primary" 
      aria-label="edit"
      onClick={handleShow}>
      <FaFilter size={20}/>
    </Fab>      
    </Row>    
    </div>
  )
}

export default FloatingNav