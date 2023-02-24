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
  UPDATE_EXPENSE_TRANSACTION,
  GET_CUSTOMERNAMES,
  GET_EXPENSE_CATEGORIES,
  GET_EMPLOYEENAMES,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function UpdateExpense(props) {
console.log(props.row)
  const cityShow = props.row.City;
  const categoryShow = props.row.Description;
  const employeeShow = props.row.Employee_Name;
  const customerShow = props.row.Client_Name;
  const [city, setcity] = useState(props.row.City_ID)
  const [category, setcategory] = useState(props.row.Expense_Cat_ID)
  const [employee, setemployee] = useState(props.row.Employee_ID)
  const [customer, setcustomer] = useState(props.row.Client_ID)
  const [amount, setamount] = useState(props.row.Amount)
  const [tax, settax] = useState(props.row.Tax)
  const [remarks, setremarks] = useState(props.row.Remarks)
  const [date, setdate] = useState(props.row.Date?props.row.Date.substring(0, 10):'')

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    clientId: customer??"",
    date: date??"",
    expenseCatId: category??"",
    amount: amount??"",
    tax: tax??"",
    remarks: remarks??"",
    employeeId: employee??"",
    cityId: city??"",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name==='clientId') {
        setcustomer(value)
    }
    if(name==='date') {
        setdate(value)
    }
    if(name==='expenseCatId') {
        setcategory(value)
    }
    if(name==='amount') {
        setamount(value)
    }
    if(name==='tax') {
        settax(value)
    }
    if(name==='remarks') {
        setremarks(value)
    }
    if(name==='employeeId') {
        setemployee(value)
    }
    if(name==='cityId') {
        setcity(value)
    }
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
  }, []);

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + UPDATE_EXPENSE_TRANSACTION,
        {
          id: props.row.Expense_ID,
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
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Client</Form.Label>
                <Form.Select onChange={handleChange} name="clientId" required>
                  <option value="">Select Client</option>
                  {customers.length > 0
                    ? customers.map((e) => (
                        <option selected={e.Full_Name === customerShow} value={e.ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>City</Form.Label>
                <Form.Select onChange={handleChange} name="cityId" required>
                  <option value="">Select City</option>
                  {cities.length > 0
                    ? cities.map((e) => (
                        <option selected={e.City === cityShow} value={e.City_ID}>{e.City}</option>
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
                  onClick={handleShowCityForm}
                >
                  Add City
                </Button>
              </Form.Group> */}
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Employee</Form.Label>
                <Form.Select onChange={handleChange} name="employeeId" required>
                  <option value="">Select Employee</option>
                  {employees.length > 0
                    ? employees.map((e) => (
                        <option selected={e.Full_Name === employeeShow} value={e.Employee_ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Expense Category</Form.Label>
                <Form.Select
                  onChange={handleChange}
                  name="expenseCatId"
                  required
                >
                  <option value="">Select Expense Category</option>
                  {categories.length > 0
                    ? categories.map((e) => (
                        <option selected={e.Description===categoryShow} value={e.ExpCat_ID}>{e.Description}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  value={date}
                  onChange={handleChange}
                  name="date"
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Amount</Form.Label>
                <Form.Control value={amount} name="amount" onChange={handleChange} required />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Tax</Form.Label>
                <Form.Control value={tax} name="tax" onChange={handleChange} required />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Remarks</Form.Label>
                <Form.Control
                value={remarks}
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
          
        </div>
      )}
    </>
  );
}

export default UpdateExpense;
