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
  UPDATE_RFP,
  PRIMARY_COLOR,
  GET_MANAGERS
} from "../Constants/Constants";
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
function UpdateRFP(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [employees, setemployees] = useState([]);

  const [projectDepts, setprojectDepts] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      // await axios
      //   .get(HOST + GET_CITIES, {
      //     headers: { auth: "Rose " + localStorage.getItem("auth") },
      //   })
      //   .then((res) => {
      //     setcities(res.data.res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

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
      setisLoading(false);
    };
    call();
  }, []);
  const depart = props.row.Department;
  const projectCategory = props.row.Project_Category;
  const pro_manager = props.row.Manager_Name;
  // const citi = props.row.City;
  const [action, setaction] = useState(props.row.Action);
  const [dept, setdept] = useState(props.row.Department_ID);
  const [projectCat, setprojectCat] = useState(props.row.Project_Cat_ID);
  const [pManager, setpManager] = useState(props.row.Project_Manager_ID);
  const [pName, setpName] = useState(props.row.Project_Name);

  const [sDate, setsDate] = useState(
    props.row.Start_Date ? props.row.Start_Date.substring(0, 10) : ""
  );
  const [subDate, setsubDate] = useState(
    props.row.Submission_Date ? props.row.Submission_Date.substring(0, 10) : ""
  );
  const [client, setclient] = useState(props.row.Client);
  const [rfpnum, setrfpnum] = useState(props.row.RFP_Number);
  const [source, setsource] = useState(props.row.Source);
  const [form, setform] = useState({
    dept: dept??"",
    projectCat: projectCat??"",
    action: action??"",
    managerName: pManager??"",
    projectName: pName??"",
    startDate: sDate??"",
    submissionDate: subDate??"",
    rfpNumber: rfpnum??"",
    client: client??"",
    source: source??"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    if (name === "dept") {
      setdept(value);
      getProjectCategories(value)
    }
    if (name === "projectCat") {
      setprojectCat(value);
    }
    if (name === "action") {
      setaction(value);
    }
    if (name === "managerName") {
      setpManager(value);
    }
    if (name === "startDate") {
      setsDate(value);
    }
    if (name === "submissionDate") {
      setsubDate(value);
    }
    if (name === "client") {
      setclient(value);
    }
    if (name === "projectName") {
      setpName(value);
    }
    if (name === "rfpNumber") {
      setrfpnum(value);
    }
    if (name === "source") {
      setsource(value);
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
          setprojectDepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_RFP,
        {
          departmentId: form.dept,
          projectCatId: form.projectCat,
          action: form.action,
          projectManagerId: form.managerName,
          projectName: form.projectName,
          startDate: form.startDate,
          submissionDate: form.submissionDate,
          rfpNumber: form.rfpNumber,
          client: form.client,
          source: form.source,
          id: props.row.RFP_ID,
          employeeId: localStorage.getItem("employeeId"),
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
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  const [isLoading, setisLoading] = useState(false);
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      <Form className="form-main" onSubmit={handleSubmit} style={{marginTop:'0px', marginLeft:'0px', marginRight:'0px'}}>
        <Row>
        <Form.Group as={Col}>
            <Form.Label style={styles.nameHeading}>Project Name</Form.Label>
            <Form.Control
              style={styles.nameInput}
              value={pName}
              name="projectName"
              type="text"
              placeholder="Project Name"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Client</Form.Label>
            <Form.Control style={{...styles.nameInput}} onChange={handleChange} value={client} name="client"/>
              {/* <option>Select City</option>
              {cities.length > 0
                ? cities.map((e) => (
                    <option value={e.City_ID} selected={e.City === citi}>
                      {e.City}
                    </option>
                  ))
                : ""}
            </Form.Select> */}
          </Form.Group>
        </Row>
        <Row>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              defaultValue={dept}
              onChange={handleChange}
              name="dept"
            >
              <option>Select Department</option>
              {depts.map((e) => (
                <option
                  value={e.Department_ID}
                  selected={e.Department === depart}
                >
                  {e.Department}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="projectCat" required>
              <option value="">Select Project Category</option>
              {projectDepts.length > 0
                ? projectDepts.map((e) => (
                    <option
                      value={e.Project_Cat_ID}
                      selected={e.Project_Category === projectCategory}
                    >
                      {e.Project_Category}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
        <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Manager</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              defaultValue={pManager}
              name="managerName"
              onChange={handleChange}
              required
            >
              <option>Select project Manager</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option
                    value={option.Employee_ID}
                    selected={option.Full_Name === pro_manager}
                  >
                    {option.Full_Name}
                  </option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Action</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              defaultValue={action}
              name="action"
              onChange={handleChange}
            >
              <option value="">Select Action</option>
              <option value="NoGo">NoGo</option>
              <option value="Review">Review</option>
            </Form.Select>
          </Form.Group>
          
        </Row>
        <Row>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Start Date</Form.Label>
            <Form.Control
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              value={sDate}
              name="startDate"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Submission Date</Form.Label>
            <Form.Control
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              value={subDate}
              name="submissionDate"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
        </Row>

        
        <Row>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>RFP Number</Form.Label>
            <Form.Control
            style={{...styles.nameInput, width:'360px'}}
              value={rfpnum}
              name="rfpNumber"
              type="number"
              placeholder="RFP Number"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Source</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} value={source} name="source" onChange={handleChange}>
              <option>Select Source</option>
              <option value="Construct Connect">Construct Connect</option>
              <option value="Bids and Tenders">Bids and Tenders</option>
              <option value="Biddingo">Biddingo</option>
              <option value="Merx">Merx</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Update RFP
            </Button>
            </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>RFP Updated Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateRFP;
