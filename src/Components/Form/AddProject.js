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
  ADD_NEW_PROJECT,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import Select from "react-select";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";
import AddCategory from "./AddCategory";
import AuthContext from "../../Context/AuthContext";

function AddProject(props) {
  const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    cityId: "",
    departmentId: "",
    projectCatId: "",
    stageSubmissionDate: "",
    projectDiscussionNotes: "",
    projectName: "",
    projectStage: "",
    folderId: "",
    projectValue: "",
    assignedTo: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const [employees, setemployees] = useState([]);
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
      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  let attendees = [];
  employees.map((e) => {
    attendees.push({
      label: e.Full_Name,
      value: e.Full_Name,
    });
  });
  let [DisplayValue, getValue] = useState();
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

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
        HOST + ADD_NEW_PROJECT,
        {
          projectName: form.projectName,
          dateCreated: currentDate,
          dueDate: form.stageSubmissionDate,
          projectDiscussionNotes: form.projectDiscussionNotes,
          projectValue: form.projectValue,
          cityId: form.cityId,
          departmentId: form.departmentId,
          team: DisplayValue ? DisplayValue.toString() : "",
          assignedTo: form.assignedTo,
          projectCatId: form.projectCatId,
          projectStage: form.projectStage,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
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
        <>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Select onChange={handleChange} name="cityId">
                  <option value="">Select City</option>
                  {cities.length > 0
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
                  disabled={!privileges.includes("Add City")}
                >
                  Add City
                </Button>
              </Form.Group>
            </Row>
            {/* <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Project Due Date</Form.Label>
                <Form.Control
                  name="dueDate"
                  type="date"
                  placeholder="Project Due Date*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row> */}
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select
                  onChange={handleChange}
                  name="departmentId"
                  required
                >
                  <option value="">Select Department</option>
                  {depts.length > 0
                    ? depts.map((e) => (
                        <option value={e.Department_ID}>{e.Department}</option>
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
                  disabled={!privileges.includes("Add Department")}
                >
                  Add Department
                </Button>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select name="projectCatId" onChange={handleChange}>
                  <option value="">Project Category</option>
                  {projectDepts.length !== 0 ? (
                    projectDepts.map((option) => (
                      <option value={option.Project_Cat_ID}>
                        {option.Project_Category}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
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
                  disabled={!privileges.includes("Add Project Category")}
                >
                  Add Project Category
                </Button>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control
                  name="projectName"
                  type="text"
                  placeholder="Project Name*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select name="projectStage" onChange={handleChange}>
                  <option value="">Project Stage</option>
                  <option value="Not Started Yet">Not Started Yet</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Stage Submission Date</Form.Label>
                <Form.Control
                  name="stageSubmissionDate"
                  type="date"
                  placeholder="Project Submission Date"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control
                  name="projectValue"
                  type="text"
                  placeholder="Project Value"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Select
                  isMulti
                  onChange={doChange}
                  options={attendees}
                  name="employee"
                  placeholder="Team Members"
                >
                  Team Members
                </Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Select name="assignedTo" onChange={handleChange} required>
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
                <Form.Control
                  name="projectDiscussionNotes"
                  type="text"
                  as="textarea"
                  placeholder="Project Discussion Notes"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Relevent Files</Form.Label>
                <Form.Control
                  name="attachments"
                  type="file"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>

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
    </>
  );
}

export default AddProject;