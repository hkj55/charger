import React, {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataTable from 'react-data-table-component';
import TextField from '@mui/material/TextField';
import api from '../../api/axios';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

const Plug = () => {

  const [plugs, setPlugs] = useState([]);
  const [plug, setPlug] = useState('');
  const [des, setDes] = useState('')
  const [isEdit, setIsEdit] = useState(false)
  const [id, setId] = useState(0)

    const columns =[
        {
          name: 'plug',
          selector: row => row.name,
          wrap: true,/* 
          width: '100px', */
        },
        {
          name: 'Description',
          selector: row => row.description,
          wrap: true,/* 
          width: '100px', */
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
        
  useEffect(() => {
    fetchPlugs();
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlug = {name:plug, description:des};
    try {
      const response = await api.post('/Plugs', newPlug);
      console.log(response);
      fetchPlugs();
      setPlug('')
      setDes('')
      
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const clickEdit = (plug, des, id) => {
    setIsEdit(true)
    setPlug(plug)
    setId(id)
    setDes(des)
  }

  const handleEdit = async (id) => {
    const updated = {name:plug, description:des};;
    try {
      await api.put(`/Plugs/${id}`, updated);  
      fetchPlugs();    
      setPlug('')
      setDes('')
      setIsEdit(false)
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Plugs/${id}`); 
      fetchPlugs();

    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  }

    const handleImageChange = (e) => {
      const file = e.target.files[0];
    };

  return (
    <div>
        <Container fluid>
            <Row>
                <Col md={4} className='p-3 center'>
                  <Row className='center width-add-new'> 
                    <Form >
                      <TextField 
                        className='mb-3'
                        id="filled-basic" 
                        label="Plug" 
                        variant="standard"
                        fullWidth 
                        value={plug} 
                        onChange={e => setPlug(e.target.value)}
                      /><br />
                      <TextField 
                        className='mb-3'
                        id="filled-basic" 
                        label="Description" 
                        variant="standard"
                        fullWidth  
                        value={des} 
                        onChange={e => setDes(e.target.value)}
                      /> <br />{/* 
                      <Form.Group>
                        <Form.Label>Upload an Image</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                      </Form.Group> */}
                      <Button
                        className={isEdit ? 'hide' : ''}
                        disabled={plug === ''}
                        onClick={handleSubmit}
                      >
                        Add New
                      </Button>
                      <Button
                        className={isEdit ? '' : 'hide'}
                        disabled={plug === ''}
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
                data={plugs}
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

export default Plug