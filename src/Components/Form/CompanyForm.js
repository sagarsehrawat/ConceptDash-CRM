import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { HOST, ADD_COMPANY, GET_CITIES } from "../Constants/Constants";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function CompanyForm(props) {
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;

  const [cities, setcities] = useState([]);
  useEffect(() => {
    setisLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_CITIES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setcities(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoading(false);
    };
    call();
  }, [apiCallCity]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setform] = useState({
    company: "",
    category: "",
    address: "",
    city: "",
    business: "",
    fax: "",
    email: "",
    webpage: "",
    notes: "",
    attachments: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = (e) => {
    isLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_COMPANY,
        {
          name: form.company,
          category: form.category,
          address: form.address,
          city: form.city,
          businessPhone: form.business,
          fax: form.fax,
          email: form.email,
          webpage: form.webpage,
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
        setisLoading(false);
        setRed(true);
      });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <Form.Control
                  name="company"
                  type="text"
                  placeholder="Company*"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Select
                  name="category"
                  type="text"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category*</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Contractor">Contractor</option>
                  <option value="Municipal">Municipal</option>
                  <option value="Manufacturer">Manufacturer</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Shipper">Shipper</option>
                  <option value="Reseller">Reseller</option>
                  <option value="Competitor">Competitor</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridAddress1">
                <Form.Control
                  name="address"
                  type="text"
                  placeholder="Address"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Select onChange={handleChange} name="city">
                  <option>Select City</option>
                  {cities.length !== 0 ? (
                    cities.map((options) => (
                      <option value={options.City_ID} key={options.City_ID}>
                        {options.City}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
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
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control
                  name="business"
                  type="tel"
                  placeholder="Business Phone"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control
                  name="fax"
                  type="tel"
                  placeholder="Fax"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Control
                  name="email"
                  type="email"
                  placeholder="General Email"
                  onChange={handleChange}
                />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control
                  name="webpage"
                  placeholder="Web Page"
                  onChange={handleChange}
                />
              </Form.Group>
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
            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Form Submitted</Modal.Title>
            </Modal.Header>
            <Modal.Body>Employee added Successfully</Modal.Body>
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
        </div>
      )}
    </>
  );
}

export default CompanyForm;
