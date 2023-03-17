import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import TableScrollbar from 'react-table-scrollbar';
import { DELETE_RFP, GET_CITIES, GET_DEPARTMENTS, GET_EMPLOYEENAMES, GET_PAGE_RFPS, GET_PROJECT_CATEGORIES, GET_RFP_COUNT, HOST } from '../Constants/Constants';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowsUpDown, faArrowUp, faChevronDown, faChevronLeft, faChevronRight, faCross, faDownload, faEdit, faFilter, faMagnifyingGlass, faPlus, faTrash, faX, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button, Form, Modal } from 'react-bootstrap';
import GreenAlert from '../Loader/GreenAlert';
import RedAlert from '../Loader/RedAlert';
import LoadingSpinner from '../Loader/Loader';
import RFPform from '../Form/RFPform';
import AuthenticationContext from '../../Context/AuthContext';
import UpdateRFP from '../Form/UpdateRFP';
import { RadioButtonComponent } from '@syncfusion/ej2-react-buttons';



const RFP = (props) => {
    const { isCollapsed } = props
    const { privileges, setPrivileges } = useContext(AuthenticationContext)
    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);

    const [rfps, setrfps] = useState([]);
    const [selectedRfps, setselectedRfps] = useState([]);
    const [rfpCount, setrfpCount] = useState({ Total: 0, Month: 0, Percent: 0 });
    const [cities, setcities] = useState([]);
    const [depts, setdepts] = useState([]);
    const [projectCats, setprojectCats] = useState([]);
    const [employees, setemployees] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState([true, true, true, true, true]);

    let limit = 50;
    const [pages, setpages] = useState(1);
    const [currPage, setcurrPage] = useState(1);
    const [sort, setsort] = useState("RFP_ID DESC");
    const [value, setValue] = useState("");
    const [searchCity, setsearchCity] = useState("");
    const [filter, setfilter] = useState({ dept: [], cat: [], city: [], manager: [], source: [] });
    const [filter2, setfilter2] = useState('Basic')
    const [advancedFilter, setadvancedFilter] = useState([['', 'IS', '']])

    //Add Form Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Filter Modal
    const [filterModal, setfilterModal] = useState(false);
    const closeFilterModal = () => setfilterModal(false);
    const openFilterModal = () => setfilterModal(true);

    //Sort Modal
    const [sortModal, setsortModal] = useState(false);
    const closeSortModal = () => setsortModal(false);
    const openSortModal = () => setsortModal(true);

    //Delete Modal
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    //Update Modal
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const styles = {
        headerContainer: {
            marginTop: "30px",
            marginLeft: "32px",
            marginRight: "24px"
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
            marginBottom: "18px"
        },
        addButton: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            gap: "8px",
            width: "157px",
            height: "40px",
            background: "#6519E1",
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
            borderRadius: "5px",
        },
        addButtonText: {
            width: "125px",
            height: "24px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "24px",
            color: "#FBFBFB",
            flex: "none",
            margin: 0,
            flexGrow: 0
        },
        topContainer: {
            width: "208px",
            height: "68px",
            left: "32px",
            top: "76px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "12px",
            marginRight: "20px"
        },
        topContainerHeading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A",
            marginLeft: "12px",
            marginTop: "8px",
            marginBottom: "4px"
        },
        topContainerSubheading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            marginLeft: "12px",
            display: "inline-block"
        },
        percent: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#34A853",
            display: "inline-block",
            marginLeft: "8px"
        },
        headerLine: {
            height: "0px",
            left: "32px",
            top: "164px",
            border: "1px solid #EBE9F1",
            marginLeft: "32px",
            marginRight: "32px",
            marginBottom: "20px"
        },
        heading2: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "28px",
            color: "#0A0A0A",
            marginLeft: "32px",
            marginBottom: "8px",
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
            paddingLeft: "31px"
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
        pageContainer: {
            width: "32px",
            height: "32px",
            left: "1009px",
            top: "792px",
            border: "1px solid #EBE9F1",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "8px",
            backgroundColor: "white"
        },
        curPageContainer: {
            width: "32px",
            height: "32px",
            left: "1009px",
            top: "792px",
            border: "1px solid #6519E1",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "8px",
            backgroundColor: "white"
        },
        curPage: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: "#6519E1",
            margin: "0px"
        },
        page: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            textAlign: "center",
            color: "#70757A",
            margin: "0px"
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
            background: "#6519E1",
            borderRadius: "0px 6px 6px 0px",
            marginRight: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
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
        sortButton: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "8px",
            width: "96px",
            height: "36px",
            left: "395px",
            top: "220px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px"
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
            background: "#6519E1",
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
            borderRadius: "6px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px"
        },
        citySearchInputContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            padding: "2px 50px 2px 4px",
            gap: "4px",
            width: "120px",
            height: "20px",
            left: "20px",
            top: "84px",
            background: "#F3F3F4",
            borderRadius: "6px",
            border: "none",
            marginBottom: "8px",
        },
        sortModal: {
            position: "absolute",
            width: "296px",
            height: "319px",
            left: isCollapsed ? "463px" : "622px",
            top: "324px",
            background: "#FFFFFF",
            boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
            borderRadius: "6px"
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
            color: "#6519E1",
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
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A"
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
        }
    }

    useEffect(() => {
        setIsLoading2([true, true, true, true, true])
        const call = async () => {
            await axios
                .get(HOST + GET_RFP_COUNT, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                    let obj = rfpCount
                    obj.Total = res.data.res[0].Total
                    obj.Month = res.data.res[0].Month
                    obj.Percent = res.data.res[0].Percent ?? 0
                    setrfpCount(obj)
                    setIsLoading2(prev => [false, ...prev.slice(1, 5)])
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
                    setIsLoading2(prev => [prev[0], false, ...prev.slice(2, 5)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_DEPARTMENTS, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setdepts(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 2), false, ...prev.slice(3, 5)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_PROJECT_CATEGORIES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setprojectCats(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 3), false, ...prev.slice(4, 5)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_EMPLOYEENAMES, {
                    headers: { auth: "Rose " + localStorage.getItem("auth") },
                })
                .then((res) => {
                    setemployees(res.data.res);
                    setIsLoading2(prev => [...prev.slice(0, 4), false])
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])

    useEffect(() => {
        setIsLoading(true);
        setcurrPage(1)
        const call = async () => {
            await axios
                .get(HOST + GET_PAGE_RFPS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        limit: limit,
                        offset: (currPage - 1) * limit,
                        filter: JSON.stringify(filter),
                        search: value,
                        sort: sort,
                    },
                })
                .then((res) => {
                    setrfps(res.data.res);
                    setpages(res.data.totalPages)
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [apiCall])

    const handlePage = async (page) => {
        setIsLoading(true);
        setcurrPage(page);
        await axios
            .get(HOST + GET_PAGE_RFPS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    limit: limit,
                    offset: (page - 1) * limit,
                    filter: JSON.stringify(filter),
                    search: value,
                    sort: sort,
                },
            })
            .then((res) => {
                setrfps(res.data.res);
                setpages(res.data.totalPages)
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleFilter = (key, value) => {
        if (filter[key].includes(value)) {
            setfilter(prevFilter => ({
                ...prevFilter,
                [key]: prevFilter[key].filter(element => element !== value)
            }));
        } else {
            setfilter(prevFilter => ({
                ...prevFilter,
                [key]: [...prevFilter[key], value]
            }));
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
                if (res.data.success) {
                    handleCloseDelete();
                    selectedRfps([])
                    setgreen(true)
                    setCall(apiCall + 1);
                }else{
                    setred(true)
                }
            })
            .catch((err) => {
                console.log(err);
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

    const filterSize = () => {
        return filter.city.length + filter.cat.length + filter.dept.length + filter.manager.length + filter.source.length;
    }

    const filterInput1 =
        <Form.Select style={styles.filterInput1}>
            <option>Column</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </Form.Select >


    const filterInput2 = (idx) => {
        if (advancedFilter[idx][0] === '') {
            return (
                <Form.Select style={styles.filterInput1}>
                    <option>Condition</option>
                    <option>Choose Column First</option>
                </Form.Select >
            )
        }

        return (
            <Form.Select style={styles.filterInput1}>
                <option>Column</option>
                <option value="1">is</option>
                <option value="IS">is not</option>
                <option value="3">Three</option>
            </Form.Select >
        )
    }

    const filterInput3 = (idx) => {

    }

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}
            <div className='d-flex flex-row justify-content-between' style={styles.headerContainer}>
                <p style={styles.heading}>RFPs (Request For Proposals)</p>
                <button style={styles.addButton} onClick={handleShow}><p style={styles.addButtonText} >+ Add New RFP</p></button>
            </div>
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                <div style={styles.topContainer}>
                    <p style={styles.topContainerHeading}>New RFPs</p>
                    <div className=''>
                        <p style={styles.topContainerSubheading}>{rfpCount.Month}</p>
                        {rfpCount.Percent >= 0
                            ? <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowUp} color="#34A853" />
                                <p style={styles.percent}>{rfpCount.Percent}% increase</p>
                            </div>
                            : <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                                <FontAwesomeIcon icon={faArrowDown} color="#FE3766" />
                                <p style={{ ...styles.percent, color: "#FE3766" }}>{rfpCount.Percent}% decrease</p>
                            </div>
                        }
                    </div>
                </div>
                <div style={styles.topContainer}>
                    <p style={styles.topContainerHeading}>Total RFPs</p>
                    <p style={styles.topContainerSubheading}>{rfpCount.Total}</p>
                </div>
            </div>
            <div style={styles.headerLine}></div>
            <p style={styles.heading2}>RFPs</p>
            <div className='d-flex flex-row' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px" }}>
                <input
                    style={styles.searchInputContainer}
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search"
                />
                <Button style={styles.searchButton} onClick={(e) => setCall(apiCall + 1)}><FontAwesomeIcon icon={faMagnifyingGlass} color="white" /></Button>
                <Button style={{ ...styles.filterButton, backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white" }} onClick={openFilterModal}><FontAwesomeIcon icon={faFilter} color="#70757A" /><p style={{ fontStyle: "normal", fontWeight: 400, fontSize: "14px", color: "#0A0A0A", margin: "0" }}>Filters{filterSize() > 0 ? `/ ${filterSize()}` : ""}</p>{filterSize() > 0 ? <></> : <FontAwesomeIcon icon={faChevronDown} color="#70757A" />}</Button>
                <Modal
                    show={filterModal}
                    onHide={closeFilterModal}
                    style={styles.filterModal}
                    dialogClassName="filter-dialog"
                    backdropClassName="filter-backdrop"
                    animation={false}
                >
                    {filter2 === 'Basic' ? <div style={{ width: "786px", height: "356px", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center' style={{ "marginTop": "16px", marginLeft: "20px", marginRight: "30px", marginBottom: "20px" }}>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Filters</p>
                            <div className='d-flex align-items-center'>
                                <Button style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", backgroundColor: "white", border: "none", color: "#6519E1", marginRight: "32px" }} disabled={filterSize() === 0} onClick={(e) => setfilter({ dept: [], cat: [], city: [], manager: [], source: [] })}>Clear All</Button>
                                <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color="#6519E1" onClick={closeFilterModal} />
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "20px", marginRight: "20px" }}>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>City {filter.city.length === 0 ? "" : `/${filter.city.length}`}</p>
                                <input
                                    style={styles.citySearchInputContainer}
                                    type="text"
                                    className='searchInput'
                                    value={searchCity}
                                    onChange={(e) => setsearchCity(e.target.value)}
                                    placeholder="Search"
                                    id="city-search"
                                />
                                {isLoading2[1] ? <LoadingSpinner /> : cities.map(e => {
                                    if (e.City.toLowerCase().startsWith(searchCity.toLowerCase())) {
                                        return (
                                            <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.city.includes(e.City_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('city', e.City_ID)}><p style={styles.filterBodyText}>{e.City}</p></div>
                                        )
                                    } else {
                                        return <></>
                                    }

                                })}
                            </div>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Source {filter.source.length === 0 ? "" : `/${filter.source.length}`}</p>
                                <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.source.includes('Construct Connect') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('source', 'Construct Connect')}><p style={styles.filterBodyText}>Construct Connect</p></div>
                                <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.source.includes('Bids & Tenders') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('source', 'Bids & Tenders')}><p style={styles.filterBodyText}>Bids & Tenders</p></div>
                                <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.source.includes('Biddingo') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('source', 'Biddingo')}><p style={styles.filterBodyText}>Biddingo</p></div>
                                <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.source.includes('Merx') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('source', 'Merx')}><p style={styles.filterBodyText}>Merx</p></div>
                            </div>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Department {filter.dept.length === 0 ? "" : `/${filter.dept.length}`}</p>
                                {isLoading2[2] ? <LoadingSpinner /> : depts.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.dept.includes(e.Department_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('dept', e.Department_ID)}><p style={styles.filterBodyText}>{e.Department}</p></div>
                                    )
                                })}
                            </div>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Project Category {filter.cat.length === 0 ? "" : `/${filter.cat.length}`}</p>
                                {isLoading2[3] ? <LoadingSpinner /> : projectCats.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.cat.includes(e.Project_Cat_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('cat', e.Project_Cat_ID)}><p style={styles.filterBodyText}>{e.Project_Category}</p></div>
                                    )
                                })}
                            </div>
                            <div style={styles.filterSubcontainer} className='filter-container'>
                                <p style={styles.filterSubheading}>Project Managers {filter.manager.length === 0 ? "" : `/${filter.manager.length}`}</p>
                                {isLoading2[4] ? <LoadingSpinner /> : employees.map(e => {
                                    return (
                                        <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.manager.includes(e.Employee_ID) ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('manager', e.Employee_ID)}><p style={styles.filterBodyText}>{e.Full_Name}</p></div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-end' style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                            {/* <Button style={styles.filterButton2} onClick={(e) => setfilter2('Advanced')}>Go to Advanced Filters</Button> */}
                            <Button style={styles.filterButton3} onClick={(e) => { setCall(apiCall + 1); closeFilterModal(); }}>Filter</Button>
                        </div>
                    </div> :
                        <div className='d-flex flex-column' style={{ width: "786px", height: "auto", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px", padding: "20px", gap: "20px" }}>
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Filters</p>
                                <div className='d-flex align-items-center'>
                                    <Button style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", backgroundColor: "white", border: "none", color: "#6519E1", marginRight: "32px" }} disabled={filter.cat.length === 0 && filter.dept.length === 0 && filter.source.length === 0 && filter.city.length === 0 && filter.manager.length === 0} onClick={(e) => setfilter({ dept: [], cat: [], city: [], manager: [], source: [] })}>Clear All</Button>
                                    <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color="#6519E1" onClick={closeFilterModal} />
                                </div>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <p style={styles.whereText}>WHERE</p>
                                {filterInput1}
                            </div>
                            <div className='d-flex flex-row justify-content-start'>
                                <FontAwesomeIcon icon={faPlus} color="#6519E1" />
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <Button style={styles.filterButton2} onClick={(e) => setfilter2('Basic')}>Go to Basic Filters</Button>
                                <Button style={styles.filterButton3} onClick={(e) => { setCall(apiCall + 1); closeFilterModal(); }}>Filter</Button>
                            </div>
                        </div>}
                </Modal>
                <Button style={styles.sortButton} onClick={openSortModal}><FontAwesomeIcon icon={faArrowsUpDown} color="#000000" /><p style={{ fontStyle: "normal", fontWeight: 400, fontSize: "14px", color: "#0A0A0A", margin: "0" }}>Sort</p></Button>
                <Modal
                    show={sortModal}
                    onHide={closeSortModal}
                    style={styles.sortModal}
                    dialogClassName="filter-dialog"
                    backdropClassName="filter-backdrop"
                    animation={false}
                >
                    <div style={{ width: "296px", height: "319px", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px" }}>
                        <div className='d-flex flex-row justify-content-between align-items-center' style={{ "marginTop": "16px", marginLeft: "20px", marginRight: "30px", marginBottom: "20px" }}>
                            <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Sort By</p>
                            <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color="#6519E1" onClick={closeSortModal} />
                        </div>
                        <div className='d-flex flex-column' style={{ marginLeft: "20px", gap: "8px" }}>
                            <RadioButtonComponent
                                label="Latest To Oldest"
                                checked={sort === "RFP_ID DESC"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`RFP_ID DESC`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Oldest To Lastest"
                                checked={sort === "RFP_ID"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`RFP_ID`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Start Date - Latest First"
                                checked={sort === "Start_Date"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Start_Date`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Start Date - Oldest First"
                                checked={sort === "Start_Date DESC"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Start_Date DESC`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Submission Date - Latest First"
                                checked={sort === "Submission_Date"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Submission_Date`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Submission Date - Oldest First"
                                checked={sort === "Submission_Date DESC"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Submission_Date DESC`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Project Name - A-Z"
                                checked={sort === "Project_Name"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Project_Name`}
                                onChange={(e) => setsort(e.target.value)} />
                            <RadioButtonComponent
                                label="Project Name - Z-A"
                                checked={sort === "Project_Name DESC"}
                                cssClass="sort-radio"
                                name="Sort"
                                value={`Project_Name DESC`}
                                onChange={(e) => setsort(e.target.value)} />
                        </div>
                        <div className='d-flex justify-content-end' style={{ marginRight: "20px", marginTop: "10px" }}>
                            <Button style={styles.filterButton3} onClick={(e) => { setCall(apiCall + 1); closeSortModal(); }}>Sort</Button>
                        </div>
                    </div>
                </Modal>
            </div>
            <div style={{ borderBottom: "1px solid #EBE9F1" }}>
                <TableScrollbar height="492px">
                    <table style={styles.table} className='rfp-table'>
                        <thead style={styles.tableHeader}>
                            <tr>
                                <th scope="col" style={{ ...styles.tableHeading, width: "300px", borderRight: "1px solid #EBE9F1", borderBottom: "1px solid #EBE9F1", }} className='fixed-header'>RFP Name</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>City</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "190px" }} className='fixed-header2'>Source</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>Start Date</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "180px" }} className='fixed-header2'>Submission Date</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "250px" }} className='fixed-header2'>Department</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header2'>Project Category</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Project Manager</th>
                                <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>Action</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tableBody}>
                            {isLoading ? <div style={{ height: "408px", width: "1757px", background: "white" }}><LoadingSpinner /></div> : rfps && rfps.map(e => (
                                <tr style={{ ...styles.tableRow, backgroundColor: selectedRfps.includes(e.RFP_ID) ? "#F5F3FE" : "white" }} className='fixed-col' id={e.RFP_ID}>
                                    <td className='fixed-col' style={{ ...styles.tableCell, fontWeight: "500", minWidth: "", borderRight: "1px solid #EBE9F1", backgroundColor: selectedRfps.includes(e.RFP_ID) ? "#F5F3FE" : "white" }}>
                                        <div className='d-flex flex-row align-items-center'>
                                            <Form.Check
                                                inline
                                                type="checkbox"
                                                checked={selectedRfps.includes(e.RFP_ID)}
                                                readOnly={true}
                                                onClick={(eve) => { if (eve.target.checked) { setselectedRfps(prev => [...prev, e.RFP_ID]) } else { setselectedRfps(prev => prev.filter(ele => ele !== e.RFP_ID)) } }}
                                            /><p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.Project_Name}</p>
                                        </div>
                                    </td>
                                    <td style={{ ...styles.tableCell, minWidth: "150px" }}>{e.City}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "190px" }}>{e.Source}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "180px" }}>{formatDate(e.Start_Date)}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "180px" }}>
                                        {formatDate(e.Submission_Date) === ""
                                            ? <></>
                                            : <div style={styles.dateContainer}>
                                                <p style={styles.date}>{formatDate(e.Submission_Date)}</p>
                                            </div>}
                                    </td>
                                    <td style={{ ...styles.tableCell, minWidth: "250px" }}>{e.Department}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "200px" }}>{e.Project_Category}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "150px" }}>{e.Manager_Name}</td>
                                    <td style={{ ...styles.tableCell, minWidth: "100px" }}>{e.Action}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TableScrollbar>
            </div>

            <div className='d-flex flex-row justify-content-end' style={{ marginTop: "20px", marginRight: "24px" }}>
                <Button style={styles.pageContainer} disabled={currPage === 1} onClick={(e) => handlePage(currPage - 1)}><FontAwesomeIcon icon={faChevronLeft} color="#70757A" /></Button>
                <Button style={currPage === 1 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 1} onClick={(e) => handlePage(1)}><p style={currPage === 1 ? styles.curPage : styles.page}>1</p></Button>
                {pages >= 2 ? <Button style={currPage === 2 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 2} onClick={(e) => handlePage(2)}><p style={currPage === 2 ? styles.curPage : styles.page}>2</p></Button> : <></>}
                {pages >= 3 ? <Button style={currPage === 3 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 3} onClick={(e) => handlePage(3)}><p style={currPage === 3 ? styles.curPage : styles.page}>3</p></Button> : <></>}
                {pages >= 4 ? <Button style={currPage === 4 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 4} onClick={(e) => handlePage(4)}><p style={currPage === 4 ? styles.curPage : styles.page}>4</p></Button> : <></>}
                {pages >= 5 ? <Button style={currPage === 5 ? styles.curPageContainer : styles.pageContainer} disabled={currPage === 5} onClick={(e) => handlePage(5)}><p style={currPage === 5 ? styles.curPage : styles.page}>5</p></Button> : <></>}
                {pages >= 7 ? <p style={{ marginLeft: "8px" }}>.....</p> : <></>}
                {pages >= 6 ? <Button style={currPage === pages ? styles.curPageContainer : styles.pageContainer}><p style={currPage === pages ? styles.curPage : styles.page}>{pages}</p></Button> : <></>}
                <Button style={styles.pageContainer} disabled={currPage === pages} onClick={(e) => handlePage(currPage + 1)}><FontAwesomeIcon icon={faChevronRight} color="#70757A" /></Button>
            </div>

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
                    <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color="#6519E1" onClick={(e) => setselectedRfps([])} />
                </div>
            </div>

            {/* Add Form Modal */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
                size="xl"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add RFP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <RFPform
                            setRed={setred}
                            setGreen={setgreen}
                            closeModal={handleClose}
                            api={apiCall}
                            apiCall={setCall}
                        />
                    }
                </Modal.Body>
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
                centered
                size="xl"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update RFP</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RFP