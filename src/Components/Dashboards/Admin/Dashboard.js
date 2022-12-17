import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import Tables from '../../Tables/Tables'
import Requests from '../../Requests/Requests'
import PendingReq from '../../PendingReq/PendingReq'
import EmployeeTable from '../../EmployeeTable/EmployeeTable'
import SupplierTable from '../../SupplierTables/SupplierTable'
import Cards from '../../Cards/Cards'
import ProjectTable from '../../Project-Table/ProjectTable'
import logo from '../../../Images/logo1.jpg'
import TestDemo from '../../Calendar'
import Companies from '../../Companies-Table/Companies'
import Assets from '../../Asset/Assets'
import AdminDash from '../../AdminDash/AdminDash'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Mode.css'
import LogoutIcon from '@mui/icons-material/Logout';
import UpdateEmployeeForm from '../../Form/UpdateEmployeeForm'
import TimeSheetTable from '../../Expenses/Expenses'
import Todo from '../../Todo/Todo'
import Dummy from '../../Dummy/Dummy'
import ProjectUpdate from '../../Update/ProjectUpdate'
import EmployeeUpdate from '../../Update/EmployeeUpdate'
import CompanyUpdate from '../../Update/CompanyUpdate'
import AssetUpdate from '../../Update/AssetUpdate'
import BudgetUpdate from '../../Update/BudgetUpdate'
import RFPUpdate from '../../Update/RFPUpdate'
import ProposalsUpdate from '../../Update/ProposalsUpdate'
import CustomerUpdate from '../../Update/CustomerUpdate'
const Dashboard = () => {
    const navigate = useNavigate()
    const [nav, setnav] = useState(0)

    const handleDash = (e) => {
        if(nav===0) 
            return (<AdminDash/>)
        if(nav===1) 
            return (<BudgetUpdate/>)
        if(nav===2) 
            return (<RFPUpdate/>)
        if(nav===3) 
            return (<ProposalsUpdate/>)
        if(nav===4)
            return (<CustomerUpdate category={"Customers"}/>)
        if(nav===5)
            return (<EmployeeUpdate/>)
        if(nav===6)
            return (<ProjectUpdate/>)
        if(nav===7) 
            return (<CompanyUpdate/>)
        if(nav===8) 
            return (<Cards/>)
        if(nav===9) 
            return (<AssetUpdate/>)
        if(nav===10) 
            return (<TimeSheetTable/>)
        if(nav===11) 
            return (<Todo/>)
        
    }
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    return (
        <div>
            <div class="s-layout">
               
                <Navbar sticky="top" bg="dark" variant='dark' style={{'color':'white'}}>
                    <Container>
                        {/* <img src={logo} height='40' width='55' style={{'marginRight':'0'}} alt="Concept Dash" /> */}
                    <Navbar.Brand style={{'fontSize':'2rem','cursor':'pointer'}} onClick={(e)=> {e.preventDefault(); setnav(0);}} >CRM</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(1);}} style={{'marginLeft':'1.1vw'}} >Budgets</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(2);}} style={{'marginLeft':'1.1vw'}} >RFPs</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(3);}} style={{'marginLeft':'1.1vw'}} >Proposals</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(4);}} style={{'marginLeft':'1.1vw'}} >Customers</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(5);}} style={{'marginLeft':'1.1vw'}} >Employees</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(6);}} style={{'marginLeft':'1.1vw'}} >Projects</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(7);}} style={{'marginLeft':'1.1vw'}} >Companies</Nav.Link>
                        {/* <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(8);}} style={{'marginLeft':'1.1vw'}} >Marketing</Nav.Link> */}
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(9);}} style={{'marginLeft':'1.1vw'}}>Assets</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(10);}} style={{'marginLeft':'1.1vw'}}>Expenses</Nav.Link>
                        <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(11);}} style={{'marginLeft':'1.1vw'}}>Todo</Nav.Link>
                        
                        <Nav.Link onClick={() => {navigate('/'); localStorage.clear()}} style={{'fontSize':'1rem','marginLeft':'1vw'}} >Log Out</Nav.Link>
                    </Nav>
                    </Container>
                </Navbar>

                <main class="s-layout__content1">
                   {
                        handleDash()
                   }
                </main>
            </div>
            <Modal 
            show={show} 
            onHide={handleClose} 
            size='sm'
            dialogClassName="modal-150w"  
            aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'marginLeft':'4vw'}}>{<TestDemo/>}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard