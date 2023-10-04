import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HOST, UPDATE_COMPANY, GET_CITIES } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";
import TFButton from "../../components/ui/Button/Button";

function UpdateCompany(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props
  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_CITIES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setcities(res.data.res);
          console.log(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, []);
  const [isLoading, setisLoading] = useState(false)

  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let displayCity = props.row.City;
  const [cities, setcities] = useState([]);
  const [cname, setcname] = useState(props.row.Name);
  const [category, setcategory] = useState(props.row.Category);
  const [address, setaddress] = useState(props.row.Address);
  const [city, setcity] = useState(props.row.City_ID);
  const [bphone, setbphone] = useState(props.row.Business_Phone);
  const [email, setemail] = useState(props.row.Email);
  const [wpage, setwpage] = useState(props.row.Web_Page);
  const [notes, setnotes] = useState(props.row.Notes);
  const [fax, setfax] = useState(props.row.Fax);
  console.log(props.row);
  const [form, setform] = useState({
    company: cname,
    category: category,
    address: address,
    city: city,
    business: bphone,
    fax: fax,
    email: email,
    webpage: wpage,
    notes: notes,
    attachments: props.row.Attachments,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setcname(value);
    }
    if (name === "category") {
      setcategory(value);
    }
    if (name === "address") {
      setaddress(value);
    }
    if (name === "city") {
      setcity(value);
    }
    if (name === "business") {
      setbphone(value);
    }
    if (name === "email") {
      setemail(value);
    }
    if (name === "webpage") {
      setwpage(value);
    }
    if (name === "notes") {
      setnotes(value);
    }
    if (name === "fax") {
      setfax(value);
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
        HOST + UPDATE_COMPANY,
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
          id: props.row.ID,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          closeModal()
          setGreen(true);
          apiCall(api+1)
        } else {
          setRed(true)
        }
      })
      .catch((err) => {
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  return (
    isLoading?<LoadingSpinner/>:
    <div>
      <Form className="form-main">
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              value={cname}
              name="company"
              type="text"
              placeholder="Company*"
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Select
              defaultValue={category}
              name="category"
              type="text"
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
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
              value={address}
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
                  <option
                    value={options.City_ID}
                    selected={options.City === displayCity}
                    key={options.City_ID}
                  >
                    {options.City}
                  </option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col}>
            <Form.Control
              value={bphone}
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
              value={email}
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
              value={wpage}
              name="webpage"
              type="url"
              placeholder="Web Page"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Control
              value={notes}
              name="notes"
              as="textarea"
              rows={1}
              type="text"
              placeholder="Notes"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        {/* <Button
          className="submit-btn"
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </Button> */}
        <TFButton label="Submit" type="submit" size="small"/>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Form Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Company Updated Successfully</Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateCompany;
