import React, { useEffect, useState } from "react";
import FormUtils from "../../../utils/FormUtils";
import { Modal } from "react-bootstrap";
import TFIcon from "../../../components/ui/TFIcon/TFIcon";
import tIcon from "../../../Images/taskIcon.svg";
import cross from "../../../Images/cross.svg";
import "./Form.css";
import TFButton from "../../../components/ui/TFButton/TFButton";
import SERVICES from "../../../services/Services";
import Utils from "../../../utils/Utils";
import TFTypeahead from "../../../components/form/TFTypeahead/TFTypeahead";
import TFInput from "../../../components/form/TFInput/TFInput";
import LoadingSpinner from "../../../Main/Loader/Loader";
import { useDispatch } from 'react-redux';
import moment from "moment";
import { showErrorModal, showSuccessModal } from "../../../redux/slices/alertSlice";

type Props = {
  show: boolean;
  setShow: Function;
  api: number;
  setApi: Function;
  isEditing: boolean;
  editForm: RFP | null;
};

interface FormType {
  department: string;
  departmentId: string | number;
  projectCat: string;
  projectCatId: string | number;
  action: string;
  managerName: string;
  managerNameId: string | number;
  projectName: string;
  startDate: string;
  submissionDate: string;
  rfpNumber: string;
  client: string;
  files: Array<any>;
  source: string;
  city: string;
  cityId: string | number;
  remarks: string;
}

const FORM: FormType = {
  department: "",
  departmentId: "",
  projectCat: "",
  projectCatId: "",
  action: "",
  managerName: "",
  managerNameId: "",
  projectName: "",
  startDate: "",
  submissionDate: "",
  rfpNumber: "",
  client: "",
  files: [],
  source: "",
  city: "",
  cityId: "",
  remarks: "",
}

const AddRfp = ({ show, setShow, api, setApi, isEditing = false, editForm }: Props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    isEditing && editForm
      ? {
        department: editForm.department ?? "",
        departmentId: editForm.department_id ?? "",
        projectCat: editForm.project_category ?? "",
        projectCatId: editForm.project_cat_id ?? "",
        action: editForm.action,
        managerName: editForm.project_manager ?? "",
        managerNameId: editForm.project_manager_id ?? "",
        projectName: editForm.project_name,
        startDate: moment(editForm?.start_date).isValid() ? moment(editForm.start_date).format("YYYY-MM-DD") : "",
        submissionDate: moment(editForm?.start_date).isValid() ? moment(editForm.submission_date).format("YYYY-MM-DD") : "",
        rfpNumber: editForm.rfp_number ?? "",
        client: editForm.client ?? "",
        files: [],
        source: editForm.source ?? "",
        city: editForm.city ?? "",
        cityId: editForm.city_id ?? "",
        remarks: editForm.remarks ?? "",
      }
      : FORM
  );
  const [cities, setCities] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [departments, setDepartments] = useState<Array<{ label: string | number; value: string | number }>>([]);
  const [projectCategories, setProjectCategories] = useState<Array<{ label: string | number; value: string | number }>>([]);
  const [managers, setManagers] = useState<Array<{ label: string | number; value: string | number }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cityResponse = await SERVICES.getCities();
        const departmentResponse = await SERVICES.getDepartments();
        const managersResponse = await SERVICES.getManagers();
        setCities(Utils.convertToTypeaheadOptions(cityResponse.res, "City", "City_ID"));
        setDepartments(Utils.convertToTypeaheadOptions(departmentResponse.res, "Department", "Department_ID"));
        setManagers(Utils.convertToTypeaheadOptions(managersResponse.res, "Full_Name", "Employee_ID"));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  
  useEffect(() => {
    const getProjectCategories = async () => {
      try {
        const projectCategoryReponse = await SERVICES.getProjectCategories(form.departmentId);
        setProjectCategories(Utils.convertToTypeaheadOptions(projectCategoryReponse.res, "Project_Category", "Project_Cat_ID"));
      } catch (error) {
        console.log(error);
      }
    };
    getProjectCategories();
  }, [form.departmentId]);

  const formUtils = FormUtils(setForm);

  const handleForm = (key: string, value: string | number | FileList | null) => {

    switch (key) {
      case "department":
        formUtils.typeaheadForm(key, value);
        setProjectCategories([]);
        setForm((prev) => {
          return {
            ...prev,
            projectCat: "",
            projectCatId: ""
          }
        })
        break;
      case "projectCat":
        formUtils.typeaheadForm(key, value);
        break;
      case "action":
        formUtils.dropdownForm(key, value);
        break;
      case "managerName":
        formUtils.typeaheadForm(key, value);
        break;
      case "projectName":
        formUtils.typeInputForm(key, value);
        break;
      case "startDate":
        formUtils.typeInputForm(key, value);
        break;
      case "submissionDate":
        formUtils.typeInputForm(key, value);
        break;
      case "rfpNumber":
        formUtils.typeInputForm(key, value);
        break;
      case "client":
        formUtils.typeInputForm(key, value);
        break;
      case "files":
        formUtils.inputFilesForm(key, value);
        break;
      case "source":
        formUtils.dropdownForm(key, value);
        break;
      case "city":
        formUtils.typeaheadForm(key, value);
        break;
      case "remarks":
        formUtils.typeInputForm(key, value);
        break;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    setIsLoading(true);
    isEditing?handleSubmitEdit():handleSubmitAdd();
  }
  const handleSubmitEdit = async () => {
    try {
      await SERVICES.updateRfp(editForm!.rfp_id, form.departmentId, form.projectCatId, form.source, form.managerNameId, form.startDate, form.submissionDate, form.projectName, form.rfpNumber, form.client, form.cityId, form.remarks);
      dispatch(showSuccessModal('RFP Updated.'));
      setApi(api + 1);
      setShow(!show);
    } catch (error) {
      console.log(error);
      dispatch(showErrorModal('Something went wrong.'))
    } finally {
      setIsLoading(false);
    }
  }
  const handleSubmitAdd = async () => {
      const formData = new FormData();
      formData.append('departmentId', form.departmentId.toString());
      formData.append('projectCatId', form.projectCatId.toString());
      formData.append('projectManagerId', form.managerNameId.toString());
      formData.append('projectName', form.projectName);
      formData.append('startDate', form.startDate.toString());
      formData.append('submissionDate', form.submissionDate.toString());
      formData.append('rfpNumber', form.rfpNumber);
      formData.append('source', form.source);
      formData.append('client', form.client);
      formData.append('cityId', form.cityId.toString());
      formData.append('remarks', form.remarks);
  
      for (let i = 0; i < form.files.length; i++) {
        formData.append('files', form.files[i]);
      }
      try {
        await SERVICES.addRfp(formData);
        dispatch(showSuccessModal('RFP Added.'));
        setApi(api + 1);
        setShow(!show);
      } catch (error) {
        console.log(error);
        dispatch(showErrorModal('Something went wrong.'))
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <>
      <Modal
        show={true}
        onHide={() => setShow(false)}
        backdrop="static"
        style={{
          position: "absolute",
          width: "780px",
          height: "fit-content",
          left: "28vw",
          marginTop: "4vh",
          background: "#FFFFFF",
          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
        dialogClassName="filter-dialog"
        animation={false}
      >
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{
            marginTop: "20px",
            marginLeft: "20px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="d-flex flex-row">
            <TFIcon icon={tIcon} />
            <div className="heading-2">{isEditing?'Update RFP':'Add New RFP'}</div>
          </div>
          <div>
            <img
              onClick={() => setShow(false)}
              style={{ marginRight: "26px", marginTop: "6px", float: "right" }}
              src={cross}
            />
          </div>
        </div>
        {
          isLoading
            ? <div style={{ height: '150px' }} className="w-100">
              <LoadingSpinner />
            </div>
            : <form>
              <div className="d-flex flex-row justify-content-around">
                <div>
                  <p className="nameHeading">Project Name<sup style={{ color: 'red' }}>*</sup></p>
                  <TFInput
                    placeholder="Project Name"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleForm}
                    required={true}
                    width="740px"
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div>
                  <p className="nameHeading">City</p>
                  <TFTypeahead
                    name="city"
                    defaultValue={form.city}
                    placeholder="Choose City"
                    onChange={handleForm}
                    options={cities}
                    width="740px"
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div>
                  <p className="nameHeading">Client</p>
                  <TFInput
                    placeholder="Enter Client"
                    name="client"
                    value={form.client}
                    onChange={handleForm}
                    width="740px"
                  />
                </div>
              </div>

              <div
                className="d-flex flex-row justify-content-start"
                style={{ marginLeft: "20px", width: "740px" }}
              >
                <div style={{ marginRight: "20px", width: "234px" }}>
                  <p className="nameHeading">Department</p>
                  <TFTypeahead
                    name="department"
                    defaultValue={form.department}
                    placeholder="Choose Department"
                    onChange={handleForm}
                    options={departments}
                    width="100%"
                  />
                </div>

                <div style={{ marginRight: "20px", width: "233px" }}>
                  <p className="nameHeading">Project Manager</p>
                  <TFTypeahead
                    name="managerName"
                    defaultValue={form.managerName}
                    placeholder="Choose Project Manager"
                    onChange={handleForm}
                    options={managers}
                    width="100%"
                  />
                </div>

                {form.department !== "" && projectCategories.length !== 0 ? <div style={{ width: "233px" }}>
                  <p className="nameHeading">Project Category</p>
                  <TFTypeahead
                    name="projectCat"
                    defaultValue={form.projectCat}
                    placeholder="Choose Project Category"
                    onChange={handleForm}
                    options={projectCategories}
                    width="100%"
                  />
                </div> : <></>}
              </div>

              <div
                className="d-flex flex-row justify-content-start"
                style={{ marginLeft: "20px", width: "740px" }}
              >
                <div style={{ marginRight: "20px", width: "234px" }}>
                  <p className="nameHeading">Question Date</p>
                  <input
                    className="nameInput dropdown three-3"
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                  />
                </div>

                <div style={{ marginRight: "20px", width: "233px" }}>
                  <p className="nameHeading">Submission Date</p>
                  <input
                    className="nameInput dropdown three-3"
                    name="submissionDate"
                    type="date"
                    value={form.submissionDate}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                  />
                </div>
              </div>

              <div
                className="d-flex flex-row justify-content-start"
                style={{ marginLeft: "20px", width: "740px" }}
              >
                <div style={{ marginRight: "20px", width: "234px" }}>
                  <p className="nameHeading">RFP Number</p>
                  <TFInput
                    placeholder="Enter RFP Number"
                    name="rfpNumber"
                    value={form.rfpNumber}
                    onChange={handleForm}
                    width="100%"
                  />
                </div>

                <div style={{ marginRight: "20px", width: "233px" }}>
                  <p className="nameHeading">Select Source</p>
                  <select
                    className="nameInput dropdown three-3"
                    name="source"
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                  >
                    <option>Select Source</option>
                    <option value="Construct Connect">Construct Connect</option>
                    <option value="Bids and Tenders">Bids and Tenders</option>
                    <option value="Biddingo">Biddingo</option>
                    <option value="Merx">Merx</option>
                  </select>
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div>
                  <p className="nameHeading">Remarks</p>
                  <textarea
                    className="nameInput"
                    name="remarks"
                    rows={2}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    value={form.remarks}
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-around">
                <div>
                  <p className="nameHeading">
                    Relevent Files (Upto 500 MB each file)
                  </p>
                  <input
                    className="nameInput"
                    style={{ padding: "0" }}
                    name="files"
                    type="file"
                    onChange={(e) => handleForm(e.target.name, e.target.files)}
                    multiple
                  />
                </div>
              </div>

              <div className="d-flex flex-row justify-content-end gap-8 formFooter">
                <TFButton
                  handleClick={() => setShow(!show)}
                  label="Cancel"
                  variant="secondary"
                />
                <TFButton handleClick={handleSubmit} label={isEditing?"Update RFP":"Add RFP"} />
              </div>
            </form>
        }
      </Modal>
    </>
  );
};

export default AddRfp;
