import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import Cards from "../../Cards/Cards";
import TestDemo from "../../Calendar";
import AdminDash from "../../AdminDash/AdminDash";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
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
const Dashboard = () => {
  const navigate = useNavigate();
  const [nav, setnav] = useState(0);

  const handleDash = (e) => {
    if (nav === 0) return <AdminDash />;
    if (nav === 1) return <BudgetUpdate />;
    if (nav === 2) return <RFPUpdate />;
    if (nav === 3) return <ProposalsUpdate />;
    if (nav === 4) return <CustomerUpdate category={"Customers"} />;
    if (nav === 5) return <EmployeeUpdate />;
    if (nav === 6) return <ProjectUpdate />;
    if (nav === 7) return <CompanyUpdate />;
    if (nav === 8) return <Cards />;
    if (nav === 9) return <AssetUpdate />;
    if (nav === 10) return <TimeSheetTable />;
    if (nav === 11) return <Todo />;
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
          style={{
            backgroundImage:
              "linear-gradient(to left,rgba(75,192,192,0.2) ,rgba(75,192,192,1)",
            color: "white",
          }}
        >
          <Container style={{ marginLeft: "2vw" }}>
            <Navbar.Brand
              style={{ fontSize: "2rem", cursor:'pointer' }}
              onClick={(e) => {
                e.preventDefault();
                setnav(0);
              }}
            >
              CRM
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(1);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Budgets
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(2);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                RFPs
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(3);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Proposals
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(4);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Customers
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(5);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Employees
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(6);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Projects
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(7);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Companies
              </Nav.Link>
              {/* <Nav.Link onClick={(e)=> {e.preventDefault(); setnav(8);}} style={{'marginLeft':'1.1vw'}} >Marketing</Nav.Link> */}
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(9);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Assets
              </Nav.Link>
              <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(10);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Expenses
              </Nav.Link>
              {/* <Nav.Link
                onClick={(e) => {
                  e.preventDefault();
                  setnav(11);
                }}
                style={{ fontSize: "1rem",marginLeft: "1.1vw" }}
              >
                Todo
              </Nav.Link> */}

              <Nav.Link
                onClick={() => {
                  navigate("/");
                  localStorage.clear();
                }}
                style={{ fontSize: "1rem", marginLeft: "1vw" }}
              >
                Log Out
              </Nav.Link>
            </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main class="s-layout__content1">{handleDash()}</main>
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
