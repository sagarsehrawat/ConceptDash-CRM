import { React, useState, useEffect } from "react";
import projectIcon from "../../Images/images.png";
import requestIcon from "../../Images/reques.jpg";
import todoIcon from "../../Images/todo-list-icon-26.jpg";
import calendarIcon from "../../Images/calendar.png";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import TestDemo from "../../Components/Calendar"
import { Form } from "react-bootstrap";
import axios from "axios";
import {
  GET_EMPLOYEENAMES,
  GET_CHART_MEET,
  HOST,
  COUNTS,
  RFP_ANALYSIS,
  PROPOSAL_STATUS_COUNTS,
  BUDGET_AMOUNT,
  GET_WORK_HOURS,
  GET_PROJECT_STATUS
} from "../Constants/Constants";
import AddTask from "../Form/AddTask";
import LoadingSpinner from "../Loader/Loader";
function AdminDash() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAT, setShowAT] = useState(false);
  const handleCloseAT = () => setShowAT(false);
  const handleShowAT = () => setShowAT(true);

  const [isLoading, setIsLoading] = useState(false);

  const [budgetsCount, setbudgetsCount] = useState(0);
  const [RFPCount, setRFPCount] = useState(0);
  const [proposalCount, setproposalCount] = useState(0);
  const [projectCount, setprojectCount] = useState(0);

  const [goRFP, setgoRFP] = useState(0);
  const [nogoRFP, setnogoRFP] = useState(0);
  const [reviewRFP, setreviewRFP] = useState(0);

  const [wonProposals, setwonProposals] = useState(0);
  const [lostProposals, setlostProposals] = useState(0);

  const [employees, setemployees] = useState([])

  const currentYear = new Date().getFullYear();
  const years = [
    currentYear - 4,
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];
  const [budget1, setbudget1] = useState(0);
  const [budget2, setbudget2] = useState(0);
  const [budget3, setbudget3] = useState(0);
  const [budget4, setbudget4] = useState(0);
  const [budget5, setbudget5] = useState(0);

  const [status, setstatus] = useState([])

  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + BUDGET_AMOUNT, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          console.log(res.data.res)
          for (let i = 0; i < res.data.res.length; i++) {
            if (res.data.res[i].Budget_Year === years[0]) {
              setbudget1(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[1]) {
              setbudget2(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[2]) {
              setbudget3(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[3]) {
              setbudget4(res.data.res[i].Total_Budget);
            } else if (res.data.res[i].Budget_Year === years[4]) {
              setbudget5(res.data.res[i].Total_Budget);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + PROPOSAL_STATUS_COUNTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          if (res.data.res[0].Status === "Won") {
            setwonProposals(res.data.res[0].Price);
          } else {
            setlostProposals(res.data.res[0].Price);
          }
          if (res.data.res[1].Status === "Won") {
            setwonProposals(res.data.res[1].Price);
          } else {
            setlostProposals(res.data.res[1].Price);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + RFP_ANALYSIS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setgoRFP(res.data.res[0].Go);
          setnogoRFP(res.data.res[0].NoGo);
          setreviewRFP(res.data.res[0].Review);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + COUNTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setbudgetsCount(res.data.res[0].bCount);
          setRFPCount(res.data.res[0].rCount);
          setproposalCount(res.data.res[0].pCount);
          setprojectCount(res.data.res[0].proCount);
        })
        .catch((err) => {
          console.log(err);
        });
      
        await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setemployees(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

        await axios
        .get(HOST + GET_PROJECT_STATUS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setstatus(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    call();
  }, []);
const [meetHours, setmeetHours] = useState([])
const [workHours, setworkHours] = useState(0)
const [selected, setselected] = useState(false)
  const handleChange1 = async (e) => {
    setselected(true);
    await axios
        .get(HOST + GET_CHART_MEET, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: e.target.value
          },
        })
        .then((res) => {
          setmeetHours(res.data.res)
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_WORK_HOURS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: e.target.value
          },
        })
        .then((res) => {
          setworkHours(res.data.res)
        })
        .catch((err) => {
          console.log(err);
        });
  };

  const dataCounts = {
    labels: ["Budgets", "RFPs", "Proposals", "Projects"],
    datasets: [
      {
        data: [budgetsCount, RFPCount, proposalCount, projectCount],
        backgroundColor: ["#9BBFE0", "#E8A09A", "#FBE29F", "#C6D68F"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB", "#74BBFB", "#74BBFB"],
      },
    ],
  };

  const dataForRFP = {
    labels: ["Go", "NoGo", "Review"],
    datasets: [
      {
        data: [goRFP, nogoRFP, reviewRFP],
        backgroundColor: ["#0674C4", "#DDDDDD", "#64C2A6"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB", "#74BBFB"],
      },
    ],
  };

  const meetHoursChart = {
    labels: [meetHours[0]?meetHours[0].Work:'', meetHours[1]?meetHours[1].Work:'', meetHours[2]?meetHours[2].Work:''],
    datasets: [
      {
        data: [(meetHours[0]?meetHours[0].Time_Worked:0)/60, (meetHours[1]?meetHours[1].Time_Worked:0)/60, (meetHours[2]?meetHours[2].Time_Worked:0)/60],
        backgroundColor: ["#0674C4", "#DDDDDD", "#64C2A6"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB", "#74BBFB"],
      },
    ],
  };

  const wonLostProposals = {
    labels: ["Won", "Lost"],
    datasets: [
      {
        data: [wonProposals, lostProposals],
        backgroundColor: ["#00008B", "#1F75FE"],
        hoverBackgroundColor: ["#74BBFB", "#74BBFB"],
      },
    ],
  };
  const data = {
    labels: years,
    datasets: [
      {
        label: "Budgets (in USD)",
        data: [budget1, budget2, budget3, budget4, budget5],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div
        className="container"
        style={{ minWidth: "80% !important", marginTop: "2rem" }}
      >
        <div
          className="row d-flex justify-content-around body-1"
          style={{ margin: "2vh", marginBottom: "4vh" }}
        >
          <div
            className="card col-3 d-flex align-items-center"
            style={{
              width: "12rem",
              padding: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <img
              src={projectIcon}
              className="card-img"
              alt="Submitted Purchases"
            />
            <h5
              className="card-title"
              style={{ marginBottom: "1vh" }}
              align="center"
            >
              Projects
            </h5>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Total</div>
                </div>
                <Badge style={{ marginLeft: "4vw" }} bg="primary" pill>
                  {status[0]?status[0].Completed+status[0].Not_Started+status[0].Ongoing:''}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Ongoing</div>
                </div>
                <Badge bg="primary" pill>
                {status[0]?status[0].Ongoing:''}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Completed</div>
                </div>
                <Badge bg="primary" pill>
                {status[0]?status[0].Completed:''}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Not Started</div>
                </div>
                <Badge bg="primary" pill>
                {status[0]?status[0].Not_Started:''}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </div>
          {/* <div
            className="card col-3 d-flex align-items-center"
            style={{
              width: "12rem",
              padding: "0.5rem",
              backgroundColor: "white",
            }}
          >
            <img
              src={requestIcon}
              className="card-img"
              alt="Closed Purchases"
            />
            <h5 style={{ marginBottom: "1vh" }} className="card-title">
              Requests
            </h5>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Pending</div>
                </div>
                <Badge style={{ marginLeft: "2vw" }} bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Accepted</div>
                </div>
                <Badge bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Declined</div>
                </div>
                <Badge bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Resolved</div>
                </div>
                <Badge bg="primary" pill>
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </div> */}
          <div
            className="card col-3 d-flex align-items-center"
            style={{
              width: "12rem",
              padding: "2rem",
              backgroundColor: "white",
            }}
          >
            <img src={calendarIcon} className="card-img" alt="New Purchases" />
            <h5
              style={{ marginBottom: "2vh", marginTop: "3vh" }}
              className="card-title"
            >
              Calendar
            </h5>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Button
                      style={{ backgroundColor: "rgba(38,141,141,1)" }}
                      onClick={handleShow}
                      variant="primary"
                    >
                      Click Here
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div
            className="card col-3 d-flex align-items-center"
            style={{
              width: "12rem",
              padding: "2rem",
              backgroundColor: "white",
            }}
          >
            <img src={todoIcon} className="card-img" alt="New Purchases" />
            <h5
              style={{ marginBottom: "2vh", marginTop: "3vh" }}
              className="card-title"
            >
              Assign Task
            </h5>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <Button
                      style={{ backgroundColor: "rgba(38,141,141,1)" }}
                      onClick={handleShowAT}
                      variant="primary"
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div
          className="container"
          style={{
            textAlign: "center",
            marginTop: "2rem",
            marginBottom: "2rem",
            border: "1px solid grey",
          }}
        >
          <h3>Work and Meet Hours</h3>
          <Form>
            <Form.Group>
              <Form.Select
                style={{ marginBottom: "1rem" }}
                onChange={handleChange1}
              >
                <option>Select Employee</option>
                {employees.length !== 0 ? (
                  employees.map((options) => (
                    <option value={options.Employee_ID}>
                      {options.Full_Name}
                    </option>
                  ))
                ) : (
                  <option value="">None</option>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
          {selected && meetHours?
          <div
          className="row d-flex justify-content-around"
        >
          <p style={{textAlign:'center', fontWeight:'bold'}}>Working Hours: {workHours[0]?(workHours[0].Time_Worked/60):''}</p>
          <Card style={{ width: "20rem", marginBottom:'1rem' }}>
          <h3 style={{ textAlign: "center" }}>Meet Hours</h3>
          <Pie data={meetHoursChart} />
        </Card>
        </div>:''}
        </div>
          <div
            className="row d-flex justify-content-around"
            style={{ marginTop: "2rem" }}
          >
            <Card style={{ width: "20rem" }}>
              <h3 style={{ textAlign: "center" }}>RFP Analysis</h3>
              <Pie data={dataForRFP} />
            </Card>
            <Card style={{ width: "20rem" }}>
              <h3 style={{ textAlign: "center" }}>Overall Counts</h3>
              <Pie data={dataCounts} />
            </Card>
            <Card style={{ width: "20rem" }}>
              <h3 style={{ textAlign: "center" }}>Bid Price</h3>
              <Pie data={wonLostProposals} />
            </Card>
            <Card style={{ marginTop: "2rem", width: "76rem" }}>
              <h3 style={{ textAlign: "center" }}>Budgets(Last 5 years)</h3>
              <Line height={100} data={data} />
            </Card>
          </div>
          {/* <div
          className="card col-3 d-flex align-items-center"
          style={{ width: "12rem", padding: "2rem", backgroundColor: "white" }}
        >
          <img src={todoIcon} className="card-img" alt="New Purchases" />
          <h5 style={{ marginBottom: "2vh" }} className="card-title">
            To Do
          </h5>
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{task1}</div>
              </div>
              <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          14
        </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold"></div>
              </div>
              <Badge bg="primary" pill>
          14
        </Badge>
            </ListGroup.Item>
          </ListGroup>
          <p>12</p>
        </div> */}
          {/* <div
          className="card col-3 d-flex align-items-center"
          style={{
            width: "12rem",
            padding: "0.5rem",
            backgroundColor: "white",
          }}
        >
          <Form.Select onChange={handleMeetHours}>
            {employees.length !== 0 ? (
              employees.map((options) => (
                <option value={options.Employee_ID} key={options.Employee_ID}>
                  {options.Full_Name}
                </option>
              ))
            ) : (
              <option value="">None</option>
            )}
          </Form.Select>
          <img src={employeesIcon} className="card-img" alt="New Purchases" />
          <h5 style={{ marginBottom: "2vh" }} className="card-title">
            Employees
          </h5>
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Utilization Rate </div>
              </div>
              <Badge style={{ marginLeft: "2vw" }} bg="primary" pill>
                -
              </Badge>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Skills</div>
              </div>
              <Badge bg="primary" pill>
                -
              </Badge>
            </ListGroup.Item>
          </ListGroup>
          <p>12</p>
        </div> */}
          {/* <div
          className="card col-3 d-flex align-items-center"
          style={{ width: "12rem", padding: "2rem", backgroundColor: "white" }}
        >
          <select name="" id="">
              <option value="">City</option>
              <option value="">Year</option>
              <option value="">Department</option>
            </select>
          <img
            style={{ marginTop: "1vh" }}
            src={budgetIcon}
            className="card-img"
            alt="New Purchases"
          />
          <h5 style={{ marginBottom: "2vh" }} className="card-title">
            Budgets
          </h5>
          <ListGroup as="ol">
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">----</div>
              </div>
              <Badge style={{'marginLeft':'2vw'}} bg="primary" pill>
          14
        </Badge>
            </ListGroup.Item>
            <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold">Task 2</div>
        </div>
      </ListGroup.Item>
          </ListGroup>
          <p>12</p>
        </div>*/}
        </div>
      </div>
      <Modal
        // style={{'margin':'2rem'}}
        show={show}
        onHide={handleClose}
        size="lg"
        dialogClassName="modal-150w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginLeft: "4vw" }}>{<TestDemo />}</Modal.Body>
      </Modal>

      <Modal
        // style={{'margin':'2rem'}}
        show={showAT}
        onHide={handleCloseAT}
        dialogClassName="modal-150w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<AddTask />}</Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminDash;
