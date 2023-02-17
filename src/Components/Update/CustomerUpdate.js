import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  HOST,
  GET_PAGE_CUSTOMERS,
  GET_CITIES,
  GET_COMPANY_NAMES,
  DELETE_CONTACT,
} from "../Constants/Constants";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CustomerForm from "../Form/CustomerForm";
import UpdateCustomer from "../Form/UpdateCustomer";
import "./Table.css";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import AuthContext from '../../Context/AuthContext'

function CustomerUpdate(props) {
  const { privileges, setPrivileges } = useContext(AuthContext)
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [customers, setcustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let d = 0;
  let limit = 50;
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [sort, setsort] = useState("ID DESC");
  const [value, setValue] = useState("");
  const [cities, setcities] = useState([]);
  const [companies, setcompanies] = useState([]);
  useEffect(() => {
    const call = async () => {
      setIsLoading(true);
      setcurrPage(1);
      await axios
        .get(HOST + GET_PAGE_CUSTOMERS, {
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
          setcustomers(res.data.res);
          setpages(res.data.totalPages);
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
        .get(HOST + GET_COMPANY_NAMES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setcompanies(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    call();
  }, [apiCall]);
  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const handlePage = async () => {
    setIsLoading(true);
    let current = currPage;
    setcurrPage(current + 1);
    await axios
      .get(HOST + GET_PAGE_CUSTOMERS, {
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
        setcustomers(res.data.res);
        setpages(res.data.totalPages);
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
      .get(HOST + GET_PAGE_CUSTOMERS, {
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
        setcustomers(res.data.res);
        setpages(res.data.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterData = async () => {
    setIsLoading(true);
    setcurrPage(1);
    await axios
      .get(HOST + GET_PAGE_CUSTOMERS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: limit,
          offset: 0,
          search: value,
          filter: JSON.stringify(returnData),
          sort: sort,
        },
      })
      .then((res) => {
        setcustomers(res.data.res);
        setpages(res.data.totalPages);
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
  const inputData = (e) => {
    setValue(e.target.value);
  };
  let filterCities = [];
  let filterCompanies = [];
  cities.map((e) => {
    filterCities.push({
      label: e.City,
      value: e.City_ID,
    });
  });
  companies.map((e) => {
    filterCompanies.push({
      label: e.Name,
      value: e.ID,
    });
  });
  let [DisplayValue, getValue] = useState([]);
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let [DisplayValue1, getValue1] = useState([]);
  let doChange1 = (e) => {
    getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let returnData = {
    city: DisplayValue,
    company: DisplayValue1,
  };
  let cityvalue = [];
  returnData["city"] &&
    returnData["city"].map((e) => {
      cityvalue.push({
        label: e,
        value: e,
      });
    });
  let companyvalue = [];
  returnData["company"] &&
    returnData["company"].map((e) => {
      companyvalue.push({
        label: e,
        value: e,
      });
    });
  const handleSort = (e) => {
    setsort(e.target.value);
  };
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const [customerid, setcustomerid] = useState(0);
  const handleDelete = (e) => {
    console.log(e)
    setcustomerid(e);
    handleShowDelete();
  };
  const handleDeleteCustomer = (e) => {
    setIsLoading(true);
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(
        HOST + DELETE_CONTACT,
        {
          id: customerid,
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
            Customers
            <Button
              onClick={handleShow}
              style={{ float: "right", backgroundColor: "rgba(38,141,141,1)" }}
              disabled={!privileges.includes("Add Contact")}
            >
              Add Customer +
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              placeholder="Select City(s)"
              defaultValue={cityvalue}
              onChange={doChange}
              isMulti
              options={filterCities}
            ></Select>
            &nbsp;&nbsp;
            <Select
              placeholder="Select Company(s)"
              defaultValue={companyvalue}
              onChange={doChange1}
              isMulti
              options={filterCompanies}
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
          <div
            style={{ display: "flex", flexDirection: "row", width: "52.5rem" }}
          >
            <Form.Select onChange={handleSort} defaultValue={sort}>
              <option value="ID DESC">Latest to Oldest</option>
              <option value="ID">Oldest to Latest</option>
              <option value="companies.Name">Company Name (A-Z)</option>
              <option value="companies.Name DESC">Company Name (Z-A)</option>
              <option value="First_Name">First Name (A-Z)</option>
              <option value="First_Name DESC">Last Name (Z-A)</option>
            </Form.Select>
            &nbsp;&nbsp;
            <Button onClick={filterData}>Sort</Button>
          </div>

          <br />
          <Box
            sx={{ width: "100%", typography: "body1" }}
            style={{ margin: "0" }}
          >
            <TabContext value={value1}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList centered onChange={handleChange} aria-label="">
                  <Tab label="Customers" value="1" />
                  <Tab label="Personal Details" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ margin: "0" }}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="div1" style={{ overflowX: "auto" }}>
                    <table className="table">
                      <thead>
                        <tr className="heading">
                        {privileges.includes('Edit Contact')?<th scope="col">Edit</th>:<></>}
                  {privileges.includes('Delete Contact')?<th scope="col">Delete</th>:<></>}
                          <td scope="col">Company</td>
                          <td scope="col">Salutation</td>
                          <td scope="col">First Name</td>
                          <td scope="col">Last Name</td>
                          <td scope="col">Email Personal</td>
                          <td scope="col">Email Work</td>
                          <td scope="col">Job Title</td>
                          <td scope="col">Business Phone</td>
                          <td scope="col">Mobile</td>
                          <td scope="col">Address</td>
                          <td scope="col">City</td>
                          <td scope="col">Notes</td>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {customers.map((row) => {
                          return (
                            <tr>
                              {privileges.includes('Edit Contact')?<td>
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="30 0 220 220"
                                >
                                  <image
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleUpdate(row);
                                    }}
                                    href="data:image/png;base64,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"
                                  />
                                </svg>
                              </td>:<></>}
                              {privileges.includes('Delete Cotact')?<td>
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="80 80 250 250"
                                >
                                  <image
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                      handleDelete(row.ID);
                                    }}
                                    href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                  />
                                </svg>
                              </td>:<></>}
                              <td>{row.Company_Name}</td>
                              <td>{row.Salutation}</td>
                              <td>{row.First_Name}</td>
                              <td>{row.Last_Name}</td>
                              <td>{row.Email_Personal}</td>
                              <td>{row.Email_Work}</td>
                              <td>{row.Job_Title}</td>
                              <td>{row.Business_Phone}</td>
                              <td>{row.Mobile_Phone_Personal}</td>
                              <td>{row.Address}</td>
                              <td>{row.City}</td>
                              <td>{row.Notes}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabPanel>
              <TabPanel centered value="2">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="div1">
                    <table className="table">
                      <thead>
                        <tr className="heading">
                          <th scope="col">Customer</th>
                          <th scope="col">Birthday</th>
                          <th scope="col">Anniversary</th>
                          <th scope="col">Sports</th>
                          <th scope="col">Activities</th>
                          <th scope="col">Beverage</th>
                          <th scope="col">Alcohol</th>
                          <th scope="col">Travel Destination</th>
                          <th scope="col">Spouse</th>
                          <th scope="col">Children</th>
                          <th scope="col">TV Show</th>
                          <th scope="col">Movies</th>
                          <th scope="col">Actor</th>
                          <th scope="col">Dislikes</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {customers.map((row) => {
                          return (
                            <tr>
                              <td>{row.First_Name + " " + row.Last_Name}</td>
                              <td>
                                {row.Birthday
                                  ? row.Birthday.substring(0, 10)
                                  : ""}
                              </td>
                              <td>
                                {row.Anniversary
                                  ? row.Anniversary.substring(0, 10)
                                  : ""}
                              </td>
                              <td>{row.Sports}</td>
                              <td>{row.Activities}</td>
                              <td>{row.Beverage}</td>
                              <td>{row.Alcohol}</td>
                              <td>{row.Travel_Destination}</td>
                              <td>{row.Spouse_Name}</td>
                              <td>{row.Children}</td>
                              <td>{row.TV_Show}</td>
                              <td>{row.Movies}</td>
                              <td>{row.Actor}</td>
                              <td>{row.Dislikes}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabPanel>
            </TabContext>
          </Box>
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
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <CustomerForm
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
            <Modal.Title>Update Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateCustomer
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
                <b>Delete the selected Contact!!</b>
              </p>
              <div style={{ display: "inline-block" }}>
                <Button variant="danger" onClick={handleCloseDelete}>
                  Cancel
                </Button>
              </div>
              <div style={{ display: "inline-block", float: "right" }}>
                <Button variant="success" onClick={handleDeleteCustomer}>
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

export default CustomerUpdate;
