import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_EMPLOYEENAMES,
  ADD_DEPARTMENT,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";
import TFButton from "../../components/ui/Button/Button";

function AddDepartment(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    department: "",
    managerID: ""
  });
  const [employees, setemployees] = useState([]);
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
    };
    call();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
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
        HOST + ADD_DEPARTMENT,
        {
          department: form.department,
          managerID: form.managerID
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res.data)
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
        setRed(true);
      });
  };
  return(
    isLoading?<LoadingSpinner/>:
    <div>
        <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control placeholder="Department*" name="department" onChange={handleChange} required />
          </Form.Group>
        </Row>
        <Row className="mb-4">
        <Form.Group as={Col}>
            <Form.Select
              name="managerID"
              onChange={handleChange}
            >
              <option value="">Select Manager</option>
              {employees.length !== 0 ? (
                employees.map((option) => (
                  <option value={option.Employee_ID}>{option.Full_Name}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>


        {/* <Button
          className="submit-btn"
          variant="primary"
          type="submit"
        >
          Submit
        </Button> */}
        <TFButton label="Submit" type="submit" size="small"/>
      </Form>
    </div>
  );
}

export default AddDepartment;
