import './FloatingNav.css'
import Popover from '@mui/material/Popover';
import React, { useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';

const AddVehiclePop = (props) => {

  let variant = 'success';

  const [make, setMake] = useState('')
  const [model, setModel] = useState('')
  const [trim, setTrim] = useState('')

  const handleClose = (reason) => {
    props.setOpen(false);
    if (reason === 'clickaway') {
      return;
    }
  }
      
  return (
    <div className={props.open ? 'glass-effect' : ''}> 
      <Popover
        className='pop-up'
        open={props.open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: window.innerHeight / 2, left: window.innerWidth / 2 }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        >   
        <div>
          <Row>
            <Col md={6} className='gradient-background center white-letters'>
              <div>
                <Row className='centerText '>
                  <h4>Select Your</h4>                  
                </Row>
                <Row className='centerText'>
                  <h1>Vehicle</h1>
                </Row>
                <Row className='centerText'>
                  <h4>Make</h4>
                </Row>                
              </div>          
            </Col>
            <Col md={6} className='outer-div'> 
              <div className='end-div pe-3'>
                <CloseButton onClick={handleClose} />
              </div>  
              <Row className='pop-up-title'>
                My vehicles
              </Row> 
                <div className='d-flex justify-content-center p-4 m-1'>  
                  <Form>
                    <Row>
                      <Form.Group className={'my-3'} >
                        <Form.Label className='' size='sm'>Make</Form.Label>    
                        <span className="mandatory"> *</span>                   
                        <Form.Select   
                            id="fromId" 
                            onChange={() => setMake()}
                            value={make}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>          
                      </Form.Group>
                      <Form.Group className={'my-3'} >
                        <Form.Label className='' size='sm'>Model</Form.Label>    
                        <span className="mandatory"> *</span>                   
                        <Form.Select   
                            id="fromId" 
                            onChange={() => setModel()}
                            value={model}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>          
                      </Form.Group>
                      <Form.Group className={'my-3'} >
                        <Form.Label className='' size='sm'>Trim</Form.Label>    
                        <span className="mandatory"> *</span>                   
                        <Form.Select   
                            id="fromId" 
                            onChange={() => setTrim()}
                            value={trim}>
                            <option>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </Form.Select>          
                      </Form.Group>
                        <Row className='my-5'>
                          <Col md='12' className='d-flex justify-content-end m-0 p-0'>
                            <Button>
                              Add Vehicle
                            </Button>
                          </Col>
                        </Row>
                    </Row>
                  </Form> 
              </div> 
            </Col> 
          </Row>
        </div>
      </Popover>
    </div>
  );
}

export default AddVehiclePop