import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  HOST,
  SEARCH_PROPOSALS,
  GET_PAGE_PROPOSALS,
  GET_PAGES_PROPOSALS,
  FILTER_PROPOSALS,
  GET_DEPARTMENTS,
  GET_PROJECT_CATEGORIES,
  GET_CITIES,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import ProposalForm from "../Form/ProposalForm";
import UpdateProposal from "../Form/UpdateProposal";
import Modal from "react-bootstrap/Modal";
import "./Table.css";
import Select from "react-select";

function ProposalsUpdate() {
  const [rowData, setrowData] = useState([]);

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
      setIsLoading(false);
    };
    call();
  }, []);
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
  const handleFilter = async () => {
    setIsLoading(true);
    await axios
      .get(HOST + FILTER_PROPOSALS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: 0,
          filter: JSON.stringify(returnData),
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
  const [value, setValue] = useState("");
  const filterData = async () => {
    setIsLoading(true);
    await axios
      .get(HOST + SEARCH_PROPOSALS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: 0,
          search: value,
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
  let returnData = {
    dept: DisplayValue,
    cat: DisplayValue1,
    city: DisplayValue2,
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
  return (
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
              style={{ float: "right", backgroundColor: "rgba(38,141,141,1)" }}
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
            {deptvalue.length == 0 && catvalue.length == 0 && cityvalue.length == 0 ? (
              <Button
                style={{ backgroundColor: "rgba(38,141,141,1)" }}
                disabled
                onClick={handleFilter}
              >
                Filter
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: "rgba(38,141,141,1)" }}
                onClick={handleFilter}
              >
                Filter
              </Button>
            )}
          </div>
          <br />
          <div>
            <table className="table">
              <thead>
                <tr className="heading">
                  <th scope="col">Edit</th>
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
        <Modal.Body>{<ProposalForm />}</Modal.Body>
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
        <Modal.Body>{<UpdateProposal row={rowData} />}</Modal.Body>
      </Modal>
    </div>
  );
}

export default ProposalsUpdate;
