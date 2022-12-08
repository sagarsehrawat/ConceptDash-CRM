import React, { useEffect, useState } from 'react'
import './Form.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate,useLocation } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'

function UpdateProposal() {
    const location = useLocation();
    const [isSubmit, setIsSubmit] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [dept, setdept] = useState(location.state.Department_ID)
    const [status, setstatus] = useState(location.state.Status)
    const [manager, setmanager] = useState(location.state.Project_Manager_ID)
    const [pName, setpName] = useState(location.state.Project_Name)
    const [qDeadline, setqDeadline] = useState(location.state.Question_Deadline?location.state.Question_Deadline.substring(0,10):'')
    const [cDeadline, setcDeadline] = useState(location.state.Closing_Deadline?location.state.Closing_Deadline.substring(0,10):'')
    const [rDate, setrDate] = useState(location.state.Result_Date?location.state.Result_Date.substring(0,10):'')
    const [city, setcity] = useState(location.state.City_ID)
    const [team, setteam] = useState(location.state.Team)
    const [dPrice, setdPrice] = useState(location.state.Design_Price)
    const [provisionalItems, setprovisionalItems] = useState(location.state.Provisional_Items)
    const [adminPrice, setadminPrice] = useState(location.state.Contract_Admin_Price)
    const [consultantPrice, setconsultantPrice] = useState(location.state.Sub_Consultant_Price)
    const [totalBid, settotalBid] = useState(location.state.Total_Bid)
    const [planTakers, setplanTakers] = useState(location.state.Plan_Takers)
    const [bidders, setbidders] = useState(location.state.Bidders)
    const [bidderPrice, setbidderPrice] = useState(location.state.Bidder_Price)
    const [bidStatus, setbidStatus] = useState(location.state.Bid_Status)
    const [winningPrice, setwinningPrice] = useState(location.state.Winning_Price)
    const [winningBidder, setwinningBidder] = useState(location.state.Winning_Bidder_ID)
    const [form, setform] = useState({
        'dept':dept,
        'status':status,
        'managerName':manager,
        'projectName':pName,
        'qDeadline':qDeadline,
        'cDeadline':cDeadline,
        'resultDate':rDate,
        'city':city,
        'team':team,
        'dPrice':dPrice,
        'provisionalItems':provisionalItems,
        'adminPrice':adminPrice,
        'consultantPrice':consultantPrice,
        'totalBid':totalBid,
        'planTakers':planTakers,
        'bidders':bidders,
        'bidderPrice':bidderPrice,
        'bidStatus':bidStatus,
        'winningPrice':winningPrice,
        'winningBidder':winningBidder,
      })
    //   console.log(location.state);
      const handleChange = (e) => {
        const { name, value } = e.target;
        if(name==='dept') {
            setdept(value)
        }
        if(name==='status') {
            setstatus(value)
        }
        if(name==='managerName') {
            setmanager(value)
        }
        if(name==='projectName') {
            setpName(value)
        }
        if(name==='qDeadline') {
            setqDeadline(value)
        }
        if(name==='cDeadline') {
            setcDeadline(value)
        }
        if(name==='resultDate') {
            setrDate(value)
        }
        if(name==='city') {
            setcity(value)
        }
        if(name==='team') {
            setteam(value)
        }
        if(name==='dPrice') {
            setdPrice(value)
        }
        if(name==='provisionalItems') {
            setprovisionalItems(value)
        }
        if(name==='adminPrice') {
            setadminPrice(value)
        }
        if(name==='consultantPrice') {
            setconsultantPrice(value)
        }
        if(name==='totalBid') {
            settotalBid(value)
        }
        if(name==='planTakers') {
            setplanTakers(value)
        }
        if(name==='bidders') {
            setbidders(value)
        }
        if(name==='bidderPrice') {
            setbidderPrice(value)
        }
        if(name==='bidStatus') {
            setbidStatus(value)
        }
        if(name==='winningPrice') {
            setwinningPrice(value)
        }
        if(name==='winningBidder') {
            setwinningBidder(value)
        }

        const newForm = form
        newForm[name] = value
        setform(newForm);
      };
    const [cities, setcities] = useState([])
    const [depts, setdepts] = useState([]);
    const [companies, setcompanies] = useState([])
    const [employees, setemployees] = useState([]);
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

            await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/employeeNames',{headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setemployees(res.data.res)
            }).catch((err) => {
              console.log(err)
            })

            await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/companyNames', {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res) => {
            setcompanies(res.data.res)
            }).catch((err) => {
            console.log(err)
            })
        }
        call()
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        axios.post('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/update/proposal', {
          'departmentId':form.dept,
          'status':form.status,
          'projectManagerId':form.managerName,
          'projectName':form.projectName,
          'questionDeadline':form.qDeadline,
          'closingDeadline':form.cDeadline,
          'resultDate':form.resultDate,
          'team':DisplayValue?DisplayValue.toString():'',
          'designPrice':form.dPrice,
          'provisionalItems':form.provisionalItems,
          'contractAdminPrice':form.adminPrice,
          'subConsultantPrice':form.consultantPrice,
          'totalBid':form.totalBid,
          'planTakers':DisplayValue1?DisplayValue1.toString():'',
          'bidders':DisplayValue1?DisplayValue1.toString():'',
          'bidderPrice':form.bidderPrice,
          'bidStatus':form.bidStatus,
          'winningPrice':form.winningPrice,
          'winningBidderId':form.winningBidder,
          'cityId':form.city,
          'id':location.state.Proposal_ID
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
        navigate('/Proposaltable')
      }
      let attendees = [];
    employees.map((e)=>{
      attendees.push({
        label: e.Full_Name,
        value: e.Full_Name
      })
    })
    let [DisplayValue, getValue] = useState()
    let doChange=(e)=>{
      getValue(Array.isArray(e)?e.map(x=>x.value):[])
    }

    let company = [];
  companies.map((e)=>{
    company.push({
      label: e.Name,
      value: e.Name
    })
  })
  let [DisplayValue1, getValue1] = useState()
  let doChange1=(e)=>{
    getValue1(Array.isArray(e)?e.map(x=>x.value):[])
  }
  return (
    <div>
        <h1 style={{'margin':'auto', 'width':'20%', 'marginTop':'5vh','textDecoration':'underline'}}>Update Proposal</h1>
  <Form className='form-main'>
        <Row className="mb-4">
      <Form.Group as={Col}>
        <Form.Select defaultValue={location.state.Department} onChange={handleChange} name='dept'>
                  {/* <option value="">Select Department</option> */}
                  {depts.length>0?depts.map((e)=>(
                    <option value={e.Department_ID}>{e.Department}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
    </Row>

    <Row className="mb-4">
      <Form.Group as={Col}>
            <Form.Select defaultValue={location.state.Status} name='status' onChange={handleChange}>
                    {/* <option value="">Select Status</option> */}
                    <option value="NoGo">NoGo</option>
                    <option value="Go">Go</option>
                    <option value="Review">Review</option>
            </Form.Select>
      </Form.Group>
      <Form.Group as={Col}>
      <Form.Select defaultValue={location.state.Project_Manager_ID} name='managerName' onChange={handleChange} required>
            {/* <option value=''>Select Project Manager</option> */}
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
        <Form.Label>Question Deadline</Form.Label>
        <Form.Control value={qDeadline} name='qDeadline' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Closing Deadline</Form.Label>
        <Form.Control value={cDeadline} name='cDeadline' onChange={handleChange} type='date'/>
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Label>Result Date</Form.Label>
        <Form.Control value={rDate} name='resultDate' onChange={handleChange} type='date'/>
        </Form.Group>
    </Row>

  <Row className="mb-4">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Select defaultValue={city} onChange={handleChange} name='city'>
                  {/* <option value="">Select City</option> */}
                  {cities.length>0?cities.map((e)=>(
                    <option value={e.City_ID}>{e.City}</option>
                  )):''}
        </Form.Select>
        </Form.Group>
  </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Select isMulti defaultInputValue={team} onChange={doChange} options={attendees} name="team" placeholder='Team Members'>Team Members</Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={dPrice} name='dPrice' type="number" placeholder="Design Price" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={provisionalItems} name='provisionalItems' type="text" placeholder="Provisional Items" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control value={adminPrice} name='adminPrice' type="number" placeholder="Contract Admin Price" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={consultantPrice} name='consultantPrice' type="number" placeholder="Consultant Price" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={totalBid} name='totalBid' type="number" placeholder="Total Bid" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
      <Form.Group as={Col}>
        <Select isMulti defaultInputValue={planTakers} onChange={doChange1} options={company} name="planTakers" placeholder='Plan Takers'></Select>
        </Form.Group>
        <Form.Group as={Col}>
        <Select isMulti defaultInputValue={bidders} onChange={doChange1} options={company} name="bidders" placeholder='Bidders'></Select>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={bidderPrice} name='bidderPrice' type="number" placeholder="Bidder Price" onChange={handleChange} />
        </Form.Group>
      </Row>
      <Row className="mb-4">
        <Form.Group as={Col}>
          <Form.Control value={bidStatus} name='bidStatus' type="text" placeholder="Bid Status" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Control value={winningPrice} name='winningPrice' type="number" placeholder="Winning Price" onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col}>
        <Form.Select value={winningBidder} onChange={handleChange} name='winningBidder'>
            {/* <option value="">Select Winning Bidder</option> */}
          {companies.map((option) => (
            <option value={option.ID}>
              {option.Name}
            </option>
          ))}
          </Form.Select>
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
        <Modal.Body>Proposal Updated Successfully</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={callFunc}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UpdateProposal