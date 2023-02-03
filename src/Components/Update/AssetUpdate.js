import { React, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import { HOST, GET_ASSETS, GET_SOFTWARES } from "../Constants/Constants";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-bootstrap/Modal";
import AssetForm from '../Form/AssetForm'
import SoftwareForm from '../Form/SoftwareForm'
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function AssetUpdate() {
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showsoft, setShowsoft] = useState(false);
  const handleClosesoft = () => setShowsoft(false);
  const handleShowsoft = () => setShowsoft(true);

  const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [assets, setassets] = useState([]);
  const [software, setsoftware] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setdataSource] = useState([]);
  const [dataSourceSoft, setdataSourceSoft] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const call = async () => {
      await axios
        .get(HOST + GET_ASSETS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setassets(res.data.res);
          setdataSource(res.data.res);
          console.log(res.data.res)
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_SOFTWARES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setsoftware(res.data.res);
          setdataSourceSoft(res.data.res);
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
  const [value, setValue] = useState("");
  const [tableFilter, settableFilter] = useState([]);
  const [tableFilterSoft, settableFilterSoft] = useState([]);
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
  const filterDataSoft = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filterTableSoft = dataSourceSoft.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      settableFilterSoft([...filterTableSoft]);
    } else {
      setValue(e.target.value);
      setdataSourceSoft([...dataSourceSoft]);
    }
  };
  return (
    <>
    {green===true ? <GreenAlert setGreen={setgreen}/> : <></>}
    {red===true ? <RedAlert setRed={setred}/> : <></>}
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value1}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList centered onChange={handleChange} aria-label="">
              <Tab label="Assets" value="1" />
              <Tab label="Softwares" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" style={{ margin: "0" }}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <input
                  style={{
                    marginLeft: "41vw",
                    marginBottom: "4vh",
                    width: "20vw",
                  }}
                  type="text"
                  value={value}
                  onChange={filterData}
                  placeholder="Search"
                />
                <br />
                <Button
                  onClick={handleShow}
                  style={{ marginLeft: "45vw", marginBottom: "4vh" }}
                >
                  Add a New Asset
                </Button>
                <div className="container-fluid">
                  <table className="table">
                    <thead>
                      <tr className="heading">
                        <th scope="col">Employee</th>
                        <th scope="col">Asset Category</th>
                        <th scope="col">Hardware Details</th>
                        <th scope="col">Purchase Price</th>
                        <th scope="col">Acquired On</th>
                        <th scope="col">Shipped On</th>
                        <th scope="col">Retired Date</th>
                        <th scope="col">Attachments</th>
                        <th scope="col">Notes</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {value.length > 0
                        ? tableFilter.map((row) => {
                            return(
                            <tr
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {/* <TableCell align="right">
                                  <Button
                                    onClick={(e) => {
                                      navigate("/updateProjectForm", {
                                        state: row,
                                      });
                                    }}
                                    style={{
                                      backgroundColor: "rgb(99, 138, 235)",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </TableCell> */}
                              <td>{row.Full_Name}</td>
                              <td>{row.Asset_Category}</td>
                              <td>{row.Hardware_Details}</td>
                              <td>{row.Purchase_Price}</td>
                              <td>{row.Aquired_Date}</td>
                              <td>{row.Shipped_On}</td>
                              <td>{row.Retired_Date}</td>
                              <td>{row.Attachments}</td>
                              <td>{row.Notes}</td>
                            </tr>);
                          })
                        : assets.map((row) => {
                            return (
                              <tr
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                {/* <TableCell align="right">
                                  <Button
                                    onClick={(e) => {
                                      navigate("/updateProjectForm", {
                                        state: row,
                                      });
                                    }}
                                    style={{
                                      backgroundColor: "rgb(99, 138, 235)",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </TableCell> */}
                                <td>{row.Full_Name}</td>
                                <td>{row.Asset_Category}</td>
                                <td>{row.Hardware_Details}</td>
                                <td>{row.Purchase_Price}</td>
                                <td>{row.Aquired_Date?row.Aquired_Date.substring(0, 10):''}</td>
                                <td>{row.Shipped_On?row.Shipped_On.substring(0, 10):''}</td>
                                <td>{row.Retired_Date?row.Retired_Date.substring(0, 10):''}</td>
                                <td>{row.Attachments}</td>
                                <td>{row.Notes}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value="3" style={{ margin: "0" }}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div>
                <input
                  style={{
                    marginLeft: "41vw",
                    marginBottom: "4vh",
                    width: "20vw",
                  }}
                  type="text"
                  value={value}
                  onChange={filterDataSoft}
                  placeholder="Search"
                />
                <br />
                <Button
                  onClick={handleShowsoft}
                  style={{ marginLeft: "45vw", marginBottom: "4vh" }}
                >
                  Add a New Software
                </Button>
                <div className="container-fluid">
                  <table className="table">
                    <thead>
                      <tr className="heading">
                        {/* <TableCell align="left">Edit</TableCell> */}
                        <th scope="col">Software</th>
                        <th scope="col">Price</th>
                        <th scope="col">Version</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Notes</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {value.length > 0
                        ? tableFilterSoft.map((row) => {
                            return (
                              <tr
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                {/* <TableCell align="left">
                                  <Button
                                    onClick={(e) => {
                                      navigate("/updateProjectForm", {
                                        state: row,
                                      });
                                    }}
                                    style={{
                                      backgroundColor: "rgb(99, 138, 235)",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </TableCell> */}
                                <td>{row.Software}</td>
                                <td>{row.Price}</td>
                                <td>{row.Version}</td>
                                <td>{row.Manufacturer}</td>
                                <td>{row.Notes}</td>
                              </tr>
                            );
                          })
                        : software.map((row) => {
                            return (
                              <tr
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                {/* <TableCell align="left">
                                  <Button
                                    onClick={(e) => {
                                      navigate("/updateProjectForm", {
                                        state: row,
                                      });
                                    }}
                                    style={{
                                      backgroundColor: "rgb(99, 138, 235)",
                                    }}
                                  >
                                    Edit
                                  </Button>
                                </TableCell> */}
                                <td>{row.Software}</td>
                                <td>{row.Price}</td>
                                <td>{row.Version}</td>
                                <td>{row.Manufacturer}</td>
                                <td>{row.Notes}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </TabPanel>
        </TabContext>
      </Box>
      {/* Add Form Modal */}
      <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Asset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <AssetForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        {/* Add Form Modal */}
      <Modal
          show={showsoft}
          onHide={handleClosesoft}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Software</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <SoftwareForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClosesoft}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        {/* Update Form Modal */}
        {/* <Modal
          show={showUpdate}
          onHide={handleCloseUpdate}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Update Budget</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <UpdateAsset
                row={rowData}
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleCloseUpdate}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal> */}
    </div></>
  );
}

export default AssetUpdate;
