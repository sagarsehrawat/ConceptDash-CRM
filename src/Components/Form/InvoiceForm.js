import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function InvoiceForm() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setform] = useState({
      'orderID':0,
      'invoiceDate':"",
      'dueDate':"",
      'tax':0,
      'shipping':0,
      'amountDue':0
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
      axios.post('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/addNewSupplier', {
        'orderID':form.orderID,
        'invoiceDate':form.invoiceDate,
        'dueDate':form.dueDate,
        'tax':form.tax,
        'shipping':form.shipping,
        'amountDue':form.amountDue
      }).then((res) => {
        console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    };
  return (
    <>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh'}}>New Project</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='orderID' type="number" placeholder="OrderID*" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label>Invoice Date*</Form.Label>
            <Form.Control name='invoiceDate' type="date"  onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Due Date</Form.Label>
          <Form.Control name='dueDate' type="date" placeholder="Due Date" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='tax' type="number" placeholder="Tax" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='shipping' type="number" placeholder="Shipping" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} >
            <Form.Control name='amountDue' type="number" placeholder="Amount Due" onChange={handleChange} />
        </Form.Group>
      </Row>
      
      <Button className='submit-btn' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default InvoiceForm