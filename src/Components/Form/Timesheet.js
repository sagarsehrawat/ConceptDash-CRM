import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import { HOST, GET_EMPLOYEENAMES, GET_PROJECT_NAMES, ADD_TIMESHEET } from '../Constants/Constants';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import { useNavigate,useLocation } from 'react-router-dom'

function Timesheet() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [employees, setemployees] = useState([]);
    const [projects, setprojects] = useState([]);
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    useEffect(() => {
        const call = async () => {
          await axios.get(HOST + GET_EMPLOYEENAMES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
            setemployees(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      useEffect(() => {
        const call = async () => {
          await axios.get(HOST + GET_PROJECT_NAMES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
            setprojects(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const [form, setform] = useState({
        'employee':"",
        'project':"",
        'date':"",
        'start':"",
        'end':"",
        'comments':"",
      })
      const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = form;
        newForm[name] = value;
        setform(newForm);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post(HOST + ADD_TIMESHEET, {
          'projectId':form.project,
          'employeeId': localStorage.getItem('employeeId'),
          'date':form.date,
          'startTime':form.start,
          'endTime':form.end,
          'comments':form.comments,
        }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          console.log(res.data.success);
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
        navigate('/engineers')
      }
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>Go forward</button>
        <h1 style={{'margin':'auto', 'textAlign':'center','textDecoration':'underline', 'marginTop':'5vh'}}>Add to Timesheet</h1>
        
        <Form className='form-main'>
      <Row className="mb-4">
      <Form.Group as={Col} >
      <Form.Label><b>Project</b></Form.Label>
        <Form.Select onChange={handleChange} name='project' required>
          <option value="">Select a Project*</option>
        {projects.length!==0?projects.map((option) => (
          <option value={option.Project_ID}>
            {option.Project_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label><b>Date</b></Form.Label>
          <Form.Control name='date' type="date" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label><b>Start Time</b></Form.Label>
          <Form.Control name='start' type="time" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label><b>End Time</b></Form.Label>
          <Form.Control name='end' type="time" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      
      <Row className="mb-4">
        <Form.Group as={Col}>
            <Form.Control name='comments' type='text' placeholder='Comments' onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button className='submit-btn' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Added To Timesheet Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Timesheet