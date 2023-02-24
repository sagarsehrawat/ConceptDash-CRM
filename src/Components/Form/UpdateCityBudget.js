import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { HOST, UPDATE_BUDGET, UPDATE_BUDGET_CITY, UPDATE_CITY_BUDGET } from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function UpdateCityBudget(props) {
  const [isSubmit, setIsSubmit] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [population, setpopulation] = useState(props.row.Population_2021)
  const [year_22, setyear_22] = useState(props.row.Year_22)
  const [year_23, setyear_23] = useState(props.row.Year_23)
  const [website_22, setwebsite_22] = useState(props.row.Website_22)
  const [website_23, setwebsite_23] = useState(props.row.Website_23)
  const [capBudget, setcapBudget] = useState(props.row.Capital_Budget_23)
  const [remarks, setremarks] = useState(props.row.Remarks)
  const [form, setform] = useState({
    population: population ?? "",
    year22: year_22 ?? "",
    year23: year_23 ?? "",
    website22: website_22 ?? "",
    website23: website_23 ?? "",
    capitalBudget: capBudget ?? "",
    remarks: remarks ?? ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "population") {
      setpopulation(value);
    }
    if (name === "year22") {
      setyear_22(value);
    }
    if (name === "year23") {
      setyear_23(value);
    }
    if (name === "website22") {
      setwebsite_22(value);
    }
    if (name === "website23") {
      setwebsite_23(value);
    }
    if (name === "capitalBudget") {
      setcapBudget(value);
    }
    if (name === "remarks") {
      setremarks(value)
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
        HOST + UPDATE_BUDGET_CITY,
        {
          id: props.row.City_Budget_ID,
          cityId: props.row.City_ID,
          population: form.population,
          year22: form.year22,
          year23: form.year23,
          website22: form.website22,
          website23: form.website23,
          capitalBudget: form.capitalBudget,
          remarks: form.remarks
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
        setisLoading(false);
        setRed(true);
        console.log(err);
      });
  };
  const [isLoading, setisLoading] = useState(false);
  return (
    isLoading ? <LoadingSpinner /> :
      <>
        <div>
          <Form className="form-main" onSubmit={handleSubmit}>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control value={population} name="population" placeholder="Population" onChange={handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control name="capitalBudget" value={capBudget} placeholder="Capital Budget" onChange={handleChange} />
              </Form.Group>
            </Row>

            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Label>2022 Budget</Form.Label>
                <Form.Select onChange={handleChange} name="year22" defaultValue={props.row.Year_22}>
                  <option value="">Select 2022 Budget</option>
                  <option value="Done">Done</option>
                  <option value="Not Found">Not Found</option>
                  <option value="Only Project Names">Only Project Names</option>

                </Form.Select>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>2023 Budget</Form.Label>
                <Form.Select onChange={handleChange} name="year23" defaultValue={props.row.Year_23}>
                  <option value="">Select 2023 Budget</option>
                  <option value="Done">Done</option>
                  <option value="Not Found">Not Found</option>
                  <option value="Only Project Names">Only Project Names</option>

                </Form.Select>
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control onChange={handleChange} name="website22" value={website_22} placeholder='Website 2022' />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Control onChange={handleChange} name="website23" value={website_23} placeholder='Website 2023' />
              </Form.Group>
            </Row>
            <Row className="mb-4">
              <Form.Group as={Col}>
                <Form.Control name="remarks" value={remarks} onChange={handleChange} placeholder='Remarks' />
              </Form.Group>
            </Row>


            <Button className="submit-btn" variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </div>
      </>
  );
}

export default UpdateCityBudget;
