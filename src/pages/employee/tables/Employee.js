import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  GET_DEPARTMENTS,
  GET_JOB_TITLES,
  GET_PAGE_EMPLOYEES,
  HOST,
  PRIMARY_COLOR,
} from "../../../Main/Constants/Constants";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faMagnifyingGlass,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { Button, Form, Modal } from "react-bootstrap";
import projectForm from '../../../Images/projectForm.svg'
import GreenAlert from "../../../Main/Loader/GreenAlert";
import RedAlert from "../../../Main/Loader/RedAlert";
import LoadingSpinner from "../../../Main/Loader/Loader";
import AuthenticationContext from "../../../Context/AuthContext";
import dp from "../../../Images/noprofile.jpeg";
import emailIcon from "../../../Images/email.svg";
import phoneIcon from "../../../Images/phone.svg";
import locationIcon from "../../../Images/location.svg";
import nineDots from "../../../Images/dots-nine.svg";
import listIcon from "../../../Images/list.svg";
import editIcon from "../../../assets/icons/edit_pen.svg";
import bdayIcon from "../../../Images/bday.svg";
import drinksIcon from "../../../Images/drinks.svg";
import travelIcon from "../../../Images/travel.svg";
import familyIcon from "../../../Images/Family.svg";
import entertainmentIcon from "../../../Images/Entertainment.svg";
import cross from "../../../Images/cross.svg";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import filterIcon from "../../../Images/Filter.svg";
import UpdateEmployeeForm from '../forms/UpdateEmployeeForm'
import PreHireEmployeeForm from "../forms/PreHireEmployeeForm";
import TFButton from '../../../components/ui/TFButton/TFButton'
import plusIcon from '../../../assets/icons/Plus.svg'

function Employee(props) {
  const { isCollapsed } = props;
  const { privileges, setPrivileges } = useContext(AuthenticationContext);
  const [apiCall, setCall] = useState(0);
  const [apiCall1, setCall1] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);

  //Add Form Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    //Update Form Modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

  //Employee Modal
  const [empModal, setempModal] = useState(false);
  const closeempModal = () => setempModal(false);
  const openempModal = () => setempModal(true);

  //Filter Modal
  const [filterModal, setfilterModal] = useState(false);
  const closeFilterModal = () => setfilterModal(false);
  const openFilterModal = () => setfilterModal(true);

  //Filter Modal1
  const [filterModal1, setfilterModal1] = useState(false);
  const closeFilterModal1 = () => setfilterModal1(false);
  const openFilterModal1 = () => setfilterModal1(true);

  const styles = {
    headerContainer: {
      marginTop: "30px",
      marginLeft: "32px",
      marginRight: "24px",
    },
    addmodal: {
      position: "absolute",
            width: "786px",
            height: 'fit-content',
            left: "28vw",
            marginTop: "10vh",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "12px",
    },
    addHeading: {
      width: "auto",
      height: "28px",
      marginLeft: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A"
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
      width: "150px",
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
      // color: PRIMARY_COLOR
    },
    cards: {
      width: "23%",
      height: "264px",
      left: "32px",
      top: "200px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "12px",
      margin: "10px",
      cursor: "pointer",
    },
    deptHeading: {
      width: "auto",
      height: "16px",
      // marginLeft: "85px",
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
      width: "80px",
      height: "80px",
      marginTop: "12px",
    },
    name: {
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
      color: "#0A0A0A",
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
      color: "#70757A",
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
      width: "auto",
      height: "32px",
      // marginLeft: "-7px",
      // marginLRight: "-7px",
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
    empModal: {
      position: "fixed",
      width: "50vw",
      left: "51vw",
      top: "0px",
      background: "#FFFFFF",
      // boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.12)"
    },
    topLeft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      // padding: "32px 20px 20px",
      gap: "6px",
      width: "184.73px",
      height: "178px",
      background: "#EBE9F1",
    },
    cross: {
      // position: "absolute",
      marginLeft: "12px",
      marginTop: "12px",
      cursor: "pointer",
    },
    modalImage: {
      marginTop: "32px",
      marginLeft: "34px",
      width: "56px",
      height: "56px",
      flex: "none",
      order: 0,
      flexGrow: 0,
    },
    modalName: {
      width: "auto",
      textAlign: "center",
      height: "30px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "15px",
      color: "#0A0A0A",
      flex: "none",
      order: 0,
      flexGrow: 0,
      marginTop: "12px",
    },
    modalJobTitle: {
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
      marginTop: "4px",
    },
    modalEmail: {
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      textAlign: "left",
      color: "#70757A",
      flex: "none",
      order: 1,
      flexGrow: 0,
      marginTop: "4px",
    },
    modalPart1: {
      marginTop: "40px",
      display: "flex",
      flexDirection: "row",
    },
    modalPart2: {
      marginTop: "26px",
      display: "flex",
      flexDirection: "row",
    },
    modalPart1Head: {
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    modalPart1Tail: {
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
      marginTop: "2px",
    },
    bottomPart1Heading: {
      width: "129px",
      height: "20px",
      // marginLeft: "20px",
      marginTop: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
    },
    editIcon: {
      marginLeft: "6px",
      marginTop: "8px",
      cursor: "pointer",
    },
    bottompart11: {
      marginTop: "14px",
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    bottompart12: {
      marginTop: "8px",
      marginLeft: "1px",
      height: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
      display: "flex",
      flexDirection: "row",
    },
    skills: {
      // alignItems: "flex-start",
      padding: "4px 8px",
      // gap: "10px",
      height: "24px",
      background: "#F3F3F4",
      borderRadius: "12px",
      marginRight: "8px",
      marginBottom: "8px",
      width: "auto",
    },
    bottomPart2Heading: {
      width: "105px",
      height: "20px",
      marginLeft: "30px",
      marginTop: "14px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#0A0A0A",
    },
    personalDets1: {
      width: "272px",
      height: "112px",
      display: "flex",
      flexDirection: "row",
      padding: "0px",
    },
    personalDetBirthday: {
      height: "16px",
      marginLeft: "14px",
      marginTop: "29px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    personalDetBirthdate: {
      height: "16px",
      marginLeft: "14px",
      marginTop: "4px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
    },
    personalDetAlcohol: {
      width: "41px",
      height: "16px",
      marginLeft: "14px",
      marginTop: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    personalDetAlcohol1: {
      width: "45px",
      height: "16px",
      marginLeft: "14px",
      marginTop: "4px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
    },
    personalDetBev: {
      width: "56px",
      height: "16px",
      marginLeft: "14px",
      marginTop: "24px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    personalDetBev1: {
      width: "36px",
      height: "16px",
      marginLeft: "14px",
      marginTop: "4px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
    },
    entSection: {
      width: "385px",
      height: "112px",
      display: "flex",
      flexDirection: "row",
      padding: "0px",
      marginTop: "30px",
      // marginRight: "100px",
    },
    personalDetMovies: {
      width: "39px",
      height: "16px",
      marginLeft: "77px",
      marginTop: "8px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    personalDetMovies1: {
      width: "auto",
      height: "16px",
      marginLeft: "77px",
      marginTop: "2px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
    },
    personalDetActor: {
      width: "36px",
      height: "16px",
      marginLeft: "77px",
      marginTop: "27px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
    },
    personalDetBevActor1: {
      width: "auto",
      height: "16px",
      marginLeft: "77px",
      marginTop: "2px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#70757A",
      textAlign: "left",
      textAlign: "left",
    },
    table: {
      width: "100%",
      overflowX: "hidden",
      borderRadius: "12px",
    },
    tableHeader: {
      height: "44px",
      background: "#F7F7F9",
      textAlign: "center",
      borderBottom: "0px",
      borderRadius: "12px",
    },
    tableHeading: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 600,
      fontSize: "14px",
      color: "#70757A",
      textAlign: "left",
      borderBottom: "1px solid #EBE9F1",
      borderTop: "1px solid #EBE9F1",
      verticalAlign: "middle",
      paddingLeft: "30px",
    },
    tableBody: {
      background: "#FFFFFF",
    },
    tableRow: {
      width: "100%",
      background: "#FFFFFF",
      verticalAlign: "top",
    },
    tableCell: {
      height: "58px",
      borderBottom: "1px solid #EBE9F1",
      padding: "12px 32px",
      gap: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      textAlign: "center",
      color: "#70757A",
      marginLeft: "8px",
      textAlign: "left",
      verticalAlign: "middle",
    },
    departmentContainer: {
      display: "inline",
      padding: "2px 8px",
      height: "24px",
      background: "#F7F7F9",
      borderRadius: "12px",
    },
    filterModal: {
      position: "absolute",
      width: "220px",
      height: "fit-content",
      left: isCollapsed ? "375px" : "535px",
      top: "207px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    filterModal1: {
      position: "absolute",
      width: "220px",
      height: "fit-content",
      left: isCollapsed ? "500px" : "700px",
      top: "207px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    filterSubcontainer: {
      width: "250px",
      height: "216px",
      overflowY: "scroll",
    },
    filterSubheading: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
      marginBottom: "8px",
    },
    filterSubSubContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: "4px",
      gap: "10px",
      width: "180px",
      height: "24px",
      background: "#F7F7F9",
      borderRadius: "6px",
      marginBottom: "8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      cursor: "pointer",
    },
    filterBodyText: {
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: "16px",
      color: "#0A0A0A",
    },
    filterButton2: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: "4px 12px",
      gap: "10px",
      height: "28px",
      background: "#FFFFFF",
      border: "1px solid #7367F0",
      borderRadius: "6px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      textAlign: "right",
      color: "#7367F0",
    },
    filterButton3: {
      padding: "4px 12px",
      gap: "10px",
      width: "56px",
      height: "28px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "6px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
      marginRight: "130px",
    },
  };
  const modalcss = empModal
    ? {
        cssModal: {
          background: "#ffffff",
          opacity: 1,
        },
      }
    : "";
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
  const [dataSource, setdataSource] = useState([]);
  const [employee, setemployee] = useState([]);
  const [selectedEmployees, setselectedEmployees] = useState([]);
  const [sort, setsort] = useState([]);
  const [isLoadingEmp, setisLoadingEmp] = useState(false);
  const [isLoadingDepts, setisLoadingDepts] = useState(false);
  const [isLoadingTitles, setisLoadingTitles] = useState(false);
  const [depts, setdepts] = useState([]);
  const [titles, settitles] = useState([]);
  const [returnData, setreturnData] = useState({ dept: [], title: [] });
  const [returnData1, setreturnData1] = useState({ dept: [], title: [] });

  useEffect(() => {
    setisLoadingEmp(true);
    setisLoadingDepts(true);
    setisLoadingTitles(true);

    const call = async () => {
      await axios
        .get(HOST + GET_DEPARTMENTS, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          setdepts(res.data.res);
          setisLoadingDepts(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoadingEmp(false);
    };
    call();
  }, []);

  useEffect(() => {
    setisLoadingEmp(true);
    setisLoadingDepts(true);
    setisLoadingTitles(true);

    const call = async () => {
      await axios
        .get(HOST + GET_JOB_TITLES, {
          headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
        .then((res) => {
          settitles(res.data.res);
          setisLoadingTitles(false);
        })
        .catch((err) => {
          console.log(err);
        });
      setisLoadingEmp(false);
    };
    call();
  }, []);

  useEffect(() => {
    setisLoadingEmp(true);
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
          console.log(res.data.res)
          setemployee(res.data.res);
          setdataSource(res.data.res);
          setisLoadingEmp(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, [apiCall]);

  useEffect(() => {
    setisLoadingEmp(true);
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_EMPLOYEES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            filter: JSON.stringify(returnData1),
            sort: sort,
          },
        })
        .then((res) => {
          console.log(res.data.res)
          setemployee(res.data.res);
          setdataSource(res.data.res);
          setisLoadingEmp(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, [apiCall1]);

  const handleFilter = (key, value) => {
    if (returnData[key].includes(value)) {
      setreturnData((prevFilter) => ({
        ...prevFilter,
        [key]: prevFilter[key].filter((element) => element !== value),
      }));
    } else {
      setreturnData((prevFilter) => ({
        ...prevFilter,
        [key]: [...prevFilter[key], value],
      }));
    }
  };

  const handleFilter1 = (key, value) => {
    if (returnData1[key].includes(value)) {
      setreturnData1((prevFilter) => ({
        ...prevFilter,
        [key]: prevFilter[key].filter((element) => element !== value),
      }));
    } else {
      setreturnData1((prevFilter) => ({
        ...prevFilter,
        [key]: [...prevFilter[key], value],
      }));
    }
  };
  const [grid, setgrid] = useState(true);
  const [modalData, setmodalData] = useState([]);

  const cardClick = (e) => {
    setmodalData(e);
    openempModal();
  };
  const formatDate = (date) => {
    if (date === "" || date === null || date === undefined) return "";
    const formattedDate = moment(date);
    return formattedDate.format("D MMM, YYYY");
  };

  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  // let element = document.querySelector('')
  // empModal ? element.style.background = '#0A0A0A' : element.style.background = '#F8FAFB'
  // empModal ? element.style.opacity = 0.25 : element.style.opacity = 1
  const formatLocation = (state, country) => {
    if ((!state && !country) /* || state.trim() === "" || country.trim() === "" */)
      return "";
    if (!state) return country;
    if (!country) return state;

    return state.trim() + ", " + country.trim();
  };
  const filterSize = () => {
    return returnData.dept.length + returnData.title.length;
  };
  const filterSize1 = () => {
    return returnData1.dept.length + returnData1.title.length;
  };
  const [rowData, setrowData] = useState([]);
  const handleUpdate = (e) => {
    console.log(e)
    setrowData(e);
    handleShowUpdate();
  };
  return (
    <div
      className="big"
      style={
        empModal
          ? { background: "#EBE9F1", opacity: 0.25 }
          : { background: "#F8FAFB", opacity: 1 }
      }
    >
      {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
      {red === true ? <RedAlert setRed={setred} /> : <></>}
      <div
        className="d-flex flex-row justify-content-between"
        style={styles.headerContainer}
      >
        <p style={styles.heading}>Employees</p>
        <TFButton icon={plusIcon} label = "Add New Employee" disabled={!privileges.includes('Add Employee')} handleClick={handleShow} />
      </div>
      <div
        className="d-flex flex-row"
        style={{ marginTop: "34px", marginBottom: "24px", marginLeft: "32px" }}
      >
        <input
          style={styles.searchInputContainer}
          type="text"
          value={value}
          onChange={filterData}
          placeholder="Search"
        />
        <Button style={styles.searchButton}>
          <FontAwesomeIcon icon={faMagnifyingGlass} color="black" />
        </Button>
        <Button
          style={{
            ...styles.filterButton,
            backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white",
          }}
          onClick={openFilterModal}
        >
          {/* <img src={filterIcon} alt="Filter Icon" /> */}
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
            {filterSize() > 0 ? `/ ${filterSize()}` : ""}
          </p>
          {filterSize() > 0 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
          )}
        </Button>
        <Button
          style={{
            ...styles.filterButton,
            backgroundColor: filterSize1() > 0 ? "#DBDBF4" : "white",
          }}
          onClick={openFilterModal1}
        >
          {/* <img src={filterIcon} alt="Filter Icon" /> */}
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
            {filterSize1() > 0 ? `/ ${filterSize1()}` : ""}
          </p>
          {filterSize1() > 0 ? (
            <></>
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
          )}
        </Button>
        <Modal
          show={filterModal}
          onHide={closeFilterModal}
          style={styles.filterModal}
          dialogClassName="filter-dialog"
          backdropClassName="filter-backdrop"
          animation={false}
        >
          <div
            style={{
              width: "350px",
              height: "356px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
              borderRadius: "6px",
            }}
          >
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{
                marginTop: "16px",
                marginLeft: "20px",
                marginRight: "30px",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Roboto'",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0A0A0A",
                  margin: "0px",
                }}
              >
                Filters
              </p>
              <div className="d-flex align-items-center">
                <Button
                  style={{
                    fontFamily: "'Roboto'",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    backgroundColor: "white",
                    border: "none",
                    color: PRIMARY_COLOR,
                    marginRight: "100px",
                  }}
                  disabled={filterSize() === 0}
                  onClick={(e) => setreturnData({ dept: [], title: [] })}
                >
                  Clear All
                </Button>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ height: "9px", cursor: "pointer" }}
                  color={PRIMARY_COLOR}
                  onClick={closeFilterModal}
                />
              </div>
            </div>
            <div
              className="d-flex flex-row justify-content-between"
              style={{ marginLeft: "20px", marginRight: "20px" }}
            >
              <div
                style={styles.filterSubcontainer}
                className="filter-container"
              >
                <p style={styles.filterSubheading}>
                  Department{" "}
                  {returnData.dept.length === 0
                    ? ""
                    : `/${returnData.dept.length}`}
                </p>
                {isLoadingDepts ? (
                  <LoadingSpinner />
                ) : (
                  depts.map((e) => {
                    return (
                      <div
                        style={{
                          ...styles.filterSubSubContainer,
                          backgroundColor: returnData.dept.includes(
                            e.Department_ID
                          )
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        onClick={() => handleFilter("dept", e.Department_ID)}
                      >
                        <p style={styles.filterBodyText}>{e.Department}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className='d-flex flex-row justify-content-end' style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                            <Button style={styles.filterButton3} onClick={(e) => { setCall(apiCall + 1); closeFilterModal(); }}>Filter</Button>
                        </div>
          </div>
        </Modal>
        <Modal
          show={filterModal1}
          onHide={closeFilterModal1}
          style={styles.filterModal1}
          dialogClassName="filter-dialog"
          backdropClassName="filter-backdrop"
          animation={false}
        >
          <div
            style={{
              width: "350px",
              height: "356px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
              borderRadius: "6px",
            }}
          >
            <div
              className="d-flex flex-row justify-content-between align-items-center"
              style={{
                marginTop: "16px",
                marginLeft: "20px",
                marginRight: "30px",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "'Roboto'",
                  fontStyle: "normal",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#0A0A0A",
                  margin: "0px",
                }}
              >
                Filters
              </p>
              <div className="d-flex align-items-center">
                <Button
                  style={{
                    fontFamily: "'Roboto'",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    backgroundColor: "white",
                    border: "none",
                    color: PRIMARY_COLOR,
                    marginRight: "100px",
                  }}
                  disabled={filterSize1() === 0}
                  onClick={(e) => setreturnData1({ dept: [], title: [] })}
                >
                  Clear All
                </Button>
                <FontAwesomeIcon
                  icon={faX}
                  style={{ height: "9px", cursor: "pointer" }}
                  color={PRIMARY_COLOR}
                  onClick={closeFilterModal1}
                />
              </div>
            </div>
            <div
              className="d-flex flex-row justify-content-between"
              style={{ marginLeft: "20px", marginRight: "20px" }}
            >
              <div
                style={styles.filterSubcontainer}
                className="filter-container"
              >
                <p style={styles.filterSubheading}>
                  Position{" "}
                  {returnData1.title.length === 0
                    ? ""
                    : `/${returnData1.title.length}`}
                </p>
                {isLoadingTitles ? (
                  <LoadingSpinner />
                ) : (
                  titles.map((e) => {
                    return (
                      <div
                        style={{
                          ...styles.filterSubSubContainer,
                          backgroundColor: returnData1.title.includes(
                            e.Title_ID
                          )
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        onClick={() => handleFilter1("title", e.Title_ID)}
                      >
                        <p style={styles.filterBodyText}>{e.Title}</p>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            <div className='d-flex flex-row justify-content-end' style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                            <Button style={styles.filterButton3} onClick={(e) => { setCall1(apiCall1 + 1); closeFilterModal(); }}>Filter</Button>
                        </div>
          </div>
        </Modal>
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
        <span style={{color: "#8361FE"}}>{tableFilter.length>0?tableFilter.length:employee.length}</span> 
        <span> Employee</span>
      </div>
      {grid ? (
        <div
          class="text-center"
          style={{ marginLeft: "32px", marginRight: "32px", height:'70vh', overflowX:'auto' }}
        >
          <div
            class="
          row
          justify-content-between
          row-cols-12
        "
          >
            {isLoadingEmp ? (
              <LoadingSpinner />
            ) : (
              <>
                {value.length > 0
                  ? tableFilter.map((e) => {
                      return (
                        <>
                          <div
                            style={styles.cards}
                            class="col-3 p-0"
                            onClick={() => cardClick(e)}
                          >
                            <div style={styles.deptHeading}>{e.Department}</div>
                            <img src={dp} style={styles.image} />
                            <div style={styles.name}>
                              {e.First_Name} {e.Last_Name}
                            </div>
                            <div style={{ marginTop: "8px", height: "14px" }}>
                              <img src={emailIcon} style={styles.emailIcon} />
                              <span style={styles.email}>{e.Email_Work}</span>
                            </div>
                            <div style={{ height: "14px", marginTop: "4px" }}>
                              <img src={phoneIcon} style={styles.phoneIcon} />
                              <span style={styles.phone}>{e.Mobile_Phone}</span>
                            </div>
                            <div style={{ height: "14px", marginTop: "4px" }}>
                              <img
                                src={locationIcon}
                                style={styles.locationIcon}
                              />
                              <span style={styles.location}>
                                {e.Address ? e.Address.substring(0, 40) : ""}
                              </span>
                            </div>
                            <div style={styles.title}>
                              <div style={styles.titleText}>{e.Title}</div>
                            </div>
                          </div>
                          <Modal
                            show={empModal}
                            onHide={closeempModal}
                            style={styles.empModal}
                            dialogClassName="filter-dialog"
                            backdropClassName="filter-backdrop"
                            animation={false}
                          >
                            <Modal.Body
                              style={{
                                ...modalcss.cssModal,
                                padding: "0",
                                height: "110vh",
                                width: "50vw",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div style={styles.topLeft}>
                                  <img
                                    onClick={closeempModal}
                                    style={styles.cross}
                                    src={cross}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textAlign: "center",
                                      width: "122px",
                                    }}
                                  >
                                    <img
                                      style={styles.modalImage}
                                      src={dp}
                                    />
                                    <div style={styles.modalName}>
                                      {modalData.First_Name}{" "}
                                      {modalData.Last_Name}
                                    </div>
                                    <div style={styles.modalJobTitle}>
                                      {modalData.Title}
                                    </div>
                                    <div style={styles.modalEmail}>
                                      {modalData.Email_Work}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ width: "500px" }}
                                  class="text-center"
                                >
                                  <div
                                    style={styles.modalPart1}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                        marginLeft: "21px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Gender
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        Male
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Birthday
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {formatDate(modalData.Birthday)}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Personal E-Mail
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Email_Personal}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={styles.modalPart2}
                                    // class="row justify-content-evenly"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                        marginLeft: "21px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Mobile Number
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Mobile_Phone}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Country
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Country}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Address
                                      </div>
                                      <div
                                        style={{
                                          ...styles.modalPart1Tail,
                                          height: "34px",
                                          width: "230px",
                                        }}
                                      >
                                        {modalData.Address}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ marginTop: "24px" }}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    typography: "body1",
                                    float: "left",
                                  }}
                                  style={{ margin: "0" }}
                                >
                                  <TabContext value={value1}>
                                    <Box sx={{}}>
                                      <TabList
                                        centered
                                        onChange={handleChange}
                                        aria-label=""
                                        TabIndicatorProps={{
                                          style: {
                                            backgroundColor: PRIMARY_COLOR,
                                          },
                                        }}
                                        sx={{
                                          marginRight: "400px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        <Tab
                                          style={{
                                            color:
                                              value1 == 1
                                                ? PRIMARY_COLOR
                                                : "#70757A",
                                          }}
                                          sx={{ fontSize: 10 }}
                                          label="Professional Details"
                                          value="1"
                                        />
                                        <Tab
                                          style={{
                                            color:
                                              value1 == 2
                                                ? PRIMARY_COLOR
                                                : "#70757A",
                                          }}
                                          sx={{ fontSize: 10 }}
                                          label="Personal Details"
                                          value="2"
                                        />
                                      </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                      <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={styles.bottomPart1Heading}
                                          >
                                            Professional Details
                                          </div>
                                          <img
                                            style={styles.editIcon}
                                            src={editIcon}
                                            onClick={() => {
                                              handleUpdate(modalData);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{ width: "693px" }}
                                          class="text-center"
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Onboarding
                                              </div>
                                              <div style={styles.bottompart12}>
                                                {formatDate(
                                                  modalData.Joining_Date
                                                )}
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Experience(Y)
                                              </div>
                                              <div style={styles.bottompart12}>
                                                -
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Highest Educational
                                                Qualification
                                              </div>
                                              <div style={styles.bottompart12}>
                                                -
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Office
                                              </div>
                                              <div style={styles.bottompart12}>
                                                Work From Home
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "640px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Skill Set
                                              </div>
                                              <div
                                                className="row justify-content-start"
                                                style={styles.bottompart12}
                                              >
                                                {modalData.Interests
                                                  ? modalData.Interests.split(
                                                      "\n"
                                                    ).map((option) => {
                                                      return (
                                                        <div
                                                          style={styles.skills}
                                                        >
                                                          {option}
                                                        </div>
                                                      );
                                                    })
                                                  : "-"}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                      <div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={styles.bottomPart2Heading}
                                          >
                                            Personal Details
                                          </div>
                                          <img
                                            style={styles.editIcon}
                                            src={editIcon}
                                            onClick={() => {
                                              handleUpdate(modalData);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{ width: "693px" }}
                                          class="text-center"
                                        >
                                          <div
                                            className="row justify-content-evenly"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "49px",
                                              width: "693px",
                                            }}
                                          >
                                            <div style={styles.personalDets1}>
                                              <img src={bdayIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetBirthday
                                                  }
                                                >
                                                  Birthday
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBirthdate
                                                  }
                                                >
                                                  {modalData.Birthday
                                                    ? formatDate(
                                                        modalData.Birthday
                                                      )
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div style={styles.personalDets1}>
                                              <img src={drinksIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Alcochol
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Alcohol
                                                    ? modalData.Alcohol
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Beverage
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Beverage
                                                    ? modalData.Beverage
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row justify-content-evenly"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "49px",
                                              width: "693px",
                                            }}
                                          >
                                            <div style={styles.personalDets1}>
                                              <img src={travelIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetBirthday
                                                  }
                                                >
                                                  Travel Destination
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBirthdate
                                                  }
                                                >
                                                  {modalData.Travel_Destination
                                                    ? modalData.Travel_Destination
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div style={styles.personalDets1}>
                                              <img src={familyIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Spouse
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Spouse
                                                    ? modalData.Spouse
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Children
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row justify-content-start"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "49px",
                                              width: "693px",
                                              marginLeft: "42px",
                                            }}
                                          >
                                            <div style={styles.entSection}>
                                              <img src={entertainmentIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Hobbies
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Spouse
                                                    ? modalData.Spouse
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Sports
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetMovies
                                                  }
                                                >
                                                  Movies
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetMovies1
                                                  }
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetActor
                                                  }
                                                >
                                                  Actor
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBevActor1
                                                  }
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                  </TabContext>
                                </Box>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      );
                    })
                  : employee.map((e) => {
                      return (
                        <>
                          <div
                            style={styles.cards}
                            class="col-3 p-0"
                            onClick={() => cardClick(e)}
                          >
                            <div style={styles.deptHeading}>{e.Department}</div>
                            <img src={dp} style={styles.image} />
                            <div style={styles.name}>
                              {e.First_Name} {e.Last_Name}
                            </div>
                            <div style={{ marginTop: "8px", height: "14px" }}>
                              <img src={emailIcon} style={styles.emailIcon} />
                              <span style={styles.email}>{e.Email_Work}</span>
                            </div>
                            <div style={{ height: "14px", marginTop: "4px" }}>
                              <img src={phoneIcon} style={styles.phoneIcon} />
                              <span style={styles.phone}>{e.Mobile_Phone}</span>
                            </div>
                            <div style={{ height: "14px", marginTop: "4px" }}>
                              <img
                                src={locationIcon}
                                style={styles.locationIcon}
                              />
                              <span style={styles.location}>
                                {e.Address ? e.Address.substring(0, 40) : ""}
                              </span>
                            </div>
                            <div style={styles.title}>
                              <div style={styles.titleText}>{e.Title}</div>
                            </div>
                          </div>
                          <Modal
                            show={empModal}
                            onHide={closeempModal}
                            style={styles.empModal}
                            dialogClassName="filter-dialog"
                            backdropClassName="filter-backdrop"
                            animation={false}
                          >
                            <Modal.Body
                              style={{
                                ...modalcss.cssModal,
                                padding: "0",
                                height: "110vh",
                                width: "50vw",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div style={styles.topLeft}>
                                  <img
                                    onClick={closeempModal}
                                    style={styles.cross}
                                    src={cross}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      textAlign: "center",
                                      width: "122px",
                                    }}
                                  >
                                    <img
                                      style={styles.modalImage}
                                      src={dp}
                                    />
                                    <div style={styles.modalName}>
                                      {modalData.First_Name}{" "}
                                      {modalData.Last_Name}
                                    </div>
                                    <div style={styles.modalJobTitle}>
                                      {modalData.Title}
                                    </div>
                                    <div style={styles.modalEmail}>
                                      {modalData.Email_Work}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{ width: "500px" }}
                                  class="text-center"
                                >
                                  <div
                                    style={styles.modalPart1}
                                    // class="row justify-content-evenly"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                        marginLeft: "21px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Gender
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        Male
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Birthday
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {formatDate(modalData.Birthday)}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Personal E-Mail
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Email_Personal}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    style={styles.modalPart2}
                                    // class="row justify-content-evenly"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                        marginLeft: "21px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Mobile Number
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Mobile_Phone}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Country
                                      </div>
                                      <div style={styles.modalPart1Tail}>
                                        {modalData.Country}
                                      </div>
                                    </div>
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "140px",
                                      }}
                                    >
                                      <div style={styles.modalPart1Head}>
                                        Address
                                      </div>
                                      <div
                                        style={{
                                          ...styles.modalPart1Tail,
                                          height: "34px",
                                          width: "230px",
                                        }}
                                      >
                                        {modalData.Address}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ marginTop: "24px" }}>
                                <Box
                                  sx={{
                                    width: "100%",
                                    typography: "body1",
                                    float: "left",
                                  }}
                                  style={{ margin: "0" }}
                                >
                                  <TabContext value={value1}>
                                    <Box sx={{}}>
                                      <TabList
                                        // centered
                                        onChange={handleChange}
                                        aria-label=""
                                        TabIndicatorProps={{
                                          style: {
                                            backgroundColor: PRIMARY_COLOR,
                                          },
                                        }}
                                        sx={{
                                          marginRight: "400px",
                                          marginLeft: "20px",
                                        }}
                                      >
                                        <Tab
                                          style={{
                                            color:
                                              value1 == 1
                                                ? PRIMARY_COLOR
                                                : "#70757A",
                                                textTransform: 'capitalize',
                                          }}
                                          sx={{ fontSize: 13 }}
                                          label="Professional Details"
                                          value="1"
                                        />
                                        <Tab
                                          style={{
                                            color:
                                              value1 == 2
                                                ? PRIMARY_COLOR
                                                : "#70757A",
                                                textTransform: 'capitalize',
                                          }}
                                          sx={{ fontSize: 13 }}
                                          label="Personal Details"
                                          value="2"
                                        />
                                        {/* <Tab
                                          style={{
                                            color:
                                              value1 == 3
                                                ? PRIMARY_COLOR
                                                : "#70757A",
                                          }}
                                          sx={{ fontSize: 10 }}
                                          label="Task List"
                                          value="3"
                                        /> */}
                                      </TabList>
                                    </Box>
                                    <TabPanel value="1">
                                      <div style={{marginLeft:'20px', marginTop:'10px'}}>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={styles.bottomPart1Heading}
                                          >
                                            Professional Details
                                          </div>
                                          <img
                                            style={styles.editIcon}
                                            src={editIcon}
                                            onClick={() => {
                                              handleUpdate(modalData);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{ width: "693px" }}
                                          class="text-center"
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Onboarding
                                              </div>
                                              <div style={styles.bottompart12}>
                                                {formatDate(
                                                  modalData.Joining_Date
                                                )}
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Experience(Y)
                                              </div>
                                              <div style={styles.bottompart12}>
                                                -
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Highest Educational
                                                Qualification
                                              </div>
                                              <div style={styles.bottompart12}>
                                                -
                                              </div>
                                            </div>
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "350px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Office
                                              </div>
                                              <div style={styles.bottompart12}>
                                                Work From Home
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "10px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                width: "640px",
                                              }}
                                            >
                                              <div style={styles.bottompart11}>
                                                Skill Set
                                              </div>
                                              <div
                                                className="row justify-content-start"
                                                style={styles.bottompart12}
                                              >
                                                {modalData.Interests
                                                  ? modalData.Interests.split(
                                                      "\n"
                                                    ).map((option) => {
                                                      return (
                                                        <div
                                                          style={styles.skills}
                                                        >
                                                          {option}
                                                        </div>
                                                      );
                                                    })
                                                  : "-"}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    <TabPanel value="2">
                                      <div>
                                        <div style={{ display: "flex" }}>
                                          <div
                                            style={styles.bottomPart2Heading}
                                          >
                                            Personal Details
                                          </div>
                                          <img
                                            style={styles.editIcon}
                                            src={editIcon}
                                            onClick={() => {
                                              handleUpdate(modalData);
                                            }}
                                          />
                                        </div>
                                        <div
                                          style={{ width: "693px" }}
                                          class="text-center"
                                        >
                                          <div
                                            className="row justify-content-evenly"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "49px",
                                              width: "693px",
                                            }}
                                          >
                                            <div style={styles.personalDets1}>
                                              <img src={bdayIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetBirthday
                                                  }
                                                >
                                                  Birthday
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBirthdate
                                                  }
                                                >
                                                  {modalData.Birthday
                                                    ? formatDate(
                                                        modalData.Birthday
                                                      )
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div style={styles.personalDets1}>
                                              <img src={drinksIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Alcochol
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Alcohol
                                                    ? modalData.Alcohol
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Beverage
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Beverage
                                                    ? modalData.Beverage
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row justify-content-evenly"
                                            style={{
                                              display: "flex",
                                              flexDirection: "row",
                                              marginTop: "49px",
                                              width: "693px",
                                            }}
                                          >
                                            <div style={styles.personalDets1}>
                                              <img src={travelIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetBirthday
                                                  }
                                                >
                                                  Travel Destination
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBirthdate
                                                  }
                                                >
                                                  {modalData.Travel_Destination
                                                    ? modalData.Travel_Destination
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                            <div style={styles.personalDets1}>
                                              <img src={familyIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Spouse
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Spouse
                                                    ? modalData.Spouse
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Children
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          <div
                                            className="row justify-content-start"
                                            style={{
                                              display: "flex",
                                              flexDirection: "column",
                                              marginTop: "49px",
                                              width: "693px",
                                              marginLeft: "42px",
                                              // background: "red"
                                            }}
                                          >
                                          <span style={{color: "#70757A",fontFamily: "'Roboto'",fontStyle: "normal",fontWeight: 400,fontSize: "14px", alignItems: 'start', justifyContent: 'start', textAlign: "start"}}>
                                              Entertainment
                                          </span>
                                            <div style={styles.entSection}>
                                              <img src={entertainmentIcon} />
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol
                                                  }
                                                >
                                                  Hobbies
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetAlcohol1
                                                  }
                                                >
                                                  {modalData.Spouse
                                                    ? modalData.Spouse
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={styles.personalDetBev}
                                                >
                                                  Sports
                                                </div>
                                                <div
                                                  style={styles.personalDetBev1}
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "column",
                                                }}
                                              >
                                                <div
                                                  style={
                                                    styles.personalDetMovies
                                                  }
                                                >
                                                  Movies
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetMovies1
                                                  }
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetActor
                                                  }
                                                >
                                                  Actor
                                                </div>
                                                <div
                                                  style={
                                                    styles.personalDetBevActor1
                                                  }
                                                >
                                                  {modalData.Children
                                                    ? modalData.Children
                                                    : "-"}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </TabPanel>
                                    
                                  </TabContext>
                                </Box>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </>
                      );
                    })}
              </>
            )}
          </div>
        </div>
      ) : (
        <div style={{ padding: "24px 32px" }}>
          <div
            style={{
              borderBottom: "1px solid #EBE9F1",
              width: "100%",
              borderRadius: "12px",
              height: "462px",
              overflow: "auto",
              position: "relative",
            }}
          >
            <table style={styles.table} className="rfp-table">
              <thead style={styles.tableHeader}>
                <tr style={{ borderRadius: "12px" }}>
                  <th
                    scope="col"
                    style={{
                      ...styles.tableHeading,
                      width: "140px",
                      borderBottom: "1px solid #EBE9F1",
                      borderRadius: "12px 0px 0px 0px",
                    }}
                    className="fixed-header"
                  >
                    Employee Name
                  </th>
                  <th
                    scope="col"
                    style={{ ...styles.tableHeading, width: "150px" }}
                    className="fixed-header2"
                  >
                    Department
                  </th>
                  <th
                    scope="col"
                    style={{ ...styles.tableHeading, width: "160px" }}
                    className="fixed-header2"
                  >
                    Company E-mail
                  </th>
                  <th
                    scope="col"
                    style={{ ...styles.tableHeading, width: "120px" }}
                    className="fixed-header2"
                  >
                    Contact Number
                  </th>
                  <th
                    scope="col"
                    style={{
                      ...styles.tableHeading,
                      width: "140px",
                      borderRadius: "0px 12px 0px 0px",
                    }}
                    className="fixed-header2"
                  >
                    Location
                  </th>
                </tr>
              </thead>

              {isLoadingEmp ? (
                <tr
                  style={{
                    height: "417px",
                    width: "100%",
                    background: "white",
                  }}
                >
                  <td colSpan={5}>
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : value.length > 0 ? (
                <tbody style={styles.tableBody}>
                  {tableFilter &&
                    tableFilter.map((e) => (
                      <>
                        <tr
                          style={{
                            ...styles.tableRow,
                            backgroundColor: selectedEmployees.includes(
                              e.Employee_ID
                            )
                              ? "#F5F3FE"
                              : "white",
                          }}
                          className="fixed-col"
                          id={e.RFP_ID}
                        >
                          <td
                            className="fixed-col"
                            style={{
                              ...styles.tableCell,
                              padding: "12px 24px",
                              fontWeight: "500",
                              backgroundColor: selectedEmployees.includes(
                                e.Employee_ID
                              )
                                ? "#F5F3FE"
                                : "white",
                            }}
                          >
                            <div
                              className="d-flex flex-row align-items-center"
                              style={{ gap: "20px" }}
                            >
                              <div
                                className="d-flex flex-row justify-content-center align-items-center"
                                style={{ gap: "8px" }}
                              >
                                <img
                                  src={dp}
                                  style={{ width: "42px", height: "42px" }}
                                  alt="Employee"
                                />
                                <div className="d-flex flex-column">
                                  <p
                                    style={{
                                      margin: "0px",
                                      fontWeight: "500",
                                      color: "#0A0A0A",
                                    }}
                                  >
                                    {[e.First_Name, e.Last_Name].join(" ")}
                                  </p>
                                  <p style={{ margin: "0px" }}>{e.Title}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            <div className="d-flex flex-row justify-content-start">
                              <div style={styles.departmentContainer}>
                                <p
                                  style={{
                                    color: "#A65DC0",
                                    display: "inline",
                                  }}
                                >
                                  {e.Department}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {e.Email_Work ? (
                              <>
                                <img src={emailIcon} alt="Email Icon" />
                                &nbsp;{e.Email_Work}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {e.Business_Phone ? (
                              <>
                                <img src={phoneIcon} alt="Phone Icon" />
                                &nbsp;{e.Business_Phone}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {formatLocation(e.State, e.Country) !== "" ? (
                              <>
                                <img src={locationIcon} alt="Location Icon" />
                                &nbsp;{formatLocation(e.State, e.Country)}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              ) : (
                <tbody style={styles.tableBody}>
                  {employee &&
                    employee.map((e) => (
                      <>
                        <tr
                          style={{
                            ...styles.tableRow,
                            backgroundColor: selectedEmployees.includes(
                              e.Employee_ID
                            )
                              ? "#F5F3FE"
                              : "white",
                          }}
                          className="fixed-col"
                          id={e.RFP_ID}
                        >
                          <td
                            className="fixed-col"
                            style={{
                              ...styles.tableCell,
                              padding: "12px 24px",
                              fontWeight: "500",
                              backgroundColor: selectedEmployees.includes(
                                e.Employee_ID
                              )
                                ? "#F5F3FE"
                                : "white",
                            }}
                          >
                            <div
                              className="d-flex flex-row align-items-center"
                              style={{ gap: "20px" }}
                            >
                              <div
                                className="d-flex flex-row justify-content-center align-items-center"
                                style={{ gap: "8px" }}
                              >
                                <img
                                  src={dp}
                                  style={{ width: "42px", height: "42px" }}
                                  alt="Employee"
                                />
                                <div className="d-flex flex-column">
                                  <p
                                    style={{
                                      margin: "0px",
                                      fontWeight: "500",
                                      color: "#0A0A0A",
                                    }}
                                  >
                                    {[e.First_Name, e.Last_Name].join(" ")}
                                  </p>
                                  <p style={{ margin: "0px" }}>{e.Title}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            <div className="d-flex flex-row justify-content-start">
                              <div style={styles.departmentContainer}>
                                <p
                                  style={{
                                    color: "#A65DC0",
                                    display: "inline",
                                  }}
                                >
                                  {e.Department}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {e.Email_Work ? (
                              <>
                                <img src={emailIcon} alt="Email Icon" />
                                &nbsp;{e.Email_Work}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {e.Business_Phone ? (
                              <>
                                <img src={phoneIcon} alt="Phone Icon" />
                                &nbsp;{e.Business_Phone}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                          <td style={{ ...styles.tableCell }}>
                            {formatLocation(e.State, e.Country) !== "" ? (
                              <>
                                <img src={locationIcon} alt="Location Icon" />
                                &nbsp;{formatLocation(e.State, e.Country)}
                              </>
                            ) : (
                              <>-</>
                            )}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                style={styles.addmodal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                    {
                      <>
                        <PreHireEmployeeForm
                          setRed={setred}
                          setGreen={setgreen}
                          closeModal={handleClose}
                          api={apiCall}
                          apiCall={setCall}
                        />
                        </>
                    }
            </Modal>
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                style={styles.addmodal}
                dialogClassName="filter-dialog"
                animation={false}
            >
              <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '22px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={projectForm} />
                        <div style={styles.addHeading}>Update Employee</div>
                    </div>
                    <div><img onClick={handleCloseUpdate} style={{marginRight:'25px',float: 'right'}} src={cross} /></div>
                </div>
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
            </Modal>
    </div>
  );
}

export default Employee;
