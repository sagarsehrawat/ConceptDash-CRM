import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { HOST, GET_CITIES, GET_DEPARTMENTS, GET_PROJECT_CATEGORIES, GET_EMPLOYEENAMES, GET_BUDGET_NAMES, ADD_RFP } from '../Constants/Constants';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function RFPform() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [employees, setemployees] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setform] = useState({
      'dept':"",
      'action':"",
      'managerName':"",
      'projectName':"",
      'bidDate':"",
      'startDate':"",
      'submissionDate':"",
      'rfpNumber':"",
      'amount':"",
      'city':""
    })
    const [radio, setradio] = useState(false)
    const handleRadio =(e)=>{
      if(e.target.value==='yes'){setradio(false);}
      else if(e.target.value==='no'){setradio(true);}
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
        const [cities, setcities] = useState([])
        const [depts, setdepts] = useState([]);
        const [projectDepts, setprojectDepts] = useState([])
        const [budgets, setbudgets] = useState([])
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
                await axios.get(HOST + GET_BUDGET_NAMES,{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setbudgets(res.data.res)
                console.log(res.data);
                }).catch((err) => {
                  console.log(err)
                })
            }
            call()
        },[])
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post(HOST + ADD_RFP, {
          'departmentId':radio?deptid:form.dept,
          'projectManagerId':form.managerName,
          'projectName':radio?pName:form.projectName,
          'bidDate':form.bidDate,
          'startDate':form.startDate,
          'submissionDate':form.submissionDate,
          'rfpNumber':form.rfpNumber,
          'source':form.source,
          'amount':radio?amount:form.amount,
          'cityId':radio?cityid:form.city
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
      const [budgetData, setbudgetData] = useState([])
      const [pName, setpName] = useState('')
      const [dept, setdept] = useState('')
      const [deptid, setdeptid] = useState('')
      const [cityid, setcityid] = useState('')
      const [city, setcity] = useState('')
      const [amount, setamount] = useState('')
      const handleChange1 = async (e) => {
      await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/budget/id',{headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':e.target.value}}).then(async (res) => {
      setbudgetData(res.data.res)
      setpName(res.data.res[0].Project_Name);
      setdept(res.data.res[0].Department);
      setdeptid(res.data.res[0].Department_ID);
      setcity(res.data.res[0].City);
      setcityid(res.data.res[0].City_ID);
      setamount(res.data.res[0].Budget_Amount);
      }).catch((err) => {
          console.log(err)
      })
  };
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add RFP</h1>
  <Form className='form-main'>
  <Row className="mb-4">
  <Form.Group as={Col}>
  <Form.Select onChange={handleRadio}>
      <option value='yes'>Create New RFP</option>
      <option value='no'>Import From Budgets</option>
    </Form.Select>
    </Form.Group>
    </Row>
  {!radio?<div><Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select onChange={handleChange} name='dept'>
                  <option value="">Select Department</option>
                  {depts.length>0?depts.map((e)=>(
                    <option value={e.Department_ID}>{e.Department}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
    </Row>

    <Row className="mb-4">
      {/* <Form.Group as={Col}>
            <Form.Select name='action' onChange={handleChange}>
                    <option value="">Select Action</option>
                    <option value="Go">Go</option>
                    <option value="NoGo">NoGo</option>
                    <option value="Review">Review</option>
            </Form.Select>
      </Form.Group> */}
      <Form.Group as={Col}>
      <Form.Select name='managerName' onChange={handleChange} required>
            <option value=''>Select Project Manager</option>
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
      <Form.Control name='projectName' type="text" placeholder="Project Name" onChange={handleChange} />
      </Form.Group>
    </Row>
    <Row className="mb-4">
        <Form.Group as={Col}>
        <Form.Label>Bid Date</Form.Label>
        <Form.Control name='bidDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Start Date</Form.Label>
        <Form.Control name='startDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Submission Date</Form.Label>
        <Form.Control name='submissionDate' onChange={handleChange} type='date'/>
        </Form.Group>
    </Row>

  <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select onChange={handleChange} name='city'>
                  <option value="">Select City</option>
                  {cities.length>0?cities.map((e)=>(
                    <option value={e.City_ID}>{e.City}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
  </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='rfpNumber' type="number" placeholder="RFP Number" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='amount' type="number" placeholder="Amount" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='source' type="text" placeholder="Source" onChange={handleChange} />
        </Form.Group>
      </Row></div>:
      <div>
      <Form.Select style={{'marginBottom':'4vh'}} onChange={handleChange1}>
      {budgets.length!==0?budgets.map((options) => (
        <option value={options.Budget_ID}>
          {options.Project_Name}
        </option>
      )):
      <option value=''>None</option>
      }
      </Form.Select>
      {budgetData.length>0?<div>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Control value={dept}/>
        </Form.Group>
    </Row>

    <Row className="mb-4">
      <Form.Group as={Col}>
            <Form.Select name='action' onChange={handleChange}>
                    <option value="">Select Action</option>
                    <option value="Go">Go</option>
                    <option value="NoGo">NoGo</option>
                    <option value="Review">Review</option>
            </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Select name='managerName' onChange={handleChange} required>
            <option value=''>Select Project Manager</option>
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
        <Form.Control name='bidDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Start Date</Form.Label>
        <Form.Control name='startDate' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Submission Date</Form.Label>
        <Form.Control name='submissionDate' onChange={handleChange} type='date'/>
        </Form.Group>
    </Row>

  <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Control value={city}/>
        </Form.Group>
  </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='rfpNumber' type="number" placeholder="RFP Number" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={amount} name='amount' type="number" placeholder="Amount" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='source' type="text" placeholder="Source" onChange={handleChange} />
        </Form.Group>
      </Row></div>:''}</div>
      }
      
      <Button className='submit-btn' variant="primary" type="submit" style={{}} onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>RFP Added Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RFPform