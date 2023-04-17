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
  PRIMARY_COLOR
} from "../Constants/Constants";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

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
function UpdateProjectForm(props) {
  
  const [isLoading, setisLoading] = useState(false)
  const { setGreen, closeModal, api, apiCall, setRed } = props
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
  const [pCategory, setpCategory] = useState(props.row.Project_Cat_ID);
  const [notes, setnotes] = useState(props.row.Notes);
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
    nextFollow: nfDate,
    notes: notes,
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
    if (name === "notes") {
      setnotes(value);
    }
    if (name === "followNotes") {
      setfNotes(value);
    }
    if (name === "nextFollow") {
      setnfDate(value);
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
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_PROJECT,
        {
          projectName: form.projectName,
          dueDate: form.dueDate,
          notes: form.notes,
          followUpNotes: form.followNotes,
          nextFollowUp: form.nextFollow,
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
        setisLoading(false);
        console.log(res);
        if (res.data.success) {
          closeModal()
          setGreen(true);
          apiCall(api+1)
        } else {
          setRed(true)
        }
      })
      .catch((err) => {
        setisLoading(false);
        setRed(true);
        console.log(err);
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
    isLoading?<LoadingSpinner/>:
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
        <Row>
          <Form.Group as={Col}>
                <Form.Label style={styles.nameHeading}>Project Name</Form.Label>
            <Form.Control
                style={styles.nameInput}
              value={pname}
              name="projectName"
              type="text"
              placeholder="Enter Project Name"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Description</Form.Label>
            <Form.Control
                style={styles.nameInput}
              name="notes"
              as='textarea'
              value={notes}
              placeholder="Notes"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
        <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Value</Form.Label>
            <Form.Control
                style={{...styles.nameInput, width:'233px'}}
              value={pValue}
              name="projectValue"
              placeholder="Choose Project Value"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Status</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
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
          <Form.Group style={{width:'253px'}} controlId="formGridCity">
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>City</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'233px', fontSize:'14px', color:'#70757A'}}
              defaultValue={city}
              onChange={handleChange}
              name="city"
            >
              <option value="">Choose City</option>
              {cities.length > 0
                ? cities.map((e) => <option selected={e.City_ID===displayCity} value={e.City_ID}>{e.City}</option>)
                : ""}
            </Form.Select>
          </Form.Group>
          
        </Row>
        <Row>
        <Form.Group style={{width:'253px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
          <Form.Select style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}} defaultValue={dept} onChange={handleChange} name="dept">
              <option value="">Choose Department</option>
              {depts.length > 0
                ? depts.map((e) => (
                    <option value={e.Department_ID} selected={e.Department_ID===department}>{e.Department}</option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
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
        <Row>
          <Form.Group style={{width:'253px'}}>
              <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Due Date</Form.Label>
            <Form.Control
              value={dDate}
              name="dueDate"
              type="date"
              placeholder="Project Due Date"
              onChange={handleChange}
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            />
          </Form.Group>
          <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Next Follow Up</Form.Label>
            <Form.Control
              name="nextFollow"
              type="date"
              value={nfDate}
              placeholder="Next Follow Up"
              onChange={handleChange}
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            />
          </Form.Group>
        </Row>
        {/* <Row>
        
          
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
        </Row> */}
       
        
        <Row>
        <Form.Group style={{width:'253px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
            <Form.Select
              defaultValue={pManager}
              name="projectManager"
              onChange={handleChange}
              style={{...styles.nameInput, width:'234px', fontSize:'14px', color:'#70757A'}}
            >
              <option value="">Choose Project Manager</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option value={option.Employee_ID} selected={option.Employee_ID===manager}>{option.Full_Name}</option>
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
              defaultValue={members}
              name="employee"
              placeholder="Choose Team Members"
              menuPosition="fixed"
            >
            </Select>
          </Form.Group>
          
        </Row>
        
        
        <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Update project
            </Button>
            </div>
        
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Project Updated Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateProjectForm;
