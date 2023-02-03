import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  HOST,
  GET_PAGE_PROPOSALS,
  GET_PAGES_PROPOSALS,
  FILTER_PROPOSALS,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  GET_CITIES,
  DELETE_PROPOSAL,
  GET_EMPLOYEENAMES,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import ProposalForm from "../Form/ProposalForm";
import UpdateProposal from "../Form/UpdateProposal";
import Modal from "react-bootstrap/Modal";
import "./Table.css";
import Select from "react-select";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import Form from "react-bootstrap/Form";

function ProposalsUpdate() {
  const [rowData, setrowData] = useState([]);

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

  const [proposals, setproposals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let d = 0;
  let limit = 50;
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [depts, setdepts] = useState([]);
  const [projectDepts, setprojectDepts] = useState([]);
  const [cities, setcities] = useState([]);
  const [sort, setsort] = useState("");
  const [value, setValue] = useState("");
  const [employees, setemployees] = useState([]);
  useEffect(() => {
    setIsLoading(true);
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

      await axios
        .get(HOST + GET_PAGE_PROPOSALS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            limit: limit,
            offset: d,
            filter: JSON.stringify(returnData),
            search: value,
            sort: sort,
          },
        })
        .then((res) => {
          setproposals(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_PAGES_PROPOSALS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            limit: limit,
          },
        })
        .then((res) => {
          setpages(res.data.res);
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
      .get(HOST + GET_PAGE_PROPOSALS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: current * limit,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setproposals(res.data.res);
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
      .get(HOST + GET_PAGE_PROPOSALS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: (current - 2) * limit,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setproposals(res.data.res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterData = async () => {
    setIsLoading(true);
    await axios
      .get(HOST + GET_PAGE_PROPOSALS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: 0,
          filter: JSON.stringify(returnData),
          search: value,
          sort: sort,
        },
      })
      .then((res) => {
        setproposals(res.data.res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdate = (e) => {
    setrowData(e);
    handleShowUpdate();
  };
  let filterDepts = [];
  let filterCategories = [];
  let filterCities = [];
  let filterEmployees = [];
  let filterSource = [
    {
      label: "ConstructConnect",
      value: "ConstructConnect",
    },
    {
      label: "Biddingo",
      value: "Biddingo",
    },
    {
      label: "Merx",
      value: "Merx",
    },
    {
      label: "Bids & Tenders",
      value: "Bids & Tenders",
    },
  ];
  employees.map((e) => {
    filterEmployees.push({
      label: e.Full_Name,
      value: e.Full_Name,
    });
  });
  depts.map((e) => {
    filterDepts.push({
      label: e.Department,
      value: e.Department,
    });
  });
  projectDepts.map((e) => {
    filterCategories.push({
      label: e.Project_Category,
      value: e.Project_Category,
    });
  });
  cities.map((e) => {
    filterCities.push({
      label: e.City,
      value: e.City,
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
    source: DisplayValue4,
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
  let sourceValue = [];
  returnData["source"] &&
    returnData["source"].map((e) => {
      sourceValue.push({
        label: e,
        value: e,
      });
    });
  const [proposalid, setproposalid] = useState(0);
  const handleDelete = (e) => {
    setproposalid(e);
    handleShowDelete();
  };
  const handleDeleteBudget = (e) => {
    e.preventDefault();
    axios
      .post(
        HOST + DELETE_PROPOSAL,
        {
          id: proposalid,
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
  const handleSort = (e) => {
    setsort(e.target.value);
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
              Proposals
              <Button
                onClick={handleShow}
                style={{
                  float: "right",
                  backgroundColor: "rgba(38,141,141,1)",
                }}
              >
                Add Proposal +
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
                placeholder="Select departments"
                defaultValue={deptvalue}
                onChange={doChange}
                isMulti
                options={filterDepts}
              >
                Select Departments
              </Select>
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
                placeholder="Select City(s)"
                defaultValue={cityvalue}
                onChange={doChange2}
                isMulti
                options={filterCities}
              ></Select>
              &nbsp;&nbsp;
              <Select
                placeholder="Select Project Manager(s)"
                defaultValue={employeevalue}
                onChange={doChange3}
                isMulti
                options={filterEmployees}
              ></Select>
              &nbsp;&nbsp;
              {/* <Select
                placeholder="Source(s)"
                defaultValue={sourceValue}
                onChange={doChange4}
                isMulti
                options={filterSource}
              ></Select>
              &nbsp;&nbsp; */}
              {deptvalue.length == 0 &&
              catvalue.length == 0 &&
              cityvalue.length == 0 &&
              cityvalue.length == 0 ? (
                <Button
                  style={{ backgroundColor: "rgba(38,141,141,1)" }}
                  disabled
                  onClick={filterData}
                >
                  Filter
                </Button>
              ) : (
                <Button
                  style={{ backgroundColor: "rgba(38,141,141,1)" }}
                  onClick={filterData}
                >
                  Filter
                </Button>
              )}
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "63.5rem",
              }}
            >
              <Form.Select onChange={handleSort}>
                <option value="Question_Deadline DESC">
                Question Deadline (Oldest First)
                </option>
                <option value="Question_Deadline">Question Deadline (Newest First)</option>
                <option value="Closing_Deadline DESC">
                Closing Deadline (Newest First)
                </option>
                <option value="Closing_Deadline">
                Closing Deadline (Oldest First)
                </option>
                <option value="Result_Date DESC">
                Result Date (Newest First)
                </option>
                <option value="Result_Date">
                Result Date (Oldest First)
                </option>
                <option value="Project_Name">Project Name (A-Z)</option>
                <option value="Project_Name DESC">Project Name (Z-A)</option>
                <option value="Design_Price">Design Price (Low-High)</option>
                <option value="Design_Price DESC">Design Price (High-Low)</option>
                <option value="Provisional_Items">Provisional Items (Low-High)</option>
                <option value="Provisional_Items DESC">Provisional Items (High-Low)</option>
                <option value="Contract_Admin_Price">Contract Admin Price (Low-High)</option>
                <option value="Contract_Admin_Price DESC">Contract Admin Price (High-Low)</option>
                <option value="Sub_Consultant_Price">Sub Consultant Price (Low-High)</option>
                <option value="Sub_Consultant_Price DESC">Sub Consultant Price (High-Low)</option>
                <option value="Total_Bid">Total Bid (Low-High)</option>
                <option value="Total_Bid DESC">Total Bid (High-Low)</option>
                <option value="Bidder_Price">Bidder Price (Low-High)</option>
                <option value="Bidder_Price DESC">Bidder Price (High-Low)</option>
                <option value="Winning_Price">Winning Price (Low-High)</option>
                <option value="Winning_Price DESC">Winning Price (High-Low)</option>
              </Form.Select>
              &nbsp;&nbsp;
              <Button onClick={filterData}>Sort</Button>
            </div>

            <br />
            <div>
              <table className="table">
                <thead>
                  <tr className="heading">
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Department</th>
                    <th scope="col">Project Category</th>
                    <th scope="col">Project Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Question Deadline</th>
                    <th scope="col">Closing Deadline</th>
                    <th scope="col">Result Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Project Manager</th>
                    <th scope="col">Team</th>
                    <th scope="col">Design Price</th>
                    <th scope="col">Provisional Items</th>
                    <th scope="col">Contract Admin Price</th>
                    <th scope="col">Sub Consultant Price</th>
                    <th scope="col">Total Bid</th>
                    <th scope="col">Plan Takers</th>
                    <th scope="col">Bidders</th>
                    <th scope="col">Bidder Price</th>
                    <th scope="col">Winning Price</th>
                    <th scope="col">Winning Bidder</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  {proposals.map((row) => {
                    return (
                      <tr>
                        <td>
                          <svg width="40" height="40" viewBox="30 0 220 220">
                            <image
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleUpdate(row);
                              }}
                              href="data:image/png;base64,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"
                            />
                          </svg>
                        </td>
                        <td>
                          <svg width="40" height="40" viewBox="80 80 250 250">
                            <image
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                handleDelete(row.Proposal_ID);
                              }}
                              href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                            />
                          </svg>
                        </td>
                        <td>{row.Department}</td>
                        <td>{row.Project_Category}</td>
                        <td>{row.Project_Name}</td>
                        <td>{row.City}</td>
                        <td>
                          {row.Question_Deadline
                            ? row.Question_Deadline.substring(0, 10)
                            : ""}
                        </td>
                        <td>
                          {row.Closing_Deadline
                            ? row.Closing_Deadline.substring(0, 10)
                            : ""}
                        </td>
                        <td>
                          {row.Result_Date
                            ? row.Result_Date.substring(0, 10)
                            : ""}
                        </td>
                        <td>{row.Status}</td>
                        <td>{row.Manager_Name}</td>
                        <td>{row.Team}</td>
                        <td>{row.Design_Price}</td>
                        <td>{row.Provisional_Items}</td>
                        <td>{row.Contract_Admin_Price}</td>
                        <td>{row.Sub_Consultant_Price}</td>
                        <td>{row.Total_Bid}</td>
                        <td>{row.Plan_Takers}</td>
                        <td>{row.Bidders}</td>
                        <td>{row.Bidder_Price}</td>
                        <td>{row.Winning_Price}</td>
                        <td>{row.Name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div
              className="row justify-content-evenly"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              <div style={{ textAlign: "center" }} className="col-1">
                {currPage === 1 ? (
                  <Button
                    style={{ backgroundColor: "rgba(53,187,187,1)" }}
                    disabled
                  >
                    &lt;
                  </Button>
                ) : (
                  <Button
                    style={{ backgroundColor: "rgba(53,187,187,1)" }}
                    onClick={handlePagePre}
                  >
                    &lt;
                  </Button>
                )}
              </div>
              <div style={{ textAlign: "center" }} className="col-1">
                Page {currPage}/{pages}
              </div>
              <div style={{ textAlign: "center" }} className="col-1">
                {currPage === pages ? (
                  <Button
                    style={{ backgroundColor: "rgba(53,187,187,1)" }}
                    disabled
                  >
                    &gt;
                  </Button>
                ) : (
                  <Button
                    style={{ backgroundColor: "rgba(53,187,187,1)" }}
                    onClick={handlePage}
                  >
                    &gt;
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Add Form Modal */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Proposal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <ProposalForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Proposal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateProposal
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
                <b>Delete the selected Proposal!!</b>
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

export default ProposalsUpdate;
