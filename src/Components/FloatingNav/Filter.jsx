import React, {useState, useEffect} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ccs from '../../images/Combo-ccs-eu.svg.png'
import typeTwo from '../../images/type2.png'
import ChaDeMo from '../../images/CHAdeMO.jpg'
import gbtFast from '../../images/gbtFast.webp'
import restrooms from '../../images/restroompng.png'
import dining from '../../images/dining.png'
import free from '../../images/free.png'
import shopping from '../../images/shopping.png'
import parking from '../../images/parking.png'
import wifi from '../../images/wifi.jpg'
import grocery from '../../images/grocery.png'
import j from '../../images/J1772.png'
import {FaFilter} from 'react-icons/fa';
import {RiMenuAddFill} from 'react-icons/ri'
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from 'react-bootstrap';
import AddVehiclePop from './AddVehiclePop';

const listItems = [
  'Any',
  '2+',
  '4+',
  '6+',
];

const Filter = (props) => {

  const [station, setStation] = useState(true);
  const [activeItem, setActiveItem] = useState('Any');

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false)

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const handlePlugs = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add its value to the parking array
      props.setPlugs([...props.plugs, checkboxValue]);
    } else {
      // Checkbox is unchecked, remove its value from the parking array
      props.setPlugs(props.plugs.filter(item => item !== checkboxValue));
    }
  };
  
  const handleAmenities = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add its value to the amenities array
      props.setAmenities([...props.amenities, checkboxValue]);
    } else {
      // Checkbox is unchecked, remove its value from the amenities array
      props.setAmenities(props.amenities.filter(item => item !== checkboxValue));
    }
  };
  
  const openClick = () => setOpen(true);

  return (
    <div>
    <AddVehiclePop
    open={open}
    setOpen = {setOpen}
    />
    <Offcanvas 
      show={props.show} 
      onHide={props.handleClose}
      scroll= {true}
      backdrop= {false}
    >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Filter
            <FaFilter className='ms-2' size={15}/>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body /* className='ms-5' */>
          <Form>
            <Row className='topics box py-2'>
              <Col md={10}>
                  Vehicle  
              </Col> 
              <Col md={2}>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={openClick}
                >
                  <RiMenuAddFill size={15}/>
                </Button>
              </Col>           
            </Row>{/* 
            <Row className='mt-3 p-3' >
              <Row className='topics mb-3'>
                Station Count
              </Row>
              <Row className='center'>
                <ListGroup horizontal className='center'>
                  {listItems.map((item, index) => (
                    <ListGroup.Item
                      key={index}
                      active={item === activeItem}
                      onClick={() => handleItemClick(item)}
                      className='station'
                      variant="secondary"
                    >
                      {item}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Row>
            </Row> */}
            <div>
              <Row className='topics mt-3 mx-0'>
                  Plugs
              </Row>
              <Row className='my-1 filterBox'>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac1'}
                    value={'CCS/SAE'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Type 2'
                          className='img'
                        /><br/>
                        CCS/SAE
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac2'}
                    value={'CHAdeMo'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ChaDeMo} 
                          alt='CHAdeMo'
                          className='img'
                        /><br/>
                        CHAdeMo
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac3'}
                    value={'J-1772'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={j} 
                          alt='J-1772'
                          className='img'
                        /><br/>
                        J-1772
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac4'}
                    value={'Type 2'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={gbtFast} 
                          alt='Type 2'
                          className='img'
                        /><br/>
                        Type 2
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac5'}
                    value={'Type 3'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Type 3'
                          className='img'
                        /><br/>
                        Type 3
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac6'}
                    value={'Three Phase'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Three Phase'
                          className='img'
                        /><br/>
                        Three Phase
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac7'}
                    value={'Caravan Main Socket'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Caravan Main Socket'
                          className='img'
                        /><br/>
                        Caravan Main Socket
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac8'}
                    value={'GB/T'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={typeTwo} 
                          alt='GB/T'
                          className='img'
                        /><br/>
                        GB/T
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac9'}
                    value={'GB/T (Fast)'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={gbtFast} 
                          alt='GB/T (Fast)'
                          className='img'
                        /><br/>
                        GB/T (Fast)
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac10'}
                    value={'Wall'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Wall'
                          className='img'
                        /><br/>
                        Wall
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac11'}
                    value={'Wall (BS1336)'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Wall (BS1336)'
                          className='img'
                        /><br/>
                        Wall (BS1336)
                      </>
                    }
                  />             
                </Col>
                <Col md={4} className='filterBox'> 
                  <Form.Check
                    type={'checkbox'}
                    id={'ac12'}
                    value={'Wall (Euro)'}
                    onChange={handlePlugs}
                    label={
                      <>
                        <img
                          src={ccs} 
                          alt='Wall (Euro)'
                          className='img'
                        /><br/>
                        Wall (Euro)
                      </>
                    }
                  />             
                </Col>
              </Row>
            </div>
            {/* ------------------------------------------------------------------------------------------------------------------ */}
            <Row className='topics mt-3 mx-0'>
                  Amenities
              </Row>
            <Row className='my-1 filterBox'>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a1'}
                  value={'Dining'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={dining} 
                        alt='Dining'
                        className='imgTwo'
                      /><br/>
                      Dining
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a2'}
                  value={'Restrooms'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={restrooms} 
                        alt='Restrooms'
                        className='imgTwo'
                      /><br/>
                      Restrooms
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a3'}
                  value={'Shopping'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={shopping} 
                        alt='Shopping'
                        className='imgTwo'
                      /><br/>
                      Shopping
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a4'}
                  value={'Lodging'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={ccs} 
                        alt='Lodging'
                        className='imgTwo'
                      /><br/>
                      Lodging
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a5'}
                  value={'Park'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={parking} 
                        alt='Park'
                        className='imgTwo'
                      /><br/>
                      Park
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a6'}
                  value={'Grocery'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={grocery} 
                        alt='Grocery'
                        className='imgTwo'
                      /><br/>
                      Grocery
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a7'}
                  value={'Wifi'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={wifi} 
                        alt='Wifi'
                        className='imgTwo'
                      /><br/>
                      Wifi
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                <Form.Check
                  type={'checkbox'}
                  id={'a8'}
                  value={'Free Chargings'}
                  onChange={handleAmenities}
                  label={
                    <>
                      <img
                        src={free} 
                        alt='Free Charging'
                        className='imgTwo'
                      /><br/>
                      Free Charging
                    </>
                  }
                />             
              </Col>
              <Col md={4} className='filterBox'> 
                {/* <Form.Check
                  type={'checkbox'}
                  id={'ac1'}
                  label={
                    <>
                      <img
                        src={ccs} 
                        alt='Wall (Euro)'
                        className='img'
                      /><br/>
                      Wall (Euro)
                    </>
                  }
                />  */}            
              </Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}

export default Filter