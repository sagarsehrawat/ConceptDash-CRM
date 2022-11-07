import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './Cards.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Cards() {
    const navigate = useNavigate();
    const [nav, setnav] = useState(1)
    
  return (
    
    <>
    <div className='container-main' align="center">
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Employee</Card.Title>
                <Card.Text>
                    Create a new Employee
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/employeeform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Supplier</Card.Title>
                <Card.Text>
                Create a new Supplier
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/supplierform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Shipper</Card.Title>
                <Card.Text>
                   Create a new Shipper
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/shipperform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Client</Card.Title>
                <Card.Text>
                    Create a new Contact
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/customerform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Asset</Card.Title>
                <Card.Text>
                    Add a new Asset
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/assetform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Company</Card.Title>
                <Card.Text>
                    Add a new Company
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/companyform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add a Task</Card.Title>
                <Card.Text>
                    Add a new Task
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/addTask")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add into Timesheet</Card.Title>
                <Card.Text>
                    Add into timesheet
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/addtimesheet")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Project</Card.Title>
                <Card.Text>
                    Add a New Project
                </Card.Text>
                <Button variant="primary" onClick={(e) => {navigate("/addProject")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Quote</Card.Title>
                <Card.Text>
                    Add a New Quote
                </Card.Text>
                <Button variant="primary"  onClick={(e) => {navigate("/addquote")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Software</Card.Title>
                <Card.Text>
                    Add a New Software
                </Card.Text>
                <Button variant="primary"  onClick={(e) => {navigate("/addsoftware")}}>Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Add Order</Card.Title>
                <Card.Text>
                    Add a New Order
                </Card.Text>
                <Button variant="primary"  onClick={(e) => {navigate("/orderform")}}>Click Here</Button>
            </Card.Body>
        </Card>
        {/* <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Client</Card.Title>
                <Card.Text>
                    Add a New Client
                </Card.Text>
                <Button variant="primary">Click Here</Button>
            </Card.Body>
        </Card> */}
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Campaign</Card.Title>
                <Card.Text>
                    Add a New Campaign
                </Card.Text>
                <Button variant="primary">Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Track Shipment</Card.Title>
                <Card.Text>
                    Track an order Shipment
                </Card.Text>
                <Button variant="primary">Click Here</Button>
            </Card.Body>
        </Card>
        <Card className='card-main' style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>New Design Request</Card.Title>
                <Card.Text>
                    Request a new Design
                </Card.Text>
                <Button variant="primary">Click Here</Button>
            </Card.Body>
        </Card>
        </div>
    </>
  )
}

export default Cards