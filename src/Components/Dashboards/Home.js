import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { primaryColour } from '../Constants/styles'
import pinnedActive from '../../Images/Pin icon_Active.svg'
import pinnedInactive from '../../Images/Pin icon.svg'
import BudgetCharts from './BudgetCharts'
import axios from 'axios'
import { HOST, PROJECT_CHART } from '../Constants/Constants'
import RFPCharts from './RFPCharts'

const styles = {
    contentArea: {
        width: "932px",
        height: "842px",
        background: "#F8FAFB"
    },
    projectOverviewLine: {
        width: "892px",
        height: "0px",
        marginLeft: "20px",
        top: "152px",
        border: "1px solid #EBE9F1"
    },
    projectOverviewHeading: {
        width: "146px",
        height: "28px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A",
        marginLeft: "20px",
        marginTop: "20px"
    },
    projectOverviewContainers: {
        width: "208px",
        height: "68px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "12px"
    },
    projectOverviewSubheading: {
        height: "20px",
        marginLeft: "12px",
        marginTop: "8px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        color: "#0A0A0A",
        marginBottom: "0px"
    },
    projectOverviewNumber: {
        width: "31px",
        height: "28px",
        marginLeft: "12px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A"
    },
    header: {
        marginLeft: "20px",
        marginTop: "40px",
        marginRight: "20px",
    },
    headerDropdown: {
        padding: "8px 12px",
        gap: "150px",
        width: "241px",
        height: "40px",
        border: "1px solid #EBE9F1",
        borderRadius: "5px",
    },
    exportButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 12px",
        gap: "12px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "5px",
        width: "103px",
        height: "40px",
        marginRight: "20px"
    },
    exportButtonIcon: {
        height: "20px"
    },
    exportButtonText: {
        width: "47px",
        height: "24px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "16px",
        color: "#0A0A0A",
        marginTop: "0px",
        marginBottom: "0px"
    },
    headerDropdown2: {
        padding: "8px 12px",
        gap: "12px",
        width: "317px",
        height: "40px",
        border: "1px solid #EBE9F1",
        borderRadius: "5px"
    },
    headerDropdown3: {
        padding: "8px 12px",
        gap: "12px",
        width: "157px",
        height: "40px",
        border: "1px solid #EBE9F1",
        borderRadius: "5px"
    },
    chartsContainer: {
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "20px"
    }
}

const Home = () => {
    const [chartComponent, setchartComponent] = useState('0')
    const [year, setyear] = useState('0')
    const [month, setmonth] = useState(new Date().getMonth().toString())
    const [projects, setprojects] = useState([0, 0, 0, 0])

    const handleChartsComponent = () => {
        if (chartComponent === '0') return (<BudgetCharts year={year} />)
        if (chartComponent === '1') return (<RFPCharts month={month} />)
        if (chartComponent === '2') return proposalCharts()
        if (chartComponent === '3') return projectCharts()
    }

    const proposalCharts = () => {
        return (
            <>
            </>
        )
    }

    const projectCharts = () => {
        return (
            <>
            </>
        )
    }

    useEffect(() => {
        const call = async () => {
            await axios.get(HOST + PROJECT_CHART, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    chart: "Status",
                },
            }).then((res) => {
                const arr = res.data.res;
                let p = projects
                arr.map(e => {
                    if (e.Status === null) p[1] = e.Count;
                    if (e.Status === 'Ongoing') p[0] = e.Count;
                    if (e.Status === 'Not Started Yet') p[3] = e.Count;
                    if (e.Status === 'Completed') p[2] = e.Count;
                })
                setprojects(p)
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })
        }

        call()
    }, [])


    return (
        <>
            <div>
                <div style={styles.contentArea}>
                    <div style={styles.projectOverviewBox}>
                        <p style={styles.projectOverviewHeading}>Projects Overview</p>
                        <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
                            <div style={styles.projectOverviewContainers}>
                                <p style={styles.projectOverviewSubheading}>Ongoing Projects</p>
                                <p style={styles.projectOverviewNumber}>{projects[0]}</p>
                            </div>
                            <div style={styles.projectOverviewContainers}>
                                <p style={styles.projectOverviewSubheading}>New Projects</p>
                                <p style={styles.projectOverviewNumber}>{projects[1]}</p>
                            </div>
                            <div style={styles.projectOverviewContainers}>
                                <p style={styles.projectOverviewSubheading}>Completed Projects</p>
                                <p style={styles.projectOverviewNumber}>{projects[2]}</p>
                            </div>
                            <div style={styles.projectOverviewContainers}>
                                <p style={styles.projectOverviewSubheading}>Total Projects</p>
                                <p style={styles.projectOverviewNumber}>{projects[0] + projects[1] + projects[2] + projects[3]}</p>
                            </div>
                        </div>
                        <div style={styles.projectOverviewLine}></div>
                    </div>
                    <div style={styles.header} className='d-flex flex-row justify-content-between'>
                        <Form.Select style={styles.headerDropdown} onChange={(e) => setchartComponent(e.target.value)}>
                            <option value="0" style={{ fontFamily: "'Roboto'" }}>Budgets</option>
                            <option value="1" style={{ fontFamily: "'Roboto'" }}>RFPs</option>
                            <option value="2" style={{ fontFamily: "'Roboto'" }}>Proposals</option>
                            <option value="3" style={{ fontFamily: "'Roboto'" }}>Projects</option>
                        </Form.Select>
                        <div className='d-flex flex-row'>
                            <Button style={styles.exportButton}>
                                <FontAwesomeIcon icon={faCloudArrowDown} style={styles.exportButtonIcon} color={primaryColour} />
                                <p style={styles.exportButtonText}>Export</p>
                            </Button>
                            {chartComponent === '1' ?
                                <Form.Select style={styles.headerDropdown3} onChange={(e) => { e.preventDefault(); setmonth(e.target.value); }} value={month}>
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">Sepetember</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </Form.Select>
                                : <Form.Select style={styles.headerDropdown2} onChange={(e) => { e.preventDefault(); setyear(e.target.value); }}>
                                    <option value="0">This Year: 1 Jan {new Date().getFullYear()} - Presnet</option>
                                    <option value="1">Last 2 Years: 1 Jan {new Date().getFullYear() - 1} - Presnet</option>
                                    <option value="2">Last 3 Years: 1 Jan {new Date().getFullYear() - 2} - Present</option>
                                </Form.Select>}
                        </div>
                    </div>
                    <div style={styles.chartsContainer} className='row justify-content-between'>
                        {handleChartsComponent()}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home