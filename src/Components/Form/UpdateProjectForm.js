import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import {
  HOST,
  GET_EMPLOYEENAMES,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  UPDATE_PROJECT,
  GET_CITIES,
} from "../Constants/Constants";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";

function UpdateProjectForm(props) {
  let manager = props.row.Project_Manager_ID
  let department = props.row.dept_ID
  let displayCity = props.row.City_ID
  const [pname, setpname] = useState(props.row.Project_Name);
  const [dDate, setdDate] = useState(
    props.row.Project_Due_Date
      ? props.row.Project_Due_Date.substring(0, 10)
      : ""
  );
  const [nfDate, setnfDate] = useState(
    props.row.Next_Follow_Up
      ? props.row.Next_Follow_Up.substring(0, 10)
      : ""
  );
  const [tcDate, settcDate] = useState(
    props.row.Tentative_Closing
      ? props.row.Tentative_Closing.substring(0, 10)
      : ""
  );
  const [pCategory, setpCategory] = useState(props.row.Project_Cat_ID);
  const [pStage, setpStage] = useState(props.row.Project_Stage);
  const [state, setstate] = useState(props.row.Status);
  const [fNotes, setfNotes] = useState(props.row.Follow_Up_Notes);
  const [pManager, setpManager] = useState(props.row.Project_Manager_ID);
  const [pValue, setpValue] = useState(props.row.Project_Value);
  const [city, setcity] = useState(props.row.City_ID);
  const [dept, setdept] = useState(props.row.dept_ID);

  const [isSubmit, setIsSubmit] = useState(false);
  const [employees, setemployees] = useState([]);
  const [depts, setdepts] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [categories, setcategories] = useState([]);
  const [cities, setcities] = useState([]);
  useEffect(() => {
    const call = async () => {
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
          setcategories(res.data.res);
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
    };
    call();
  }, []);
  const [form, setform] = useState({
    projectName: pname,
    dueDate: dDate,
    tentativeClosing: tcDate,
    nextFollow: nfDate,
    stage: pStage,
    followNotes: fNotes,
    projectValue: pValue,
    city: city,
    state: "",
    dept: dept,
    projectManager: pManager,
    projectCategory: pCategory,
    status: state,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setpname(value);
    }
    if (name === "dueDate") {
      setdDate(value);
    }
    if (name === "dept") {
      setdept(value);
    }
    if (name === "stage") {
      setpStage(value);
    }
    if (name === "followNotes") {
      setfNotes(value);
    }
    if (name === "nextFollow") {
      setnfDate(value);
    }
    if (name === "tentativeClosing") {
      settcDate(value);
    }
    if (name === "projectValue") {
      setpValue(value);
    }
    if (name === "city") {
      setcity(value);
    }
    if (name === "projectManager") {
      setpManager(value);
    }
    if (name === "projectCategory") {
      setpCategory(value);
    }
    if (name === "status") {
      setstate(value);
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log(form.dueDate);
    axios
      .post(
        HOST + UPDATE_PROJECT,
        {
          projectName: form.projectName,
          dueDate: form.dueDate,
          stage: form.stage,
          followUpNotes: form.followNotes,
          nextFollowUp: form.nextFollow,
          tentClosing: form.tentativeClosing,
          value: form.projectValue,
          cityId: form.city,
          province: form.state,
          departmentId: form.dept,
          teamMembers: DisplayValue ? DisplayValue.toString() : team,
          projectManagerId: form.projectManager,
          projectCategoryId: form.projectCategory,
          status: form.status,
          projectId: props.row.Project_Id,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
        if (!err.data.success) {
          handleShow1();
        }
      });
  };
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

  let departments = [];
  depts.map((e) => {
    departments.push({
      label: e.Department,
      value: e.Department,
    });
  });
  let [DisplayValue1, getValue1] = useState();
  let doChange1 = (e) => {
    getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  const [team, setteam] = useState(props.row.Team_Members);
  let teamData = team ? team.split(",") : "";
  let members = [];
  teamData &&
    teamData.map((e) => {
      members.push({
        label: e,
        value: e,
      });
    });
  return (
    <div>
      <Form className="form-main">
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              value={pname}
              name="projectName"
              type="text"
              placeholder="Project Name*"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Project Due Date</Form.Label>
            <Form.Control
              value={dDate}
              name="dueDate"
              type="date"
              placeholder="Project Due Date*"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
          <Form.Label>Department</Form.Label>
          <Form.Select defaultValue={dept} onChange={handleChange} name="dept">
              <option value="">Select Department</option>
              {depts.length > 0
                ? depts.map((e) => (
                    <option value={e.Department_ID} selected={e.Department_ID===department}>{e.Department}</option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Follow Up Notes</Form.Label>
            <Form.Control
              value={fNotes}
              name="followNotes"
              type="text"
              placeholder="Follow Up Notes"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Project Stage</Form.Label>
            <Form.Select defaultValue={pStage} onChange={handleChange} name="stage">
              <option value="">Select Project Stage</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Started">Started</option>
              <option value="Completed">Completed</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Next Follow Up</Form.Label>
            <Form.Control
              name="nextFollow"
              type="date"
              value={nfDate}
              placeholder="Next Follow Up"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Tentative Closing Date</Form.Label>
            <Form.Control
              name="tentativeClosing"
              type="date"
              value={tcDate}
              placeholder="Tentative Closing*"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              value={pValue}
              name="projectValue"
              type="text"
              placeholder="Project Value*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select
              defaultValue={pCategory}
              name="projectCategory"
              onChange={handleChange}
            >
              <option value="">Project Category</option>
              {categories.length !== 0 ? (
                categories.map((option) => (
                  <option selected={option.Project_Cat_ID===props.row.Project_Cat_ID} value={option.Project_Cat_ID}>
                    {option.Project_Category}
                  </option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Select
              defaultValue={city}
              onChange={handleChange}
              name="city"
            >
              <option value="">Select City</option>
              {cities.length > 0
                ? cities.map((e) => <option selected={e.City_ID===displayCity} value={e.City_ID}>{e.City}</option>)
                : ""}
            </Form.Select>
          </Form.Group>
          
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Select
              isMulti
              onChange={doChange}
              options={attendees}
              defaultValue={members}
              name="employee"
              placeholder="Team Members"
            >
            </Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select
              defaultValue={pManager}
              name="projectManager"
              onChange={handleChange}
            >
              <option value="">Project Manager</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option value={option.Employee_ID} selected={option.Employee_ID===manager}>{option.Full_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select
              defaultValue={state}
              name="status"
              onChange={handleChange}
            >
              <option value="">Status</option>
              <option value="Not Started Yet">Not Started Yet</option>
              <option value="Completed">Completed</option>
              <option value="Ongoing">Ongoing</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Relevent Files</Form.Label>
            <Form.Control
              name="attachments"
              type="file"
              placeholder="Attachments*"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project Updated Successfully</Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Error Occured</Modal.Title>
        </Modal.Header>
        <Modal.Body>Check Your Input Fields Properly</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateProjectForm;
