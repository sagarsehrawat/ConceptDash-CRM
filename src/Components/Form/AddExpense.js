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
  ADD_EXPENSE_TRANSACTION,
  GET_CUSTOMERNAMES,
  GET_EXPENSE_CATEGORIES,
  GET_EMPLOYEENAMES,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from '../../Context/AuthContext'

function AddExpense(props) {
  const { privileges, setPrivileges } = useContext(AuthContext)
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    clientId: "",
    date: "",
    expenseCatId: "",
    amount: "",
    tax: "",
    remarks: "",
    employeeId: "",
    cityId: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [categories, setcategories] = useState([]);
  const [employees, setemployees] = useState([]);
  const [customers, setcustomers] = useState([]);
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
        .get(HOST + GET_EXPENSE_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcategories(res.data.res);
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
      await axios
        .get(HOST + GET_CUSTOMERNAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcustomers(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [apiCallCity]);

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_EXPENSE_TRANSACTION,
        {
          clientId: form.clientId,
          date: form.date,
          expenseCatId: form.expenseCatId,
          amount: form.amount,
          tax: form.tax,
          remarks: form.remarks,
          employeeId: form.employeeId,
          cityId: form.cityId,
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
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="clientId" required>
                  <option value="">Select Client</option>
                  {customers.length > 0
                    ? customers.map((e) => (
                        <option value={e.ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="cityId" required>
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
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="employeeId" required>
                  <option value="">Select Employee</option>
                  {employees.length > 0
                    ? employees.map((e) => (
                        <option value={e.Employee_ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select
                  onChange={handleChange}
                  name="expenseCatId"
                  required
                >
                  <option value="">Select Expense Category</option>
                  {categories.length > 0
                    ? categories.map((e) => (
                        <option value={e.ExpCat_ID}>{e.Description}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="date"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount</Form.Label>
                <Form.Control name="amount" onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Tax</Form.Label>
                <Form.Control name="tax" onChange={handleChange} required />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                  name="remarks"
                  type="text"
                  as="textArea"
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
        </div>
      )}
    </>
  );
}

export default AddExpense;
