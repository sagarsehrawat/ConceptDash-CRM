import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function AssetForm() {
  const [employees, setemployees] = useState([])
    useEffect(() => {
      const call = async () => {
        await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/employeeNames', {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          setemployees(res.data.res)
        }).catch((err) => {
          console.log(err)
        })
      }
      call()
    },[])
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setform] = useState({
      'employee':"",
      'assetCategory':"",
      'hardwareDetails':"",
      'acquiredOn':"",
      'retiredOn':"",
      'shippedOn':"",
      'price': 0,
      'notes':"",
      'attachments':""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/add/asset', {
            'employeeId':form.employee,
            'category':form.assetCategory,
            'hardwareDetails':form.hardwareDetails,
            'acquiredOn':form.acquiredOn,
            'shippedOn':form.shippedOn,
            'retiredDate':form.retiredOn,
            'purchasePrice':form.price,
            'notes':form.notes,
            'attachments':form.attachments
        },
        {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          console.log(form.acquiredOn);
          console.log(res);
          }).catch((err) => {
              console.log(err)
          })
      };
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add Assets</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          {/* <Form.Control name='employee' type="number" placeholder="Employee ID" onChange={handleChange}/> */}
          <Form.Select name='employee' onChange={handleChange}  required>
            <option value="">Select Employee</option>
            {employees.map((option) => (
            <option value={option.Employee_ID}>
              {option.Full_Name}
            </option>
        ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} >
          {/* <Form.Control name='company' type="text" placeholder="Company*" onChange={handleChange} /> */}
          <Form.Select name='assetCategory' type="text" onChange={handleChange}>
            <option value="">Asset Category</option>
            <option value="Software">Software</option>
            <option value="Hardware">Hardware</option>
            <option value="Office Supplies">Office Supplies</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='hardwareDetails' type="text" placeholder="Hardware Details" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col} >
        <Form.Label>Acquired On</Form.Label>
          <Form.Control name='acquiredOn' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Retired On</Form.Label>
          <Form.Control name='retiredOn' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Shipped On</Form.Label>
          <Form.Control name='shippedOn' type="date" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='price' type="number" step='any' placeholder="Price" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='notes' as="textarea" rows={1} type="text" placeholder="Notes" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='attachments' type="file" placeholder="Attachments" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button className='submit-btn' variant="primary" type="submit" style={{}} onClick={handleSubmit}>
        Submit
      </Button>
      </Form>
    </div>
  )
}

export default AssetForm