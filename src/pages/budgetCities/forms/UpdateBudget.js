import React, { useEffect, useState } from "react";
import "../../../Main/Form/Form.css";
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
  UPDATE_BUDGET,
  PRIMARY_COLOR
} from "../../../Main/Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../../../Main/Loader/Loader";
import TFButton from "../../../components/ui/TFButton/TFButton";
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
function UpdateBudget(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed, cities2, setcities2, idx } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cities, setcities] = useState([]);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
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
      setisLoading(false);
    };
    call();
  }, []);

  
  let yr = new Date().getFullYear();
  const [year, setyear] = useState(yr);
  const depart = props.row.Department;
  const citi = props.row.City;
  const pro_cat = props.row.Project_Category;
  const [city, setcity] = useState(props.row.City_ID);
  const [projectCategory, setprojectCategory] = useState(
    props.row.Project_Cat_ID
  );
  const [budgetCategory, setbudgetCategory] = useState(
    props.row.Budget_Category
  );
  const [dept, setdept] = useState(props.row.Department_ID);
  const [source, setsource] = useState(props.row.Source);
  const [bYear, setbYear] = useState(props.row.Budget_Year);
  const [pName, setpName] = useState(props.row.Project_Name);
  const [bAmount, setbAmount] = useState(props.row.Budget_Amount);
  const [sNumber, setsNumber] = useState(props.row.Serial_No);

  const [form, setform] = useState({
    city: props.row.City_ID ?? "",
    dept: props.row.Department_ID ?? "",
    projectCat: props.row.Project_Cat_ID ?? "",
    budgetCategory: budgetCategory ?? "",
    projectName: pName,
    budgetAmount: bAmount ?? "",
    budgetYear: bYear ?? "",
    source: props.row.Source ?? "",
    serialNumber: props.row.Serial_No ?? "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dept") {
      setdept(value);
    }
    if (name === "projectCat") {
      setprojectCategory(value);
    }
    if (name === "budgetCategory") {
      setbudgetCategory(value);
    }
    if (name === "city") {
      setcity(value);
    }
    if (name === "projectName") {
      setpName(value);
    }
    if (name === "budgetAmount") {
      setbAmount(value);
    }
    if (name === "budgetYear") {
      setbYear(value);
    }
    if (name === "source") {
      setsource(value);
    }
    if (name === "serialNumber") {
      setsNumber(value);
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
        HOST + UPDATE_BUDGET,
        {
          id: props.row.Budget_ID,
          cityId: form.city,
          departmentId: form.dept,
          categoryId: form.projectCat,
          projectName: form.projectName,
          budgetCategory: form.budgetCategory,
          budgetAmount: form.budgetAmount,
          budgetYear: form.budgetYear,
          source: form.source,
          serialNumber: form.serialNumber,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          const val = res.data.res[0].Capital_Budget_23
          const c = cities2
          c[idx].Capital_Budget_23 = val;
          setcities2(c)
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
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>City</Form.Label>
            <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="city">
            <option value="">Select City</option>
              {cities.length > 0
                ? cities.map((e) => (
                    <option value={e.City_ID} selected={e.City === citi}>
                      {e.City}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
        <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Budget Amount</Form.Label>
            <Form.Control
                style={{...styles.nameInput, width:'360px'}}
              value={bAmount}
              name="budgetAmount"
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Budget Category</Form.Label>
            <Form.Select
            style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}}
              defaultValue={budgetCategory}
              onChange={handleChange}
              name="budgetCategory"
            >
              <option value="">Select Budget Category</option>
              <option value="Design">Design</option>
              <option value="Construction">Construction</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Department</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="dept">
            <option value="">Select Department</option>
              {depts.length > 0
                ? depts.map((e) => (
                    <option
                      value={e.Department_ID}
                      selected={e.Department===depart}
                    >
                      {e.Department}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Project Category</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="projectCat">
            <option value="">Select Project Category</option>
              {projectDepts.length > 0
                ? projectDepts.map((e) => (
                    <option
                      value={e.Project_Cat_ID}
                      selected={e.Project_Category === pro_cat}
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
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Budget Year</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} name="budgetYear" onChange={handleChange} defaultValue={bYear}>
                  <option value={year-2}>{year-2}</option>
                  <option value={year-1}>{year-1}</option>
                  <option value={year}>{year}</option>
                  <option value={year+1}>{year+1}</option>
                  <option value={year+2}>{year+2}</option>
                  <option value={year+3}>{year+3}</option>
                </Form.Select>
          </Form.Group>
          <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Source</Form.Label>
            <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} defaultValue={source} name="source" onChange={handleChange}>
              <option>Select Source</option>
              <option value="Construct Connect">Construct Connect</option>
              <option value="Bids and Tenders">Bids and Tenders</option>
              <option value="Biddingo">Biddingo</option>
              <option value="Merx">Merx</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row>
        <Form.Group style={{width:'380px'}}>
            <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Serial Number</Form.Label>
                <Form.Control
                style={{...styles.nameInput, width:'360px'}}
                  name="serialNumber"
                  type="text"
                  onChange={handleChange}
                  value={sNumber}
                />
              </Form.Group>
        </Row>

        <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            {/* <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button>
            <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Update Budget
            </Button> */}
            <TFButton label="Cancel" variant="secondary" handleClick={closeModal} style={{marginRight: '20px'}} size="small"/>
              <TFButton label="Update Budget" type="submit" size="small"/>
            </div>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Budget Updated Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateBudget;
