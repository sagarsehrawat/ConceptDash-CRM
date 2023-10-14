import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { HOST, ADD_CITY } from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";
import TFButton from "../../components/ui/TFButton/TFButton";

function AddCity(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false)
  const [form, setform] = useState({
    city: "",
    province: "",
    country: "",
    population: "",
    municipalityType: "",
    municipalityStatus: "",
    geographicArea: "",
    website: "",
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
        HOST + ADD_CITY,
        {
          city: form.city,
          province: form.province,
          country: form.country,
          population: form.population,
          municipalityType: form.municipalityType,
          municipalityStatus: form.municipalityStatus,
          area: form.geographicArea,
          website: form.website,
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
        // setRed(true);
      });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main" onSubmit={handleSubmit}>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control placeholder="City" name="city" onChange={handleChange} required />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select name="province" onChange={handleChange} required>
              <option value="">Select Province</option>
              <option value="Ontario">Ontario</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select name="country" onChange={handleChange} required>
              <option value="">Select Country</option>
              <option value="Ontario">Canada</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          {/* <Form.Group as={Col}>
            <Form.Control placeholder="Capital Budget" name="capitalBudget" onChange={handleChange} />
          </Form.Group> */}
          <Form.Group as={Col}>
            <Form.Control placeholder="Population(2021)" name="population" onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control placeholder="Website" type="url" name="website" onChange={handleChange} />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Select onChange={handleChange} name="municipalityType">
              <option value="">Select Municipality Type</option>
              <option value="Township">Township</option>
              <option value="Town">Town</option>
              <option value="City">City</option>
              <option value="Regional">Regional</option>
              <option value="Municipality">Municipality</option>
              <option value="Village">Village</option>
              <option value="District">District</option>
              <option value="County">County</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select onChange={handleChange} name="municipalityStatus">
              <option value="">Select Municipality Status</option>
              <option value="Single Tier">Single Tier</option>
              <option value="Lower Tier">Lower Tier</option>
              <option value="Upper Tier">Upper Tier</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control placeholder="Geographic Area" name="geographicArea" onChange={handleChange} />
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>City added Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default AddCity;
