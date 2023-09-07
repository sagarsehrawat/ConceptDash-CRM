import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Table.css";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import {
  HOST,
  GET_TIMESHEET,
  GET_EMPLOYEENAMES,
  GET_DEPARTMENTS,
  GET_PAGE_EMPLOYEES,
  GET_JOB_TITLES,
} from "../Constants/Constants";
import Box from "@mui/material/Box";
import Select from "react-select";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import UpdateEmployeeForm from "../Form/UpdateEmployeeForm";
import EmployeeForm from "../Form/EmployeeForm";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import AuthContext from '../../Context/AuthContext'

function EmployeeUpdate() {
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

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedevent, setSelectedevent] = useState(false);

  const handleEventClick = (info) => {
    setSelectedevent(true);
    setSelectedEvent(info.event);
  };

  const [employee, setemployee] = useState([]);
  const [departments, setdepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  const [jobTitles, setjobTitles] = useState([]);
  const [sort, setsort] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_EMPLOYEES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            filter: JSON.stringify(returnData),
            sort: sort,
          },
        })
        .then((res) => {
          setemployee(res.data.res);
          setdataSource(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdepartments(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_JOB_TITLES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setjobTitles(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    };
    call();
  }, [apiCall]);
  const handleFilter = async () => {
    setIsLoading(true);
    await axios
      .get(HOST + GET_PAGE_EMPLOYEES, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          filter: JSON.stringify(returnData),
          sort: sort,
        },
      })
      .then((res) => {
        setemployee(res.data.res);
        setdataSource(res.data.res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [timesheet, settimesheet] = useState([]);
  const [selected, setselected] = useState(false);
  const handleChange1 = async (e) => {
    setselected(true);
    setIsLoading(true);
    await axios
      .get(HOST + GET_TIMESHEET, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          id: e.target.value,
        },
      })
      .then(async (res) => {
        settimesheet(formatEvents(res.data.res));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let d = new Date();
  var offset = d.getTimezoneOffset();
  var hours = Math.floor(Math.abs(offset) / 60);
  var minutes = Math.abs(offset) % 60;
  if (minutes === 0) {
    minutes = "00";
  }
  var sign = offset > 0 ? "-" : "+";
  let offset1 = `${sign}0${hours}:${minutes}`;
  const formatEvents = (list) => {
    let arr = [];
    list.map((item) => {
      let value1 = new Date(item.Date);
      console.log(value1);
      let startMonth, startDay;
      if (value1.getMonth() + 1 < 10) {
        startMonth = `0${value1.getMonth() + 1}`;
      } else {
        startMonth = value1.getMonth() + 1;
      }
      if (value1.getDate() < 10) {
        startDay = `0${value1.getDate()}`;
      } else {
        startDay = value1.getDate();
      }
      let entryDate = `${value1.getFullYear()}-${startMonth}-${startDay}T`;
      console.log(item.Comments);
      arr.push({
        title: `${item.Work}:${item.Comments}`,
        start: `${entryDate.substring(0, 11)}${item.Start_Time.substring(
          0,
          5
        )}${offset1}`,
        end: `${entryDate.substring(0, 11)}${item.End_Time.substring(
          0,
          5
        )}${offset1}`,
      });
    });

    return arr;
  };
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(HOST + GET_EMPLOYEENAMES, {
        headers: { auth: "Rose " + localStorage.getItem("auth") },
      });
      setemployeess(res.data.res);
    };
    call();
  }, []);
  const [employeess, setemployeess] = useState([]);
  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const [value, setValue] = useState("");
  const [tableFilter, settableFilter] = useState([]);
  const filterData = (e) => {
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
  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e) => {
    setrowData(e);
    handleShowUpdate();
  };
  let filterDept = [];
  let filterTitles = [];
  departments.map((e) => {
    filterDept.push({
      label: e.Department,
      value: e.Department_ID,
    });
  });
  jobTitles.map((e) => {
    filterTitles.push({
      label: e.Title,
      value: e.Title,
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
  const [time, settime] = useState("");
  let returnData = {
    dept: DisplayValue,
    title: DisplayValue1,
  };
  let deptvalue = [];
  returnData["dept"] &&
    returnData["dept"].map((e) => {
      deptvalue.push({
        label: e,
        value: e,
      });
    });
    let titleValue = [];
  returnData["title"] &&
    returnData["title"].map((e) => {
      titleValue.push({
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
            EMPLOYEE
            <Button
              onClick={handleShow}
              style={{ float: "right", backgroundColor: "rgba(38,141,141,1)" }}
              disabled={!privileges.includes("Add Employee")}
            >
              Add Employee +
            </Button>
          </h1>
          <div style={{ float: "right", marginBottom: "1rem" }}>
            <input
              style={{ marginRight: ".5rem" }}
              type="text"
              value={value}
              onChange={filterData}
              placeholder="Search"
            />
          </div>
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Select
              placeholder="Select department(s)"
              defaultValue={deptvalue}
              onChange={doChange}
              isMulti
              options={filterDept}
            >
            </Select>
            &nbsp;&nbsp;
            <Select
              placeholder="Select Job Title(s)"
              defaultValue={titleValue}
              onChange={doChange1}
              isMulti
              options={filterTitles}
            >
            </Select>
            &nbsp;&nbsp;
            {deptvalue.length == 0 && titleValue.length == 0 ? (
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
          <div style={{ display: "flex", flexDirection: "row", width: '52.5rem' }}>
              <Form.Select
                onChange={handleSort}
              >
                <option value="Joining_Date">Joining Date(Oldest First)</option>
                <option value="Joining_Date DESC">Joining Date(Newest First)</option>
              </Form.Select>
              &nbsp;&nbsp;
              <Button onClick={handleFilter}>Sort</Button>
            </div>
            <br />
          <Box
            sx={{ width: "100%", typography: "body1" }}
            style={{ margin: "0" }}
          >
            <TabContext value={value1}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList centered onChange={handleChange} aria-label="">
                  <Tab label="Employees" value="1" />
                  <Tab label="Personal Details" value="2" />
                  <Tab label="Employee Skills" value="3" />
                  <Tab label="Personal Traits" value="5" />
                  <Tab label="TimeSheet" value="4" />
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
                        {privileges.includes('Update Employee')?<th scope="col">Edit</th>:<></>}
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Department</th>
                          <th scope="col">Email Work</th>
                          <th scope="col">Email Personal</th>
                          <th scope="col">Job Title</th>
                          <th scope="col">Joining Date</th>
                          <th scope="col">Business Phone</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Address</th>
                          <th scope="col">City</th>
                          <th scope="col">ZIP</th>
                          <th scope="col">Notes</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {value.length > 0
                          ? tableFilter.map((row) => {
                              return (
                                <tr>
                                  {privileges.includes('Update Employee')?<td>
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
                                  <td>{row.First_Name}</td>
                                  <td>{row.Last_Name}</td>
                                  <td>{row.Dept}</td>
                                  <td>{row.Email_Work}</td>
                                  <td>{row.Email_Personal}</td>
                                  <td>{row.Title ? row.Title : ""}</td>
                                  <td>
                                    {row.Joining_Date
                                      ? row.Joining_Date.substring(0, 10)
                                      : ""}
                                  </td>
                                  <td>{row.Business_Phone}</td>
                                  <td>{row.Mobile_Phone}</td>
                                  <td>{row.Address}</td>
                                  <td>{row.City}</td>
                                  <td>{row.ZIP}</td>
                                  <td>{row.Notes}</td>
                                </tr>
                              );
                            })
                          : employee.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    <svg
                                      width="40"
                                      height="40"
                                      viewBox="50 0 110 220"
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
                                  <td>{row.First_Name}</td>
                                  <td>{row.Last_Name}</td>
                                  <td>{row.Dept}</td>
                                  <td>{row.Email_Work}</td>
                                  <td>{row.Email_Personal}</td>
                                  <td>{row.Title ? row.Title : ""}</td>
                                  <td>
                                    {row.Joining_Date
                                      ? row.Joining_Date.substring(0, 10)
                                      : ""}
                                  </td>
                                  <td>{row.Business_Phone}</td>
                                  <td>{row.Mobile_Phone}</td>
                                  <td>{row.Address}</td>
                                  <td>{row.City}</td>
                                  <td>{row.ZIP}</td>
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
                          <th scope="col">Employee</th>
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
                        {value.length > 0
                          ? tableFilter.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
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
                            })
                          : employee.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
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
              <TabPanel centered value="3">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="div1">
                    <table className="table">
                      <thead>
                        <tr className="heading">
                          <th scope="col">Employee</th>
                          <th scope="col">Proficiency</th>
                          <th scope="col">Expertise</th>
                          <th scope="col">Interests</th>
                          <th scope="col">Cocurricular</th>
                          <th scope="col">Trainings</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {value.length > 0
                          ? tableFilter.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
                                  <td>{row.Proficiency}</td>
                                  <td>{row.Expertise}</td>
                                  <td>{row.Interests}</td>
                                  <td>{row.Cocurricular}</td>
                                  <td>{row.Trainings}</td>
                                </tr>
                              );
                            })
                          : employee.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
                                  <td>{row.Proficiency}</td>
                                  <td>{row.Expertise}</td>
                                  <td>{row.Interests}</td>
                                  <td>{row.Cocurricular}</td>
                                  <td>{row.Trainings}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabPanel>
              <TabPanel centered value="5">
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div className="div1">
                    <table className="table">
                      <thead>
                        <tr className="heading">
                          <th scope="col">Employee</th>
                          <th scope="col">Strengths</th>
                          <th scope="col">Weakness</th>
                          <th scope="col">Social Active Index</th>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {value.length > 0
                          ? tableFilter.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
                                  <td>{row.Strengths}</td>
                                  <td>{row.Weakness}</td>
                                  <td>{row.Social_Active_Index}</td>
                                </tr>
                              );
                            })
                          : employee.map((row) => {
                              return (
                                <tr>
                                  <td>
                                    {row.First_Name + " " + row.Last_Name}
                                  </td>
                                  <td>{row.Strengths}</td>
                                  <td>{row.Weakness}</td>
                                  <td>{row.Social_Active_Index}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabPanel>
              <TabPanel centered value="4">
                <h1 style={{ textAlign: "center" }}>Select Employee</h1>
                <Form.Select
                  style={{ marginBottom: "4vh" }}
                  onChange={handleChange1}
                >
                  {employeess.length !== 0 ? (
                    employeess.map((options) => (
                      <option
                        value={options.Employee_ID}
                        key={options.Employee_ID}
                      >
                        {options.Full_Name}
                      </option>
                    ))
                  ) : (
                    <option value="">None</option>
                  )}
                </Form.Select>
                {isLoading ? (
                  <LoadingSpinner />
                ) : (
                  <div>
                    {selected ? (
                      <div
                        className="container"
                        style={{
                          padding: "1rem",
                          marginTop: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {selectedEvent && selectedevent && (
                          <div
                            style={{
                              textAlign: "center",
                              border: "2px solid black",
                              marginLeft: "40%",
                              paddingBottom: ".5rem",
                              width: "20rem",
                            }}
                          >
                            <p>
                              <b>{selectedEvent.title}</b>
                            </p>
                            <p>
                              Start Time:{" "}
                              {selectedEvent.start
                                ? selectedEvent.start.toLocaleString()
                                : ""}
                            </p>
                            <p>
                              End Time:{" "}
                              {selectedEvent.end
                                ? selectedEvent.end.toLocaleString()
                                : ""}
                            </p>
                            <Button onClick={() => setSelectedevent(false)}>
                              Close
                            </Button>
                          </div>
                        )}
                        <div style={{ width: "80rem" }}>
                          <FullCalendar
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridWeek"
                            events={timesheet}
                            headerToolbar={{
                              left: "title",
                            }}
                            eventClick={handleEventClick}
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <EmployeeForm
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
            <Modal.Title>Update Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateEmployeeForm
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

export default EmployeeUpdate;
