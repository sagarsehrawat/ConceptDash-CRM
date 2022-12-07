import React, { useEffect, useState } from 'react'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function QuoteForm() {
    const [field, setField] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
    const [contractors, setcontractors] = useState([]);
    const [distributors, setdistributors] = useState([]);
    useEffect(() => {
      const call = async () => {
        await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/distributors', {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          setdistributors(res.data.res)
          console.log(distributors)
        }).catch((err) => {
          console.log(err)
        })
      }
      call()
    },[])
    useEffect(() => {
      const call = async () => {
        await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/contractors', {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
          setcontractors(res.data.res)
          console.log(contractors)
        }).catch((err) => {
          console.log(err)
        })
      }
      call()
    },[])
    const [form, setform] = useState({
      'projectName':"",
      'dateCreated':"",
      'employee':"",
      'productQty':"",
      'productSpecified':"",
      'projectValue':"",
      'distList':"",
      'distPrice':"",
      'contList':"",
      'contPrice':"",
      'quoteStatus':"",
      'awardedDist':"",
      'awardedCont':"",
      'awardedVal':"",
      'shippingStatus':"",
      'city':"",
      'province':""
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
      axios.post('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/add/supplier', {
        'projectName':form.projectName,
        'dateCreated':form.dateCreated,
        'employee':form.employee,
        'productQty':form.productQty,
        'productSpecified':form.productSpecified,
        'projectValue':form.projectValue,
        'distList':form.distList,
        'distPrice':form.distPrice,
        'contList':form.contList,
        'contPrice':form.contPrice,
        'quoteStatus':form.quoteStatus,
        'awardedDist':form.awardedDist,
        'awardedCont':form.awardedCont,
        'awardedVal':form.awardedVal,
        'shippingStatus':form.shippingStatus,
        'city':form.city,
        'province':form.province
      }, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
        console.log(res);
        }).catch((err) => {
            console.log(err)
        })
    };
  return (
    <>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh'}}>New Quote</h1>
  <Form className='form-main'>
  <Row className="mb-4">
        <Form.Group as={Col} >
          <Form.Control name='projectName' type="text" placeholder="Project Name*" onChange={handleChange} required/>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='employee' type="text" placeholder="Employee" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
        <Form.Label>Date Created</Form.Label>
            <Form.Control name='dateCreated' type="date" placeholder="Date Created*" onChange={handleChange} required/>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='productQty' type="text" placeholder="Product Quantity" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='productSpecified' type="text" placeholder="Prodcut Specified" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col} >
            <Form.Select name='projectValue' onChange={handleChange}>
              <option value="">Product Value</option>
              <option value="$0-$50k">$0-$50k</option>
              <option value="$50-$100k">$50-$100k</option>
              <option value="$100-$500k">$100-$500k</option>
              <option value="$500-$1 million">$500-$1 million</option>
              <option value="Above $1 Million">Above $1 Million</option>
            </Form.Select>
        </Form.Group>
      {/* <DropdownMultiselect as={Col} 
        options={["Australia", "Canada", "USA", "Poland", "Spain", "France"]}
        name="countries"
      /> */}
      <Form.Group as={Col} >
            <Form.Select name='projectValue' onChange={handleChange}>
              <option value="">Probablity of Winning</option>
              <option value="0%-30%">0%-30%</option>
              <option value="30%-50%">30%-50%</option>
              <option value="50%-70%">50%-70%</option>
              <option value="70%-100%">70%-100%</option>
            </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4" style={{width:'59vw', marginLeft:'.1vw'}}>
        <Form.Label><b>Select Distributors</b> (ctrl+click to select multiple)</Form.Label>
        <Form.Select multiple onChange={handleChange} name='distributors'>
        {distributors.map((option) => (
          <option value={option.Full_Name}>
            {option.Full_Name}
          </option>
        ))}
        </Form.Select>
      </Row>
      <Row className="mb-4" style={{width:'59vw', marginLeft:'.1vw'}}>
        <Form.Label><b>Select Contractors</b> (ctrl+click to select multiple)</Form.Label>
        <Form.Select multiple onChange={handleChange} name='contractors'>
          {contractors.map((option) => (
          <option value={option.Full_Name}>
            {option.Full_Name}
          </option>
        ))}
        </Form.Select>
        </Row>
      <Row className="mb-4">
        
        <Form.Group as={Col}>
          <Form.Control name="distPrice" type="text" placeholder="Distributor Price" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name="contPrice" type="text" placeholder="Contractor Price" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
        <Form.Select name='quoteStatus' onChange={handleChange}>
              <option value="">Quote Status</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed">Closed</option>
            </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='awardedDist' type="text" placeholder="Awarded Distributor" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='awardedCont' type="text" placeholder="Awarded Contributor" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control name='awardedVal' type="text" placeholder="Awarded Value" onChange={handleChange} required />
        </Form.Group>
      </Row>

      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control name='shippingStatus' type='text' placeholder='Shipping Status' onChange={handleChange}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Control name='city' placeholder='City' onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Control name='province' placeholder='Province' onChange={handleChange} />
        </Form.Group>
      </Row>
      <Button className='submit-btn' variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default QuoteForm