import React, { useState, useEffect, useContext } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Cards from "../../Cards/Cards";
import TestDemo from "../../Calendar";
import AdminDash from "../../AdminDash/AdminDash";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from "react-bootstrap/Modal";
import "./Mode.css";
import TimeSheetTable from "../../Expenses/Expenses";
import Todo from "../../Todo/Todo";
import ProjectUpdate from "../../Update/ProjectUpdate";
import EmployeeUpdate from "../../Update/EmployeeUpdate";
import CompanyUpdate from "../../Update/CompanyUpdate";
import AssetUpdate from "../../Update/AssetUpdate";
import BudgetUpdate from "../../Update/BudgetUpdate";
import RFPUpdate from "../../Update/RFPUpdate";
import ProposalsUpdate from "../../Update/ProposalsUpdate";
import CustomerUpdate from "../../Update/CustomerUpdate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import Privileges from "../../Update/Privileges";
import ExpenseUpdate from "../../Update/ExpenseUpdate";
import AuthContext from '../../../Context/AuthContext'
import CityBudget from "../../Update/CityBudget";
const Dashboard = () => {
  const navigate = useNavigate();
  const [nav, setnav] = useState(0);
  
  const { privileges, setPrivileges } = useContext(AuthContext)

  const handleDash = (e) => {
    if (nav === 0) return <AdminDash />;
    if (nav === 1) return <CityBudget />;
    if (nav === 2) return <RFPUpdate />;
    if (nav === 3) return <ProposalsUpdate />;
    if (nav === 4) return <CustomerUpdate category={"Customers"} />;
    if (nav === 5) return <EmployeeUpdate />;
    if (nav === 6) return <ProjectUpdate />;
    if (nav === 7) return <CompanyUpdate />;
    if (nav === 8) return <Cards />;
    if (nav === 9) return <AssetUpdate />;
    if (nav === 10) return <ExpenseUpdate />;
    if (nav === 11) return <Todo />;
    if (nav === 12) return <Privileges />
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div class="s-layout">
        <Navbar
          bg="dark"
          expand="xl"
          fixed="top"
          style={{
            backgroundImage:
              "linear-gradient(to left,rgba(75,192,192,0.2) ,rgba(75,192,192,1)",
            color: "white",
          }}
        >

          <Navbar.Brand
            style={{ fontSize: "2rem", cursor: 'pointer', marginLeft: "2vw", marginRight: "2vw" }}
            onClick={(e) => {
              e.preventDefault();
              setnav(0);
            }}
          >
            <b>TASKFORCE</b>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {privileges.includes('View Budget')?<Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(1);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Budgets
              </Nav.Link>:<></>}
              {privileges.includes("View RFP") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(2);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                RFPs
              </Nav.Link> : <></>}
              {privileges.includes("View Proposal") ?<Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(3);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Proposals
              </Nav.Link> : <></>}
              {privileges.includes("View Project") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(6);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Projects
              </Nav.Link> : <></>}

              {privileges.includes("View Employee") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(5);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Employees
              </Nav.Link> : <></>}

              {privileges.includes("View Companies") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(7);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Companies
              </Nav.Link> : <></>}
              {privileges.includes("View Contacts") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(4);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Contacts
              </Nav.Link>:<></>}
              {privileges.includes("View Assets") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(9);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Assets
              </Nav.Link> : <></>}
              {privileges.includes("View Expenses") ? <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(10);
                }}
                style={{ fontSize: "1rem", marginLeft: "1.1vw" }}
              >
                Expenses
              </Nav.Link> : <></>}
            </Nav>


            <Nav style={{marginRight: "2vw"}}>
              <NavDropdown title={<FontAwesomeIcon icon={faGear} />} id="collasible-nav-dropdown" align="end">
                <NavDropdown.Item onClick={(e) => {
                  e.preventDefault();
                  setnav(11);
                }}>Your Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={(e) => {
                  e.preventDefault();
                  setnav(12);
                }}>Privileges</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

        </Navbar>

        <main class="s-layout__content1" style={{ "paddingTop": "8vh" }}>{handleDash()}</main>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        // dialogClassName="modal-150w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body >{<TestDemo />}</Modal.Body>
      </Modal>
    </div>
  );
};

export default Dashboard;
