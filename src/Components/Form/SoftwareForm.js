import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function SoftwareForm() {
    const [isSubmit, setIsSubmit] = useState(false);
    const [form, setform] = useState({
      'software':"",
      'manufacturer':"",
      'version':"",
      'price':"",
      'aquiredOn':"",
      'retiredOn':"",
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
        axios.post('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/add/software', {
            'software':form.software,
            'manufacturer':form.manufacturer,
            'version':form.version,
            'price':form.price,
            'acquiredOn':form.aquiredOn,
            'retiredDate':form.retiredOn,
            'notes':form.notes,
            'attachments':form.attachments
        }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          console.log(form.aquiredOn);
          console.log(res);
          }).catch((err) => {
              console.log(err)
          })
      };
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Add Software</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='software' type="text" placeholder="Software Name" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control name='manufacturer' type="text" placeholder="Manufacturer" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='version' type="text" placeholder="Version" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
          <Form.Control name='price' type="text" placeholder="Price" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
            <Form.Label>Acquired On</Form.Label>
          <Form.Control name='aquiredOn' type="date" onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} >
        <Form.Label>Retired On</Form.Label>
          <Form.Control name='retiredOn' type="date" onChange={handleChange}/>
        </Form.Group>
      </Row>
      <Row classname="mb-4">
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

export default SoftwareForm