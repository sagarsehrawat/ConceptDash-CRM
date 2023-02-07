import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_CITIES,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  GET_EMPLOYEENAMES,
  GET_BUDGET_NAMES,
  ADD_RFP,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";

function RFPform(props) {
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;

  const [isLoading, setisLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setform] = useState({
    dept: "",
    projectCat: "",
    action: "",
    managerName: "",
    projectName: "",
    // bidDate: "",
    startDate: "",
    submissionDate: "",
    rfpNumber: "",
    // amount: "",
    city: "",
  });
  const [radio, setradio] = useState(false);
  const handleRadio = (e) => {
    if (e.target.value === "yes") {
      setradio(false);
    } else if (e.target.value === "no") {
      setradio(true);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const [budgets, setbudgets] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_CITIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcities(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojectDepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_BUDGET_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setbudgets(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_RFP,
        {
          departmentId: radio ? deptid : form.dept,
          projectCatId: radio ? pCategoryid : form.projectCat,
          projectManagerId: form.managerName,
          projectName: radio ? pName : form.projectName,
          // bidDate: form.bidDate,
          startDate: form.startDate,
          submissionDate: form.submissionDate,
          rfpNumber: form.rfpNumber,
          source: form.source,
          // amount: radio ? amount : form.amount,
          cityId: radio ? cityid : form.city,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          closeModal();
          setGreen(true);
          apiCall(api + 1);
        } else {
          setRed(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        setRed(true);
      });
  };
  const [budgetData, setbudgetData] = useState([]);
  const [pName, setpName] = useState("");
  const [dept, setdept] = useState("");
  const [deptid, setdeptid] = useState("");
  const [pCategory, setpCategory] = useState("");
  const [pCategoryid, setpCategoryid] = useState("");
  const [cityid, setcityid] = useState("");
  const [city, setcity] = useState("");
  // const [amount, setamount] = useState("");
  const [source, setsource] = useState("");
  const handleChange1 = async (e) => {
    await axios
      .get(HOST + "/api/get/budget/id", {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          id: e.target.value,
        },
      })
      .then(async (res) => {
        setbudgetData(res.data.res);
        setpName(res.data.res[0].Project_Name);
        setdept(res.data.res[0].Department);
        setdeptid(res.data.res[0].Department_ID);
        setpCategory(res.data.res[0].Project_Category);
        setpCategoryid(res.data.res[0].Project_Cat_ID);
        setcity(res.data.res[0].City);
        setcityid(res.data.res[0].City_ID);
        // setamount(res.data.res[0].Budget_Amount);
        setsource(res.data.res[0].Source);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);

  const [showDeptForm, setShowDeptForm] = useState(false);
  const handleCloseDeptForm = () => setShowDeptForm(false);
  const handleShowDeptForm = () => setShowDeptForm(true);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const handleCloseCategoryForm = () => setShowCategoryForm(false);
  const handleShowCategoryForm = () => setShowCategoryForm(true);
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleRadio}>
                  <option value="yes">Create New RFP</option>
                  <option value="no">Import From Budgets</option>
                </Form.Select>
              </Form.Group>
            </Row>
            {!radio ? (
              <div>
                <Row className="mb-4">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Select onChange={handleChange} name="city" required>
                      <option value="">Select City</option>
                      {cities
                        ? cities.map((e) => (
                            <option value={e.City_ID}>{e.City}</option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowCityForm}
                    >
                      Add City
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select onChange={handleChange} name="dept" required>
                      <option value="">Select Department</option>
                      {depts.length > 0
                        ? depts.map((e) => (
                            <option value={e.Department_ID}>
                              {e.Department}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowDeptForm}
                    >
                      Add Department
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select onChange={handleChange} name="projectCat" required>
                      <option value="">Select Project Category</option>
                      {projectDepts.length > 0
                        ? projectDepts.map((e) => (
                            <option value={e.Project_Cat_ID}>
                              {e.Project_Category}
                            </option>
                          ))
                        : ""}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowCategoryForm}
                    >
                      Add Project Category
                    </Button>
                  </Form.Group>
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select
                      name="managerName"
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Project Manager</option>
                      {employees.length !== 0 ? (
                        employees.map((option) => (
                          <option value={option.Employee_ID}>
                            {option.Full_Name}
                          </option>
                        ))
                      ) : (
                        <option value="">None</option>
                      )}
                    </Form.Select>
                  </Form.Group>
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Label>Project Name</Form.Label>
                    <Form.Control
                      name="projectName"
                      type="text"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  {/* <Form.Group as={Col}>
                    <Form.Label>Bid Date</Form.Label>
                    <Form.Control
                      name="bidDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group> */}
                  <Form.Group as={Col}>
                    <Form.Label>Question Date</Form.Label>
                    <Form.Control
                      name="startDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Submission Date</Form.Label>
                    <Form.Control
                      name="submissionDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Label>RFP Number</Form.Label>
                    <Form.Control
                      name="rfpNumber"
                      type="number"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {/* <Form.Group as={Col}>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      name="amount"
                      type="number"
                      onChange={handleChange}
                      required
                    />
                  </Form.Group> */}
                </Row>

                <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select name="source" onChange={handleChange}>
                      <option>Select Source</option>
                      <option value="Construct Connect">Construct Connect</option>
                      <option value="Bids and Tenders">Bids and Tenders</option>
                      <option value="Biddingo">Biddingo</option>
                      <option value="Merx">Merx</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
              </div>
            ) : (
              <div>
                <Form.Select
                  style={{ marginBottom: "4vh" }}
                  onChange={handleChange1}
                >
                  {budgets.length !== 0 ? (
                    budgets.map((options) => (
                      <option value={options.Budget_ID}>
                        {options.Project_Name}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select>
                {budgetData.length > 0 ? (
                  <div>
                    <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Label>Department</Form.Label>
                        <Form.Control value={dept} />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Project Category</Form.Label>
                        <Form.Control value={pCategory} />
                      </Form.Group>
                    </Row>

                    <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Select name="action" onChange={handleChange}>
                          <option value="">Select Action</option>
                          <option value="Go">Go</option>
                          <option value="NoGo">NoGo</option>
                          <option value="Review">Review</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Select
                          name="managerName"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Project Manager</option>
                          {employees.length !== 0 ? (
                            employees.map((option) => (
                              <option value={option.Employee_ID}>
                                {option.Full_Name}
                              </option>
                            ))
                          ) : (
                            <option value="">None</option>
                          )}
                        </Form.Select>
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                          value={pName}
                          name="projectName"
                          type="text"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      {/* <Form.Group as={Col}>
                        <Form.Label>Bid Date</Form.Label>
                        <Form.Control
                          name="bidDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group> */}
                      <Form.Group as={Col}>
                        <Form.Label>Question Date</Form.Label>
                        <Form.Control
                          name="startDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <Form.Label>Submission Date</Form.Label>
                        <Form.Control
                          name="submissionDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                    </Row>

                    <Row className="mb-4">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control value={city} />
                      </Form.Group>
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Label>RFP Number</Form.Label>
                        <Form.Control
                          name="rfpNumber"
                          type="number"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      {/* <Form.Group as={Col}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          value={amount}
                          name="amount"
                          onChange={handleChange}
                        />
                      </Form.Group> */}
                    </Row>
                    <Row className="mb-4">
                      <Form.Group as={Col}>
                        <Form.Select
                          defaultValue={source}
                          name="source"
                          onChange={handleChange}
                        >
                          <option>Select Source</option>
                          <option value="Construct Connect">
                            Construct Connect
                          </option>
                          <option value="Bids and Tenders">Bids and Tenders</option>
                          <option value="Biddingo">Biddingo</option>
                          <option value="Merx">Merx</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}

            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>RFP Added Successfully</Modal.Body>
          </Modal>
          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCityForm}
            onHide={handleCloseCityForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCity
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCityForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showDeptForm}
            onHide={handleCloseDeptForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddDepartment
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseDeptForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            size="lg"
            keyboard={false}
            show={showCategoryForm}
            onHide={handleCloseCategoryForm}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Project Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                <AddCategory
                  setRed={setred}
                  setGreen={setgreen}
                  closeModal={handleCloseCategoryForm}
                  api={apiCallCity}
                  apiCall={setCallCity}
                />
              }
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
}

export default RFPform;
