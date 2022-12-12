import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate,useLocation } from 'react-router-dom'
import { HOST, GET_CITIES, GET_DEPARTMENTS, GET_PROJECT_CATEGORIES, GET_EMPLOYEENAMES, GET_BUDGET_NAMES, UPDATE_RFP } from '../Constants/Constants';
import Modal from 'react-bootstrap/Modal';

function UpdateRFP() {
    const location = useLocation();
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cities, setcities] = useState([])
        const [depts, setdepts] = useState([]);
        const [employees, setemployees] = useState([]);
    
        const [projectDepts, setprojectDepts] = useState([])
        useEffect(() => {
            const call = async () => {
                await axios.get(HOST + GET_CITIES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setcities(res.data.res)
                }).catch((err) => {
                console.log(err)
                })

                await axios.get(HOST + GET_DEPARTMENTS, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setdepts(res.data.res)
                }).catch((err) => {
                console.log(err)
                })

                await axios.get(HOST + GET_PROJECT_CATEGORIES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setprojectDepts(res.data.res)
                }).catch((err) => {
                console.log(err)
                })

                await axios.get(HOST + GET_EMPLOYEENAMES,{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setemployees(res.data.res)
                }).catch((err) => {
                  console.log(err)
                })
            }
            call()
        },[])
        console.log(location.state);
        const [action, setaction] = useState(location.state.Action)
        const [dept, setdept] = useState(location.state.Department_ID)
        const [pManager, setpManager] = useState(location.state.Project_Manager_ID)
        const [pName, setpName] = useState(location.state.Project_Name)
        const [bidDate, setbidDate] = useState(location.state.Bid_Date?location.state.Bid_Date.substring(0,10):'')
        const [sDate, setsDate] = useState(location.state.Start_Date?location.state.Start_Date.substring(0,10):'')
        const [subDate, setsubDate] = useState(location.state.Submission_Date?location.state.Submission_Date.substring(0,10):'')
        const [city, setcity] = useState(location.state.City_ID)
        const [rfpnum, setrfpnum] = useState(location.state.RFP_Number)
        const [amount, setamount] = useState(location.state.Amount)
        const [source, setsource] = useState(location.state.Source)
        const [form, setform] = useState({
            'dept':dept,
            'action':action,
            'managerName':pManager,
            'projectName':pName,
            'bidDate':bidDate,
            'startDate':sDate,
            'submissionDate':subDate,
            'rfpNumber':rfpnum,
            'amount':amount,
            'city':city,
            'source':source
        })
        const handleChange = (e) => {
            const { name, value } = e.target;
            console.log(value);
            if(name==='dept') {
                setdept(value)
            }
            if(name==='action') {
                setaction(value)
            }
            if(name==='managerName') {
                setpManager(value)
            }
            if(name==='bidDate') {
                setbidDate(value)
            }
            if(name==='startDate') {
                setsDate(value)
            }
            if(name==='submissionDate') {
                setsubDate(value)
            }
            if(name==='city') {
                setcity(value)
            }
            if(name==='projectName') {
                setpName(value)
            }
            if(name==='rfpNumber') {
                setrfpnum(value)
            }
            if(name==='amount') {
                setamount(value)
            }
            if(name==='source') {
              setsource(value)
            }
            const newForm = form
            newForm[name] = value
            setform(newForm);
          };
          const handleSubmit = (e) => {
            e.preventDefault();
            setIsSubmit(true);
            axios.post(HOST + UPDATE_RFP, {
                'departmentId':form.dept,
                'action':form.action,
                'projectManagerId':form.managerName,
                'projectName':form.projectName,
                'bidDate':form.bidDate,
                'startDate':form.startDate,
                'submissionDate':form.submissionDate,
                'rfpNumber':form.rfpNumber,
                'amount':form.amount,
                'cityId':form.city,
                'source':form.source,
                'id':location.state.RFP_ID,
                'employeeId':localStorage.getItem('employeeId')
            }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
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
            navigate('/RFPtable')
          }
  return (
    <div>
      <div style={{'marginLeft':'2vw','marginTop':'2vh','marginBottom':'2vh','marginRight':'3vw'}}>
                <Button style={{'marginRight':'1vh'}} onClick={() => navigate(-1)}>Back</Button>
                <Button style={{'float':'right'}} onClick={() => navigate(1)}>Forward</Button>
            </div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Update RFP</h1>
  
        <Form className='form-main'>
  <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select defaultValue={dept} onChange={handleChange} name='dept'>
                  {/* <option value="">Select Department</option> */}
                  {depts.map((e)=>(
                    <option value={e.Department_ID}>{e.Department}</option>
                  ))}
        </Form.Select>
        </Form.Group>
    </Row>

    <Row className="mb-4">
      <Form.Group as={Col}>
            <Form.Select defaultValue={action} name='action' onChange={handleChange}>
                    <option value="">Select Action</option>
                    <option value="Go">Go</option>
                    <option value="NoGo">NoGo</option>
                    <option value="Review">Review</option>
            </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Select defaultValue={pManager} name='managerName' onChange={handleChange} required>
            {/* <option value=''>Select Project Manager</option> */}
          {employees.length!==0?employees.map((option) => (
          <option value={option.Employee_ID}>
            {option.Full_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Control value={pName} name='projectName' type="text" placeholder="Project Name" onChange={handleChange} />
      </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col}>
        <Form.Label>Bid Date</Form.Label>
        <Form.Control value={bidDate} name='bidDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Start Date</Form.Label>
        <Form.Control value={sDate} name='startDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Submission Date</Form.Label>
        <Form.Control value={subDate} name='submissionDate' onChange={handleChange} type='date'/>
        </Form.Group>
    </Row>

  <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue={city} onChange={handleChange} name='city'>
                  {/* <option value="">Select City</option> */}
                  {cities.length>0?cities.map((e)=>(
                    <option value={e.City_ID}>{e.City}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
  </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control value={rfpnum} name='rfpNumber' type="number" placeholder="RFP Number" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={amount} name='amount' type="number" placeholder="Amount" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={source} name='source' type="text" placeholder="Source" onChange={handleChange} />
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
        <Modal.Body>RFP Updated Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateRFP