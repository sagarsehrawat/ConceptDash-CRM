import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TableScrollbar from "react-table-scrollbar";
import {
  DELETE_RFP,
  GET_CITIES,
  GET_DEPARTMENTS,
  GET_EMPLOYEENAMES,
  GET_EMPLOYEE_COUNT,
  GET_PAGE_EMPLOYEES,
  GET_PAGE_RFPS,
  GET_PROJECT_CATEGORIES,
  GET_RFP_COUNT,
  HOST,
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
import ellipse from '../../Images/Ellipse.png'
import emailIcon from '../../Images/email.svg'
import phoneIcon from '../../Images/phone.svg'
import locationIcon from '../../Images/location.svg'

function Employee(props) {
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
      background: "#6519E1",
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
      background: "#6519E1",
      borderRadius: "0px 6px 6px 0px",
      marginRight: "12px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    filterButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "122px",
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
      width: "100px",
      height: "36px",
      left: "308px",
      top: "100px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      marginRight: "12px",
    },
    secondHeading: {
      width: "104px",
      height: "28px",
      marginLeft: "32px",
      marginTop: "20px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      // color: "#6519E1"
    },
    cards: {
        width: "272px",
        height: "264px",
        left: "32px",
        top: "200px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        margin: '10px',
    },
    deptHeading: {
        width: "85px",
        height: "16px",
        marginLeft: "85px",
        marginTop: "12px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
        textAlign: "center",
        // color: "#70757A"
    },
    image: {
        width: '80px',
        height: '80px',
        marginTop: '12px',
    },
    name: {
        textAlign: 'center',
        width: "100%",
        height: "20px",
        // marginLeft: "70px",
        marginTop: "12px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "14px",
        lineHeight: "20px",
        textAlign: "center",
        color: "#0A0A0A"
    },
    emailIcon: {
        // marginLeft: "57px",
        marginRight: "5px",
        marginTop: "12px",
        marginBottom: "12px",
        // background: "#7367F0"
    },
    email: {
        width: "145px",
        height: "16px",
        left: "72px",
        top: "160px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        textAlign: "center",
        color: "#70757A"
    },
    phoneIcon: {
        // marginLeft: "57px",
        marginRight: "5px",
        marginTop: "12px",
        marginBottom: "12px",
        // background: "#7367F0"
    },
    phone: {
        width: "61px",
        height: "16px",
        left: "114px",
        top: "180px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#70757A",
    },
    locationIcon: {
        // marginLeft: "57px",
        marginRight: "5px",
        marginTop: "12px",
        marginBottom: "12px",
        // background: "#7367F0"
    },
    location: {
        width: "61px",
        height: "16px",
        left: "114px",
        top: "180px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#70757A",
    },
    title: {
        display: "flex",
        // textAlign: 'center',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        // padding: "7px 95px",
        gap: "10px",
        width: "272px",
        height: "32px",
        marginLeft: "-7px",
        marginTop: "22px",
        background: "#F7F7F9",
        borderRadius: "0px 0px 12px 12px",
    },
    titleText: {
        width: "99px",
        height: "16px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        lineHeight: "16px",
        textAlign: "center",
        color: "#70757A",
        flex: "none",
        order: 0,
        flexGrow: 0,
    }
  };
  const [employeeCount, setemployeeCount] = useState(0);
  const [employee, setemployee] = useState([]);
  const [sort, setsort] = useState([]);
  let returnData = {
    dept: [],
    title: [],
  };
  useEffect(() => {
    const call = async () => {
      await axios
        .get(HOST + GET_EMPLOYEE_COUNT, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth")
          },
        })
        .then((res) => {
          setemployeeCount(res.data.res[0].Total);
        })
        .catch((err) => {
          console.log(err);
        });
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
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, []);
  console.log(employee)
  return (
    <>
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div
        className="d-flex flex-row justify-content-between"
        style={styles.headerContainer}
      >
        <p style={styles.heading}>Employees</p>
        <button style={styles.addButton} onClick={handleShow}>
          <p style={styles.addButtonText}>+ Add New Employee</p>
        </button>
      </div>
      <div
        className="d-flex flex-row"
        style={{ marginTop: "34px", marginBottom: "24px", marginLeft: "32px" }}
      >
        <input
          style={styles.searchInputContainer}
          type="text"
          // value={value}
          // onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
        />
        <Button style={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />
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
            Department
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
            Position
            {/* {filterSize() > 0 ? `/ ${filterSize()}` : ""} */}
          </p>
          {/* {filterSize() > 0 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
          )} */}
          <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
        </Button>
      </div>
      <div style={styles.secondHeading}><span>{employeeCount}</span> Employee</div>
      <div style={{marginTop: '16px', marginLeft: '32px', marginRight:'32px'}} class="container text-center">
        <div
          class="
          row
          justify-content-evenly
          row-cols-1 row-cols-sm-2 row-cols-md-4
        "
        >
            {employee && employee.map((e)=>{
                return (
                    <div style={styles.cards} class="col">
                        <div style={styles.deptHeading}>{e.Department}</div>
                        <img src={ellipse} style={styles.image}/>
                        <div style={styles.name}>{e.First_Name} {e.Last_Name}</div>
                        <div style={{marginTop:'8px', height: '14px'}}>
                            <img src={emailIcon} style={styles.emailIcon}/>
                            <span style={styles.email}>{e.Email_Work}</span>
                        </div>
                        <div style={{height: '14px', marginTop: '4px'}}>
                            <img src={phoneIcon} style={styles.phoneIcon}/>
                            <span style={styles.phone}>{e.Mobile_Phone}</span>
                        </div>
                        <div style={{height: '14px', marginTop: '4px'}}>
                            <img src={locationIcon} style={styles.locationIcon}/>
                            <span style={styles.location}>{e.Address?e.Address.substring(0, 40):''}</span>
                        </div>
                        <div style={styles.title}>
                            <div style={styles.titleText}>{e.Title}</div>
                        </div>
                        
                    </div>
                )
            })}
        </div>
      </div>
    </>
  );
}

export default Employee;
