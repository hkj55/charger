import React, {useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CloseButton from 'react-bootstrap/CloseButton';
import {RxCopy} from 'react-icons/rx'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import api from '../../api/axios'

const StationCard = (props) => {

    const [plugs, setPlugs] = useState([])
    const [plug, setPlug] = useState('')
    const [networks, setNetworks] = useState([])
    const [network, setNetwork] = useState('')

    
  useEffect(() => {
    const fetchPlugs = async () => {
      try {
        const response = await api.get('/Plugs');
        setPlugs(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    const fetchNetworks = async () => {
      try {
        const response = await api.get('/Network');
        setNetworks(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range 
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }

    fetchPlugs();
    fetchNetworks();
  }, [])

  useEffect(() => {
    if(plug !== ''){
      props.setStations([{plug, network}])
    }
  },[plug, network])

  return (
    <Col md={6}>
    <Card sx={{ width: 325 }} className='m-2'>
      <CardContent className='py-1'>
        <Row className='d-flex justify-content-end'>
            {/* <RxCopy/> */}
            <CloseButton className='pe-1' onClick={() => props.handleRemove(props.index)}/>
        </Row>
        <Row>
            <Col md={3}>
                {props.index}
            </Col>
            <Col md={9}>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Station</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={plug}
                      onChange={(e) => setPlug(e.target.value)}
                      label="Station"
                      >
                      {
                        plugs.map((plug) => (
                          <MenuItem key={plug.id} value={plug.name}>
                            {plug.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>   
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="demo-simple-select-standard-label">Network</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={network}
                      onChange={(e) => setNetwork(e.target.value)}
                      label="Network"
                      >
                      {
                        networks.map((network) => (
                          <MenuItem key={network.id} value={network.name}>
                            {network.name}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>     
            </Col>
        </Row>
      </CardContent>
    </Card>
    </Col>
  )
}

export default StationCard