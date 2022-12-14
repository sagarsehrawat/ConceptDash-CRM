import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { HOST, ADD_JOB_TITLE } from '../Constants/Constants';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
function JobTitle() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setform] = useState({
      'jobTitle':"",
      'department':"",
      'hourlyRate':"",
      'multiplier':"",
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post(HOST + ADD_JOB_TITLE, {
            'jobTitle':form.jobTitle,
            'department':form.department,
            'hourlyRate':form.hourlyRate,
            'multiplier':form.multiplier,
        }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          console.log(res);
          }).catch((err) => {
              console.log(err)
          })
      };
      const departments=[
        {
          value: "Admin",
          label: "Admin"
        },
        {
          value: "Engineer",
          label: "Engineer"
        },
        {
          value: "Manager",
          label: "Manager"
        },
        {
          value: "Sales",
          label: "Sales"
        },
        {
          value: "Logistics",
          label: "Logistics"
        },
        {
          value: "Supplier",
          label: "Supplier"
        },
        {
          value: "IT",
          label: "IT"
        },
      ]
  return (
    <div>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='jobTitle' type="text" placeholder="Job Title*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Select name='department' type="text" onChange={handleChange} /* onChange={handleChange} */ required>
            <option value="">Select Department</option>
            {departments.map((option) => (
            <option value={option.value}>
              {option.label}
            </option>
        ))}
          </Form.Select>
          </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='hourlyRate' type="text" placeholder="Hourly Rate" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control name='multiplier' type="text" placeholder="Multiplier" onChange={handleChange}/>
        </Form.Group>
      </Row>
      
      <Button className='submit-btn' variant="primary" type="submit" style={{}} onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default JobTitle