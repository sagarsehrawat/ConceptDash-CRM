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
  ADD_BUDGET,
  PRIMARY_COLOR
} from "../../../Main/Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../../../Main/Loader/Loader";
import GreenAlert from "../../../Main/Loader/GreenAlert";
import RedAlert from "../../../Main/Loader/RedAlert";
import AddCity from "../../../Main/Form/AddCity";
import AddDepartment from "../../../Main/Form/AddDepartment";
import AddCategory from "../../../Main/Form/AddCategory";
import plus from '../../../Images/plus.svg'
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
function BudgetsForm(props) {
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed, cities2, setcities2, idx } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let yr = new Date().getFullYear();
  const [year, setyear] = useState(yr);
  const [form, setform] = useState({
    city: props.cityid,
    dept: "",
    projectCat: "",
    budgetCategory: "",
    projectName: "",
    budgetAmount: "",
    budgetYear: year,
    source: "",
    serialNumber: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budgetYear") {
      setyear(value);
    }
    if(name==='dept') {
      getProjectCategories(value)
    }
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
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

      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
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
          serialNumber: form.serialNumber
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
    <div style={{ marginLeft:'27px', marginTop:'20px', marginBottom:'20px'}}>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
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
                />
              </Form.Group>
            </Row>
            <Row>
            <Form.Group as={Col}>
                <Form.Label style={{...styles.nameHeading,width:'740px', marginTop:'24px'}}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>City</div>
                    <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowCityForm}><img alt="Add New City" src={plus} /></div>
                  </div>
                </Form.Label>
                <Form.Select style={{...styles.nameInput, fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="city" required>
                  <option value="">Select City</option>
                  {cities.length > 0
                    ? cities.map((e) => (
                      <option selected={e.City === props.city} value={e.City_ID}>{e.City}</option>
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
                  name="budgetAmount"
                  type="number"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Budget Category</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="budgetCategory">
                  <option value="">Select Budget Category</option>
                  <option value="Design">Design</option>
                  <option value="Construction">Construction</option>
                </Form.Select>
              </Form.Group>
              
            </Row>

            <Row>
              <Form.Group style={{width:'380px'}}>
              <Form.Label style={{...styles.nameHeading,width:'380px', marginTop:'24px'}}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>Department</div>
                    <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowDeptForm}><img alt="Add New Dept" src={plus} /></div>
                  </div>
                </Form.Label>
                <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="dept" required>
                  <option value="">Select Department</option>
                  {depts.length > 0
                    ? depts.map((e) => (
                      <option value={e.Department_ID}>{e.Department}</option>
                    ))
                    : ""}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{width:'380px'}}>
              <Form.Label style={{...styles.nameHeading,width:'380px', marginTop:'24px'}}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div>Project Category</div>
                    <div style={{background:'#EBE9F1',borderRadius:'10px', width:'20px', textAlign:'center', cursor:'pointer'}} onClick={handleShowCategoryForm}><img alt="Add New Cat" src={plus} /></div>
                  </div>
                </Form.Label>
                <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} onChange={handleChange} name="projectCat" required>
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
              {/* <Form.Group as={Col}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "grey",
                    border: "none",
                  }}
                  onClick={handleShowDeptForm}
                >
                  Add Department
                </Button>
              </Form.Group> */}
            </Row>
            {/* <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Select onChange={handleChange} name="city" required>
                  <option value="">Select City</option>
                  {cities.length > 0
                    ? cities.map((e) => (
                      <option selected={e.City === props.city} value={e.City_ID}>{e.City}</option>
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
                >
                  Add City
                </Button>
              </Form.Group>
            </Row> */}

           
            {/* <Row className="mb-4">
              
              <Form.Group as={Col}>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "grey",
                    border: "none",
                  }}
                  onClick={handleShowCategoryForm}
                >
                  Add Project Category
                </Button>
              </Form.Group>
            </Row> */}
            
            <Row>
              
              
              <Form.Group style={{width:'380px'}}>
                <Form.Label style={{...styles.nameHeading, marginTop:'24px'}}>Budget Year</Form.Label>
                <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} name="budgetYear" onChange={handleChange}>
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
                <Form.Select style={{...styles.nameInput, width:'360px', fontSize:'14px', color:'#70757A'}} name="source" onChange={handleChange}>
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
                />
              </Form.Group>
            </Row>
            <div className="d-flex d-row justify-content-end" style={{marginTop:'44px', marginRight:'20px'}}>
            {/* <Button onClick={closeModal} style={{color:'#70757A', backgroundColor:'#FFFFFF', borderColor:'#70757A', marginRight:'20px'}}>
              Cancel
            </Button> */}
            <TFButton style={{marginRight: '20px'}}  variant="secondary" label="Cancel" handleClick={closeModal} size="small" />
            {/* <Button style={{backgroundColor:PRIMARY_COLOR}} type="submit">
              Add New Budget
            </Button> */}
            <TFButton label="Add New Budget" type="submit" size="small" />
            </div>
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
        </div>
      )}
    </div>
  );
}

export default BudgetsForm;
