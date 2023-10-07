import React, { useEffect, useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import {
  HOST,
  GET_JOB_TITLES,
  ADD_EMPLOYEE,
  GET_CITIES,
  GET_DEPARTMENTS,
  PRIMARY_COLOR,
  GET_MANAGERS,
} from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import JobTitle from "./JobTitle";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from "../../Context/AuthContext";
import plus from '../../Images/plus.svg'
import TFButton from "../../components/ui/TFButton/TFButton";
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
      padding:6
    }
  }
function PreHireEmployeeForm(props) {
    const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;

  const [cities, setcities] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [jobTitles, setjobTitles] = useState([]);
  const [depts, setdepts] = useState([]);
  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_JOB_TITLES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setjobTitles(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
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
    };
    call();
  }, [apiCallCity]);
  const [form, setform] = useState({
    salutation: "",
    firstname: "",
    lastname: "",
    department: "",
    dashboardAssigned: "",
    jobtitle: "",
    directManager: "",
    emailWork: "",
    emailPersonal: "",
    joiningDate: "",
    business: "",
    mobile: "",
    address: "",
    city: "",
    expertise: "",
    webpage: "",
    resume: "",
    attachments: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [showTitleForm, setShowTitleForm] = useState(false);
  const handleCloseTitleForm = () => setShowTitleForm(false);
  const handleShowTitleForm = () => setShowTitleForm(true);
  const [isLoading, setisLoading] = useState(false);
  // const handleChange1=()=>{ {handleChange1}; reformatDate();}
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_EMPLOYEE,
        {
          department: form.dashboardAssigned,
          departmentId: form.department,
          salutation: form.salutation,
          firstName: form.firstname,
          lastName: form.lastname,
          directManagerId: form.directManager,
          joiningDate: form.joiningDate,
          resignationDate: form.resignationDate,
          emailWork: form.emailWork,
          emailPersonal: form.emailPersonal,
          jobTitleId: form.jobtitle,
          business: form.business,
          mobile: form.mobile,
          address: form.address,
          city: form.city,
          expertise: form.expertise,
          webpage: form.webpage,
          notes: form.notes,
          resume: form.resume,
          attachments: form.attachments,
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

  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);
  return (
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Form
            className="form-main"
            onSubmit={handleSubmit}
            style={{ marginTop: "0px", marginLeft: "0px", marginRight: "0px" }}
          >
            <Row>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading}}>Salutation</Form.Label>
                <Form.Select
                style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
                  name="salutation"
                  type="text"
                  placeholder="Salutation"
                  onChange={handleChange}
                >
                  <option value="">Salutation</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading}}>First Name<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                style={{...styles.nameInput, width:'233px'}}
                  name="firstname"
                  type="text"
                //   placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading}}>Last Name</Form.Label>
                <Form.Control
                style={{...styles.nameInput, width:'233px'}}
                  name="lastname"
                  type="text"
                //   placeholder="Last Name"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group style={{width:'253px'}}>
                    <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Select style={{ ...styles.nameInput, width:'233px', fontSize: '14px', color: '#70757A' }} name="department" onChange={handleChange} required>
                  <option value="">Select Department</option>
                  {depts.map((option) => (
                    <option value={option.Department_ID}>
                      {option.Department}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
               <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Dashboard Assigned<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Select
                style={{ ...styles.nameInput, width:'233px', fontSize: '14px', color: '#70757A' }}
                  name="dashboardAssigned"
                  type="text"
                  onChange={handleChange}
                  required
                  
                >
                  <option value="">Dashboard Assigned</option>
                  <option value="Admin">Admin</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Manager">Manager</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
              <Form.Label style={{ ...styles.nameHeading, width:'253px', marginTop: '24px' }}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>Job Title<span style={{color:'red'}}>*</span></div>
                        <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowTitleForm}><img alt="Add Job Title" src={plus} /></div>
                      </div>
                    </Form.Label>
                <Form.Select
                style={{ ...styles.nameInput, width:'233px', fontSize: '14px', color: '#70757A' }}
                  name="jobtitle"
                  type="text"
                  onChange={handleChange}
                >
                  <option value="">Job Title</option>
                  {jobTitles.map((option) => (
                    <option value={option.Title_ID}>{option.Title}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group style={{width:'253px'}}>
               <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Direct Manager</Form.Label>
                <Form.Select style={{ ...styles.nameInput, width:'233px', fontSize: '14px', color: '#70757A' }} onChange={handleChange} name="directManager">
                  <option value="">Direct Manager</option>
                  {employees.map((option) => (
                    <option value={option.Employee_ID}>
                      {option.Full_Name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}} controlId="formGridEmail">
               <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Email Work<span style={{color:'red'}}>*</span></Form.Label>
                <Form.Control
                  name="emailWork"
                  type="email"
                  style={{...styles.nameInput, width:'233px'}}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group style={{width:'253px'}} controlId="formGridEmail">
               <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Email Personal</Form.Label>
                <Form.Control
                  name="emailPersonal"
                  type="email"
                  style={{...styles.nameInput, width:'233px'}}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Joining Date</Form.Label>
                <Form.Control
                style={styles.nameInput}
                  name="joiningDate"
                  type="date"
                  placeholder="Joining Date*"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group style={{ width: '380px' }}>
                        <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Business Phone</Form.Label>
                <Form.Control
                style={{ ...styles.nameInput, width: '360px' }}
                  name="business"
                  type="tel"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group style={{ width: '380px' }}>
                <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Mobile Phone</Form.Label>
                <Form.Control
                style={{ ...styles.nameInput, width: '360px' }}
                  name="mobile"
                  type="tel"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
                <Form.Group style={{ width: '380px' }} controlId="formGridAddress1">
                <Form.Label style={{ ...styles.nameHeading, marginTop: '24px' }}>Address</Form.Label>
                <Form.Control
                style={{ ...styles.nameInput, width: '360px' }}
                    name="address"
                    onChange={handleChange}
                />
                </Form.Group>
            
              <Form.Group style={{ width: '380px' }} controlId="formGridCity">
              <Form.Label style={{ ...styles.nameHeading, width: '380px', marginTop: '24px' }}>
                      <div className="d-flex flex-row justify-content-between align-items-center">
                        <div>City</div>
                        {privileges.includes('Add City')? <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowCityForm}><img alt="Add New City" src={plus} /></div> :<></>}
                      </div>
                    </Form.Label>
                <Form.Select style={{ ...styles.nameInput, width: '360px', fontSize: '14px', color: '#70757A' }} onChange={handleChange} name="city">
                  <option>Select City</option>
                  {cities.length !== 0 ? (
                    cities.map((options) => (
                      <option value={options.City_ID} key={options.City_ID}>
                        {options.City}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select>
              </Form.Group>
              </Row>
              <div className="d-flex d-row justify-content-end" style={{ marginTop: '44px', marginRight: '20px' }}>
              {/* <Button onClick={closeModal} style={{ color: '#70757A', backgroundColor: '#FFFFFF', borderColor: '#70757A', marginRight: '20px' }}>
                Cancel
              </Button> */}
              <TFButton label="Cancel" variant="secondary" handleClick={closeModal} style={{marginRight: '20px'}} size="small"/>
              {/* <Button style={{ backgroundColor: PRIMARY_COLOR }} type="submit">
                Add Employee
              </Button> */}
              <TFButton label="Add Employee" type="submit" size="small"/>
            </div>
            </Form>
            </div>)}

            <Modal size="lg" show={showTitleForm} onHide={handleCloseTitleForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add Job Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>{<JobTitle />}</Modal.Body>
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
    </div>
  )
}

export default PreHireEmployeeForm;
