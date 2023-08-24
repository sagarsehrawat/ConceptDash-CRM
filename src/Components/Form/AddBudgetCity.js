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
  ADD_DEPARTMENT,
  ADD_BUDGET_CITY,
} from "../Constants/Constants";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../Loader/Loader";

function AddBudgetCity(props) {
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    cityID: "",
  });
  const [cities, setcities] = useState([]);
  useEffect(() => {
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
        HOST + ADD_BUDGET_CITY,
        {
          cityID: form.cityID
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setisLoading(false);
        if (res.data.success) {
          closeModal();
          setGreen(true);
        //   apiCall(api + 1);
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
            <Form.Select
              name="cityID"
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.length !== 0 ? (
                cities.map((option) => (
                  <option value={option.City_ID}>{option.City}</option>
                ))
              ) : (
                <option value="">None</option>
              )}
            </Form.Select>
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

export default AddBudgetCity;
