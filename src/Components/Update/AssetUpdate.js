import { React, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { HOST, GET_ASSETS, GET_SOFTWARES } from "../Constants/Constants";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-bootstrap/Modal";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

function AssetUpdate() {
  const navigate = useNavigate();

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
  }, []);
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
                  onClick={(e) => {
                    navigate("/assetform");
                  }}
                  style={{ marginLeft: "45vw", marginBottom: "4vh" }}
                >
                  Add a New Asset
                </Button>
                <div className="container-fluid">
                  <table className="table">
                    <thead>
                      <tr className="heading">
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
                                <td>{row.Asset_Category}</td>
                                <td>{row.Hardware_Details}</td>
                                <td>{row.Purchase_Price}</td>
                                <td>{row.Aquired_Date}</td>
                                <td>{row.Shipped_On}</td>
                                <td>{row.Retired_Date}</td>
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
                  onClick={(e) => {
                    navigate("/addsoftware");
                  }}
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
                        <th scope="col">Company</th>
                        <th scope="col">Version</th>
                        <th scope="col">Manufacturer</th>
                        <th scope="col">Used By</th>
                        <th scope="col">Attachments</th>
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
                                <td>{row.Company}</td>
                                <td>{row.Version}</td>
                                <td>{row.Manufacturer}</td>
                                <td>{row.Used_By}</td>
                                <td>{row.Attachments}</td>
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
                                <td>{row.Company}</td>
                                <td>{row.Version}</td>
                                <td>{row.Manufacturer}</td>
                                <td>{row.Used_By}</td>
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
        </TabContext>
      </Box>
    </div>
  );
}

export default AssetUpdate;
