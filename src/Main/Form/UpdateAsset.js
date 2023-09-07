import React, { useEffect, useState } from "react";
import "./Form.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { HOST, GET_EMPLOYEENAMES, UPDATE_ASSET } from "../Constants/Constants";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingSpinner from "../Loader/Loader";

function UpdateAsset() {
  const [isLoading, setisLoading] = useState(false);
  const [employees, setemployees] = useState([]);
  const { setGreen, closeModal, api, apiCall, setRed } = props;
  useEffect(() => {
    setisLoading(true);
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
      setisLoading(false);
    };
    call();
  }, []);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form, setform] = useState({
    employee: "",
    assetCategory: "",
    hardwareDetails: "",
    acquiredOn: "",
    retiredOn: "",
    shippedOn: "",
    price: 0,
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
    setisLoading(true);
    e.preventDefault();
    setIsSubmit(true);
    axios
      .post(
        HOST + ADD_ASSET,
        {
          employeeId: form.employee,
          category: form.assetCategory,
          hardwareDetails: form.hardwareDetails,
          acquiredOn: form.acquiredOn,
          shippedOn: form.shippedOn,
          retiredDate: form.retiredOn,
          purchasePrice: form.price,
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
  return <div>UpdateAsset</div>;
}

export default UpdateAsset;
