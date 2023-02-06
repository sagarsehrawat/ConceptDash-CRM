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
  UPDATE_BUDGET,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function UpdateBudget(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
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
  const [form, setform] = useState({
    city: props.row.City_ID,
    dept: props.row.Department_ID,
    projectCat: props.row.Project_Cat_ID,
    budgetCategory: budgetCategory,
    projectName: pName,
    budgetAmount: bAmount,
    budgetYear: bYear,
    source: props.row.Source,
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
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Select onChange={handleChange} name="city">
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

        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Department</Form.Label>
            <Form.Select onChange={handleChange} name="dept">
              {depts.length > 0
                ? depts.map((e) => (
                    <option
                      value={e.Department_ID}
                      selected={e.Department === depart}
                    >
                      {e.Department}
                    </option>
                  ))
                : ""}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Project Category</Form.Label>
            <Form.Select onChange={handleChange} name="projectCat">
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
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Budget Category</Form.Label>
            <Form.Select
              defaultValue={budgetCategory}
              onChange={handleChange}
              name="budgetCategory"
            >
              <option value="Design Product">Design Product</option>
              <option value="Product Project">Product Project</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              value={pName}
              name="projectName"
              type="text"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Budget Amount</Form.Label>
            <Form.Control
              value={bAmount}
              name="budgetAmount"
              type="number"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Budget Year</Form.Label>
            <Form.Control
              value={bYear}
              name="budgetYear"
              type="text"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Source</Form.Label>
            <Form.Select value={source} name="source" onChange={handleChange}>
              <option>Select Source</option>
              <option value="Construct Connect">Construct Connect</option>
              <option value="Bids and Tenders">Bids and Tenders</option>
              <option value="Biddingo">Biddingo</option>
              <option value="Merx">Merx</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button className="submit-btn" variant="primary">
          Submit
        </Button>
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
