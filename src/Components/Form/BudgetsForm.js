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
  ADD_BUDGET,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AddDepartment from "./AddDepartment";

function BudgetsForm(props) {
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let yr = new Date().getFullYear();
  const [year, setyear] = useState(yr);
  const [form, setform] = useState({
    city: "",
    dept: "",
    projectCat: "",
    budgetCategory: "",
    projectName: "",
    budgetAmount: "",
    budgetYear: year,
    source: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budgetYear") {
      setyear(value);
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  useEffect(() => {
    setisLoading(true)
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
        setisLoading(false)
    };
    call();
  }, [apiCallCity]);
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_BUDGET,
        {
          cityId: form.city,
          departmentId: form.dept,
          categoryId: form.projectCat,
          projectName: form.projectName,
          budgetCategory: form.budgetCategory,
          budgetAmount: form.budgetAmount,
          budgetYear: form.budgetYear,
          source: form.source,
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

  const [showDeptForm, setShowDeptForm] = useState(false);
  const handleCloseDeptForm = () => setShowDeptForm(false);
  const handleShowDeptForm = () => setShowDeptForm(true);
  return (
    <>
    {green===true ? <GreenAlert setGreen={setgreen}/> : <></>}
    {red===true ? <RedAlert setRed={setred}/> : <></>}
    {isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Select onChange={handleChange} name="city" required>
              <option value="">Select City</option>
              {cities.length > 0
                ? cities.map((e) => <option value={e.City_ID}>{e.City}</option>)
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Button
              style={{ width: "100%", backgroundColor: "grey", border: "none" }}
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
                    <option value={e.Department_ID}>{e.Department}</option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Button
              style={{ width: "100%", backgroundColor: "grey", border: "none" }}
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
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select onChange={handleChange} name="budgetCategory">
              <option value="">Select Budget Category</option>
              <option value="Design">Design</option>
              <option value="Construction">Construction</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Project Name*</Form.Label>
            <Form.Control
              name="projectName"
              type="text"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Budget Amount*</Form.Label>
            <Form.Control
              name="budgetAmount"
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Budget Year</Form.Label>
            <Form.Control
              name="budgetYear"
              value={year}
              type="text"
              placeholder="Budget Year"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Source</Form.Label>
            <Form.Control name="source" type="text" onChange={handleChange} />
          </Form.Group>
        </Row>

        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Budget Added Successfully</Modal.Body>
      </Modal>
      <Modal
      backdrop="static"
      size="lg"
      keyboard={false} show={showCityForm} onHide={handleCloseCityForm} >
        <Modal.Header closeButton>
          <Modal.Title>Add City</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<AddCity setRed={setred} setGreen={setgreen} closeModal={handleCloseCityForm} api={apiCallCity} apiCall={setCallCity}/>}</Modal.Body>
      </Modal>
      
      <Modal
      backdrop="static"
      size="lg"
      keyboard={false} show={showDeptForm} onHide={handleCloseDeptForm} >
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>{<AddDepartment setRed={setred} setGreen={setgreen} closeModal={handleCloseDeptForm} api={apiCallCity} apiCall={setCallCity}/>}</Modal.Body>
      </Modal>
    </div>}</>
  );
}

export default BudgetsForm;
