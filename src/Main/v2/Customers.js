import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  DELETE_RFP,
  GET_CITIES,
  GET_COMPANY_NAMES,
  GET_CUSTOMERS_COUNT,
  GET_DEPARTMENTS,
  GET_EMPLOYEENAMES,
  GET_EMPLOYEE_COUNT,
  GET_PAGE_CUSTOMERS,
  GET_PAGE_EMPLOYEES,
  GET_PAGE_RFPS,
  GET_PROJECT_CATEGORIES,
  GET_RFP_COUNT,
  HOST,
  PRIMARY_COLOR,
} from "../Constants/Constants";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowsUpDown,
  faArrowUp,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faCross,
  faDownload,
  faEdit,
  faFilter,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faX,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";
import LoadingSpinner from "../Loader/Loader";
import RFPform from "../Form/RFPform";
import AuthenticationContext from "../../Context/AuthContext";
import UpdateRFP from "../Form/UpdateRFP";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
import ellipse from "../../Images/Ellipse.png";
import emailIcon from "../../Images/email.svg";
import phoneIcon from "../../Images/phone.svg";
import locationIcon from "../../Images/location.svg";
import nineDots from "../../Images/dots-nine.svg";
import listIcon from "../../Images/list.svg";
import editIcon from "../../Images/edit.svg";
import bdayIcon from "../../Images/bday.svg";
import drinksIcon from "../../Images/drinks.svg";
import travelIcon from "../../Images/travel.svg";
import familyIcon from "../../Images/Family.svg";
import entertainmentIcon from "../../Images/Entertainment.svg";
import cross from "../../Images/cross.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import InfiniteScroll from "react-infinite-scroll-component"
import TFButton from "../../components/ui/Button/Button";
import iconPath from '../../Images/addPlus.svg'

function Customers(props) {
  const { isCollapsed } = props;
  const { privileges, setPrivileges } = useContext(AuthenticationContext);
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  //Add Form Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const styles = {
    headerContainer: {
      marginTop: "30px",
      marginLeft: "32px",
      marginRight: "24px",
    },
    heading: {
      width: "244px",
      height: "28px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
      display: "inline-block",
      marginBottom: "18px",
    },
    addButton: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 16px",
      gap: "8px",
      width: "187px",
      height: "40px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "5px",
    },
    addButtonText: {
      width: "155px",
      height: "24px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "24px",
      color: "#FBFBFB",
      flex: "none",
      margin: 0,
      flexGrow: 0,
    },
    searchInputContainer: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "8px 12px",
      gap: "4px",
      width: "234px",
      height: "36px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px 0 0 6px",
    },
    searchButton: {
      width: "30px",
      height: "36px",
      background: "#ffffff",
      borderRadius: "0px 6px 6px 0px",
      marginRight: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "none",
    },
    filterButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "149px",
      height: "36px",
      left: "308px",
      top: "100px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      marginRight: "12px",
    },
    positionButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "101px",
      height: "36px",
      left: "308px",
      top: "100px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      marginRight: "12px",
    },
    secondHeading: {
      width: "auto",
      height: "28px",
      marginLeft: "32px",
      marginTop: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      // color: PRIMARY_COLOR
    },
    view: {
      width: "119px",
      height: "36px",
      left: "0px",
      top: "0px",
      background: "#EBE9F1",
      borderRadius: "6px",
      display: "flex",
      flexDirection: "row",
    },
    gridView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "2px 4px",
      gap: "2px",
      width: "52px",
      height: "24px",
      marginLeft: "6px",
      marginTop: "6px",
      // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
      borderRadius: "4px",
      border: "none",
    },
    listView: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      padding: "2px 4px",
      gap: "2px",
      width: "52px",
      height: "24px",
      marginLeft: "0",
      marginTop: "6px",
      borderRadius: "4px",
      border: "none",
    },
    gridText: {
      width: "26px",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
      flex: "none",
      order: 1,
      flexGrow: 0,
    },
    listText: {
      width: "23px",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
      flex: "none",
      order: 1,
      flexGrow: 0,
    },
    cards: {
      width: "31.6%",
      height: "264px",
      left: "32px",
      top: "200px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
      marginLeft: "10px",
      marginRight: "10px",
      marginBottom: "20px",
    },
    upperSection: {
      padding: "16px",
      height: "232px",
    },
    name: {
      width: "auto",
      textAlign: "left",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
    },
    title: {
      marginTop: "2px",
      width: "auto",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
      textAlign: "left",
    },
    company: {
      textAlign: "left",
      width: "auto",
      marginTop: "10px",
      height: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#7367F0",
    },
    emailIcon: {
      // marginLeft: "57px",
      marginRight: "4px",
      marginTop: "4px",
      marginBottom: "4px",
      // background: "#7367F0"
    },
    email: {
      width: "auto",
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      textAlign: "center",
      color: "#70757A",
    },
    phoneIcon: {
      // marginLeft: "57px",
      marginRight: "4px",
      marginTop: "4px",
      marginBottom: "4px",
      // background: "#7367F0"
    },
    phone: {
      width: "auto",
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
    },
    locationIcon: {
      // marginLeft: "57px",
      marginRight: "4px",
      marginTop: "4px",
      marginBottom: "4px",
      // background: "#7367F0"
    },
    location: {
      width: "auto",
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
    },
    address: {
      width: 'auto',
      marginTop: '10px',
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      flex: "none",
      order: 0,
      flexGrow: 0
    },
    addressValue: {
      width: 'auto',
      marginTop: '2px',
      height: "32px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      flex: "none",
      order: 1,
      flexGrow: 0
    },
    lowerSection: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "7px 95px",
      gap: "10px",
      width: "auto",
      height: "32px",
      background: "#F7F7F9",
      borderRadius: "0px 0px 12px 12px",
      textAlign: 'center',
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A"
    }
  };
  const [customers, setcustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let d = 0;
  let limit = 51;
  const [pages, setpages] = useState(1);
  const [currPage, setcurrPage] = useState(1);
  const [sort, setsort] = useState("ID DESC");
  const [value, setValue] = useState("");
  const [cities, setcities] = useState([]);
  const [companies, setcompanies] = useState([]);
  const [totalResults, settotalResults] = useState(0);
  const [length, setlength] = useState(0);
  console.log(length)
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
          setlength(length+res.data.res.length)
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
        .get(HOST + GET_CUSTOMERS_COUNT, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          settotalResults(res.data.res[0].Total);
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
  const inputData = (e) => {
    setValue(e.target.value);
  };

  let returnData = {
    city: [],
    company: [],
  };
  const fetchMoreData = async() =>{
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
        setcustomers(customers.concat(res.data.res));
        setlength(length+res.data.res.length)
        setpages(res.data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handleSort = (e) => {
    setsort(e.target.value);
  };
  const [grid, setgrid] = useState(true);
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div
        className="d-flex flex-row justify-content-between"
        style={styles.headerContainer}
      >
        <p style={styles.heading}>Customers</p>
        <TFButton icon={iconPath} label="Add New Customer" handleClick={handleShow}/>
      </div>
      <div
        className="d-flex flex-row"
        style={{ marginTop: "34px", marginBottom: "24px", marginLeft: "32px" }}
      >
        <input
          style={styles.searchInputContainer}
          type="text"
          value={value}
          onChange={inputData}
          placeholder="Search"
        />
        <Button style={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
        </Button>
        <Button
          style={{
            ...styles.filterButton,
            // backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white",
          }}
          //   onClick={openFilterModal}
        >
          <p
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              color: "#0A0A0A",
              margin: "0",
            }}
          >
            Company Name
            {/* {filterSize() > 0 ? `/ ${filterSize()}` : ""} */}
          </p>
          {/* {filterSize() > 0 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
          )} */}
          <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
        </Button>
        <Button
          style={{
            ...styles.positionButton,
            // backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white",
          }}
          //   onClick={openFilterModal}
        >
          <p
            style={{
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "14px",
              color: "#0A0A0A",
              margin: "0",
            }}
          >
            City
            {/* {filterSize() > 0 ? `/ ${filterSize()}` : ""} */}
          </p>
          {/* {filterSize() > 0 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
          )} */}
          <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
        </Button>
        <div style={styles.view}>
          <Button
            style={{
              ...styles.gridView,
              backgroundColor: grid ? "#ffffff" : "#EBE9F1",
            }}
            onClick={() => setgrid(true)}
          >
            <img src={nineDots} width="12.33px" height="12.33px" />
            <span style={styles.gridText}>Grid</span>
          </Button>
          <Button
            style={{
              ...styles.listView,
              backgroundColor: !grid ? "#ffffff" : "#EBE9F1",
            }}
            onClick={() => setgrid(false)}
          >
            <img src={listIcon} />
            <span style={styles.listText}>List</span>
          </Button>
        </div>
      </div>
      <div style={styles.secondHeading}>
        <span>{totalResults}</span> Customers
      </div>
      {isLoading? <LoadingSpinner/>:<></>}
      {grid ? (
        <InfiniteScroll
        dataLength={length}
        next={fetchMoreData}
        hasMore={length!==totalResults}
        loader={<div style={{textAlign: 'center', fontWeight: 'bold'}}>Loading...</div>}
        >
        <div
          class="row justify-content-between row-cols-12 gx-1.25"
          style={{
            marginLeft: "22px",
            marginRight: "22px",
            marginTop: "16px",
          }}
        >
          {
            customers.map((e) => {
              return (
                <div
                  style={styles.cards}
                  class="col-4 p-0"
                  // onClick={() => cardClick(e)}
                >
                  <div style={styles.upperSection}>
                    <div style={styles.name}>
                      {e.First_Name} {e.Last_Name}
                    </div>
                    <div style={styles.title}>
                      {e.Job_Title == "null" ? "-" : e.Job_Title}
                    </div>
                    <div style={styles.company}>
                      {e.Company_Name == "null" ? "-" : e.Company_Name}
                    </div>
                    <div style={{ marginTop: "4px" }}>
                      <img src={emailIcon} style={styles.emailIcon} />
                      <span style={styles.email}>{e.Email_Work}</span>
                    </div>
                    <div style={{  marginTop: "8px" }}>
                      <img src={phoneIcon} style={styles.phoneIcon} />
                      <span style={styles.phone}>{e.Business_Phone}</span>
                    </div>
                    <div style={{  marginTop: "8px" }}>
                      <img src={locationIcon} style={styles.locationIcon} />
                      <span style={styles.location}>
                        {e.City ? e.City : ""}
                      </span>
                    </div>
                    <div style={styles.address}>Address</div>
                    <div style={styles.addressValue}>{e.Address ? e.Address.substring(0, 40) : "-"}</div>
                  </div>
                  <div style={styles.lowerSection}>
                      View Details
                  </div>
                </div>
              );
            })
          }
        </div>
      </InfiniteScroll>) : (
        <div></div>
      )}
    </>
  );
}

export default Customers;
