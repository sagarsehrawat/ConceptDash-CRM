import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';

function BudgetsForm() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form, setform] = useState({
      'city':"",
      'dept':"",
      'projectCat':"",
      'budgetCategory':"",
      'projectName':"",
      'budgetAmount':"",
      'budgetYear':"",
      'source':"",
    })
    let yr = new Date().getFullYear();
    const [year, setyear] = useState(yr);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='budgetYear') {
          setyear(value);
        }
        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
        const [cities, setcities] = useState([])
        const [depts, setdepts] = useState([]);
        const [projectDepts, setprojectDepts] = useState([])
        useEffect(() => {
            const call = async () => {
                await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/list/cities', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setcities(res.data.res)
                }).catch((err) => {
                console.log(err)
                })

                await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/list/departments', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setdepts(res.data.res)
                }).catch((err) => {
                console.log(err)
                })

                await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/list/projectCategories', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setprojectDepts(res.data.res)
                }).catch((err) => {
                console.log(err)
                })
            }
            call()
        },[])
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/add/budget', {
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
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add Budget</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        {/* <Form.Group as={Col} >
          <Form.Control name='company' type="text" placeholder="Company*" onChange={handleChange} required/>
        </Form.Group> */}
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
        <Form.Select onChange={handleChange} name='dept'>
                  <option value="">Select Department</option>
                  {depts.length>0?depts.map((e)=>(
                    <option value={e.Department_ID}>{e.Department}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select onChange={handleChange} name='projectCat'>
                  <option value="">Select Project Category</option>
                  {projectDepts.length>0?projectDepts.map((e)=>(
                    <option value={e.Project_Cat_ID}>{e.Project_Category}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select onChange={handleChange} name='budgetCategory'>
                  <option value="">Select Budget Category</option>
                  <option value="Design Product">Design Product</option>
                  <option value="Product Project">Product Project</option>
                  
        </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='projectName' type="text" placeholder="Project Name*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='budgetAmount' type="number" placeholder="Budget Amount*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='budgetYear' value={year} type="text" placeholder="Budget Year" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='source' type="text" placeholder="Source" onChange={handleChange}/>
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
        <Modal.Body>Budget Added Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default BudgetsForm