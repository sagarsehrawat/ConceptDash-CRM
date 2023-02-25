import React, { useState, useContext } from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Modal from "react-bootstrap/Modal";
import TimeSheet from "../../TimeSheet/TimeSheet";
import ProposalsUpdate from "../../Update/ProposalsUpdate";
import ProjectUpdate from "../../Update/ProjectUpdate";
import RFPUpdate from "../../Update/RFPUpdate";
import BudgetCities from "../../Update/BudgetCities";
import AuthContext from '../../../Context/AuthContext'
import CityBudget from "../../Update/CityBudget";

function Engineer() {
  const navigate = useNavigate();
  const [nav, setnav] = useState(1);
  const [city, setcity] = useState({});
  
  const { privileges, setPrivileges } = useContext(AuthContext)

  const [showTS, setShowTS] = useState(false);
  const handleCloseTS = () => setShowTS(false);
  const handleShowTS = () => setShowTS(true);

  const handleDash = (e) => {
    if (nav === 0) return <Dashboard />;
    if (nav === 1) return <BudgetCities setnav={setnav} setcity={setcity}/>;
    else if (nav === 3) return <RFPUpdate />;
    else if (nav === 4) return <ProposalsUpdate />;
    else if (nav === 5) return <ProjectUpdate />;
    else if (nav === 13) return <CityBudget setnav={setnav} city={city}/>;
  };

  return (
    <>
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
              onClick={(e) => {
                e.preventDefault();
                setnav(0);
              }}
              style={{ fontSize: "2rem" }}
              href="#home"
            >
              <b>TASKFORCE</b>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {privileges.includes('View Budget')?<Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setnav(1);
                  }}
                >
                  <b>Budgets</b>
                </Nav.Link>:<></>}
                {privileges.includes('View RFP')?<Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setnav(3);
                  }}
                >
                  <b>RFPs</b>
                </Nav.Link>:<></>}
                {privileges.includes('View Proposal')?<Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setnav(4);
                  }}
                >
                  <b>Proposals</b>
                </Nav.Link>:<></>}
                {privileges.includes('View Project')?<Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setnav(5);
                  }}
                >
                  <b>All Projects</b>
                </Nav.Link>:<></>}
                <Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={handleShowTS}
                >
                  <b>TimeSheet</b>
                </Nav.Link>
                <Nav.Link
                  style={{ fontSize: "1rem", marginLeft: "2vw" }}
                  onClick={() => {
                    navigate("/");
                    localStorage.clear();
                  }}
                >
                  <b>Log Out</b>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main class="s-layout__content1">{handleDash()}</main>
      </div>
      {/* TimeSheet Modal */}
      <Modal
        show={showTS}
        onHide={handleCloseTS}
        backdrop="static"
        size="lg"
        dialogClassName="modal-150w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>TimeSheet</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: "0.5rem" }}>
          {<TimeSheet />}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Engineer;
