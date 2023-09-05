import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import { HOST, ADD_SOFTWARE } from "../Constants/Constants";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingSpinner from "../Loader/Loader";

function SoftwareForm(props) {
  const [isLoading, setisLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [form, setform] = useState({
    software: "",
    manufacturer: "",
    version: "",
    price: "",
    aquiredOn: "",
    retiredOn: "",
    notes: "",
    attachments: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const handleSubmit = (e) => {
    setisLoading(true)
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_SOFTWARE,
        {
          software: form.software,
          manufacturer: form.manufacturer,
          version: form.version,
          price: form.price,
          acquiredOn: form.aquiredOn,
          retiredDate: form.retiredOn,
          notes: form.notes,
          attachments: form.attachments,
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
      });
  };
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="software"
              type="text"
              placeholder="Software Name"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              name="manufacturer"
              type="text"
              placeholder="Manufacturer"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="version"
              type="text"
              placeholder="Version"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              name="price"
              type="text"
              placeholder="Price"
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Label>Acquired On</Form.Label>
            <Form.Control
              name="aquiredOn"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Retired On</Form.Label>
            <Form.Control
              name="retiredOn"
              type="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row classname="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              name="notes"
              as="textarea"
              rows={1}
              type="text"
              placeholder="Notes"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              name="attachments"
              type="file"
              placeholder="Attachments"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button
          className="submit-btn"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default SoftwareForm;
