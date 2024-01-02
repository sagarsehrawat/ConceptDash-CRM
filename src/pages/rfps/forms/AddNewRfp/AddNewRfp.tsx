import React, { useEffect, useState } from "react";
import "./AddNewRfp.scss";
import AddForm from "../../../../components/ui/AddForms/AddForm";
import TFInput from "../../../../components/form/TFInput/TFInput";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead";
import { useDispatch } from "react-redux";
import moment from "moment";
import SERVICES from "../../../../services/Services";
import Utils from "../../../../utils/Utils";
import FormUtils from "../../../../utils/FormUtils";
import {
  showErrorModal,
  showSuccessModal,
} from "../../../../redux/slices/alertSlice";
import TFButton from "../../../../components/ui/TFButton/TFButton";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import TFDateChip from "../../../../components/form/TFDateChip/TFDateChip";
// import TFChip from "../../../../components/form/TFChip/TFChip";
import { icons } from "../../../../assets/icons";

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
  clientId: string | number;
  files: Array<any>;
  source: string;
  city: string;
  cityId: string | number;
  remarks: string;
  // clientRating: string;
}

const FORM: FormType = {
  department: "",
  departmentId: "",
  projectCat: "",
  projectCatId: "",
  action: "No Go",
  managerName: "",
  managerNameId: "",
  projectName: "",
  startDate: "",
  submissionDate: "",
  rfpNumber: "",
  client: "",
  clientId: "",
  files: [],
  source: "",
  city: "",
  cityId: "",
  // clientRating: "0",
  remarks: "",
};

const AddNewRfp = (props: Props) => {
  const { show, setShow, api, setApi, isEditing = false, editForm } = props;

  const { add_rfp_icon } = icons;
  console.log(editForm);
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    isEditing && editForm
      ? {
          department: editForm.department ?? "",
          departmentId: editForm.department_id ?? "",
          projectCat: editForm.project_category ?? "",
          projectCatId: editForm.project_cat_id ?? "",
          action: editForm.action ?? "No Go",
          managerName: editForm.manager_name ?? "",
          managerNameId: editForm.project_manager_id ?? "",
          projectName: editForm.project_name,
          startDate: moment(editForm?.start_date).isValid()
            ? moment(editForm.start_date).format("YYYY-MM-DD")
            : "",
          submissionDate: moment(editForm?.submission_date).isValid()
            ? moment(editForm.submission_date).format("YYYY-MM-DD")
            : "",
          rfpNumber: editForm.rfp_number ?? "",
          client: editForm.client ?? "",
          clientId: editForm.client_id ?? "",
          files: [],
          source: editForm.source ?? "",
          city: editForm.city ?? "",
          cityId: editForm.city_id ?? "",
          // clientRating: "",
          remarks: editForm.remarks ?? "",
        }
      : FORM
  );
  const [cities, setCities] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [departments, setDepartments] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [projectCategories, setProjectCategories] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [managers, setManagers] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [clients, setclients] = useState<
    Array<{ label: string | number; value: string | number }>
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uploadedFiles, setUploadedFiles] = useState([form.files]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const cityResponse = await SERVICES.getCities();
        const departmentResponse = await SERVICES.getDepartments();
        const managersResponse = await SERVICES.getManagers();
        const clientsResponse = await SERVICES.getOrganizationsList();
        setCities(
          Utils.convertToTypeaheadOptions(cityResponse.res, "City", "City_ID")
        );
        setDepartments(
          Utils.convertToTypeaheadOptions(
            departmentResponse.res,
            "Department",
            "Department_ID"
          )
        );
        setManagers(
          Utils.convertToTypeaheadOptions(
            managersResponse.res,
            "Full_Name",
            "Employee_ID"
          )
        );
        setclients(
          Utils.convertToTypeaheadOptions(
            clientsResponse.res,
            "company_name",
            "company_id"
          )
        );
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
        const projectCategoryReponse = await SERVICES.getProjectCategories(
          form.departmentId
        );
        setProjectCategories(
          Utils.convertToTypeaheadOptions(
            projectCategoryReponse.res,
            "Project_Category",
            "Project_Cat_ID"
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getProjectCategories();
  }, [form.departmentId]);

  const formUtils = FormUtils(setForm);

  const handleForm = (
    key: string,
    value: string | number | FileList | null
  ) => {
    switch (key) {
      case "department":
        formUtils.typeaheadForm(key, value);
        setProjectCategories([]);
        setForm((prev) => {
          return {
            ...prev,
            projectCat: "",
            projectCatId: "",
          };
        });
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
      case "files":
        formUtils.inputFilesForm(key, value);
        break;
      case "source":
        formUtils.dropdownForm(key, value);
        break;
      case "city":
        formUtils.typeaheadForm(key, value);
        break;
      case "client":
        formUtils.typeaheadForm(key, value);
        break;
      case "remarks":
        formUtils.typeInputForm(key, value);
        break;
      // case "clientRating":
      //   formUtils.typeInputForm(key, value);
      //   break;
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    isEditing ? handleSubmitEdit() : handleSubmitAdd();
  };
  const handleSubmitEdit = async () => {
    try {
      await SERVICES.updateRfp(
        editForm!.rfp_id,
        form.departmentId,
        form.projectCatId,
        form.source,
        form.managerNameId,
        moment(form?.startDate).isValid()
          ? moment(form.startDate).format("YYYY-MM-DD")
          : "",
        moment(form?.submissionDate).isValid()
          ? moment(form.submissionDate).format("YYYY-MM-DD")
          : "",
        form.projectName,
        form.rfpNumber,
        form.clientId,
        form.cityId,
        form.remarks
      );
      dispatch(showSuccessModal("RFP Updated."));
      setApi(api + 1);
      setShow(!show);
    } catch (error) {
      console.log(error);
      dispatch(showErrorModal("Something went wrong."));
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmitAdd = async () => {
    const formData = new FormData();
    formData.append("departmentId", form.departmentId.toString());
    formData.append("projectCatId", form.projectCatId.toString());
    formData.append("projectManagerId", form.managerNameId.toString());
    formData.append("projectName", form.projectName);
    formData.append(
      "startDate",
      moment(form?.startDate).isValid()
        ? moment(form.startDate).format("YYYY-MM-DD")
        : ""
    );
    formData.append(
      "submissionDate",
      moment(form?.startDate).isValid()
        ? moment(form.submissionDate).format("YYYY-MM-DD")
        : ""
    );
    formData.append("rfpNumber", form.rfpNumber);
    formData.append("source", form.source);
    formData.append("client", form.clientId.toString());
    formData.append("cityId", form.cityId.toString());
    formData.append("action", form.action);
    formData.append("remarks", form.remarks);

    for (let i = 0; i < form.files.length; i++) {
      formData.append("files", form.files[i]);
      setUploadedFiles([...uploadedFiles, form.files[i]]);
    }
    try {
      await SERVICES.addRfp(formData);
      dispatch(showSuccessModal("RFP Added."));
      setApi(api + 1);
      setShow(!show);
    } catch (error) {
      console.log(error);
      dispatch(showErrorModal("Something went wrong."));
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // handleSubmitAdd();
  // }, [form.files]);

  // console.log("files", form.files, "upload", uploadedFiles);

  // const handleChange = (file: any) => {
  //   setFile(file);
  // }

  // for (let i = 0; i < form.files.length; i++) {
  // console.log("files", form.files[i]?.name);
  // uploadedFiles.push(form.files[i]?.name);
  // console.log("uploaded", uploadedFiles);
  // }

  return (
    <>
      {show && (
        <AddForm
          heading={!isEditing ? "Add New RFP" : "Update RFP"}
          heading_icon={add_rfp_icon}
        >
          {isLoading ? (
            <div style={{ marginTop: "50%" }} /*  className="w-100 h-100" */>
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="add-new-rfp-form-wrapper">
                <div className="d-flex justify-content-start align-item-center mb-3">
                  {/* <h3>Enter RFP Name</h3> */}
                  <label>Enter RFP Name</label>
                  <TFInput
                    placeholder="RFP Name"
                    name="projectName"
                    value={form.projectName}
                    onChange={handleForm}
                    required={true}
                    width="100%"
                  />
                </div>

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>City</label>
                  <TFTypeahead
                    name="city"
                    defaultValue={form.city}
                    placeholder="Choose City"
                    onChange={handleForm}
                    options={cities}
                    width="100%"
                  />
                </div>

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Client</label>
                  <TFTypeahead
                    placeholder="Add Client"
                    name="client"
                    defaultValue={form.client}
                    onChange={handleForm}
                    options={clients}
                    width="100%"
                    required
                  />
                </div>

                {/* <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Client Rating</label>
                  <TFChip
                    name="clientRating"
                    value={form.clientRating}
                    options={["0", "1", "2", "3", "4", "5"]}
                    onChange={handleForm}
                  />
                </div> */}

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Source</label>
                  <select
                    className="nameInput dropdown three-3"
                    name="source"
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                  >
                    <option>Select Source</option>
                    <option
                      selected={form.source === "Construct Connect"}
                      value="Construct Connect"
                    >
                      Construct Connect
                    </option>
                    <option
                      selected={form.source === "Bids and Tenders"}
                      value="Bids and Tenders"
                    >
                      Bids and Tenders
                    </option>
                    <option
                      selected={form.source === "Biddingo"}
                      value="Biddingo"
                    >
                      Biddingo
                    </option>
                    <option selected={form.source === "Merx"} value="Merx">
                      Merx
                    </option>
                  </select>
                </div>

                {/* <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Action</label>
                  <TFChip
                    name="action"
                    value={form.action}
                    options={["Go", "No Go", "Review", "External"]}
                    onChange={handleForm}
                  />
                </div> */}

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Submission Date</label>
                  <TFDateChip
                    value={form.submissionDate}
                    name="submissionDate"
                    onChange={handleForm}
                  />
                </div>

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>RFP number</label>
                  <TFInput
                    placeholder="Enter RFP Number"
                    name="rfpNumber"
                    value={form.rfpNumber}
                    onChange={handleForm}
                    width="100%"
                  />
                </div>

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Question Date</label>
                  <TFDateChip
                    value={form.startDate}
                    name="startDate"
                    onChange={handleForm}
                  />
                </div>

                <div className="d-flex justify-content-start align-item-center mb-3">
                  <label>Project Manager</label>
                  <TFTypeahead
                    name="managerName"
                    defaultValue={form.managerName}
                    placeholder="Choose Project Manager"
                    onChange={handleForm}
                    options={managers}
                    width="100%"
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
                  <label>Project Category</label>
                  <TFTypeahead
                    name="projectCat"
                    defaultValue={form.projectCat}
                    placeholder="Choose Project Category"
                    onChange={handleForm}
                    options={projectCategories}
                    width="100%"
                  />
                </div>

                <div className=" justify-content-start align-item-center mb-3">
                  <label>Remarks</label>
                  <textarea
                    className="remarks-textarea"
                    name="remarks"
                    rows={2}
                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                    value={form.remarks}
                  />
                </div>

                {isEditing?<></>: (
                  <div className="justify-content-center align-item-center mb-5 mt-5 upload-file-container">
                    <h2>Upload Attachments</h2>
                    <p>Upload any files/documents related to the RFP here.</p>
                    {/* <label>Upload</label> */}
                    <div className="d-flex justify-content-start align-item-center mb-5 mt-5">
                      <div className="upload-label">Upload</div>
                      <div className="upload-wrapper">
                        <div className="upload-inst">
                          <h6>Upload Files</h6>
                          <p>
                            Click here to upload the file
                            <i> (less than 500MB)</i>
                          </p>
                        </div>
                        <div className="file-upload-div">
                          <div className="text-center">
                            <img src={icons.upload_icon} />
                            <h5>Drag and Drop to upload file</h5>
                            <p>Or</p>
                            <div className="upload-btn-wrapper">
                              <button className="btn">Browse file</button>
                              <input
                                type="file"
                                name="files"
                                onChange={(e) =>
                                  handleForm(e.target.name, e.target.files)
                                }
                                multiple
                              />
                            </div>
                            <p className="mt-4">
                              You can upload png, jpeg, xml or pdf
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="project-modal-footer w-100">
                  <TFButton
                    label="Cancel"
                    handleClick={() => setShow(!show)}
                    variant="secondary"
                  />
                  <TFButton
                    label={isEditing ? "Update RFP" : "Add RFP"}
                    handleClick={handleSubmit}
                    variant="primary"
                  />
                </div>
              </div>
            </>
          )}
        </AddForm>
      )}
    </>
  );
};

export default AddNewRfp;
