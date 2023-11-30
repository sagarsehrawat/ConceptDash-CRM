import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { DELETE_RFP, GET_CITIES, GET_DEPARTMENTS, GET_EMPLOYEENAMES, GET_GOOGLE_DRIVE_URL, GET_PAGE_RFPS, GET_PROJECT_CATEGORIES, GET_RFP_COUNT, HOST, PRIMARY_COLOR, UPDATE_RFP_STATUS } from '../../../Main/Constants/Constants';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronDown, faChevronLeft, faChevronRight, faEdit, faPlus, faSort, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';
import GreenAlert from '../../../Main/Loader/GreenAlert';
import RedAlert from '../../../Main/Loader/RedAlert';
import LoadingSpinner from '../../../Main/Loader/Loader';
import RFPform from '../forms/RFPform';
import AuthenticationContext from '../../../Context/AuthContext';
import UpdateRFP from '../forms/UpdateRFP';
import cross from '../../../Images/cross.svg'
import tIcon from '../../../Images/taskIcon.svg'
import open from '../../../Images/openinDrive.svg'
import TFSearchBar from '../../../components/ui/TFSearchBar/TFSearchBar';
import TFButton from '../../../components/ui/TFButton/TFButton';
import TFChip from '../../../components/form/TFChip/TFChip';
import plusIcon from '../../../Images/addPlus.svg'
import { useSelector, useDispatch } from 'react-redux'
import {
    initRFPs,
    selectRFPs,
    updateRFP
} from '../../../redux/slices/rfpSlice.ts'
import Header from '../sections/Header/Header.tsx';

const RFP = (props) => {
    const { isCollapsed } = props
    const { privileges, setPrivileges } = useContext(AuthenticationContext)
    const dispatch = useDispatch()
    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);

    const rfps = useSelector(selectRFPs)
    const [selectedRfps, setselectedRfps] = useState([]);
    console.log(selectedRfps)
    const [rfpCount, setrfpCount] = useState({ Total: 0, Month: 0, Percent: 0 });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState([true, true, true, true, true]);

    let limit = 50;
    const [pages, setpages] = useState(1);
    const [currPage, setcurrPage] = useState(1);
    const [sort, setsort] = useState("RFP_ID DESC");
    const [value, setValue] = useState("");

    //Add Form Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Sort Modal
    const [sortModal, setsortModal] = useState(null);
    const handleCloseSort = () => setsortModal(null);
    const handleShowSort = (idx) => setsortModal(idx);
    const tableRef = useRef(null);
    const [scrolled, setscrolled] = useState(0)

    //Delete Modal
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    //Update Modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);
    const [IsLoading3, setIsLoading3] = useState(false);
    const openDriveLink = (e, projectFolderId) => {
        e.preventDefault();
        setIsLoading3(true)
        axios
          .get(
            HOST + GET_GOOGLE_DRIVE_URL,
            { headers: { auth: "Rose " + localStorage.getItem("auth"), id: projectFolderId, } }
          )
          .then((res) => {
            const url = res.data.res
            if(url && url!=="")window.open(url, '_blank');
            setIsLoading3(false)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    const styles = {
        openInDrive: {
            width: "92px",
            height: "16px",
            left: "0px",
            top: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#3692EF",
            display: 'flex',
            flexDirection: 'row',
            cursor: 'pointer'
        },
        table: {
            width: "100%",
            overflowX: "hidden",
        },
        tableHeader: {
            height: "44px",
            background: "#F7F7F9",
            textAlign: "center",
            borderBottom: "0px"
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
            paddingLeft: "22px",
        },
        tableBody: {
            background: "#FFFFFF",

        },
        tableRow: {
            width: "100%",
            background: "#FFFFFF",
            verticalAlign: "top"
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
            color: "#0A0A0A",
            marginLeft: "8px",
            textAlign: "left",
            verticalAlign: "middle",
        },
        dateContainer: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "2px 12px",
            gap: "10px",
            width: "110px",
            height: "24px",
            background: "#FFFFFF",
            border: "0.5px solid #FE3766",
            borderRadius: "24px"
        },
        date: {
            height: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#FE3766"
        },
        searchInputContainer: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "8px 8px 8px 12px",
            gap: "4px",
            width: "194px",
            height: "36px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px 0px 0px 6px",
        },
        searchButton: {
            width: "30px",
            height: "36px",
            background: "#D9D9D9",
            borderRadius: "0px 6px 6px 0px",
            marginRight: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            boxShadow: "none"
        },
        filterButton: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "8px",
            width: "115px",
            height: "36px",
            left: "268px",
            top: "220px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px",
            marginRight: "12px"
        },
        filterModal: {
            position: "absolute",
            width: "786px",
            height: "fit-content",
            left: isCollapsed ? "336px" : "496px",
            top: "324px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px"
        },
        filterSubcontainer: {
            width: "130px", height: "216px",
            overflowY: "scroll"
        },
        filterSubheading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A",
            marginBottom: "8px"
        },
        filterSubSubContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            padding: "4px",
            gap: "10px",
            width: "120px",
            height: "24px",
            background: "#F7F7F9",
            borderRadius: "6px",
            marginBottom: "8px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            cursor: "pointer"
        },
        filterBodyText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A"
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
            color: "#7367F0"
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
            lineHeight: "20px"
        },
        floatingContainer: {
            boxSizing: "border-box",
            position: "absolute",
            width: "522px",
            height: "76px",
            left: isCollapsed ? "34.236vw" : "45.347vw",
            top: "636px",
            background: "#FFFFFF",
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px",
            zIndex: "1000"
        },
        floatinContainerText: {
            width: "14px",
            height: "36px",
            marginLeft: "32px",
            marginTop: "26px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "36px",
            color: PRIMARY_COLOR,
            display: "inline-block"
        },
        floatingContainerText2: {
            width: "128px",
            height: "24px",
            left: "58px",
            top: "32px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#0A0A0A",
            display: "inline-block",
            marginLeft: "12px"
        },
        floatingContainerLine: {
            width: "46px",
            height: "0px",
            border: "1px solid #EBE9F1",
            transform: "rotate(90deg)",
            display: "inline-block",
            marginBottom: "12px"
        },
        floatingContainerIconText: {

        },
        whereText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A"
        },
        filterInput1: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            padding: "4px 0px 4px 4px",
            gap: "10px",
            width: "144px",
            height: "24px",
            background: "#F7F7F9",
            borderRadius: "6px"
        },
        sortModal: {
            position: "absolute",
            width: "163px",
            height: "81px",
            top: "388px",
            background: "#FFFFFF",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.12)",
            borderRadius: "6px",
        },
        sortContainer: {
            width: "163px",
            height: "81px",
            background: "#FFFFFF",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.12)",
            borderRadius: "6px",
            padding: "15px"
        },
        sortText: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#0A0A0A",
            margin: "0px"
        },
        addModal: {
            position: "absolute",
            width: "780px",
            height: 'fit-content',
            left: "28vw",
            marginTop: "4vh",
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
            color: "#0A0A0A",
            // marginTop:'12px'
        }
    }

    const handleDeleteBudget = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        await axios
            .post(
                HOST + DELETE_RFP,
                {
                    ids: JSON.stringify(selectedRfps),
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                handleCloseDelete();
                console.log(res)
                if (res.data.success) {
                    setselectedRfps([])
                    setgreen(true)
                    setCall(apiCall + 1);
                } else {
                    setred(true)
                    setIsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
                setred(true)
                setIsLoading(false)
            });
    };
    const [rowData, setrowData] = useState([]);
    const handleUpdate = (e) => {
        const foundObject = rfps.find(obj => obj.RFP_ID === selectedRfps[0]);
        setrowData(foundObject);
        handleShowUpdate();
    };

    const formatDate = (date) => {
        if (date === "" || date === null || date === undefined) return "";
        const formattedDate = moment(date)
        return formattedDate.format('D MMM, YYYY')
    }

    useEffect(() => {
        const table = tableRef.current;
        table.addEventListener('scroll', handleTableScroll);
        return () => {
            table.removeEventListener('scroll', handleTableScroll);
        };
    }, []);


    const handleTableScroll = () => {
        setscrolled(tableRef.current.scrollLeft)
    }

    const sortModalLeft = (idx) => {
        if (isCollapsed) {
            if (idx === 0) return `${100}px`
            if (idx === 1) return `${398 - scrolled}px`
            if (idx === 2) return `${549 - scrolled}px`
            if (idx === 3) return `${739 - scrolled}px`
            if (idx === 4) return `${919 - scrolled}px`
            if (idx === 5) return `${1098 - scrolled}px`
            if (idx === 6) return `${1348 - scrolled}px`
            if (idx === 7) return `${1548 - scrolled}px`
            if (idx === 8) return `${1744 - scrolled}px`
        } else {
            if (idx === 0) return `${260}px`
            if (idx === 1) return `${558 - scrolled}px`
            if (idx === 2) return `${709 - scrolled}px`
            if (idx === 3) return `${899 - scrolled}px`
            if (idx === 4) return `${1079 - scrolled}px`
            if (idx === 5) return `${1258 - scrolled}px`
            if (idx === 6) return `${1508 - scrolled}px`
            if (idx === 7) return `${1708 - scrolled}px`
            if (idx === 8) return `${1900 - scrolled}px`
        }
    }

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}

            {/* Filter and Other Buttons */}


            {/* Table */}
            <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }} ref={tableRef}>
                <table style={styles.table} className='rfp-table'>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th scope="col" style={{ ...styles.tableHeading, width: "300px", borderRight: "1px solid #EBE9F1", borderBottom: "1px solid #EBE9F1", }} className='fixed-header'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(0)}>
                                    RFP Name&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 0}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(0) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Name"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Name DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(1)}>
                                    Client&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 1}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(1) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("City"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("City DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "190px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(2)}>
                                    Source&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 2}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(2) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Source"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Source DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(3)}>
                                    Start Date&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 3}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(3) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Start_Date"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Start_Date DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(4)}>
                                    Submission Date&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 4}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(4) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Submission_Date"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Submission_Date DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "250px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(5)}>
                                    Department&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 5}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(5) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Department"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Department DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(6)}>
                                    Project Category&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 6}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(6) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Category"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Project_Category DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(7)}>
                                    Project Manager&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 7}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(7) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Manager_Name"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Manager_Name DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "120px" }} className='fixed-header2'>
                                <div style={{ padding: "4px 8px", display: "inline", cursor: "pointer" }} className='hover' onClick={(e) => handleShowSort(8)}>
                                    Action&nbsp;&nbsp;<FontAwesomeIcon icon={faSort} />
                                </div>
                                <Modal
                                    show={sortModal === 8}
                                    onHide={handleCloseSort}
                                    style={{ ...styles.sortModal, left: sortModalLeft(8) }}
                                    dialogClassName="filter-dialog"
                                    backdropClassName="filter-backdrop"
                                    animation={false}
                                >
                                    <div style={{ ...styles.sortContainer }} className='d-flex flex-column justify-content-between'>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Action"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowUp} />
                                            <p style={styles.sortText}>Sort Ascending</p>
                                        </div>
                                        <div className='d-flex flex-row justify-content-around hover' style={{ padding: "4px", cursor: "pointer" }} onClick={(e) => { setsort("Action DESC"); setCall(apiCall + 1); handleCloseSort() }}>
                                            <FontAwesomeIcon icon={faArrowDown} />
                                            <p style={styles.sortText}>Sort Descending</p>
                                        </div>
                                    </div>
                                </Modal>
                            </th>
                            <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>
                                RFP Number   
                            </th>
                        </tr>
                    </thead>
                    <tbody style={styles.tableBody}>
                        {isLoading ? <div style={{ height: "408px", width: "1937px", background: "white" }}><LoadingSpinner /></div> : rfps && rfps.map(e => (
                            <tr style={{ ...styles.tableRow, backgroundColor: selectedRfps.includes(e.RFP_ID) ? "#F5F3FE" : "white" }} className='' id={e.RFP_ID}>
                                <td className='fixed-col' style={{ ...styles.tableCell, fontWeight: "500", minWidth: "", borderRight: "1px solid #EBE9F1", backgroundColor: selectedRfps.includes(e.RFP_ID) ? "#F5F3FE" : "white" }}>
                                    <div className='d-flex flex-row align-items-center'>
                                        <Form.Check
                                            inline
                                            type="checkbox"
                                            checked={selectedRfps.includes(e.RFP_ID)}
                                            readOnly={true}
                                            onClick={(eve) => { if (eve.target.checked) { setselectedRfps(prev => [...prev, e.RFP_ID]) } else { setselectedRfps(prev => prev.filter(ele => ele !== e.RFP_ID)) } }}
                                        />
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.Project_Name}</div>
                                        <div style={styles.openInDrive} onClick={(f) => openDriveLink(f, e.Folder_ID)}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td style={{ ...styles.tableCell, minWidth: "150px" }}>{e.Client}</td>
                                <td style={{ ...styles.tableCell, minWidth: "190px" }}>{e.Source}</td>
                                <td style={{ ...styles.tableCell, minWidth: "180px" }}>{formatDate(e.Start_Date)}</td>
                                <td style={{ ...styles.tableCell, minWidth: "180px" }}>
                                    {formatDate(e.Submission_Date) === ""
                                        ? <></>
                                        : 
                                        <>
                                        <div style={styles.dateContainer} >
                                            <p style={styles.date}>{formatDate(e.Submission_Date)}</p>                                        
                                            </div>
                                        
                                         {/* <DateChip 
                                         date={formatDate(e.Submission_Date)} 
                                         tableRef={tableRef} 
                                         onUpdate={handleStatusUpdate} 
                                         dateContainerStyles={styles.dateContainer} 
                                         dateStyles={styles.date}
                                         /> */}
                                        </>
                                        }
                                </td>
                                <td style={{ ...styles.tableCell, minWidth: "250px" }}>{e.Department}</td>
                                <td style={{ ...styles.tableCell, minWidth: "200px" }}>{e.Project_Category}</td>
                                <td style={{ ...styles.tableCell, minWidth: "200px" }}>{e.Manager_Name}</td>
                                <td style={{ ...styles.tableCell, minWidth: "120px" }}>                      <TFChip
                        value={e.Action}
                        tableRef={tableRef}
                        name={e.RFP_ID}
                        onChange={handleStatusUpdate}
                        options={["No Go", "Review", "Go"]}
                      /></td>
                                <td style={{ ...styles.tableCell, minWidth: "180px" }}>{e.RFP_Number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            {/* </div> */}

            <div style={{ ...styles.floatingContainer, display: selectedRfps.length === 0 ? "none" : "", visibility: selectedRfps.length === 0 ? "hidden" : "visible" }}>
                <p style={styles.floatinContainerText}>{selectedRfps.length}</p>
                <p style={styles.floatingContainerText2}>Items Selected</p>
                <div style={{ ...styles.floatingContainerLine, marginLeft: "-23px" }}></div>
                {privileges.includes("Delete RFP") ? <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "90px", cursor: "pointer" }} onClick={(e) => handleShowDelete()}>
                    <FontAwesomeIcon icon={faTrash} style={{ height: "20px" }} />
                    <p style={styles.floatingContainerIconText}>Delete</p>
                </div> : <></>}
                {privileges.includes('Update RFP') ? <Button style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "35px", cursor: "pointer", backgroundColor: "transparent", border: "none" }} disabled={selectedRfps.length !== 1} onClick={handleUpdate}>
                    <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
                    <p style={styles.floatingContainerIconText}>Edit</p>
                </Button> : <></>}
                <div style={{ ...styles.floatingContainerLine, marginLeft: "10px" }}></div>
                <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
                    <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={(e) => setselectedRfps([])} />
                </div>
            </div>

            {/* Add Form Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Add New RFP</div>
                    </div>
                    <div><img onClick={handleClose} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                    {
                        <RFPform
                            setRed={setred}
                            setGreen={setgreen}
                            closeModal={handleClose}
                            api={apiCall}
                            apiCall={setCall}
                        />
                    }
            </Modal>

            {/* Delete Modal */}
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
                    <p style={{ textAlign: "center" }}>
                        <b>Delete the selected RFP!!</b>
                    </p>
                    <div className="d-flex flex-row justify-content-between">

                        <div style={{ display: "inline-block" }}>
                            <Button variant="danger" onClick={handleCloseDelete}>
                                Cancel
                            </Button>
                        </div>
                        <div style={{ display: "inline-block", float: "right" }}>
                            <Button variant="success" onClick={handleDeleteBudget}>
                                Proceed
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Update Modal */}
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                style={styles.addModal}
                dialogClassName="filter-dialog"
                animation={false}
            >
                <div className='d-flex flex-row justify-content-between align-items-center' style={{marginTop: '20px', marginLeft: '20px', display: 'flex', flexDirection:'row'}}>
                    <div className='d-flex flex-row'>
                        <img src={tIcon} />
                        <div style={styles.addHeading}>Update RFP</div>
                    </div>
                    <div><img onClick={handleCloseUpdate} style={{marginRight:'26px', marginTop:'6px',float: 'right'}} src={cross} /></div>
                </div>
                    {
                        <UpdateRFP
                            row={rowData}
                            setRed={setred}
                            setGreen={setgreen}
                            closeModal={handleCloseUpdate}
                            api={apiCall}
                            apiCall={setCall}
                        />
                    }
            </Modal>
        </>
    )
}

export default RFP