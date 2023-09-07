import React, { useEffect, useState, useContext } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_ALL_PROJECT_NAMES,
  GET_MANAGERS,
  ADD_PROJECT_EXPENSE,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from "../../Context/AuthContext";

function AddExpenses(props) {
    const { privileges, setPrivileges } = useContext(AuthContext);
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    projectId: "",
    employeeId: "",
    expenseDate: "",
    expenseDescription: "",
    expCatId: "",
    expenseAmount: "",
    attachment: "",
    notes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [employees, setemployees] = useState([]);
  const [projects, setprojects] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
        
      await axios
        .get(HOST + GET_MANAGERS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(res.data.res);
          console.log(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      

      await axios
        .get(HOST + GET_ALL_PROJECT_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojects(res.data.res);
          console.log(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_PROJECT_EXPENSE,
        {
            projectId: form.projectId,
            employeeId: form.employeeId,
            expenseDate: currentDate,
            expenseDescription: form.expenseDescription,
            expCatId: form.expCatId,
            expenseAmount: form.expenseAmount,
            attachment: form.attachment,
            notes: form.notes,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
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
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="projectId">
                  <option value="">Select Project</option>
                  {projects.length > 0
                    ? projects.map((e) => (
                        <option value={e.Project_ID}>{e.Project_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="employeeId">
                  <option value="">Select Employee</option>
                  {employees.length > 0
                    ? employees.map((e) => (
                        <option value={e.Employee_ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            {/* <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="designStageId">
                  <option value="">Select Design Stage</option>
                  {dStage.length > 0
                    ? dStage.map((e) => (
                        <option value={e.Design_Stage_ID}>
                          {e.Design_Stage}
                        </option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Select onChange={handleChange} name="customerId">
                  <option value="">Select Customer</option>
                  {customers.length > 0
                    ? customers.map((e) => (
                        <option value={e.ID}>{e.Full_Name}</option>
                      ))
                    : ""}
                </Form.Select>
              </Form.Group>
            </Row> */}
            
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Expense Description</Form.Label>
                <Form.Control
                  name="expenseDescription"
                  as="textarea"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Expense Category ID</Form.Label>
                <Form.Control
                  name="expCatId"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Expense Amount</Form.Label>
                <Form.Control
                  name="expenseAmount"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
            <Form.Group as={Col}>
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  name="notes"
                  as='textarea'
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>Attachment</Form.Label>
                <Form.Control
                  name="uploadPO"
                  type="file"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Row>

            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      )}
    </>
  )
}

export default AddExpenses