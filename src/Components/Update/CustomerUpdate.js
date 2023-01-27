import { React, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  HOST,
  GET_ALL_USERS,
  GET_ALL_SHIPPERS,
  GET_ALL_SUPPLIERS,
  GET_PAGE_CUSTOMERS,
  GET_PAGES_CUSTOMERSS,
  SEARCH_CUSTOMERS,
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

function CustomerUpdate(props) {
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
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const category = props.category;
  useEffect(() => {
    const call = async () => {
      setIsLoading(true);

      await axios
        .get(HOST + GET_PAGE_CUSTOMERS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            limit: 10,
            offset: d,
          },
        })
        .then((res) => {
          setcustomers(res.data.res);
        })
        .catch((err) => {
          console.log(err);
        });
      await axios
        .get(HOST + GET_PAGES_CUSTOMERSS, {
          headers: { auth: "Rose " + localStorage.getItem("auth"), limit: 10 },
        })
        .then((res) => {
          setpages(res.data.res);
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
          limit: 10,
          offset: current * 10,
        },
      })
      .then((res) => {
        setcustomers(res.data.res);
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
          limit: 10,
          offset: (current - 2) * 10,
        },
      })
      .then((res) => {
        setcustomers(res.data.res);
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
      .get(HOST + SEARCH_CUSTOMERS, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          limit: 10,
          offset: 0,
          search: value,
        },
      })
      .then((res) => {
        setcustomers(res.data.res);
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
  return (
    <>
    {green===true ? <GreenAlert setGreen={setgreen}/> : <></>}
    {red===true ? <RedAlert setRed={setred}/> : <></>}
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
                          <td>Edit</td>
                          <td scope="col">Company</td>
                          <td scope="col">Salutation</td>
                          <td scope="col">First Name</td>
                          <td scope="col">Last Name</td>
                          <td scope="col">Email Personal</td>
                          <td scope="col">Email Work</td>
                          <td scope="col">Business Phone</td>
                          <td scope="col">Mobile</td>
                          <td scope="col">Address</td>
                          <td scope="col">City</td>
                          <td scope="col">ZIP</td>
                          <td scope="col">Notes</td>
                          <td scope="col">Attachments</td>
                        </tr>
                      </thead>
                      <tbody class="table-group-divider">
                        {customers.map((row) => {
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
                                    href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8wMDAAAAAqKiru7u6np6cYGBhERERjY2MTExMGBgbNzc0tLS0jIyOJiYlAQEDi4uIcHBwmJib4+PicnJxWVlaZmZmioqIPDw9cXFy3t7d9fX2Ojo5YWFhJSUmxsbHX19fy8vJsbGzT09M2NjZ1dXXBwcFOTk6wVzgvAAAFd0lEQVR4nO2c62KiMBBGgQgWGraAreK1tbX6/m+4EgISxVJCErLud37VsgXPBmYmYcBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwBCzyWTsr6CX5OR5i7G/hE4Skrmutxn7a+gjSYl7xvsz9hfRBRd03fBBFWtB1w0eUjEhteBjKia0FKSlYv5wilyQBC8kZZKPFlGTmAmmb3vH8XP6eBGVB5l0OSs+rUI6yomaPEvyi11zwadZ+XkVUPPh5nnphlLkpHPfSdYcwQLzirONR6grBX3p2jkPMvHb7PK7VWg49a9zOb3fGCbureBZ0WN/bSqi+p60YKchH8FUFHScd5OKE1qcoTSNZPCyH/fNg0z2ebNlxc6bg5Gk8c4uimyuIZbyPOiSp9ttq5RtMnEtPp0nbW70i6jfm0uxnbYoLkrF3NdwZJHp+SSlOw07bhbb6fJ2c2lIphoOLVIYtp1GQ6lq0Zi2KyZBaajjP1dEk2GVB5cfebvivBxDb6X80NfoMawqmXOaSLw2xUXI5lLeq+oj36LFUCi26w+Nf/BaVhme/jijx/Cq2OYxp1GaLgwK6jCs5oO1UVXaVIfxI4OCGgzrYrvxK9I8Uf1yBHMD12CBcsPWYjtJL+GGC4ZzhQf9CdWGd4rtS0Tlp2hkSlC14c01WG/wyqE9xOU1aO4GhlrDSvDpWrDeRE0GGYZSw+s1GXEjrQtVk4JKDatKZtsm6DgfL3yxJDJ6j02hYfuSRYNNeQ2GhtIER51hp6Afmk0THGWG7AZoy5pMTVWqmR1BdYZt9bXAq9FSrYEiwx+jaIHJ2YSIGkPx3kQLZottASWGvLL+IciUgvkYrRgqDLujqOFiW0CBIRe8H0Wr6dIoggoMOyqZc5qITBfbAoMNO4PMeFG0ZKhhZ5owuibTxkDDu/PBCn/cU9QZatiyJiNSRVHTpVqDQYZ2pwnOEMPOYtsfqdgWGGDYWWyPnCY48oYWF9sC0oadgiMW2wKyhp2VTLUuOnrfs6RhW5+MgA1RtETO8LdpYqRiW0DKsLrTcn9NJrIgTXBkDO1dk2lDxpDYXmwLSBjuWRtFbOOaTBsShsfCkL50rcnYcA0WSBi+F40i6fudrfakCY6E4bqot9M7jTBcMLJlBKUMWTdj9t26zY5iW0DC0Lt/nVlSbAv0N/zgLbcty7t2pQlOf0O/7Eg7B5NrxWrCa9Ep6sgY8vucZwJRxbooWtLfcHvpGxVGkT8OY5tgf8NZMVKUptfhxreo2BbobTgpAk3qV08UVEKv9qUJTm9D1vqeP1dPMfDUbmOa4PQ2ZIEm/qhTA1vsXdhVbAv0NvwkRev7/vzTgs0xaLr9XgZ2FdsCfQ33h8sfLMq8QcpFqVGX7n+gryELNPHGmT3P129sDKvUYecI9jc8FlmPnKgXpZnwxJt9aYLT1/BPLAwchxIrgwyjr+EnuZbL0iicru9NiMenp+F+RxsDlwU52X7PvyZ7jd9wKD0N+eNKlMRhcHj7fv9I7i3XWENPw6/IJXEQu7v18esfedlMT8ONl+/mqy/rB65BT8PnRPpI++XpdNqZn1vpejrvlslLRkhq/mUKJg3Ph4phqB4YqgOGuoChOmCoCxiqA4a6gKE6YKgLGKoDhrqAoTpgqAsYqgOGuoChOmCoCxiqA4a6+A8MycMbmhvD6TiGu6JN7WDiSEnRpzKC4Wfx8ISBd906zjq+bZw2wZH1UMafvmYWW9ZM5Zlv4NizV4zRLNAMf/G1kSv+imPkmsOTb+UYwGbAS9n7QQ28NbiVlRdf9xrqgISZjteG/4r9Zhp5ugm3izE7qWYT/fxLnWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/AV3BV6LQOGbpAAAAABJRU5ErkJggg=="
                                  />
                                </svg>
                              </td>

                              <td>{row.Company_Name}</td>
                              <td>{row.Salutation}</td>
                              <td>{row.First_Name}</td>
                              <td>{row.Last_Name}</td>
                              <td>{row.Email_Personal}</td>
                              <td>{row.Email_Work}</td>
                              <td>{row.Business_Phone}</td>
                              <td>{row.Mobile_Phone_Personal}</td>
                              <td>{row.Address}</td>
                              <td>{row.City}</td>
                              <td>{row.ZIP}</td>
                              <td>{row.Notes}</td>
                              <td>{row.Attachments}</td>
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
          <Modal.Body>{<CustomerForm setRed={setred} setGreen={setgreen} closeModal={handleClose} api={apiCall} apiCall={setCall}/>}</Modal.Body>
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
          <Modal.Body>{<UpdateCustomer row={rowData} setRed={setred} setGreen={setgreen} closeModal={handleCloseUpdate} api={apiCall} apiCall={setCall}/>}</Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default CustomerUpdate;
