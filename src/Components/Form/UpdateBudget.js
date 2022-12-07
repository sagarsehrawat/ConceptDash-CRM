import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { HOST, GET_CITIES, GET_DEPARTMENTS, GET_PROJECT_CATEGORIES, UPDATE_BUDGET } from '../Constants/Constants';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function UpdateBudget() {
    const location = useLocation();
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cities, setcities] = useState([])
        const [depts, setdepts] = useState([]);
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
            }
            call()
        },[])

    const [city, setcity] = useState()
    const [projectCategory, setprojectCategory] = useState(location.state.Project_Cat_ID)
    const [budgetCategory, setbudgetCategory] = useState(location.state.Budget_Category)
    const [dept, setdept] = useState()
    const [source, setsource] = useState()
    const [bYear, setbYear] = useState(location.state.Budget_Year)
    const [pName, setpName] = useState(location.state.Project_Name)
    const [bAmount, setbAmount] = useState(location.state.Budget_Amount)
    const [form, setform] = useState({
        'city':location.state.City_ID,
        'dept':location.state.Department_ID,
        'projectCat':location.state.Project_Cat_ID,
        'budgetCategory':budgetCategory,
        'projectName':pName,
        'budgetAmount':bAmount,
        'budgetYear':bYear,
        'source':location.state.Source,
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='dept') {
            setdept(value)
        }
        if(name==='projectCat') {
            setprojectCategory(value)
        }
        if(name==='budgetCategory') {
            setbudgetCategory(value)
        }
        if(name==='city') {
            setcity(value)
        }
        if(name==='projectName') {
            setpName(value)
        }
        if(name==='budgetAmount') {
            setbAmount(value)
        }
        if(name==='budgetYear') {
          setbYear(value)
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
        axios.post(HOST + UPDATE_BUDGET, {
            'id':location.state.Budget_ID,
            'cityId':form.city,
            'departmentId':form.dept,
            'categoryId':form.projectCat,
            'projectName':form.projectName,
            'budgetCategory':form.budgetCategory,
            'budgetAmount':form.budgetAmount,
            'budgetYear':form.budgetYear,
            'source':form.source,
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
        navigate('/Budgettable')
      }
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Update Budget</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue={city} onChange={handleChange} name='city'>
                  <option value="">Select City</option>
                  {cities.length>0?cities.map((e)=>(
                    <option value={e.City_ID}>{e.City}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
      </Row>
      
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select defaultValue={dept} onChange={handleChange} name='dept'>
                  <option value="">Select Department</option>
                  {depts.length>0?depts.map((e)=>(
                    <option value={e.Department_ID}>{e.Department}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select defaultValue={projectCategory} onChange={handleChange} name='projectCat'>
                  <option value="">Select Project Category</option>
                  {projectDepts.length>0?projectDepts.map((e)=>(
                    <option value={e.Project_Cat_ID}>{e.Project_Category}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select defaultValue={budgetCategory} onChange={handleChange} name='budgetCategory'>
                  <option value="">Select Budget Category</option>
                  <option value="Design Product">Design Product</option>
                  <option value="Product Project">Product Project</option>
                  
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control value={pName} name='projectName' type="text" placeholder="Project Name*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={bAmount} name='budgetAmount' type="number" placeholder="Budget Amount*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={bYear} name='budgetYear' type="text" placeholder="Budget Year" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={source} name='source' type="text" placeholder="Source" onChange={handleChange}/>
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
        <Modal.Body>Budget Updated Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateBudget