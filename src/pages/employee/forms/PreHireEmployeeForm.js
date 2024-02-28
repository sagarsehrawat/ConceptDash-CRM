import React, { useEffect, useState, useContext } from "react";
import "./Prehire.scss";
import AddForm from "../../../components/ui/AddForms/AddForm";
import TFInput from "../../../components/form/TFInput/TFInput";
import TFTypeahead from "../../../components/form/TFTypeahead/TFTypeahead";
import moment from "moment";
import FormUtils from "../../../utils/FormUtils";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";
import {
  HOST,
  GET_JOB_TITLES,
  ADD_EMPLOYEE,
  GET_DEPARTMENTS,
  PRIMARY_COLOR,
  GET_MANAGERS,
} from "../../../Main/Constants/Constants";
import GreenAlert from "../../../Main/Loader/GreenAlert";
import RedAlert from "../../../Main/Loader/RedAlert";
import TFButton from "../../../components/ui/TFButton/TFButton";
import LoadingSpinner from "../../../Main/Loader/Loader";
import TFDateChip from "../../../components/form/TFDateChip/TFDateChip";
import { icons } from "../../../assets/icons";
import emp_icon from "../../../assets/icons/emp.svg";
import Dropdown from "../../../components/form/DropDown/Dropdown";
import Utils from '../../../utils/Utils'

const FORM = {
  firstName: "",
  lastName: "",
  workEmail: "",
  personalEmail: "",
  jobTitle: "",
  joiningDate: "",
  department: "",
  managerName: "",
  businessPhone: "",
  alternativeNo: "",
  dashboard: ""
};

const PreHireEmployeeForm = (props) => {
  const { privileges, setPrivileges } = useContext(AuthContext);
  const [green, setgreen] = useState(false);
  const [apiCallCity, setCallCity] = useState(0);
  const [red, setred] = useState(false);
  const { setGreen, closeModal, api, apiCall, setRed, signal } = props;

  const { add_rfp_icon, jpeg_icon, pdf_icon, xml_icon, png_icon } = icons;
  const [form, setForm] = useState(FORM);
  const [jobTitles, setjobTitles] = useState([]);
  const [employees, setemployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [show, setShow] = useState(false);
  const [showTitleForm, setShowTitleForm] = useState(false);
  const handleCloseTitleForm = () => setShowTitleForm(false);
  const handleShowTitleForm = () => setShowTitleForm(true);

  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_JOB_TITLES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setjobTitles(Utils.convertToTypeaheadOptions(res.data.res, 'Title', 'Title_ID'));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setDepartments(Utils.convertToTypeaheadOptions(res.data.res, 'Department', 'Department_ID'));
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_MANAGERS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setemployees(Utils.convertToTypeaheadOptions(res.data.res, 'Full_Name', 'Employee_ID'));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, [apiCallCity]);

  const formUtils = FormUtils(setForm);
console.log(jobTitles)
  const handleForm = (key, value) => {
    console.log(key, value)
    switch (key) {
      case "firstName":
        formUtils.typeInputForm(key, value);
        break;
      case "lastName":
        formUtils.typeInputForm(key, value);
        break;
      case "workEmail":
        formUtils.typeInputForm(key, value);
        break;
      case "personalEmail":
        formUtils.typeInputForm(key, value);
        break;
      case "jobTitle":
        formUtils.typeaheadForm(key, value);
        break;
      case "joiningDate":
        formUtils.typeInputForm(key, value);
        break;
      case "department":
        formUtils.typeaheadForm(key, value);
        break;
      case "managerName":
        formUtils.typeaheadForm(key, value);
        break;
      case "businessPhone":
        formUtils.typeInputForm(key, value);
        break;
      case "alternativeNo":
        formUtils.typeInputForm(key, value);
        break;
      case "dashboard":
        formUtils.typeaheadForm(key, value);
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.workEmail
    ) {
      window.alert("Please fill in all required fields");
      return;
    }
    setIsLoading(true);
    setIsSubmit(true);
    console.log(form)
    axios
      .post(
        HOST + ADD_EMPLOYEE,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          emailWork: form.workEmail,
          emailPersonal: form.personalEmail,
          jobTitleId: form.jobTitleId,
          joiningDate: form.joiningDate,
          departmentId: form.departmentId,
          directManagerId: form.managerNameId,
          business: form.businessPhone,
          mobile: form.alternativeNo,
          dashboard: "Engineer"
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        setIsLoading(false);
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
        setIsLoading(false);
        setRed(true);
      });
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <AddForm heading={"Add New Employee"} heading_icon={emp_icon}>
          <>
            <div className="add-new-rfp-form-wrapper">
              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  First Name<span>*</span>
                </label>
                <TFInput
                  placeholder="Type in First Name"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  Last Name<span>*</span>
                </label>
                <TFInput
                  placeholder="Type in Last Name"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>
              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  Work Email<span>*</span>
                </label>
                <TFInput
                  placeholder="Enter Email ID"
                  name="workEmail"
                  value={form.workEmail}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  Personal Email<span></span>
                </label>
                <TFInput
                  placeholder="Enter Email ID"
                  name="personalEmail"
                  value={form.personalEmail}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>Job Title</label>
                <TFTypeahead
                  name="jobTitle"
                  defaultValue={form.jobTitle}
                  placeholder="Choose Title"
                  onChange={handleForm}
                  options={jobTitles}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>Joining Date</label>
                <TFDateChip
                  value={form.joiningDate}
                  name="joiningDate"
                  onChange={handleForm}
                />
              </div>

              
              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>Department</label>
                <TFTypeahead
                  name="department"
                  defaultValue={form.department}
                  placeholder="Choose Department"
                  onChange={handleForm}
                  options={departments}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>Direct Manager</label>
                <TFTypeahead
                  name="managerName"
                  defaultValue={form.managerName}
                  placeholder="Choose Project Manager"
                  onChange={handleForm}
                  options={employees}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  Business Phone<span></span>
                </label>
                <TFInput
                  placeholder="Enter Phone Number"
                  name="businessPhone"
                  value={form.businessPhone}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>

              <div className="d-flex justify-content-start align-item-center mb-3">
                <label>
                  Alternative Number<span></span>
                </label>
                <TFInput
                  placeholder="Enter Alternative Phone Number"
                  name="alternativeNo"
                  value={form.alternativeNo}
                  onChange={handleForm}
                  required={true}
                  width="100%"
                />
              </div>
            </div>
            <div className="project-modal-footer w-100">
              <TFButton
                label="Cancel"
                variant="secondary"
                handleClick={closeModal}
              />
              <TFButton
                label="Add Employee"
                handleClick={handleSubmit}
                variant="primary"
              />
            </div>
          </>
        </AddForm>
      )}
    </>
  );
};

export default PreHireEmployeeForm;
