import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate,useLocation } from 'react-router-dom'
import { HOST, GET_EMPLOYEENAMES, ADD_TASK } from '../Constants/Constants';
import Modal from 'react-bootstrap/Modal';

function AddTask() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [employees, setemployees] = useState([]);
    const [form, setform] = useState({
      'title':"",
      'priority':"",
      'completed':"",
      'assignedTo':"",
      'description':"",
      'startDate':"",
      'dueDate':"",
      'completedOn':"",
      'attachments':""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
      useEffect(() => {
        const call = async () => {
          await axios.get(HOST + GET_EMPLOYEENAMES,{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setemployees(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post(HOST + ADD_TASK, {
            headers:{
                'auth':'Rose '+ localStorage.getItem('auth')
            },
            'title':form.title,
            'priority':form.priority,
            'completedPercent':form.completed,
            'assignedTo':form.assignedTo,
            'description':form.description,
            'startDate':form.startDate,
            'dueDate':form.dueDate,
            'completedOn':form.completedOn,
            'attachments':form.attachments
        },
        {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
          console.log(res);
          if(res.data.success) {
            handleShow()
          }
          }).catch((err) => {
              console.log(err)
          })
      };
      const navigate = useNavigate()
      const callFunc = ()=>{
        handleClose();
        navigate('/admin')
      }
  return (
    <div>
         <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add Task</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='title' type="text" placeholder="Title*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control name='priority' type="text" placeholder="Priority" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='completed' type="number" placeholder="% Completed" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col} >
        <Form.Label>Assigned To</Form.Label>
          {/* <Form.Control name='acquiredOn' type="date" onChange={handleChange}/> */}
          <Form.Select name='assignedTo' type="text" onChange={handleChange} required>
            <option value=''>Select Employee</option>
          {employees.length!==0?employees.map((option) => (
          <option value={option.Employee_ID}>
            {option.Full_Name}
          </option>
        )):
        <option value=''>None</option>
        }
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Start Date</Form.Label>
          <Form.Control name='startDate' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Due Date</Form.Label>
          <Form.Control name='dueDate' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Completed On</Form.Label>
          <Form.Control name='completedOn' type="date" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='description' type="text" placeholder="Description" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='attachments' type="file" placeholder="Attachments" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button className='submit-btn' variant="primary" type="submit" style={{}} onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task Added Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddTask