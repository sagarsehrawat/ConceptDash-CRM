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
} from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import JobTitle from "./JobTitle";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from '../../Context/AuthContext'

function EmployeeForm(props) {
  const { privileges, setPrivileges } = useContext(AuthContext)
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
        .get(HOST + "/api/get/employeeNames", {
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
    birthday: "",
    anniversary: "",
    sports: "",
    activity: "",
    beverage: "",
    alcohol: "",
    travelDest: "",
    spouseName: "",
    children: "",
    tvShow: "",
    movie: "",
    actor: "",
    dislikes: "",
    proficiency: "",
    interests: "",
    cocurricular: "",
    trainings: "",
    strengths: "",
    weakness: "",
    activeIndex: "",
    username: "",
    password: "",
    confpassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const navigate = useNavigate();
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    let newDate = `${day}-${month}-${year}`;
    return newDate;
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTitleForm, setShowTitleForm] = useState(false);
  const handleCloseTitleForm = () => setShowTitleForm(false);
  const handleShowTitleForm = () => setShowTitleForm(true);

  const [isLoading, setisLoading] = useState(false);
  // const handleChange1=()=>{ {handleChange1}; reformatDate();}
  const handleSubmit = (e) => {
    isLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_EMPLOYEE,
        {
          username: form.username,
          password: form.password,
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
          proficiency: form.proficiency,
          interest: form.interests,
          cocurricular: form.cocurricular,
          training: form.trainings,
          birthday: form.birthday,
          anniversary: form.anniversary,
          sports: form.sports,
          activities: form.activity,
          beverage: form.beverage,
          alcohol: form.alcohol,
          travelDestination: form.travelDest,
          spouseName: form.spouseName,
          children: form.children,
          tvShow: form.tvShow,
          movies: form.movie,
          actor: form.actor,
          tvShow: form.tvShow,
          dislikes: form.dislikes,
          strengths: form.strengths,
          weaknesses: form.weakness,
          socialActiveIndex: form.activeIndex,
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
    <>
    {green===true ? <GreenAlert setGreen={setgreen}/> : <></>}
    {red===true ? <RedAlert setRed={setred}/> : <></>}
    {isLoading?<LoadingSpinner/>:
      <div>
        <Form className="form-main" onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
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
            <Form.Group as={Col}>
              <Form.Control
                name="firstname"
                type="text"
                placeholder="First Name*"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                name="lastname"
                type="text"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select name="department" onChange={handleChange} required>
                <option value="">Select Department</option>
                {depts.map((option) => (
                  <option value={option.Department_ID}>
                    {option.Department}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select
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
            <Form.Group as={Col}>
              <Form.Select
                name="jobtitle"
                type="text"
                onChange={handleChange}
                required
              >
                <option value="">Job Title</option>
                {jobTitles.map((option) => (
                  <option value={option.Title_ID}>{option.Title}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "grey",
                  border: "none",
                }}
                onClick={handleShowTitleForm}
              >
                Add Job Title
              </Button>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
                onChange={handleChange}
                name="directManager"
                required
              >
                <option value="">Direct Manager</option>
                {employees.map((option) => (
                  <option value={option.Employee_ID}>{option.Full_Name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                name="emailWork"
                type="email"
                placeholder="Email Work*"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                name="emailPersonal"
                type="email"
                placeholder="Email Personal"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Joining Date</Form.Label>
              <Form.Control
                name="joiningDate"
                type="date"
                placeholder="Joining Date*"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="business"
                type="tel"
                placeholder="Business Phone*"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="mobile"
                type="tel"
                placeholder="Mobile Phone*"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              name="address"
              placeholder="Address"
              onChange={handleChange}
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Select onChange={handleChange} name="city">
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
          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Personal Details
          </h2>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                name="birthday"
                type="date"
                placeholder="Birthday"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Anniversary</Form.Label>
              <Form.Control
                name="anniversary"
                type="date"
                placeholder="Anniversary"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="activity">
                <option value="">Select Activity</option>
                <option value="Walking">Walking</option>
                <option value="Running">Running</option>
                <option value="Travelling">Travelling</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="beverage">
                <option value="">Select Beverage</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Ice Cap">Ice Cap</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="alcohol">
                <option value="">Select Alcohol</option>
                <option value="Vodka">Vodka</option>
                <option value="Scotch">Scotch</option>
                <option value="Beer">Beer</option>
                <option value="Tequila">Tequila</option>
                <option value="Rum">Rum</option>
                <option value="Cocktail">Cocktail</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="travelDest"
                type="text"
                placeholder="Travel Destination"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="spouseName"
                type="text"
                placeholder="Spouse Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="children"
                type="text"
                placeholder="Children"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="tvShow"
                type="text"
                placeholder="TV Show"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="movie"
                type="text"
                placeholder="Movie"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="actor"
                type="text"
                placeholder="Actor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="dislikes"
                type="text"
                placeholder="Dislikes"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Employee Skills
          </h2>
          <Row className="mb-4">
            <Form.Group as={Col}>
              {/* <Form.Control name='tvShow' type='text' placeholder='TV Show' onChange={handleChange}/> */}
              <Form.Select name="proficiency" onChange={handleChange}>
                <option value="">Proficiency</option>
                <option value="AutoCAD">AutoCAD</option>
                <option value="Civil3D">Civil3D</option>
                <option value="Microstation">Microstation</option>
                <option value="Syncro">Syncro</option>
                <option value="Cidra">Cidra</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="interests"
                type="text"
                onChange={handleChange}
                placeholder="Interests"
              />
            </Form.Group>
          </Row>
          <Row classname="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="cocurricular"
                type="text"
                onChange={handleChange}
                placeholder="Co-Curriculars"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="trainings"
                type="text"
                onChange={handleChange}
                placeholder="Trainings"
              />
            </Form.Group>
          </Row>
          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Employee Traits
          </h2>
          <Row classname="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="strengths"
                type="text"
                onChange={handleChange}
                placeholder="Strengths"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="weakness"
                type="text"
                onChange={handleChange}
                placeholder="Weakness"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="activeIndex"
                type="text"
                onChange={handleChange}
                placeholder="Social Active Index"
              />
            </Form.Group>
          </Row>
          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Authentication
          </h2>

          <Form.Group classname="mb-4">
            <Form.Control
              name="username"
              type="text"
              placeholder="Username*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group classname="mb-4" controlId="formGridPassword">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group classname="mb-4" controlId="formGridPassword">
            <Form.Control
              name="confpassword"
              type="password"
              placeholder="Confirm Password*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button
            className="submit-btn"
            variant="primary"
            type="submit"
            style={{ marginTop: "4vh", width: "10vw" }}
          >
            Submit
          </Button>
        </Form>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>Employee added Successfully</Modal.Body>
        </Modal>

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
          <Modal.Body>{<AddCity setRed={setred} setGreen={setgreen} closeModal={handleCloseCityForm} api={apiCallCity} apiCall={setCallCity}/>}</Modal.Body>
        </Modal>
      </div>}
    </>
  );
}

export default EmployeeForm;
