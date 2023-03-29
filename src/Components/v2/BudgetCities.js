import { faArrowLeft, faArrowRight, faChevronDown, faEdit, faMagnifyingGlass, faPencil, faTrash, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthenticationContext from '../../Context/AuthContext'
import GreenAlert from '../Loader/GreenAlert'
import RedAlert from '../Loader/RedAlert'
import filterIcon from '../../Images/Filter.svg'
import LoadingSpinner from '../Loader/Loader'
import axios from 'axios'
import {
    GET_BUDGET_CITY, GET_BUDGET_COUNT, GET_DEPARTMENTS, GET_PROJECT_CATEGORIES, HOST
    , GET_CITY_BUDGETS,
    DELETE_BUDGET,
} from '../Constants/Constants'
import ReactSelect from 'react-select'
import UpdateCityBudget from '../Form/UpdateCityBudget'
import UpdateBudget from '../Form/UpdateBudget'
import BudgetsForm from '../Form/BudgetsForm'
import dollar from '../../Images/Budget.svg'

const BudgetCities = (props) => {
    const { isCollapsed } = props
    const { privileges, setPrivileges } = useContext(AuthenticationContext)
    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);
    const [budget, setbudget] = useState(true);
    const [city, setcity] = useState({});

    const [cities, setcities] = useState([]);
    const [budgets, setbudgets] = useState([]);
    const [totalAmount, settotalAmount] = useState();
    const [budgetCount, setbudgetCount] = useState({ Done: 0, Draft: 0, Not_Found: 0 });
    const [depts, setdepts] = useState([]);
    const [projectCats, setprojectCats] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isLoading2, setIsLoading2] = useState([true, true, true]);

    const [value, setValue] = useState("");
    const [value2, setValue2] = useState("");
    const [filter, setfilter] = useState({ dept: [], cat: [], budgetCategory: [] });
    const [year, setYear] = useState(new Date().getFullYear().toString());

    const tableRef = useRef(0);

    //Filter Modal
    const [filterModal, setfilterModal] = useState(false);
    const closeFilterModal = () => { setfilter({ dept: [], cat: [], budgetCategory: [] }); setfilterModal(false); }
    const openFilterModal = () => setfilterModal(true);

    //Add Form Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Update Modal 1
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    //Update Modal 2
    const [showUpdate2, setShowUpdate2] = useState(false);
    const handleCloseUpdate2 = () => setShowUpdate2(false);
    const handleShowUpdate2 = () => setShowUpdate2(true);

    //Delete Modal
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (e) => { setrowData(e); setShowDelete(true); }

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
            width: "167px",
            height: "40px",
            background: "#6519E1",
            border: "1px solid #6519E1",
            boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
            borderRadius: "5px",
        },
        addButtonText: {
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
            display: "inline"
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
            paddingLeft: "32px",
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
            borderRadius: "6px",
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
            boxShadow: "none"
        },
        statusContainer: {
            height: "24px",
            background: "#FFF4EF",
            borderRadius: "24px",
        },
        status: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "12px",
        },
        topContainer2: {
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "12px",
            margin: "16px 32px 20px 32px",
            height: "144px",
            padding: "20px"
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
            width: "446px",
            height: "fit-content",
            left: isCollapsed ? "336px" : "496px",
            top: "416px",
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
        topContainerHeading2: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#70757A"
        },
        topContainerSubheading2: {
            width: "173px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#0A0A0A"
        }
    }

    const customStyles = {
        control: (base) => ({
            ...base,
            zIndex: 5,
        }),
        option: (provided, state) => ({
            ...provided,
            zIndex: 4, // set z-index to 4
        }),
        menu: (provided, state) => ({
            ...provided,
            zIndex: 4, // set z-index to 4
        }),
    };

    useEffect(() => {
        setIsLoading(true);
        const call = async () => {
            await axios
                .get(HOST + GET_BUDGET_CITY, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                    setcities(res.data.res);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [apiCall])

    useEffect(() => {
        setIsLoading2([true, true, true]);
        const call = async () => {
            await axios
                .get(HOST + GET_BUDGET_COUNT, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                    setbudgetCount(res.data.res[0])
                    setIsLoading2(prev => [false, ...prev.slice(1, 3)]);
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
                    setIsLoading2(prev => [...prev.slice(0, 1), false, ...prev.slice(2, 3)])
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
                    setIsLoading2(prev => [...prev.slice(0, 2), false])
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])

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

    const filterSize = () => {
        return filter.cat?.length + filter.dept?.length + filter.budgetCategory?.length;
    }

    const addComma = (num) => {
        if (num === null || num === "" || num === undefined) return ""
        return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    const statusComponent = (status) => {
        if (status === "Only Project Names") {
            return (
                <div style={{ ...styles.statusContainer, border: "1px solid #FD9568", width: "92px" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#FD9568" }}>Draft Budget</p>
                </div>
            )
        } else if (status === "Not Found") {
            return (
                <div style={{ ...styles.statusContainer, border: "1px solid #FE3766", width: "80px" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#FE3766" }}>Not Found</p>
                </div>
            )
        } else if (status === "Done") {
            return (
                <div style={{ ...styles.statusContainer, background: "#E4FEF1", border: "1px solid #34A853", width: "52px" }} className='d-flex justify-content-center'>
                    <p style={{ ...styles.status, color: "#34A853" }}>Done</p>
                </div>
            )
        }
    }

    const [rowData, setrowData] = useState([]);
    const handleUpdate = (e) => {
        setrowData(e);
        handleShowUpdate();
    };
    const handleUpdate2 = (e) => {
        setrowData(e);
        handleShowUpdate2();
    };

    const getCityBudgets = async () => {
        setIsLoading3(true)
        await axios
            .get(HOST + GET_CITY_BUDGETS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    search: value2,
                    filter: JSON.stringify(filter),
                    city: city.City_ID,
                    year: year,
                },
            })
            .then((res) => {
                setbudgets(res.data.res)
                settotalAmount(res.data.totalAmount);
                setIsLoading3(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDeleteBudget = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post(
                HOST + DELETE_BUDGET,
                {
                    id: rowData.Budget_ID,
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                if (res.data.success) {
                    handleCloseDelete();
                    setCall(apiCall + 1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}
            {budget
                ? <>
                    <div className='d-flex flex-row justify-content-between' style={styles.headerContainer}>
                        <p style={styles.heading}>Budget Status for Cities</p>
                    </div>

                    {/* Header Cards */}
                    <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
                        <div style={styles.topContainer}>
                            <p style={styles.topContainerHeading}>Budget Done</p>
                            <p style={{ ...styles.topContainerSubheading, color: "#559776" }}>{budgetCount.Done}</p>
                        </div>
                        <div style={styles.topContainer}>
                            <p style={styles.topContainerHeading}>Draft Budget</p>
                            <p style={{ ...styles.topContainerSubheading, color: "#FD9568" }}>{budgetCount.Draft}</p>
                        </div>
                        <div style={styles.topContainer}>
                            <p style={styles.topContainerHeading}>Not Found</p>
                            <p style={{ ...styles.topContainerSubheading, color: "#D93838" }}>{budgetCount.Not_Found}</p>
                        </div>
                    </div>
                    <div style={styles.headerLine}></div>
                    <p style={styles.heading2}>Cities</p>

                    {/* Filter and Other Buttons */}
                    <div className='d-flex flex-row' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px" }}>
                        <input
                            style={{ ...styles.searchInputContainer, borderRadius: "6px" }}
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Search"
                        />

                    </div>

                    {/* Table */}
                    <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }} onScroll={(e) => tableRef.current = e.target.scrollTop} ref={tableRef}>
                        <table style={styles.table} className='rfp-table'>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header'>City</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Region</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "130px" }} className='fixed-header2'>Population</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Capital Budget</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "110px" }} className='fixed-header2'>2022 Budget</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "110px" }} className='fixed-header2'>2023 Budget</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "240px" }} className='fixed-header2'>Remarks</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "120px" }} className='fixed-header2'>Action</th>
                                </tr>
                            </thead>
                            <tbody style={styles.tableBody}>
                                {isLoading ? <tr style={{ height: "441px", width: "100%", background: "white" }}>
                                    <td colSpan={8}>
                                        <LoadingSpinner />
                                    </td>
                                </tr> : cities && cities.map(e => {
                                    if (e.City.toLowerCase().startsWith(value.toLowerCase())) {
                                        return (<tr style={{ ...styles.tableRow }} className='fixed-col' id={e.City_Budget_ID}>
                                            <td className='fixed-col' style={{ ...styles.tableCell, fontWeight: "500" }}>
                                                <div className='d-flex flex-column justify-content-start'>
                                                    <p style={{ WebkitLineClamp: "1", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.City}</p>
                                                    <p style={{ fontWeight: "400", color: "#70757A" }}>{e.Municipality_Type}</p>
                                                </div>
                                            </td>
                                            <td style={{ ...styles.tableCell }}>{e.Geographic_Area}</td>
                                            <td style={{ ...styles.tableCell }}>{e.Population_2021}</td>
                                            <td style={{ ...styles.tableCell, fontWeight: "600" }}>{addComma(e.Capital_Budget_23)}</td>
                                            <td style={{ ...styles.tableCell }}>{statusComponent(e.Year_22)}</td>
                                            <td style={{ ...styles.tableCell }}>{statusComponent(e.Year_23)}</td>
                                            <td style={{ ...styles.tableCell, color: "#70757A" }}><p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.Remarks}</p></td>
                                            <td style={{ ...styles.tableCell }}>
                                                <div className='d-flex flex-row'>
                                                    <FontAwesomeIcon icon={faPencil} style={{ cursor: "pointer", marginRight: "23px" }} color="#70757A" height="18px" onClick={(eve) => { handleUpdate(e) }} />
                                                    <FontAwesomeIcon icon={faArrowRight} style={{ cursor: "pointer" }} color="#70757A" height="18px" onClick={(eve) => { getCityBudgets(); setcity(e); setbudget(false) }} />
                                                </div>
                                            </td>
                                        </tr>)
                                    } else {
                                        return <></>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                : <>
                    <div className='d-flex flex-row align-items-baseline' style={styles.headerContainer}>
                        <FontAwesomeIcon icon={faArrowLeft} color="#70757A" style={{ marginRight: "16px", cursor: "pointer" }} onClick={(e) => { setbudget(true); setValue2(""); setYear(new Date().getFullYear().toString()); setfilter({ dept: [], cat: [], budgetCategory: [] }) }} />
                        <p style={styles.heading}>{city.City}</p>
                    </div>

                    {/* Header Cards */}
                    <div style={styles.topContainer2} className='d-flex flex-row'>
                        <div className='d-flex flex-column justify-content-between' style={{ width: "98%" }}>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={styles.topContainerHeading2}>City Website</p>
                                        <a style={styles.topContainerSubheading2} href={city.Website} target="_blank" rel="noreferrer">{city.Website ?? "-"}</a>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={styles.topContainerHeading2}>Budget 2022</p>
                                        <a style={styles.topContainerSubheading2} href={city.Website_22} target="_blank" rel="noreferrer">{city.Website_22 ?? "-"}</a>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={{ ...styles.topContainerHeading2, width: "447px" }}>Budget 2023</p>
                                        <a style={styles.topContainerSubheading2} href={city.Website_23} target="_blank" rel="noreferrer">{city.Website_23 ?? "-"}</a>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={styles.topContainerHeading2}>2022 Budget</p>
                                        <p style={{ ...styles.topContainerSubheading2 }}>{city.Year_22}</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={styles.topContainerHeading2}>2023 Budget</p>
                                        <p style={{ ...styles.topContainerSubheading2 }}>{city.Year_23}</p>
                                    </div>
                                </div>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                        <img src={dollar} alt="Website Icon" />
                                    </div>
                                    <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                        <p style={styles.topContainerHeading2}>Remarks</p>
                                        <p style={{ ...styles.topContainerSubheading2, width: "447px" }}>{city.Remarks ?? "-"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faPencil} color="#70757A" style={{ cursor: "pointer", display: "inline" }} onClick={(eve) => { handleUpdate(city) }} />
                    </div>
                    <div style={styles.headerLine}></div>
                    <p style={styles.heading2}>Budgets in </p><p style={{ ...styles.heading2, color: "#DE2424", marginLeft: "0px" }}>{city.City}</p>

                    {/* Filter and Other Buttons */}
                    <div className='d-flex flex-row justify-content-between' style={{ marginTop: "8px", marginBottom: "24px", marginLeft: "32px", marginRight: "32px" }}>
                        <div className='d-flex flex-row justify-content-start'>
                            <input
                                style={{ ...styles.searchInputContainer }}
                                type="text"
                                value={value2}
                                onChange={(e) => setValue2(e.target.value)}
                                placeholder="Search"
                            />
                            <Button style={styles.searchButton} onClick={(e) => getCityBudgets()}><FontAwesomeIcon icon={faMagnifyingGlass} color="#000000" /></Button>
                            <Button style={{ ...styles.filterButton, backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white" }} onClick={openFilterModal}><img src={filterIcon} alt="Filter Icon" /><p style={{ fontStyle: "normal", fontWeight: 400, fontSize: "14px", color: "#0A0A0A", margin: "0" }}>Filters{filterSize() > 0 ? `/ ${filterSize()}` : ""}</p>{filterSize() > 0 ? <></> : <FontAwesomeIcon icon={faChevronDown} color="#70757A" />}</Button>
                            <Modal
                                show={filterModal}
                                onHide={closeFilterModal}
                                style={styles.filterModal}
                                dialogClassName="filter-dialog2"
                                backdropClassName="filter-backdrop"
                                animation={false}
                            >
                                <div style={{ width: "446px", height: "356px", boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)", borderRadius: "6px" }}>
                                    <div className='d-flex flex-row justify-content-between align-items-center' style={{ "marginTop": "16px", marginLeft: "20px", marginRight: "30px", marginBottom: "20px" }}>
                                        <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "16px", lineHeight: "24px", color: "#0A0A0A", margin: "0px" }}>Filters</p>
                                        <div className='d-flex align-items-center'>
                                            <Button style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", backgroundColor: "white", border: "none", color: "#6519E1", marginRight: "32px" }} disabled={filterSize() === 0} onClick={(e) => setfilter({ dept: [], cat: [], budgetCategory: [] })}>Clear All</Button>
                                            <FontAwesomeIcon icon={faX} style={{ height: "9px", cursor: "pointer" }} color="#6519E1" onClick={closeFilterModal} />
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "20px", marginRight: "20px" }}>
                                        <div style={styles.filterSubcontainer} className='filter-container'>
                                            <p style={styles.filterSubheading}>Budget Category {filter.budgetCategory.length === 0 ? "" : `/${filter.budgetCategory.length}`}</p>
                                            <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.budgetCategory.includes('Design') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('budgetCategory', 'Design')}><p style={styles.filterBodyText}>Design</p></div>
                                            <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.budgetCategory.includes('Construction') ? "rgba(219, 219, 244, 0.55)" : "#F7F7F9" }} onClick={() => handleFilter('budgetCategory', 'Construction')}><p style={styles.filterBodyText}>Construction</p></div>
                                        </div>
                                        <div style={styles.filterSubcontainer} className='filter-container'>
                                            <p style={styles.filterSubheading}>Department {filter.dept.length === 0 ? "" : `/${filter.dept.length}`}</p>
                                            {isLoading2[2] ? <LoadingSpinner /> : depts.map(e => {
                                                return (
                                                    <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.dept.includes(e.Department_ID) ? "#DBDBF4" : "#F7F7F9" }} onClick={() => handleFilter('dept', e.Department_ID)}><p style={styles.filterBodyText}>{e.Department}</p></div>
                                                )
                                            })}
                                        </div>
                                        <div style={styles.filterSubcontainer} className='filter-container'>
                                            <p style={styles.filterSubheading}>Project Category {filter.cat.length === 0 ? "" : `/${filter.cat.length}`}</p>
                                            {isLoading2[3] ? <LoadingSpinner /> : projectCats.map(e => {
                                                return (
                                                    <div style={{ ...styles.filterSubSubContainer, backgroundColor: filter.cat.includes(e.Project_Cat_ID) ? "#DBDBF4" : "#F7F7F9" }} onClick={() => handleFilter('cat', e.Project_Cat_ID)}><p style={styles.filterBodyText}>{e.Project_Category}</p></div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='d-flex flex-row justify-content-end' style={{ marginLeft: "20px", marginRight: "20px", marginTop: "20px" }}>
                                        {/* <Button style={styles.filterButton2} onClick={(e) => setfilter2('Advanced')}>Go to Advanced Filters</Button> */}
                                        <Button style={styles.filterButton3} onClick={(e) => { getCityBudgets(); closeFilterModal(); }}>Filter</Button>
                                    </div>
                                </div>
                            </Modal>
                            <ReactSelect
                                placeholder="Year"
                                defaultValue={{ value: year, label: year }}
                                onChange={(e) => {
                                    setYear(e.value);
                                    getCityBudgets()
                                }}
                                styles={customStyles}
                                options={[
                                    {
                                        label: "2022",
                                        value: "2022",
                                    },
                                    {
                                        label: "2023",
                                        value: "2023",
                                    },
                                    {
                                        label: "2024",
                                        value: "2024",
                                    },
                                    {
                                        label: "2025",
                                        value: "2025",
                                    },
                                ]} />
                        </div>
                        <button style={styles.addButton} onClick={handleShow}><p style={styles.addButtonText} >+ Add New Budget</p></button>
                    </div>

                    {/* Table */}
                    <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }}>
                        <table style={styles.table} className='rfp-table'>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "250px" }} className='fixed-header'>Project Name</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "130px" }} className='fixed-header2'>Budget Amount</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Budget Category</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "230px" }} className='fixed-header2'>Department</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header2'>Project Category</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "100px" }} className='fixed-header2'>Serial No</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "120px" }} className='fixed-header2'>Action</th>
                                </tr>
                            </thead>
                            <tbody style={styles.tableBody}>
                                {isLoading3 ? <tr style={{ height: "441px", width: "100%", background: "white" }}>
                                    <td colSpan={8}>
                                        <LoadingSpinner />
                                    </td>
                                </tr> : budgets && budgets.map(e => {
                                    if (e.City.toLowerCase().startsWith(value.toLowerCase())) {
                                        return (<tr style={{ ...styles.tableRow }} className='fixed-col' id={e.Budget_ID}>
                                            <td className='fixed-col' style={{ ...styles.tableCell, fontWeight: "500" }}>
                                                <div className='d-flex flex-column justify-content-start'>
                                                    <p style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{e.Project_Name}</p>
                                                </div>
                                            </td>
                                            <td style={{ ...styles.tableCell, fontWeight: "600" }}>{addComma(e.Budget_Amount)}</td>
                                            <td style={{ ...styles.tableCell }}>{e.Budget_Category}</td>
                                            <td style={{ ...styles.tableCell }}>{e.Department}</td>
                                            <td style={{ ...styles.tableCell }}>{e.Project_Category}</td>
                                            <td style={{ ...styles.tableCell }}>{e.Serial_No}</td>
                                            <td style={{ ...styles.tableCell }}>
                                                <div className='d-flex flex-row'>
                                                    <FontAwesomeIcon icon={faPencil} style={{ cursor: "pointer", marginRight: "23px" }} color="#70757A" height="18px" onClick={(eve) => { handleUpdate2(e) }} />
                                                    <FontAwesomeIcon icon={faTrash} style={{ cursor: "pointer" }} color="#70757A" height="18px" onClick={(eve) => { handleShowDelete(e) }} />
                                                </div>
                                            </td>
                                        </tr>)
                                    } else {
                                        return <></>
                                    }
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ height: "44px", padding: "12px 32px", background: "#F7F7F9", border: "1px solid #EBE9F1", marginBottom: "20px" }}>
                        <p style={{ fontFamily: 'Roboto', fontstyle: "normal", width: "238px", height: "20px", fontWeight: 400, fontSize: "13px", display: "inline-block" }}>Total</p>
                        <p style={{ fontFamily: 'Roboto', fontstyle: "normal", width: "238px", height: "20px", fontWeight: 500, fontSize: "13px", display: "inline-block" }}>{totalAmount ? addComma(totalAmount) : "$ 0"}</p>
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
                            <Modal.Title>Add Budget</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                <BudgetsForm
                                    cityid={city.City_ID}
                                    city={city.City}
                                    setRed={setred}
                                    setGreen={setgreen}
                                    closeModal={handleClose}
                                    api={apiCall}
                                    apiCall={setCall}
                                />
                            }
                        </Modal.Body>
                    </Modal>

                    {/* Update Budget Modal */}
                    <Modal
                        show={showUpdate2}
                        onHide={handleCloseUpdate2}
                        backdrop="static"
                        centered
                        size="xl"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Update Budget</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                <UpdateBudget
                                    row={rowData}
                                    setRed={setred}
                                    setGreen={setgreen}
                                    closeModal={handleCloseUpdate2}
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
                </>}
            {/* Update City Modal */}
            <Modal
                show={showUpdate}
                onHide={handleCloseUpdate}
                backdrop="static"
                centered
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
    )
}

export default BudgetCities