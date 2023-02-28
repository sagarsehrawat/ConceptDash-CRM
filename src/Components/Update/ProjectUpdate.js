import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  HOST,
  GET_PAGE_PROJECTS,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  DELETE_PROJECT,
  GET_CITIES,
  GET_EMPLOYEENAMES,
  GET_GOOGLE_DRIVE_URL,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProjectForm from "../Form/ProjectForm";
import UpdateProjectForm from "../Form/UpdateProjectForm";
import "./Table.css";
import Select from "react-select";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import Form from "react-bootstrap/Form";
import AuthContext from '../../Context/AuthContext'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faFolder } from "@fortawesome/free-solid-svg-icons";
import { Rings } from 'react-loader-spinner'

function ProjectUpdate(props) {
  const { setnav } = props
  const { privileges, setPrivileges } = useContext(AuthContext)
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [projects, setprojects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  let d = 0;
  let limit = 50;
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const [cities, setcities] = useState([]);
  const [employees, setemployees] = useState([]);
  const [sort, setsort] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    setIsLoading(true);
    setcurrPage(1)
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_PROJECTS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            limit: 50,
            offset: d,
            filter: JSON.stringify(returnData),
            search: value,
            sort: sort,
          },
        })
        .then((res) => {
          console.log(res.data)
          setprojects(res.data.res);
          setpages(res.data.totalPages)
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });

      await axios
        .get(HOST + GET_PROJECT_CATEGORIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setprojectDepts(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
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
      setIsLoading(false);
    };
    call();
  }, [apiCall]);
  const handlePage = async () => {
    setIsLoading(true);
    let current = currPage;
    setcurrPage(current + 1);
    await axios
      .get(HOST + GET_PAGE_PROJECTS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: 50,
          offset: current * 50,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setprojects(res.data.res);
        setpages(res.data.totalPages)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePagePre = async () => {
    setIsLoading(true);
    let current = currPage;
    setcurrPage(currPage - 1);
    await axios
      .get(HOST + GET_PAGE_PROJECTS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: 50,
          offset: (current - 2) * 50,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setprojects(res.data.res);
        setpages(res.data.totalPages)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterData = async () => {
    setIsLoading(true);
    setcurrPage(1)
    await axios
      .get(HOST + GET_PAGE_PROJECTS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: 50,
          offset: 0,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setprojects(res.data.res);
        setpages(res.data.totalPages)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e) => {
    setrowData(e);
    handleShowUpdate();
  };
  let filterDepts = [];
  let filterCategories = [];
  let filterCities = [];
  let filterEmployees = [];
  let filterStatus = [
    {
      label: "Not Started Yet",
      value: "Not Started Yet",
    },
    {
      label: "Completed",
      value: "Completed",
    },
    {
      label: "Ongoing",
      value: "Ongoing",
    },
  ];
  depts.map((e) => {
    filterDepts.push({
      label: e.Department,
      value: e.Department_ID,
    });
  });
  projectDepts.map((e) => {
    filterCategories.push({
      label: e.Project_Category,
      value: e.Project_Cat_ID,
    });
  });
  cities.map((e) => {
    filterCities.push({
      label: e.City,
      value: e.City_ID,
    });
  });
  employees.map((e) => {
    filterEmployees.push({
      label: e.Full_Name,
      value: e.Employee_ID,
    });
  });
  const inputData = (e) => {
    setValue(e.target.value);
  };
  let [DisplayValue, getValue] = useState([]);
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let [DisplayValue1, getValue1] = useState([]);
  let doChange1 = (e) => {
    getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let [DisplayValue2, getValue2] = useState([]);
  let doChange2 = (e) => {
    getValue2(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let [DisplayValue3, getValue3] = useState([]);
  let doChange3 = (e) => {
    getValue3(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let [DisplayValue4, getValue4] = useState([]);
  let doChange4 = (e) => {
    getValue4(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  let returnData = {
    dept: DisplayValue,
    cat: DisplayValue1,
    city: DisplayValue2,
    manager: DisplayValue3,
    status: DisplayValue4,
  };
  let deptvalue = [];
  returnData["dept"] &&
    returnData["dept"].map((e) => {
      deptvalue.push({
        label: e,
        value: e,
      });
    });
  let catvalue = [];
  returnData["cat"] &&
    returnData["cat"].map((e) => {
      catvalue.push({
        label: e,
        value: e,
      });
    });
  let cityvalue = [];
  returnData["city"] &&
    returnData["city"].map((e) => {
      cityvalue.push({
        label: e,
        value: e,
      });
    });
  let employeevalue = [];
  returnData["manager"] &&
    returnData["manager"].map((e) => {
      employeevalue.push({
        label: e,
        value: e,
      });
    });
  let statusvalue = [];
  returnData["status"] &&
    returnData["status"].map((e) => {
      statusvalue.push({
        label: e,
        value: e,
      });
    });
  const [projectid, setprojectid] = useState(0);
  const handleDelete = (e) => {
    setprojectid(e);
    handleShowDelete();
  };
  const handleDeleteBudget = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios
      .post(
        HOST + DELETE_PROJECT,
        {
          id: projectid,
        },
        { headers: { auth: "Rose " + localStorage.getItem("auth") } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          handleCloseDelete();
          setCall(apiCall + 1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openDriveLink = (e, projectFolderId) => {
    e.preventDefault();
    setIsLoading2(true)
    axios
      .get(
        HOST + GET_GOOGLE_DRIVE_URL,
        { headers: { auth: "Rose " + localStorage.getItem("auth"), id: projectFolderId, } }
      )
      .then((res) => {
        const url = res.data.res
        if(url && url!=="")window.open(url, '_blank');
        setIsLoading2(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleSort = (e) => {
    setsort(e.target.value);
  };
  const addComma = (num) => {
    if (num === null) return ""
    return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div>
        <div className="container-fluid">
          <h1
            style={{
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "1rem",
              fontFamily: "roboto",
              fontWeight: "bold",
            }}
          >
            Projects
            <Button
              onClick={handleShow}
              style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
              }}
              disabled={!privileges.includes("Add Project")}
            >
              Add Project +
            </Button>
          </h1>
          <div style={{ float: "right", marginBottom: "1rem" }}>
            <input
              style={{ marginRight: ".5rem" }}
              type="text"
              value={value}
              onChange={inputData}
              placeholder="Search"
            />
            <Button
              style={{ backgroundColor: "rgba(38,141,141,1)" }}
              size="sm"
              onClick={filterData}
            >
              Search
            </Button>
          </div>
          <br />
          <div
            style={{ width: "20rem", display: "inline-block" }}
            className="container-sm"
          ></div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              placeholder="City(s)"
              defaultValue={cityvalue}
              onChange={doChange2}
              isMulti
              options={filterCities}
            ></Select>
            &nbsp;&nbsp;
            <Select
              placeholder="Select departments"
              defaultValue={deptvalue}
              onChange={doChange}
              isMulti
              options={filterDepts}
            ></Select>
            &nbsp;&nbsp;
            <Select
              placeholder="Select Categories"
              defaultValue={catvalue}
              onChange={doChange1}
              isMulti
              options={filterCategories}
            ></Select>
            &nbsp;&nbsp;

            <Select
              placeholder="Project Manager(s)"
              defaultValue={employeevalue}
              onChange={doChange3}
              isMulti
              options={filterEmployees}
            ></Select>
            &nbsp;&nbsp;
            <Select
              placeholder="Project Status(s)"
              defaultValue={statusvalue}
              onChange={doChange4}
              isMulti
              options={filterStatus}
            ></Select>
            &nbsp;&nbsp;
            <Button
              style={{ backgroundColor: "rgba(38,141,141,1)" }}
              onClick={filterData}
            >
              Filter
            </Button>
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row", width: '52.5rem' }}>
            <Form.Select
              onChange={handleSort}
              defaultValue={sort}
            >
              <option value="Project_ID DESC">Latest to Oldest</option>
              <option value="Project_ID">Oldest to Latest</option>
              <option value="Project_Name">Project Name (A-Z)</option>
              <option value="Project_Name DESC">Project Name (Z-A)</option>
              <option value="Project_Value">Project Value(Low-High)</option>
              <option value="Project_Value DESC">Due Date(Low-High)</option>
            </Form.Select>
            &nbsp;&nbsp;
            <Button onClick={filterData}>Sort</Button>
          </div>
          <br />
          <div className="container-fluid">
            <table className="table">
              <thead>
                <tr className="heading">
                  {privileges.includes('Update Project') ? <th scope="col">Edit</th> : <></>}
                  {privileges.includes('Delete Project') ? <th scope="col">Delete</th> : <></>}
                  <th scope="col">Date Created</th>
                  <th scope="col">City</th>
                  <th scope="col">Department</th>
                  <th scope="col">Category</th>
                  <th scope="col">Stage</th>
                  <th scope="col">Name</th>
                  <th scope="col">Manager</th>
                  <th scope="col">Team</th>
                  <th scope="col">Project Value</th>
                  <th scope="col">Discussion Notes</th>
                  <th scope="col">Open in Drive</th>
                  <th scope="col">Goto</th>
                </tr>
              </thead>
              {isLoading
                ? <div style={{ "display": "table-caption" }}>
                  <LoadingSpinner />
                </div>
                :
                <tbody class="table-group-divider">
                  {projects ? projects.map((row) => {
                    return (
                      <tr>
                        {privileges.includes('Update Project') ? <td>
                          <svg width="40" height="40" viewBox="30 0 220 220">
                            <image
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleUpdate(row);
                              }}
                              href="data:image/png;base64,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"
                            />
                          </svg>
                        </td> : <></>}
                        {privileges.includes('Delete Project') ? <td>
                          <svg width="40" height="40" viewBox="80 80 250 250">
                            <image
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDelete(row.Project_Id);
                              }}
                              href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                            />
                          </svg>
                        </td> : <></>}
                        <td>{row.Date_Created}</td>
                        <td>{row.City}</td>
                        <td>{row.Department}</td>
                        <td>{row.Project_Category}</td>
                        <td>{row.Project_Stage}</td>
                        <td>{row.Project_Name}</td>
                        <td>{row.Manager_Name}</td>
                        <td>{row.Team}</td>
                        <td>{addComma(row.Project_Value)}</td>
                        <td>{row.Project_Discussion_Notes}</td>
                        <td>{isLoading2 ? < Rings
                          height="30"
                          width="30"
                          color="#000000"
                          radius="8"
                          visible={isLoading2}
                        /> : <FontAwesomeIcon style={{cursor : "pointer"}} icon={faFolder} onClick={(e) => openDriveLink(e, row.Project_Files)} />}</td>
                        <td><FontAwesomeIcon style={{cursor : "pointer"}} icon={faArrowRight} onClick={(e) => setnav(14)}/></td>
                      </tr>
                    );
                  }) : <></>}
                </tbody>
              }
            </table>
          </div>
          <div
            className="row justify-content-evenly"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <div style={{ textAlign: "center" }} className="col-1">
              <Button
                style={{ backgroundColor: "rgba(53,187,187,1)" }}
                disabled={currPage === 1}
                onClick={handlePagePre}
              >
                &lt;
              </Button>
            </div>
            <div style={{ textAlign: "center" }} className="col-1">
              Page {currPage}/{pages}
            </div>
            <div style={{ textAlign: "center" }} className="col-1">
              <Button
                style={{ backgroundColor: "rgba(53,187,187,1)" }}
                disabled={currPage === pages}
                onClick={handlePage}
              >
                &gt;
              </Button>
            </div>
          </div>
        </div>

        {/* Add Form Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <ProjectForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        {/* Update Form Modal */}
        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateProjectForm
                row={rowData}
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleCloseUpdate}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>
        <Modal
          show={showDelete}
          onHide={handleCloseDelete}
          backdrop="static"
          size="sm"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              <p style={{ textAlign: "center" }}>
                <b>Delete the selected Project!!</b>
              </p>
              <div style={{ display: "inline-block" }}>
                <Button variant="danger" onClick={handleCloseDelete}>
                  Cancel
                </Button>
              </div>
              <div style={{ display: "inline-block", float: "right" }}>
                <Button variant="success" onClick={handleDeleteBudget}>
                  Proceed
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default ProjectUpdate;
