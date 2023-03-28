import { faArrowLeft, faArrowRight, faChevronDown, faEdit, faMagnifyingGlass, faPencil, faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AuthenticationContext from '../../Context/AuthContext'
import GreenAlert from '../Loader/GreenAlert'
import RedAlert from '../Loader/RedAlert'
import filterIcon from '../../Images/Filter.svg'
import LoadingSpinner from '../Loader/Loader'
import axios from 'axios'
import { GET_BUDGET_CITIES, GET_BUDGET_CITY, GET_BUDGET_COUNT, HOST } from '../Constants/Constants'

const BudgetCities = (props) => {
    const { isCollapsed } = props
    const { privileges, setPrivileges } = useContext(AuthenticationContext)
    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);
    const [budget, setbudget] = useState(true);
    const [city, setcity] = useState({});

    const [cities, setcities] = useState([]);
    const [budgetCount, setbudgetCount] = useState({ Done: 0, Draft: 0, Not_Found: 0 });

    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState([true, true, true, true, true]);

    const [value, setValue] = useState("");

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
            height: "144px"
        }
    }

    useEffect(() => {
        setIsLoading(true);
        const call = async () => {
            await axios
                .get(HOST + GET_BUDGET_COUNT, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                })
                .then((res) => {
                    console.log(res.data.res)
                    setbudgetCount(res.data.res[0])
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });

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
                            style={styles.searchInputContainer}
                            type="text"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Search"
                        />

                    </div>

                    {/* Table */}
                    <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }}>
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
                                                    <FontAwesomeIcon icon={faPencil} style={{ cursor: "pointer", marginRight: "23px" }} color="#70757A" height="18px" />
                                                    <FontAwesomeIcon icon={faArrowRight} style={{ cursor: "pointer" }} color="#70757A" height="18px" onClick={(eve) => { setcity(e); setbudget(false) }} />
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
                        <FontAwesomeIcon icon={faArrowLeft} color="#70757A" style={{ marginRight: "16px", cursor: "pointer" }} onClick={(e) => setbudget(true)} />
                        <p style={styles.heading}>{city.City}</p>
                    </div>

                    {/* Header Cards */}
                    <div style={styles.topContainer2}>
                        <p style={styles.topContainerHeading}>Budget Done</p>
                        <p style={{ ...styles.topContainerSubheading, color: "#559776" }}>{budgetCount.Done}</p>
                    </div>
                    <div style={styles.headerLine}></div>
                    <p style={styles.heading2}>Budgets in </p><p style={{ ...styles.heading2, color: "#DE2424", marginLeft: "0px" }}>{city.City}</p>

                    {/* Table */}
                    <div style={{ borderBottom: "1px solid #EBE9F1", height: "492px", overflow: "auto", position: "relative" }}>
                        <table style={styles.table} className='rfp-table'>
                            <thead style={styles.tableHeader}>
                                <tr>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "200px" }} className='fixed-header'>Project Name</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Budget Amount</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "130px" }} className='fixed-header2'>Budget Category</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "150px" }} className='fixed-header2'>Department</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "110px" }} className='fixed-header2'>Project Category</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "110px" }} className='fixed-header2'>Budget Year</th>
                                    <th scope="col" style={{ ...styles.tableHeading, width: "240px" }} className='fixed-header2'>Source</th>
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
                                                    <FontAwesomeIcon icon={faPencil} style={{ cursor: "pointer", marginRight: "23px" }} color="#70757A" height="18px" />
                                                    <FontAwesomeIcon icon={faArrowRight} style={{ cursor: "pointer" }} color="#70757A" height="18px" onClick={(eve) => { setcity(e); setbudget(false) }} />
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
                </>}
        </>
    )
}

export default BudgetCities