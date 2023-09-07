import './FloatingNav.css'
import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from './MapContainer';
import { Categories, PlacesData } from '../../Data/Data';
import StationCard from './StationCard';
import api from '../../api/axios'

const AddNew = (props) => {

  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [stations, setStations] = useState([])/* 
  const [stationList, setStationList] = useState([]) */
  const [open24, setOpen24] = useState(false)
  const [restricted, setRestricted] = useState(false)
  const [payment, setPayment] = useState(false)
  const [hours, setHours] = useState('')
  const [price, setPrice] = useState('')
  const [phone, setPhone] = useState('')
  const [parkingLevel, setParkingLevel] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [parking, setParking] = useState([])
  const [access, setAccess] = useState([])
  const [amenities, setAmenities] = useState([])
  const [stationComponents, setStationComponents] = useState([{key:1, index:1}]);
  const [index, setIndex] = useState(1)

  useEffect(() => {
    setName('')
    setAddress('')
    setDescription('')
    setStations([])
    setLat('')
    setLng('')
    setOpen24(false)
    setPrice('')
    setPhone('')
    setParkingLevel('')
    setParking([])
    setAccess([])
    setAmenities([])
  }, [props]);
  
  const handleRemove = (indexToRemove) => {
    const updatedStations = stationComponents.filter(
      (station) => station.key !== indexToRemove
    );
    setStationComponents(updatedStations);
    console.log(indexToRemove)
  };

  const handleAddStation = () => {
    const newIndex = index + 1;
    const newStation = {
      key: newIndex,
      index: newIndex,
    };
    setStationComponents([...stationComponents, newStation]);
    setIndex(newIndex)
  };

  const handleParking = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add its value to the parking array
      setParking([...parking, checkboxValue]);
    } else {
      // Checkbox is unchecked, remove its value from the parking array
      setParking(parking.filter(item => item !== checkboxValue));
    }
  };

  const handleAccess = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add its value to the access array
      setAccess([...access, checkboxValue]);
    } else {
      // Checkbox is unchecked, remove its value from the access array
      setAccess(access.filter(item => item !== checkboxValue));
    }
  };
  
  const handleAmenities = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      // Checkbox is checked, add its value to the amenities array
      setAmenities([...amenities, checkboxValue]);
    } else {
      // Checkbox is unchecked, remove its value from the amenities array
      setAmenities(amenities.filter(item => item !== checkboxValue));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newlocation = {name, address, description, stations, open24, restricted,
                    payment, hours, price, phone, parkingLevel, lat, lng, parking,
                    access, amenities};
    try {
      const response = await api.post('/locations', newlocation);
      props.setIsAdd(!props.isAdd)
      console.log(response)
      props.onHide()
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }
  
  return (
    <Modal
      {...props}
      aria-labelledby="google-login"
      centered
      size='lg'
      scrollable={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="google-login" className='login-title'>
          Add New Location
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row id='signInDiv' className="mb-3">
            <Col xs={12} md={12} >
              <Form>
                <Row>
                  <Col xs={12} md={6} >
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <span className="mandatory"> *</span>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6} >
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <span className="mandatory"> *</span>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>
                </Row>
                <Row className="mb-5 ms-5 map-div">      
                    <MapContainer
                      lat={lat}
                      setLat={setLat}
                      lng={lng}
                      setLng={setLng}
                    />     
                </Row>
                <Row>
                  <Col xs={12} md={12} className='add'>
                    <Form.Group className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>            
                  <Row className='mb-3'>
                    <h5 className='my-3'>Station</h5>
                      {stationComponents.map((station) => (
                      <StationCard
                        key={station.key}
                        index={station.index}
                        handleRemove={() => handleRemove(station.key)}
                        setStations={setStations}
                      />
                    ))}
                    <div className='m-3'>
                      <Button variant="outline-primary" onClick={() => handleAddStation()}>Add Station</Button>
                    </div>
                  </Row>
                  <Row className='mt-3 mb-5'>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                      type={'switch'}
                      id={'ac1'}
                      label={'Open 24/7'}
                      value={open24}
                      onChange={e => setOpen24(e.target.value)}
                    />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'switch'}
                        id={'ac2'}
                        label={'Restricted Access'}
                        value={restricted}
                        onChange={e => setRestricted(e.target.value)}
                      />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'switch'}
                        id={'ac3'}
                        label={'Payment Required'}
                        value={payment}
                        onChange={e => setPayment(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Col xs={12} md={6} className='add'>
                    <Form.Group className="mb-3">
                      <Form.Label>Hours</Form.Label>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={hours}
                        onChange={e => setHours(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>
                  <Col xs={12} md={6} className='add'>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>
                  <Col xs={12} md={6} className='add'>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>
                  <Col xs={12} md={6} className='add'>
                    <Form.Group className="mb-3">
                      <Form.Label>Parking Level</Form.Label>
                      <Form.Control
                        type="text"
                        id = 'nameId'
                        value={parkingLevel}
                        onChange={e => setParkingLevel(e.target.value)}
                      />
                    </Form.Group>                    
                  </Col>
                  <Row>
                    <h4 className='my-3'>Parking Attributes</h4>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                      type={'checkbox'}
                      id={'ac1'}
                      label={'Pull through parking'}
                      value={'Pull through parking'}
                      onChange={handleParking}
                    />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac2'}
                        label={'Pull in parking'}
                        value={'Pull in parking'}
                        onChange={handleParking}
                      />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Trailer Parking'}
                        value={'Trailer Parking'}
                        onChange={handleParking}
                      />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Trailer Friendly'}
                        value={'Trailer Friendly'}
                        onChange={handleParking}
                      />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac2'}
                        label={'Garage'}
                        value={'Garage'}
                        onChange={handleParking}
                      />
                    </Col>
                    <Col xs={6} md={4} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Handicapped parking'}
                        value={'Handicapped parking'}
                        onChange={handleParking}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <h4 className='my-3'>Access Restriction</h4>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                      type={'checkbox'}
                      id={'ac1'}
                      label={'Customers Only'}
                      value={'Customers Only'}
                      onChange={handleAccess}
                    />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac2'}
                        label={'Guest Only'}
                        value={'Guest Only'}
                        onChange={handleAccess}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Residents Only'}
                        value={'Residents Only'}
                        onChange={handleAccess}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Employees Only'}
                        value={'Employees Only'}
                        onChange={handleAccess}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <h4 className='my-3'>Amenities</h4>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                      type={'checkbox'}
                      id={'ac1'}
                      label={'Restroom'}
                      value={'Restroom'}
                      onChange={handleAmenities}
                    />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac2'}
                        label={'Parking'}
                        value={'Parking'}
                        onChange={handleAmenities}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Wifi'}
                        value={'Wifi'}
                        onChange={handleAmenities}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Dining'}
                        value={'Dining'}
                        onChange={handleAmenities}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac2'}
                        label={'Shopping'}
                        value={'Shopping'}
                        onChange={handleAmenities}
                      />
                    </Col>
                    <Col xs={6} md={3} className='add'>
                      <Form.Check
                        type={'checkbox'}
                        id={'ac3'}
                        label={'Grocery'}
                        value={'Grocery'}
                        onChange={handleAmenities}
                      />
                    </Col>
                  </Row>
                </Row>
              </Form>
            </Col>            
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className='add'
          onClick={handleSubmit}
          disabled={name === '' || address === '' || lat === '' || lng === ''}
        >
          Add Station
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddNew