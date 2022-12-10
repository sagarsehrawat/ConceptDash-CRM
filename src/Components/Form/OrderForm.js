import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { HOST, ADD_ORDER } from '../Constants/Constants';
import Row from 'react-bootstrap/Row';

function OrderForm() {
  const [isSubmit, setIsSubmit] = useState(false);
    const [form, setform] = useState({
      'customerID':'',
      'productID':'',
      'quantity':0,
      'unitPrice':0,
      'discount':0,
      'shippingFee':0,
      'paymentDate':'',
      'orderDate':'',
      'taxes':'',
      'paymentType':'',
      'taxRate':0,
      'taxStatus':'',
      'notes':''
    })
    const handleChange = (e) => {
      const { name, value } = e.target;
      const newForm = form;
      newForm[name] = value
      setform(newForm);
    };
    // const handleChange1=()=>{ {handleChange1}; reformatDate();}
    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmit(true);
      axios.post(HOST + ADD_ORDER, {
      'customerID':form.customerID,
      'productID':form.productID,
      'quantity':form.quantity,
      'unitPrice':form.unitPrice,
      'discount':form.discount,
      'shippingFee':form.shippingFee,
      'paymentDate':form.paymentDate,
      'orderDate':form.orderDate,
      'taxes':form.taxes,
      'paymentType':form.paymentType,
      'taxRate':form.taxRate,
      'taxStatus':form.taxStatus,
      'notes':form.notes
      }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    };
  return (
    <>
    <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh'}}>Add Order</h1>
  <Form className='form-main'>
  <Row className="mb-4">
  <Form.Group as={Col} >
          <Form.Control onChange={handleChange} name='customerID' type="text" placeholder="Customer ID*" required/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control onChange={handleChange} name='productID' type="text" placeholder="Product ID*" required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='quantity' type="number" placeholder="Quantity*" required/>
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='unitPrice' type="number" placeholder="Unit Price*"  required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='discount' type="number" placeholder="Discount" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-4" as={Col} >
          <Form.Control onChange={handleChange} name='shippingFee' type="number" placeholder="Shipping Fee*" required/>
      </Form.Group>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Label>Payment Date</Form.Label>
          <Form.Control onChange={handleChange} name='paymentDate' type="date" placeholder="Payment Date" />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Order Date</Form.Label>
          <Form.Control onChange={handleChange} name='orderDate' type="date" placeholder="Order Date"  required/>
        </Form.Group>
        </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='taxes' type="text" placeholder="Taxes" required/>
        </Form.Group>

        
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='paymentType' type="text" placeholder="Payment Type" required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='taxRate' type="number" placeholder="Tax Rate" />
        </Form.Group>
      </Row>
      {/* <Form.Group className="mb-4" controlId="formGridAddress1">
        <Form.Control placeholder="Address" />
      </Form.Group> */}

      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='taxStatus' type='text' placeholder='Tax Status' required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control onChange={handleChange} name='notes' type='text' placeholder='Notes' />
        </Form.Group>

        
        {/* <Form.Group as={Col} controlId="formGridZip">
          <Form.Control type='text' pattern="[0-9]{6}" placeholder='Pin Code'/>
        </Form.Group> */}
      </Row>
      {/* <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control type="url" placeholder="Web-Page" required/>
        </Form.Group>

        <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
          <Form.Control as="textarea" rows={1} type="text" placeholder="Notes" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Control type="file" placeholder="Attachments" />
        </Form.Group>
      </Row> */}
      <Button onSubmit={handleSubmit} className='submit-btn' variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </>
  )
}

export default OrderForm