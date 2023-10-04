import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { HOST, ADD_JOB_TITLE, GET_DEPARTMENTS } from '../Constants/Constants';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import TFButton from '../../components/ui/Button/Button';
function JobTitle() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [departments, setdepartments] = useState([]);
    const [form, setform] = useState({
      'jobTitle':"",
      'department':"",
      'hourlyRate':"",
      'multiplier':"",
    })
    useEffect(() => {
      const call = async () => {
        await axios
          .get(HOST + GET_DEPARTMENTS, {
            headers: { auth: "Rose " + localStorage.getItem("auth") },
          })
          .then((res) => {
            setdepartments(res.data.res);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      call();
    }, []);
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
            <option value={option.Department_ID}>
              {option.Department}
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
      
      {/* <Button className='submit-btn' variant="primary" type="submit" style={{}} onClick={handleSubmit}>
        Submit
      </Button> */}
      <TFButton label="Submit" type="submit" size="small"/>
    </Form>
    </div>
  )
}

export default JobTitle