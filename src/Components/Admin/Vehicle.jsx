import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import api from '../../api/axios'

const Vehicle = () => {
  
  const [makes, setMakes] = useState([])
  const [make, setMake] = useState('');
  const [isEditMake, setIsEditMake] = useState(false)
  const [idMake, setIdMake] = useState(0)

  const [models, setModels] = useState([])
  const [model, setModel] = useState('');
  const [isEditModel, setIsEditModel] = useState(false)
  const [idModel, setIdModel] = useState(0)

  const [trims, setTrims] = useState([])
  const [trim, setTrim] = useState('');
  const [isEditTrim, setIsEditTrim] = useState(false)
  const [idTrim, setIdTrim] = useState(0)
    
  const columnsMake =[
    {
      name: 'Make',
      selector: row => row.name,
      wrap: true,
    },/* 
    {
      name: 'Description',
      selector: row => row.description,
      wrap: true,
    }, */
    {
      name: 'Actions',
      wrap: true,
      width: '200px',  
      selector: row => row.vatNo,
      cell: (row) => (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>          
          <Button
            className="edit-button"
            variant="warning"
            onClick={() => clickEditMake(row.name, row.id)}
          >
              Edit
          </Button>
          <Button 
            className= "ms-3 delete-button"
            variant="danger"
            onClick={() => handleDeleteMake(row.id)}
            >
              Delete 
          </Button>
        </div>
          
      ),
    }, 
]
    
const columnsModel =[
  {
    name: 'Model',
    selector: row => row.name,
    wrap: true,
  },/* 
  {
    name: 'Description',
    selector: row => row.description,
    wrap: true,
  }, */
  {
    name: 'Actions',
    wrap: true,
    width: '200px',  
    selector: row => row.vatNo,
    cell: (row) => (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>          
        <Button
          className="edit-button"
          variant="warning"
          onClick={() => clickEditModel(row.name, row.id)}
        >
            Edit
        </Button>
        <Button 
          className= "ms-3 delete-button"
          variant="danger"
          onClick={() => handleDeleteModel(row.id)}
          >
            Delete 
        </Button>
      </div>
        
    ),
  }, 
]
  
const columnsTrim =[
  {
    name: 'Trim',
    selector: row => row.name,
    wrap: true,
  },/* 
  {
    name: 'Description',
    selector: row => row.description,
    wrap: true,
  }, */
  {
    name: 'Actions',
    wrap: true,
    width: '200px',  
    selector: row => row.vatNo,
    cell: (row) => (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>          
        <Button
          className="edit-button"
          variant="warning"
          onClick={() => clickEditTrim(row.name, row.id)}
        >
            Edit
        </Button>
        <Button 
          className= "ms-3 delete-button"
          variant="danger"
          onClick={() => handleDeleteTrim(row.id)}
          >
            Delete 
        </Button>
      </div>
        
    ),
  } 
]

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

useEffect(() => {
  fetchMakes();
  fetchModels();
  fetchTrims();

}, [])

const handleSubmitMake = async (e) => {
  e.preventDefault();
  const newMake = {name:make};
  try {
    const response = await api.post('/makes', newMake);
    console.log(response);
    fetchMakes()
    setMake('')
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleSubmitModel = async (e) => {
  e.preventDefault();
  const newModel = {name:model};
  try {
    const response = await api.post('/models', newModel);
    console.log(response);
    fetchModels()
    setModel('')
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleSubmitTrim = async (e) => {
  e.preventDefault();
  const newTrim = {name:trim};
  try {
    const response = await api.post('/trims', newTrim);
    console.log(response);
    fetchTrims()
    setTrim('')
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleEditMake = async (id) => {
  const updated = {name:make};
  try {
    await api.put(`/makes/${id}`, updated);  
    fetchMakes();    
    setMake('')
    setIsEditMake(false)
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleEditModel = async (id) => {
  const updated = {name:model};;
  try {
    await api.put(`/models/${id}`, updated);  
    fetchModels();    
    setModel('')
    setIsEditModel(false)
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleEditTrim = async (id) => {
  const updated = {name:trim};;
  try {
    await api.put(`/trims/${id}`, updated);  
    fetchTrims();    
    setTrim('')
    setIsEditTrim(false)
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const clickEditMake = (make, id) => {
  setIsEditMake(true)
  setMake(make)
  setIdMake(id)
}

const clickEditModel = (model, id) => {
  setIsEditModel(true)
  setModel(model)
  setIdModel(id)
}

const clickEditTrim = (trim, id) => {
  setIsEditTrim(true)
  setTrim(trim)
  setIdTrim(id)
}

const handleDeleteMake = async (id) => {
  try {
    await api.delete(`/makes/${id}`); 
    fetchMakes();

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleDeleteModel = async (id) => {
  try {
    await api.delete(`/models/${id}`); 
    fetchModels();

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleDeleteTrim = async (id) => {
  try {
    await api.delete(`/trims/${id}`); 
    fetchTrims();

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

  return (
    <div>
      <Container fluid>
        <Row>
            <Col md={4} className='p-3'>
              <h2>Make</h2>
              <Row className=''> 
                <Form>
                  <Row>
                  <Col md={8}>
                    <TextField 
                      className='mb-3'
                      id="filled-basic" 
                      label="Make" 
                      variant="standard" 
                      fullWidth
                      value={make} 
                      onChange={e => setMake(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    
                  <Button
                        className={isEditMake ? 'hide' : ''}
                        disabled={make === ''}
                        onClick={handleSubmitMake}
                      >
                        Add New
                      </Button>
                      <Button
                        className={isEditMake ? '' : 'hide'}
                        disabled={make === ''}
                        onClick={() => handleEditMake(idMake)}
                      >
                        Edit
                      </Button>
                  </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
              <DataTable
                columns={columnsMake}
                data={makes}
                pagination
                persistTableHead
                responsive/* 
                customStyles={customStyles} */
              />  
              </Row>
            </Col>
            <Col md={4} className='gradient-background py-3'> 
              <h2>Model</h2> 
              <Row className=''> 
                <Form>
                  <Row>
                  <Col md={8}>
                    <TextField 
                      className='mb-3'
                      id="filled-basic" 
                      label="Model" 
                      variant="standard" 
                      fullWidth
                      value={model} 
                      onChange={e => setModel(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                    <Button
                        className={isEditModel ? 'hide' : ''}
                        disabled={model === ''}
                        onClick={handleSubmitModel}
                      >
                        Add New
                      </Button>
                      <Button
                        className={isEditModel ? '' : 'hide'}
                        disabled={model === ''}
                        onClick={() => handleEditModel(idModel)}
                      >
                        Edit
                      </Button>
                  </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
              <DataTable
                columns={columnsModel}
                data={models}
                pagination
                persistTableHead
                responsive/* 
                customStyles={customStyles} */
              />  
              </Row>                 
            </Col>
            <Col md={4} className=''>
              <h2>Trim</h2>
              <Row className=''> 
                <Form>
                  <Row>
                  <Col md={8}>
                    <TextField 
                      className='mb-3'
                      id="filled-basic" 
                      label="Trim" 
                      variant="standard" 
                      fullWidth
                      value={trim} 
                      onChange={e => setTrim(e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                      <Button
                        className={isEditTrim ? 'hide' : ''}
                        disabled={trim === ''}
                        onClick={handleSubmitTrim}
                      >
                        Add New
                      </Button>
                      <Button
                        className={isEditTrim ? '' : 'hide'}
                        disabled={trim === ''}
                        onClick={() => handleEditTrim(idTrim)}
                      >
                        Edit
                      </Button>
                  </Col>
                  </Row>
                </Form>
              </Row>
              <Row>
              <DataTable
                columns={columnsTrim}
                data={trims}
                pagination
                persistTableHead
                responsive/* 
                customStyles={customStyles} */
              />  
              </Row>                     
            </Col>
        </Row>
      </Container>      
    </div>
  )
}

export default Vehicle