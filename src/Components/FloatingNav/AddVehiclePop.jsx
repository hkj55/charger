import './FloatingNav.css'
import Popover from '@mui/material/Popover';
import React, { useEffect, useState, useRef} from 'react';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import api from '../../api/axios'

const AddVehiclePop = (props) => {

  const [makes, setMakes] = useState([])
  const [make, setMake] = useState('')
  const [models, setModels] = useState([])
  const [model, setModel] = useState('')
  const [trims, setTrims] = useState([])
  const [trim, setTrim] = useState('')

  const handleClose = (reason) => {
    props.setOpen(false);
    if (reason === 'clickaway') {
      return;
    }
  } 
  
  useEffect(() => {
    setMake('')
    setModel('')
    setTrim('')
  }, [props]);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await api.get('/makes');
        setMakes(response.data)

      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchMakes();
  }, []) 
  
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await api.get('/models');
        const data = response.data
        setModels(data)

      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchModels();
  }, [make])

  useEffect(() => {
    const fetchTrims = async () => {
      try {
        const response = await api.get('/trims');
        setTrims(response.data)

      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchTrims();
  }, [model])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVehicle = {make, model, trim};
    try {
      const response = await api.post('/vehicles', newVehicle);
      console.log(response);
      setMake('')
      setModel('')
      setTrim('')
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
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
                  <h4>Vehicle</h4>
                </Row>
                <Row className='centerText'>
                  <h1>{make + ' : ' + model}</h1>
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
                            value={make}
                            onChange={e => setMake(e.target.value)}
                          >
                            <option>Select a make</option>
                              {makes.map((item, index) => (
                                <option 
                                  key={index} 
                                  value={item.name}
                                >
                                  {item.name}
                                </option>
                              ))}
                          </Form.Select>          
                      </Form.Group>
                      <Form.Group className={'my-3'} >
                        <Form.Label className='' size='sm'>Model</Form.Label>    
                        <span className="mandatory"> *</span>                   
                        <Form.Select   
                            id="fromId" 
                            onChange={e => setModel(e.target.value)}
                            value={model}
                            >
                            <option>Select a make</option>
                              {models.map((item, index) => (
                                <option 
                                  key={index} 
                                  value={item.name}
                                >
                                  {item.name}
                                </option>
                              ))}
                          </Form.Select>          
                      </Form.Group>
                      <Form.Group className={'my-3'} >
                        <Form.Label className='' size='sm'>Trim</Form.Label>    
                        <span className="mandatory"> *</span>                   
                        <Form.Select   
                            id="fromId" 
                            onChange={e => setTrim(e.target.value)}
                            value={trim}
                          >
                            <option>Select a make</option>
                              {trims.map((item, index) => (
                                <option 
                                  key={index} 
                                  value={item.name}
                                >
                                  {item.name}
                                </option>
                              ))}
                          </Form.Select>          
                      </Form.Group>
                        <Row className='my-5'>
                          <Col md='12' className='d-flex justify-content-end m-0 p-0'>
                            <Button 
                              onClick ={handleSubmit}
                              disabled={make === '' || model === '' || trim === ''}
                            >
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