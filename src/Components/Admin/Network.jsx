import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import api from '../../api/axios'

const Network = () => {
  
  const [networks, setNetworks] = useState([])
  const [network, setNetwork] = useState('');
  const [des, setDes] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(0)
  
  const columns =[
    {
      name: 'Network',
      selector: row => row.name,
      wrap: true,
    },
    {
      name: 'Description',
      selector: row => row.description,
      wrap: true,
    },
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
            onClick={() => clickEdit(row.name, row.description, row.id)}
          >
              Edit
          </Button>
          <Button 
            className= "ms-3 delete-button"
            variant="danger"
            onClick={() => handleDelete(row.id)}
            >
              Delete 
          </Button>
        </div>
          
      ),
    },  
]
  
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
    
useEffect(() => {
  fetchNetworks();
}, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  const newNetwork = {name:network, description:des};
  try {
    const response = await api.post('/Network', newNetwork);
    console.log(response);
    fetchNetworks();
    setNetwork('')
    setDes('')
    
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const clickEdit = (plug, des, id) => {
  setIsEdit(true)
  setNetwork(plug)
  setId(id)
  setDes(des)
}


const handleEdit = async (id) => {
  const updated = {name:network, description:des};
  try {
    await api.put(`/Network/${id}`, updated);  
    fetchNetworks();    
    setNetwork('');
    setDes('');
    setIsEdit(false);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

const handleDelete = async (id) => {
  try {
    await api.delete(`/Network/${id}`);  
    fetchNetworks();    
    setNetwork('')
    setDes('')
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
}

  return (
    <div>
      <Container fluid>
          <Row>
              <Col md={4} className='p-3 center'>
                <Row className='center width-add-new'> 
                  <Form >
                    <TextField 
                      fullWidth 
                      className='mb-3'
                      id="filled-basic" 
                      label="Network" 
                      variant="standard" 
                      value={network} 
                      onChange={e => setNetwork(e.target.value)}
                    /><br />
                    <TextField 
                      className='mb-3'
                      id="filled-basic" 
                      label="Description" 
                      variant="standard" 
                      fullWidth 
                      value={des} 
                      onChange={e => setDes(e.target.value)}
                    /><br/>
                    <Button
                        className={isEdit ? 'hide' : ''}
                        disabled={network === ''}
                        onClick={handleSubmit}
                      >
                        Add New
                      </Button>
                      <Button
                        className={isEdit ? '' : 'hide'}
                        disabled={network === ''}
                        onClick={() => handleEdit(id)}
                      >
                        Edit
                      </Button>
                  </Form>
                </Row>
              </Col>
              <Col md={8} className='gradient-background py-3'>
            <DataTable
              columns={columns}
              data={networks}
              pagination
              persistTableHead
              responsive/* 
              customStyles={customStyles} */
            />                     
              </Col>
          </Row>
      </Container>
    </div>
  )
}

export default Network