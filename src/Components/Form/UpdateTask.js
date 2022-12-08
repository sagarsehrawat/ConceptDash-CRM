import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function UpdateTask() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [employees, setemployees] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setform] = useState({
      'title':"",
      'priority':"",
      'status':"",
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
        if(name==='completed') {
            setpercentComplete(value);
        }
        const newForm = form
        newForm[name] = value
        setform(newForm);
    };
    const location = useLocation();
      useEffect(() => {
        const call = async () => {
          await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/employeeNames',{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setemployees(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const [percentComplete, setpercentComplete] = useState(location.state.Percent_Completed)
      let taskId = location.state.Task_ID;
      console.log(taskId);
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/update/task', {
            
            'completedPercent':form.completed,
            'id':taskId
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
      let value1 = new Date(location.state.Start_Date)
      let startMonth, startDay;
      if(value1.getMonth()<10) {
        startMonth=`0${value1.getMonth()}`;
      } else {
        startMonth = value1.getMonth();
      }
      if(value1.getDate()<10) {
        startDay = `0${value1.getDate()}`;
      } else {
        startDay = value1.getDate();
      }
      let start = `${value1.getFullYear()}-${startMonth}-${startDay}`

      let value2 = new Date(location.state.Due_Date)
      let dueMonth, dueDay;
      if(value2.getMonth()<10) {
        dueMonth=`0${value2.getMonth()}`;
      } else {
        dueMonth = value2.getMonth();
      }
      if(value2.getDate()<10) {
        dueDay = `0${value2.getDate()}`;
      } else {
        dueDay = value2.getDate();
      }
      let due = `${value2.getFullYear()}-${dueMonth}-${dueDay}`
      const navigate = useNavigate()
      const callFunc = ()=>{
        handleClose();
        navigate('/engineers')
      }
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Update Task</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control disabled value={location.state.Title} name='title' type="text" placeholder="Title*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control disabled value={location.state.Priority} name='priority' type="text" placeholder="Priority" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control value={percentComplete} name='completed' type="number" placeholder="% Completed" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      
        <Form.Group as={Col} >
        <Form.Label>Start Date</Form.Label>
          <Form.Control disabled value={start} name='startDate' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Due Date</Form.Label>
          <Form.Control disabled value={due} name='dueDate' type="date" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control disabled value={location.state.Description} name='description' type="text" placeholder="Description" onChange={handleChange}/>
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
        <Modal.Body>Task Updated Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateTask