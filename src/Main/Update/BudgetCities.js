import { React, useEffect, useState } from "react";
import axios from "axios";
import { GET_BUDGET_CITY, HOST } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import BudgetsForm from "../Form/BudgetsForm";
import BudgetUpdate from "./BudgetUpdate";
import "./Table.css";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UpdateCityBudget from "../Form/UpdateCityBudget";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const BudgetCities = (props) => {
  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const { setnav, setcity } = props;
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [cities, setcities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [tableFilter, settableFilter] = useState([]);
  const [dataSource, setdataSource] = useState([]);
  const searchData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTable = dataSource.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      settableFilter([...filterTable]);
    } else {
      setValue(e.target.value);
      setdataSource([...dataSource]);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_BUDGET_CITY, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
            console.log(res.data.res)
          setcities(res.data.res);
          setdataSource(res.data.res);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, [apiCall]);
  const filterData = async () => {
    setIsLoading(true);
    // await axios
    //     .get(HOST + GET_PAGE_BUDGETS, {
    //         headers: {
    //             auth: "Rose " + localStorage.getItem("auth"),
    //             limit: limit,
    //             offset: 0,
    //             search: value,
    //             filter: JSON.stringify(returnData),
    //             sort: sort,
    //         },
    //     })
    //     .then((res) => {
    //         setbudgets(res.data.res);
    //         setpages(res.data.totalPages)
    //         setIsLoading(false);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
  };
  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e) => {
    setrowData(e);
    handleShowUpdate();
  };

  const inputData = (e) => {
    setValue(e.target.value);
  };

  // const [budgetid, setbudgetid] = useState(0);
  // const handleDelete = (e) => {
  //     setbudgetid(e);
  //     handleShowDelete();
  // };
  // const handleDeleteBudget = (e) => {
  //     setIsLoading(true);
  //     e.preventDefault();
  //     setIsLoading(true)
  // axios
  //     .post(
  //         HOST + DELETE_BUDGET,
  //         {
  //             id: budgetid,
  //         },
  //         { headers: { auth: "Rose " + localStorage.getItem("auth") } }
  //     )
  //     .then((res) => {
  //         console.log(res.data);
  //         if (res.data.success) {
  //             handleCloseDelete();
  //             setCall(apiCall + 1);
  //         }
  //     })
  //     .catch((err) => {
  //         console.log(err);
  //     });
  // };
  const addComma = (num) => {
    if (num === null || num === "") return "";
    return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div>
        <div className="container-fluid">
          <br/>
          <Box
            sx={{ width: "100%", typography: "body1" }}
            style={{ margin: "0" }}
          >
            <TabContext value={value1}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList centered onChange={handleChange} aria-label="">
                  <Tab label="Cities" value="1" />
                  <Tab label="Budgets" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1" style={{ margin: "0" }}>
              <h1
            style={{
              textAlign: "center",
              marginTop: "3rem",
              marginBottom: "1rem",
              fontFamily: "roboto",
              fontWeight: "bold",
            }}
          >
            Cities
            {/* <Button
              onClick={handleShow}
              style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
              }}
            >
              Add City +
            </Button> */}
          </h1>
          <div style={{ float: "right", marginBottom: "1rem" }}>
            <input
              style={{ marginRight: ".5rem" }}
              type="text"
              value={value}
              onChange={searchData}
              placeholder="Search"
            />
            {/* <Button
                            style={{ backgroundColor: "rgba(38,141,141,1)" }}
                            size="sm"
                            onClick={filterData}
                        >
                            Search
                        </Button> */}
          </div>
          <br />
          <div className="container-fluid">
            <table className="table">
              <thead>
                <tr className="heading">
                  <th scope="col">Edit</th>
                  <th scope="col">City</th>
                  <th scope="col">Population</th>
                  <th scope="col">Budget</th>
                  <th scope="col">2022 Budget</th>
                  <th scope="col">2023 Budget</th>
                  <th scope="col">Remarks</th>
                  <th scope="col">Goto</th>
                </tr>
              </thead>
              {isLoading ? (
                <div style={{ display: "table-caption" }}>
                  <LoadingSpinner />
                </div>
              ) : (
                <tbody class="table-group-divider">
                  {value.length > 0
                    ? tableFilter.map((row) => {
                        return (
                          <tr>
                            <td>
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
                            </td>
                            <td>{row.City}</td>
                            <td>{row.Population_2021}</td>
                            <td>{addComma(row.Capital_Budget_23)}</td>
                            <td
                              style={{
                                backgroundColor:
                                  row.Year_22 === "Done"
                                    ? "green"
                                    : row.Year_22 === "Not Found"
                                    ? "red"
                                    : "yellow",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor:
                                  row.Year_23 === "Done"
                                    ? "green"
                                    : row.Year_23 === "Not Found"
                                    ? "red"
                                    : "yellow",
                              }}
                            ></td>
                            <td style={{width: "30rem"}}>{row.Remarks}</td>
                            <td
                            align="center"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                setcity({
                                  City_ID: row.City_ID,
                                  City: row.City,
                                });
                                setnav(13);
                              }}
                            >
                              <FontAwesomeIcon icon={faArrowRight} />
                            </td>
                          </tr>
                        );
                      })
                    : cities && cities.map((row) => {
                        return (
                            <tr>
                            <td>
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
                            </td>
                            <td>{row.City}</td>
                            <td>{row.Population_2021}</td>
                            <td>{addComma(row.Capital_Budget_23)}</td>
                            <td
                              style={{
                                backgroundColor:
                                  row.Year_22 === "Done"
                                    ? "green"
                                    : row.Year_22 === "Not Found"
                                    ? "red"
                                    : "yellow",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor:
                                  row.Year_23 === "Done"
                                    ? "green"
                                    : row.Year_23 === "Not Found"
                                    ? "red"
                                    : "yellow",
                              }}
                            ></td>
                            <td style={{width: "30rem"}}>{row.Remarks}</td>
                            <td
                            align="center"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                setcity({
                                  City_ID: row.City_ID,
                                  City: row.City,
                                });
                                setnav(13);
                              }}
                            >
                              <FontAwesomeIcon icon={faArrowRight} />
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              )}
            </table>
          </div>
          </TabPanel>
          <TabPanel value="2" style={{ margin: "0" }}>
            {<BudgetUpdate />}
          </TabPanel>
          </TabContext>
          </Box>
        </div>
      </div>
      <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Budget City</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateCityBudget
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
    </>
  );
};

export default BudgetCities;
