import { React, useState, useEffect } from "react";
import projectIcon from "../../Images/images.png";
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
import TestDemo from "../../Components/Calendar";
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
  GET_PROJECT_STATUS,
} from "../Constants/Constants";
import AddTask from "../Form/AddTask";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function AdminDash() {
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showd2, setShowd2] = useState(false);
  const closeDropdown2 = () => setShowd2(false);
  const dropdown2 = () => setShowd2(true);

  const [showd3, setShowd3] = useState(false);
  const closeDropdown3 = () => setShowd3(false);
  const dropdown3 = () => setShowd3(true);

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

  const [employees, setemployees] = useState([]);

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

  const [status, setstatus] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
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
  const [meetHours, setmeetHours] = useState([]);
  const [workHours, setworkHours] = useState(0);
  const [selected, setselected] = useState(false);
  const handleChange1 = async (e) => {
    setselected(true);
    await axios
      .get(HOST + GET_CHART_MEET, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          id: e.target.value,
        },
      })
      .then((res) => {
        setmeetHours(res.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .get(HOST + GET_WORK_HOURS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          id: e.target.value,
        },
      })
      .then((res) => {
        setworkHours(res.data.res);
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
    labels: [
      meetHours[0] ? meetHours[0].Work : "",
      meetHours[1] ? meetHours[1].Work : "",
      meetHours[2] ? meetHours[2].Work : "",
    ],
    datasets: [
      {
        data: [
          (meetHours[0] ? meetHours[0].Time_Worked : 0) / 60,
          (meetHours[1] ? meetHours[1].Time_Worked : 0) / 60,
          (meetHours[2] ? meetHours[2].Time_Worked : 0) / 60,
        ],
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
  const budgetApi = HOST + BUDGET_AMOUNT;
  const [charts, setCharts] = useState([]);

  const [budgets, setbudgets] = useState(false);
  const [rfps, setrfps] = useState(false);
  const [projects, setprojects] = useState(false);
  const [proposals, setproposals] = useState(false);
  const [showd1, setShowd1] = useState(false);
  const closeDropdown1 = () => {
    setShowd1(false);
    setbudgets(false);
    setrfps(false);
    setprojects(false);
    setproposals(false);
    settimeframe(false);
  };
  const dropdown1 = () => setShowd1(true);
  const d1change = (e) => {
    setbudgets(false);
    setrfps(false);
    setprojects(false);
    setproposals(false);
    settimeframe(false);
    const { value } = e.target;
    if (value === "Budget") {
      setbudgets(true);
    }
    if (value === "RFP") {
      setrfps(true);
    }
    if (value === "Projects") {
      setprojects(true);
    }
    if (value === "Proposal") {
      setproposals(true);
    }
  };
  const [timeframe, settimeframe] = useState(false);
  const [d2value, setd2value] = useState("");
  const budgetChange = (e) => {
    settimeframe(true);
    console.log(e.target.value);
    setd2value(e.target.value);
  };
  const [d3year, setd3year] = useState("");
  const d3change = (e) => {
    console.log(e.target.value);
    setd3year(e.target.value);
  };
  let callingAPI;
  const showGraph = async (e) => {
    if (budgets) {
      callingAPI = budgetApi;
    }
    await axios
      .get(callingAPI, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          chart: d2value,
          years: d3year,
        },
      })
      .then((res) => {
        console.log(res.data.res);
        let prevArray = charts;
        if (d2value === "Budget Category") {
          prevArray.push({
            api: "",
            chart: budgetCategoryChart,
            time: d3year,
            data: res.data.res,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const budgetCategoryChart = (data) => {
    return (
      <>
        <div>Hello</div>
      </>
    );
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
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
                      {status[0]
                        ? status[0].Completed +
                          status[0].Not_Started +
                          status[0].Ongoing
                        : ""}
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
                      {status[0] ? status[0].Ongoing : ""}
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
                      {status[0] ? status[0].Completed : ""}
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
                      {status[0] ? status[0].Not_Started : ""}
                    </Badge>
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
                <img
                  src={calendarIcon}
                  className="card-img"
                  alt="New Purchases"
                />
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
                {selected && meetHours ? (
                  <div className="row d-flex justify-content-around">
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                      Working Hours:{" "}
                      {workHours[0] ? workHours[0].Time_Worked / 60 : ""}
                    </p>
                    <Card style={{ width: "20rem", marginBottom: "1rem" }}>
                      <h3 style={{ textAlign: "center" }}>Meet Hours</h3>
                      <Pie data={meetHoursChart} />
                    </Card>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="container" style={{ textAlign: "center" }}>
                <Button onClick={dropdown1}>+</Button>
              </div>
              {charts.map((e) => {
                return e.chart;
              })}
              {/* <div
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
              </div> */}
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
            <Modal.Body style={{ marginLeft: "4vw" }}>
              {<TestDemo />}
            </Modal.Body>
          </Modal>

          <Modal
            show={showAT}
            onHide={handleCloseAT}
            dialogClassName="modal-150w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddTask
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseAT}
                />
              }
            </Modal.Body>
          </Modal>

          {/* module select dropdown */}
          <Modal
            show={showd1}
            onHide={closeDropdown1}
            dialogClassName="modal-150w"
            aria-labelledby="example-custom-modal-styling-title"
          >
            <Modal.Header closeButton>
              <Modal.Title>Select Chart to show</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Select
                style={{ marginBottom: "1rem" }}
                required
                onChange={d1change}
              >
                <option>Select Module</option>
                <option value="Budget" api={budgetApi}>
                  Budgets
                </option>
                <option value="RFP">RFP</option>
                <option value="Proposal">Proposal</option>
                <option value="Projects">Projects</option>
              </Form.Select>
              {budgets ? (
                <Form.Select
                  style={{ marginBottom: "1rem" }}
                  required
                  onChange={budgetChange}
                >
                  <option>Select Chart</option>
                  <option value="Budget Category">Budget Category</option>
                  <option value="Department">Department</option>
                  <option value="Project Category">Project Category</option>
                  <option value="Budget Amount">Budget Amount</option>
                </Form.Select>
              ) : (
                ""
              )}
              {timeframe ? (
                <Form.Select
                  style={{ marginBottom: "1rem" }}
                  required
                  onChange={d3change}
                >
                  <option>Select Timeframe</option>
                  <option value="0">This Year</option>
                  <option value="1">Last Year</option>
                  <option value="2">Last 2 Years</option>
                  <option value="3">Last 3 Years</option>
                </Form.Select>
              ) : (
                ""
              )}
              <Button onClick={showGraph}>Get</Button>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default AdminDash;
