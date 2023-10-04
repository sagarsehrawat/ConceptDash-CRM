import React, { useEffect, useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {
  HOST,
  GET_EMPLOYEENAMES,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  ADD_PROJECT,
  GET_CITIES,
  PRIMARY_COLOR,
  GET_MANAGERS
} from "../Constants/Constants";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";
import AuthContext from '../../Context/AuthContext'
import TFButton from "../../components/ui/Button/Button";

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

function ProjectForm(props) {
  const { privileges, setPrivileges } = useContext(AuthContext)
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [employees1, setemployees1] = useState([]);
  const [depts, setdepts] = useState([]);
  const [show, setShow] = useState(false);

  const [isLoading, setisLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [categories, setcategories] = useState([]);
  const [cities, setcities] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_EMPLOYEENAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees1(res.data.res);
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
      
      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  
  const [form, setform] = useState({
    projectName: "",
    dueDate: "",
    dateCreated: "",
    notes: "",
    followNotes: "",
    nextFollow: "",
    projectValue: "",
    city: "",
    dept: "",
    projectManager: "",
    projectCategory: "",
    status: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='dept') {
      getProjectCategories(value)
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const getProjectCategories = async(e)=>{
    await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), id: e },
        })
        .then((res) => {
          setcategories(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_PROJECT,
        {
          projectName: form.projectName,
          dateCreated: currentDate,
          dueDate: form.dueDate,
          notes: form.notes,
          followUpNotes: form.followNotes,
          nextFollowUp: form.nextFollow,
          projectValue: form.projectValue,
          cityId: form.city,
          departmentId: form.dept,
          teamMembers: DisplayValue ? DisplayValue.toString() : "",
          projectManagerId: form.projectManager,
          projectCategoryId: form.projectCategory,
          status: form.status,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res)
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
  let attendees = [];
  employees1.map((e) => {
    attendees.push({
      label: e.Full_Name,
      value: e.Full_Name,
    });
  });
  let [DisplayValue, getValue] = useState();
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  let departments = [];
  depts.map((e) => {
    departments.push({
      label: e.Department,
      value: e.Department,
    });
  });
  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);

  const [showDeptForm, setShowDeptForm] = useState(false);
  const handleCloseDeptForm = () => setShowDeptForm(false);
  const handleShowDeptForm = () => setShowDeptForm(true);

  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const handleCloseCategoryForm = () => setShowCategoryForm(false);
  const handleShowCategoryForm = () => setShowCategoryForm(true);

  const customStyles = {
    // control: (provided, state) => ({
    //   ...provided,
    //   borderRadius: "6px",
    //   boxShadow: state.isFocused ? "0 0 0 2px #007bff" : "none",
    //   border: '1px solid #EBE9F1',
    // }),
    // menu: (provided) => ({
    //   ...provided,
    //   maxHeight: "205px", // set the height of the menu
    // }),
    // option: (provided) => ({
    //   ...provided,
    //   height: "20px", // set the height of each option
    // }),
  };
  return (
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
            <Row>
              <Form.Group as={Col}>
                <Form.Label style={styles.nameHeading}>Project Name</Form.Label>
                <Form.Control
                style={styles.nameInput}
                  name="projectName"
                  type="text"
                  onChange={handleChange}
                  required
                  placeholder="Enter Project name"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Description</Form.Label>
                <Form.Control
                
                style={styles.nameInput}
                  name="notes"
                  type="text"
                  as='textarea'
                  rows={1}
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row>
            <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Value</Form.Label>
                <Form.Control
                style={{...styles.nameInput, width:'233px'}}
                  name="projectValue"
                  type="text"
                  onChange={handleChange}
                  required
                  placeholder="Enter Project value"
                />
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Status</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}} name="status" onChange={handleChange}>
                  <option value="">Choose Status</option>
                  <option value="Not Started Yet">Not Started Yet</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}} controlId="formGridCity">
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>City</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="city">
                  <option value="">Select City</option>
                  {cities.length > 0
                    ? cities.map((e) => (
                        <option value={e.City_ID}>{e.City}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row>
            <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="dept" required>
                  <option value="">Select Department</option>
                  {depts.length > 0
                    ? depts.map((e) => (
                        <option value={e.Department_ID}>{e.Department}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}} name="projectCategory" onChange={handleChange}>
                  <option value="">Project Category</option>
                  {categories.length !== 0 ? (
                    categories.map((option) => (
                      <option value={option.Project_Cat_ID}>
                        {option.Project_Category}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select>
              </Form.Group>
              
            </Row>
            <Row>
              <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Due Date</Form.Label>
                <Form.Control
                  name="dueDate"
                  type="date"
                  placeholder="Project Due Date*"
                  onChange={handleChange}
                  required
                  style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
                />
              </Form.Group>
              <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Next Follow Up</Form.Label>
                <Form.Control
                  name="nextFollow"
                  type="date"
                  placeholder="Next Follow Up"
                  onChange={handleChange}
                  style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
                />
              </Form.Group>
            </Row>
            <Row>
            <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
                <Form.Select
                  name="projectManager"
                  onChange={handleChange}
                  required
                  style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
                >
                  <option value="">Choose Project Manager</option>
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
              <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Team Members</Form.Label>
                <Select
                  isMulti
                  onChange={doChange}
                  options={attendees}
                  name="employee"
                  placeholder="Choose Team Members"
                  styles={customStyles}
                  menuPosition="fixed"
                >
                </Select>
              </Form.Group>
              
            </Row>
            {/* <Form.Group as={Col}>
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
              </Form.Group> */}
            
            
            {/* <Form.Group as={Col}>
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
              </Form.Group> */}
            {/* <Form.Group as={Col}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "grey",
                    border: "none",
                  }}
                  onClick={handleShowCityForm}
                  disabled={!privileges.includes("Add City")}
                >
                  Add City
                </Button>
              </Form.Group> */}
            
            
            
            {/* <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Relevent Files</Form.Label>
                <Form.Control
                  name="attachments"
                  type="file"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row> */}

            <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            {/* <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button> */}
            <TFButton label="Cancel" variant="secondary" handleClick={closeModal} customStyles={{marginRight: '20px'}} size="small"/>
            {/* <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Create New project
            </Button> */}
            <TFButton label="Create New Project" type="submit" size="small"/>
            </div>
            
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Form Submitted Successfully</Modal.Body>
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

export default ProjectForm;
