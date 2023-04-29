import React, { useEffect, useState, useContext } from "react";
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
  PRIMARY_COLOR,
  GET_MANAGERS
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";
import AuthContext from '../../Context/AuthContext'
import plus from '../../Images/plus.svg'


const styles = {
  nameHeading: {
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#70757A"
  },
  nameInput: {
    width: "740px",
    height: "32px",
    border: "1px solid #EBE9F1",
    borderRadius: "6px",
    padding: 6
  }
}

function RFPform(props) {

  const { privileges, setPrivileges } = useContext(AuthContext)
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
    client: "",
    files: [],
    source: ''
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
    if (name === 'files') {
      newForm[name] = e.target.files;
      setform(newForm)
      return;
    }
    if (name === 'dept') {
      getProjectCategories(value)
    }

    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const [budgets, setbudgets] = useState([]);
  const getProjectCategories = async (e) => {
    await axios
      .get(HOST + GET_PROJECT_CATEGORIES, {
        headers: { auth: "Rose " + localStorage.getItem("auth"), id: e },
      })
      .then((res) => {
        setprojectDepts(res.data.res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
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
        .get(HOST + GET_MANAGERS, {
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
    e.preventDefault();
    setisLoading(true);
    setIsSubmit(true);

    const formData = new FormData();
    formData.append('departmentId', radio ? deptid : form.dept);
    formData.append('projectCatId', radio ? pCategoryid : form.projectCat);
    formData.append('projectManagerId', form.managerName);
    formData.append('projectName', radio ? pName : form.projectName);
    formData.append('startDate', form.startDate);
    formData.append('submissionDate', form.submissionDate);
    formData.append('rfpNumber', form.rfpNumber);
    formData.append('source', form.source);
    formData.append('client', form.client);

    for (let i = 0; i < form.files.length; i++) {
      formData.append('files', form.files[i]);
    }

    axios
      .post(HOST + ADD_RFP, formData, {
        maxContentLength: 100 * 1024 * 1024, // 100MB
        maxBodyLength: 100 * 1024 * 1024, // 100MB
        headers: {
          'Content-Type': 'multipart/form-data',
          auth: 'Rose ' + localStorage.getItem('auth'),
        },
        timeout: 1800000,
      })
      .then((res) => {
        setisLoading(false);
        console.log(res)
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
  // const [city, setcity] = useState("");
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
        // setcity(res.data.res[0].City);
        // setcityid(res.data.res[0].City_ID);
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
    <div style={{ marginLeft: '27px', marginTop: '20px', marginBottom: '20px' }}>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="form-main" onSubmit={handleSubmit} style={{ marginTop: '0px', marginLeft: '0px', marginRight: '0px' }}>
            <Row>
              <Form.Group as={Col}>
                <Form.Label style={styles.nameHeading}>Choose Label</Form.Label>
                <Form.Select style={{ ...styles.nameInput, fontSize: '14px', color: '#70757A' }} onChange={handleRadio}>
                  <option value="yes">Create New RFP</option>
                  <option value="no">Import From Budgets</option>
                </Form.Select>
              </Form.Group>
            </Row>
            {!radio ? (
              <div>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Name</Form.Label>
                    <Form.Control
                      style={styles.nameInput}
                      name="projectName"
                      type="text"
                      onChange={handleChange}
                    // required
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label style={{ ...styles.nameHeading, width: '740px', marginTop: '24px' }}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>Client</div>
                        {/* {privileges.includes('Add City')? <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowCityForm}><img alt="Add New City" src={plus} /></div> :<></>} */}
                      </div>
                    </Form.Label>
                    <Form.Control style={{ ...styles.nameInput }} onChange={handleChange} name="client" />
                    {/* <option value="">Select City</option>
                      {cities
                        ? cities.map((e) => (
                            <option value={e.City_ID}>{e.City}</option>
                          ))
                        : ""}
                    </Form.Select> */}
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Department</Form.Label>
                    <Form.Select style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }} onChange={handleChange} name="dept"
                    // required
                    >
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
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Category</Form.Label>
                    <Form.Select style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }} onChange={handleChange} name="projectCat">
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
                </Row>
                {/* <Row className="mb-4">
                  
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowDeptForm}
                      disabled={!privileges.includes("Add Department")}
                    >
                      Add Department
                    </Button>
                  </Form.Group>
                </Row>
                <Row className="mb-4">
                  
                  <Form.Group as={Col}>
                    <Button
                      style={{
                        width: "100%",
                        backgroundColor: "grey",
                        border: "none",
                      }}
                      onClick={handleShowCategoryForm}
                      disabled={!privileges.includes("Add Project Category")}
                    >
                      Add Project Category
                    </Button>
                  </Form.Group>
                </Row> */}

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Manager</Form.Label>
                    <Form.Select
                      name="managerName"
                      onChange={handleChange}
                      // required
                      style={{ ...styles.nameInput, fontSize: '14px', color: '#70757A' }}
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

                <Row>
                  {/* <Form.Group as={Col}>
                    <Form.Label>Bid Date</Form.Label>
                    <Form.Control
                      name="bidDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group> */}
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Question Date</Form.Label>
                    <Form.Control
                      style={{ ...styles.nameInput, width: '360px' }}
                      name="startDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Submission Date</Form.Label>
                    <Form.Control
                      style={{ ...styles.nameInput, width: '360px' }}
                      name="submissionDate"
                      onChange={handleChange}
                      type="date"
                    />
                  </Form.Group>
                </Row>

                <Row>
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>RFP Number</Form.Label>
                    <Form.Control
                      style={{ ...styles.nameInput, width: '360px' }}
                      name="rfpNumber"
                      onChange={handleChange}

                    />
                  </Form.Group>
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Source</Form.Label>
                    <Form.Select style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }} name="source" onChange={handleChange}>
                      <option value=''>Select Source</option>
                      <option value="Construct Connect">Construct Connect</option>
                      <option value="Bids and Tenders">Bids and Tenders</option>
                      <option value="Biddingo">Biddingo</option>
                      <option value="Merx">Merx</option>
                    </Form.Select>
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
                <Row>
                  <Form.Group style={{ width: '380px' }}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Relevent Files(Upto 500mb each file)</Form.Label>
                    <Form.Control
                      style={{ ...styles.nameInput, width: '360px' }}
                      name="files"
                      onChange={handleChange}
                      type="file"
                      multiple
                    />
                  </Form.Group>
                </Row>

                {/* <Row className="mb-4">
                  <Form.Group as={Col}>
                    <Form.Select name="source" onChange={handleChange}>
                      <option>Select Source</option>
                      <option value="Construct Connect">Construct Connect</option>
                      <option value="Bids and Tenders">Bids and Tenders</option>
                      <option value="Biddingo">Biddingo</option>
                      <option value="Merx">Merx</option>
                    </Form.Select>
                  </Form.Group>
                </Row> */}
              </div>
            ) : (
              <div>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Select Project</Form.Label>
                    <Form.Select
                      style={{ ...styles.nameInput, fontSize: '14px', color: '#70757A' }}
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
                    </Form.Select></Form.Group>
                </Row>

                {budgetData.length > 0 ? (
                  <div>
                    <Row>
                      <Form.Group as={Col}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Name</Form.Label>
                        <Form.Control
                          style={styles.nameInput}
                          value={pName}
                          name="projectName"
                          type="text"
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Client</Form.Label>
                        <Form.Control style={styles.nameInput} name='client' />
                      </Form.Group>
                    </Row>
                    <Row>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Department</Form.Label>
                        <Form.Control style={{ ...styles.nameInput, width: '360px' }} value={dept} />
                      </Form.Group>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Category</Form.Label>
                        <Form.Control style={{ ...styles.nameInput, width: '360px' }} value={pCategory} />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Action</Form.Label>
                        <Form.Select style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }} name="action" onChange={handleChange}>
                          <option value="">Select Action</option>
                          <option value="Go">Go</option>
                          <option value="NoGo">NoGo</option>
                          <option value="Review">Review</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Project Manager</Form.Label>
                        <Form.Select
                          style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }}
                          name="managerName"
                          onChange={handleChange}
                        // required
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

                    <Row>
                      {/* <Form.Group as={Col}>
                        <Form.Label>Bid Date</Form.Label>
                        <Form.Control
                          name="bidDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group> */}
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Question Date</Form.Label>
                        <Form.Control
                          style={{ ...styles.nameInput, width: '360px' }}
                          name="startDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Submission Date</Form.Label>
                        <Form.Control
                          style={{ ...styles.nameInput, width: '360px' }}
                          name="submissionDate"
                          onChange={handleChange}
                          type="date"
                        />
                      </Form.Group>
                    </Row>


                    <Row>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>RFP Number</Form.Label>
                        <Form.Control
                          style={{ ...styles.nameInput, width: '360px' }}
                          name="rfpNumber"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Source</Form.Label>
                        <Form.Select
                          defaultValue={source}
                          name="source"
                          onChange={handleChange}
                          style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }}
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
                      {/* <Form.Group as={Col}>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                          value={amount}
                          name="amount"
                          onChange={handleChange}
                        />
                      </Form.Group> */}
                    </Row>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}

            <div className="d-flex d-row justify-content-end" style={{ marginTop: '44px', marginRight: '20px' }}>
              <Button onClick={closeModal} style={{ color: '#70757A', backgroundColor: '#FFFFFF', borderColor: '#70757A', marginRight: '20px' }}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: PRIMARY_COLOR }} type="submit">
                Add New RFP
              </Button>
            </div>
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
        </>
      )}
    </div>
  );
}

export default RFPform;
