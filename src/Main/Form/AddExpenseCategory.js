import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { HOST, ADD_EXPENSE_CATEGORY } from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function AddExpenseCategory(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    description: "",
    expense: "",
    taxable: "",
  });
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
        HOST + ADD_EXPENSE_CATEGORY,
        {
          description: form.description,
          expense: form.expense,
          taxable: form.taxable,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res.data);
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
  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              placeholder="Description"
              name="description"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select onChange={handleChange} name="expense" required>
              <option value="">Select Expense Type</option>
              <option value="Expense">Expense</option>
              <option value="Income">Income</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select onChange={handleChange} name="taxable" required>
              <option value="">Is Expense Taxable</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Button className="submit-btn" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddExpenseCategory;
