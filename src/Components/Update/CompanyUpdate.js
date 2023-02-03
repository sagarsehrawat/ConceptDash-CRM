import { React, useEffect, useState } from "react";
import axios from "axios";
import {
  HOST,
  GET_PAGES_COMPANIES,
  GET_PAGE_COMPANIES,
  SEARCH_COMPANIES,
  GET_CITIES,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CompanyForm from "../Form/CompanyForm";
import UpdateCompany from "../Form/UpdateCompany";
import "./Table.css";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import Select from "react-select";
import Form from "react-bootstrap/Form";

function CompanyUpdate() {
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [companies, setcompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let d = 0;
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [cities, setcities] = useState([]);
  const [sort, setsort] = useState("");
  const [value, setValue] = useState("");
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_COMPANIES, {
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
          setcompanies(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_PAGES_COMPANIES, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), limit: 50 },
        })
        .then((res) => {
          setpages(res.data.res);
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
      setIsLoading(false);
    };
    call();
  }, [apiCall]);
  const handlePage = async () => {
    setIsLoading(true);
    let current = currPage;
    setcurrPage(current + 1);
    await axios
      .get(HOST + GET_PAGE_COMPANIES, {
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
        setcompanies(res.data.res);
        // setdataSource(res.data.res);
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
      .get(HOST + GET_PAGE_COMPANIES, {
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
        setcompanies(res.data.res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const filterData = async () => {
    setIsLoading(true);
    await axios
      .get(HOST + GET_PAGE_COMPANIES, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: 50,
          offset: 0,
          search: value,
          filter: JSON.stringify(returnData),
          sort: sort,
        },
      })
      .then((res) => {
        setcompanies(res.data.res);
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
  cities.map((e) => {
    filterCities.push({
      label: e.City,
      value: e.City,
    });
  });
  let [DisplayValue, getValue] = useState([]);
  let doChange = (e) => {
    getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  let returnData = {
    city: DisplayValue,
  };
  let cityvalue = [];
  returnData["city"] &&
    returnData["city"].map((e) => {
      cityvalue.push({
        label: e,
        value: e,
      });
    });

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
                // margin: "auto",
                textAlign: "center",
                marginTop: "3rem",
                marginBottom: "1rem",
                fontFamily: "roboto",
                fontWeight: "bold",
              }}
            >
              Companies
              <Button
                onClick={handleShow}
                style={{
                  float: "right",
                  backgroundColor: "rgba(38,141,141,1)",
                }}
              >
                Add Company +
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
            <br/>
            <div style={{ display: "flex", flexDirection: "row" }}>
             
              <Select
                placeholder="Select City(s)"
                defaultValue={cityvalue}
                onChange={doChange}
                isMulti
                options={filterCities}
              ></Select>
              &nbsp;&nbsp;
              
              {
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
            <br/>
            <div style={{ display: "flex", flexDirection: "row", width: '52.5rem' }}>
              <Form.Select
                onChange={handleSort}
              >
                <option value="Name">Company Name (A-Z)</option>
                <option value="Name DESC">Company Name (Z-A)</option>
              </Form.Select>
              &nbsp;&nbsp;
              <Button onClick={filterData}>Sort</Button>
            </div>

            <br />
            <div className="conatiner">
              <table className="table">
                <thead>
                  <tr className="heading">
                    <th>Edit</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Business Phone</th>
                    <th scope="col">Email</th>
                    <th scope="col">Web Page</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">
                  {companies.map((row) => {
                    return (
                      <tr
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <td align="right">
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
                        <td>{row.Name}</td>
                        <td>{row.Category}</td>
                        <td>{row.Address}</td>
                        <td>{row.City}</td>
                        <td>{row.Business_Phone}</td>
                        <td>{row.Email}</td>
                        <td>{row.Web_Page}</td>
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
            <Modal.Title>Add Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <CompanyForm
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
            <Modal.Title>Update Company</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateCompany
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
      </div>
    </>
  );
}

export default CompanyUpdate;
