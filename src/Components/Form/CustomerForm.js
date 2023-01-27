import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  HOST,
  GET_COMPANY_NAMES,
  ADD_CONTACT,
  GET_CITIES,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import CompanyForm from "./CompanyForm";
import AddCity from "./AddCity";
import LoadingSpinner from "../Loader/Loader";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function CustomerForm(props) {
  const [apiCallCity, setCallCity] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setform] = useState({
    company: "",
    salutation: "",
    firstname: "",
    lastname: "",
    emailPersonal: "",
    emailWork: "",
    jobtitle: "",
    business: "",
    mobile: "",
    address: "",
    city: "",
    zip: "",
    webpage: "",
    notes: "",
    birthday: "",
    anniversary: "",
    sports: "",
    activity: "",
    beverage: "",
    alcohol: "",
    travelDest: "",
    spouseName: "",
    children: "",
    tvshow: "",
    movie: "",
    actor: "",
    dislikes: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = form;
    newForm[name] = value;
    setform(newForm);
  };
  const [cities, setcities] = useState([]);
  const [companies, setcompanies] = useState([]);
  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_COMPANY_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcompanies(res.data.res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
    };
    call();
  }, [apiCallCity]);
  // const handleChange1=()=>{ {handleChange1}; reformatDate();}
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_CONTACT,
        {
          companyId: form.company,
          salutation: form.salutation,
          firstName: form.firstname,
          lastName: form.lastname,
          emailPersonal: form.emailPersonal,
          emailWork: form.emailWork,
          jobTitle: form.jobtitle,
          businessPhone: form.business,
          mobilePhone: form.mobile,
          address: form.address,
          cityId: form.city,
          zip: form.zip,
          notes: form.notes,
          attachment: form.attachment,
          birthday: form.birthday,
          anniversary: form.anniversary,
          sports: form.sports,
          activities: form.activity,
          beverage: form.beverage,
          alcohol: form.alcohol,
          travelDestination: form.travelDest,
          spouseName: form.spouseName,
          children: form.children,
          tvShow: form.tvshow,
          movies: form.movie,
          actor: form.actor,
          dislikes: form.dislikes,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          handleShow();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showCompanyForm, setShowCompanyForm] = useState(false);
  const handleCloseCompanyForm = () => setShowCompanyForm(false);
  const handleShowCompanyForm = () => setShowCompanyForm(true);

  const [showCityForm, setShowCityForm] = useState(false);
  const handleCloseCityForm = () => setShowCityForm(false);
  const handleShowCityForm = () => setShowCityForm(true);
  return (
    <>
    {green===true ? <GreenAlert setGreen={setgreen}/> : <></>}
    {red===true ? <RedAlert setRed={setred}/> : <></>}
      <div>
        <Form className="form-main" onSubmit={handleSubmit}>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="company" required>
                <option value="">Select Company</option>
                {companies.map((option) => (
                  <option value={option.ID}>{option.Name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "grey",
                  border: "none",
                }}
                onClick={handleShowCompanyForm}
              >
                Add Company
              </Button>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select
                name="salutation"
                type="text"
                onChange={handleChange}
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
                <option value="">None</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="firstname"
                type="text"
                placeholder="First Name*"
                required
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="lastname"
                type="text"
                placeholder="Last Name"
                required
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={handleChange}
                name="emailPersonal"
                type="email"
                placeholder="Email Personal"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Control
                onChange={handleChange}
                name="emailWork"
                type="email"
                placeholder="Email Work"
                required
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-4" as={Col}>
            <Form.Control
              onChange={handleChange}
              name="jobtitle"
              type="text"
              placeholder="Job Title"
            />
          </Form.Group>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="business"
                type="tel"
                placeholder="Business Phone"
                required
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="home"
                type="tel"
                placeholder="Home Phone"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="mobile"
                type="tel"
                placeholder="Mobile Phone"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="fax"
                type="tel"
                placeholder="Fax Number"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-4" controlId="formGridAddress1">
            <Form.Control
              onChange={handleChange}
              name="address"
              placeholder="Address"
              required
            />
          </Form.Group>

          <Row className="mb-4">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Select onChange={handleChange} name="city" required>
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

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Control
                onChange={handleChange}
                name="zip"
                type="text"
                pattern="[0-9]{6}"
                placeholder="Pin Code"
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="webpage"
                type="url"
                placeholder="Web-Page"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
              <Form.Control
                onChange={handleChange}
                name="notes"
                as="textarea"
                rows={1}
                type="text"
                placeholder="Notes"
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control
                onChange={handleChange}
                name="attachments"
                type="file"
                placeholder="Attachments"
              />
            </Form.Group>
          </Row>
          <h2
            style={{
              margin: "auto",
              width: "30%",
              marginTop: "5vh",
              marginBottom: "2vh",
              textDecoration: "underline",
            }}
          >
            Personal Details
          </h2>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                name="birthday"
                type="date"
                placeholder="Birthday"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Anniversary</Form.Label>
              <Form.Control
                name="anniversary"
                type="date"
                placeholder="Anniversary"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              {/* <Form.Label>Birthday</Form.Label> */}
              {/* <Form.Control name='sports' type="date" placeholder="Birthday" onChange={handleChange} /> */}
              <Form.Select onChange={handleChange} name="sports">
                <option value="">Select Sports</option>
                <option value="Soccer">Soccer</option>
                <option value="Hockey">Hockey</option>
                <option value="Basketball">Basketball</option>
                <option value="Baseball">Baseball</option>
                <option value="Boxing">Boxing</option>
                <option value="MMA">MMA</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              {/* <Form.Label>Anniversary</Form.Label> */}
              {/* <Form.Control name='anniversary' type="date" placeholder="Anniversary" onChange={handleChange} /> */}
              <Form.Select onChange={handleChange} name="activity">
                <option value="">Select Activity</option>
                <option value="Walking">Walking</option>
                <option value="Running">Running</option>
                <option value="Travelling">Travelling</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="beverage">
                <option value="">Select Beverage</option>
                <option value="Coffee">Coffee</option>
                <option value="Tea">Tea</option>
                <option value="Ice Cap">Ice Cap</option>
              </Form.Select>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Select onChange={handleChange} name="alcohol">
                <option value="">Select Alcohol</option>
                <option value="Vodka">Vodka</option>
                <option value="Scotch">Scotch</option>
                <option value="Beer">Beer</option>
                <option value="Tequila">Tequila</option>
                <option value="Rum">Rum</option>
                <option value="Cocktail">Cocktail</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="travelDest"
                type="text"
                placeholder="Travel Destination"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="spouseName"
                type="text"
                placeholder="Spouse Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="children"
                type="text"
                placeholder="Children"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col}>
              <Form.Control
                name="tvShow"
                type="text"
                placeholder="TV Show"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="movie"
                type="text"
                placeholder="Movie"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="actor"
                type="text"
                placeholder="Actor"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Control
                name="dislikes"
                type="text"
                placeholder="Dislikes"
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

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Form Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>Custmer Added Successfully</Modal.Body>
        </Modal>

        <Modal
          backdrop="static"
          size="lg"
          keyboard={false}
          show={showCompanyForm}
          onHide={handleCloseCompanyForm}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>{<CompanyForm />}</Modal.Body>
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
          <Modal.Body>{<AddCity setRed={setred} setGreen={setgreen} closeModal={handleCloseCityForm} api={apiCallCity} apiCall={setCallCity}/>}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default CustomerForm;
