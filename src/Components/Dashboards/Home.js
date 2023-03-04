import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Dropdown, Form } from 'react-bootstrap'
import { primaryColour } from '../Constants/styles'
import pinnedActive from '../../Images/Pin icon_Active.svg'
import pinnedInactive from '../../Images/Pin icon.svg'
import BudgetCharts from './BudgetCharts'

const styles = {
    contentArea: {
        width: "932px",
        height: "842px",
        background: "#F8FAFB"
    },
    projectOverviewBox: {
        boxSizing: "border-box",
        width: "892px",
        height: "156px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        marginLeft: "20px",
        marginTop: "20px"
    },
    projectOverviewHeading: {
        width: "146px",
        height: "28px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        lineHeight: "28px",
        marginLeft: "16px",
        marginTop: "16px",
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
    chartsContainer: {
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "24px"
    }
}

const Home = () => {
    const [chartComponent, setchartComponent] = useState(0)
    const [year, setyear] = useState('0')
    const [apiCall, setapiCall] = useState(0)

    const handleChartsComponent = () => {
        if (chartComponent === 0) return (<BudgetCharts year={year} apiCall={apiCall} />)
        if (chartComponent === 1) return rfpCharts()
        if (chartComponent === 2) return proposalCharts()
        if (chartComponent === 3) return projectCharts()
    }

    const rfpCharts = () => {
        return (
            <>
            </>
        )
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

    return (
        <>
            <div>
                <div style={styles.contentArea}>
                    <div style={styles.projectOverviewBox}>
                        <p style={styles.projectOverviewHeading}>Projects Overview</p>
                    </div>
                    <div style={styles.header} className='d-flex flex-row justify-content-between'>
                        <Form.Select style={styles.headerDropdown} onChange={(e) => setchartComponent(e.target.value)}>
                            <option value="0">Budgets</option>
                            <option value="1">RFPs</option>
                            <option value="2">Proposals</option>
                            <option value="3">Projects</option>
                        </Form.Select>
                        <div className='d-flex flex-row'>
                            <Button style={styles.exportButton}>
                                <FontAwesomeIcon icon={faCloudArrowDown} style={styles.exportButtonIcon} color={primaryColour} />
                                <p style={styles.exportButtonText}>Export</p>
                            </Button>
                            <Form.Select style={styles.headerDropdown2} onChange={(e) => {e.preventDefault(); setyear(e.target.value); }}>
                                <option value="0">This Year: 1 Jan {new Date().getFullYear()} - Presnet</option>
                                <option value="1">Last 2 Years: 1 Jan {new Date().getFullYear() - 1} - Presnet</option>
                                <option value="2">Last 3 Years: 1 Jan {new Date().getFullYear() - 2} - Present</option>
                            </Form.Select>
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