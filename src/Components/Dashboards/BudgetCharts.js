import React, { useEffect, useState } from 'react'
import pinnedActive from '../../Images/Pin icon_Active.svg'
import pinnedInactive from '../../Images/Pin icon.svg'
import { Bar, Pie } from 'react-chartjs-2'
import axios from 'axios'
import LoadingSpinner from '../Loader/Loader'
import { BUDGET_CHART, BUDGET_CHART_DEPARTMENT, HOST } from '../Constants/Constants'
import { primaryColour } from '../Constants/styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightDots } from '@fortawesome/free-solid-svg-icons'

const budgetChartStyles = {
    container: {
        boxSizing: "border-box",
        width: "436px",
        height: "266px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px"
    },
    chartContainer: {
        height: "200px",
        marginLeft: "32px",
        marginRight: "32px",
    },
    headingContainer: {
        marginLeft: "16px",
        marginRight: "16px",
        margin: "16px"
    },
    heading: {
        width: "135px",
        height: "28px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A",
        marginTop: "0px",
        marginBottom: "0px"
    },
    pinnedIcon: {
        width: "20px"
    },
    triplePieChart: {
        display: 'inline-block',
        width: '150px'
    },
    doublePieChart: {
        display: 'inline-block',
        width: "150px"
    },
    singlePieChart: {
        display: 'inline-block',
        width: "150px",
    },
    legend: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendColour: {
        width: "16px", height: "8px",
        display: "inline-block",
        textAlign: 'center'
    },
    legendText: {
        display: "inline-block",
        height: "18px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        color: "rgba(10, 10, 10, 0.6)",
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "4px"
    },
    largeContainer: {
        width: "892px",
        height: "266px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        marginTop: "24px",
        padding: "0px"
    },
    largeContainerHeading: {
        width: "276px",
        height: "28px",
        marginLeft: "16px",
        marginTop: "16px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A"
    },
    largeContainerHeader: {
        width: "892px",
        height: "48px",
        background: "#FFFFFF",
        boxShadow: "0px -4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px 12px 0px 0px",
    },
    largeContainerSubHeader: {

    },
    table: {
        width: "892px",
        paddingLeft: "16px",
        paddingRight: "16px",
        height: "224px",
        overflowY: "scroll",
        background: "#FFFFFF",
    },
    th: {
        width: "892px",
        height: "40px",
        background: "#F5F5F5",
        borderWidth: "1px 0px",
        borderStyle: "solid",
        borderColor: "#EBE9F1",
        paddingLeft: '16px',
        paddingRight: '16px'
    },
    tableHeaders: {
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "12px",
        color: "#071C33",
        textAlign: 'center',
        marginBottom: '0px',
        marginTop: '0px',
    },
    tableBody: {
        width: "892px",
        height: "224px",
        overflowY: "scroll",
        background: "#FFFFFF",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "0px 0px 12px 12px",
    },
    tableRow: {
        width: "860px",
        height: "40px",
        borderWidth: "0.5px 0px",
        borderStyle: "solid",
        borderColor: "#EBE9F1",
        marginLeft: "16px",
        marginRight: "16px"
    },
    tableCell: {
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        color: "#0A0A0A",
        textAlign: 'center',
        marginBottom: '0px',
        marginTop: '0px',
        borderBottom: "0px"
    },
    percentContainer1: {
        alignItems: "center",
        padding: "2px 12px",
        gap: "8px",
        width: "84.24px",
        height: "20px",
        background: "#F0F8F2",
        borderRadius: "60px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        color: "#34A853"
    },
    percentContainer2: {
        alignItems: "center",
        padding: "2px 12px",
        gap: "8px",
        width: "84.24px",
        height: "20px",
        background: "#FFE1E8",
        borderRadius: "60px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        color: "#FE3766"
    },
}

const budgetCategoryOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            align: 'start',
            labels: {
                fontFamily: "'Roboto'",
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "12px"
            }
        },
        datalabels: {
            display: true,
            color: "black",
            formatter: Math.round,
            anchor: "end",
            offset: -20,
            align: "start",
            width: "20px"
        }
    },
    scales: {
        y: {
            ticks: {
                display: false,
                beginAtZero: true,
            },
            grid: {
                drawBorder: false,
                display: false,
            },
        },
        x: {
            grid: {
                display: false,
            },
        }
    },
    barPercentage: 0.7, // default is 0.9
    categoryPercentage: 0.4, // default is 0.8
};

const budgetSourceOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
}

const BudgetCharts = (props) => {
    const { year } = props
    const [isLoading, setisLoading] = useState([true, true, true])
    let labels;
    switch (year) {
        case '0':
            labels = [new Date().getFullYear()]
            break;
        case '1':
            labels = [new Date().getFullYear() - 1, new Date().getFullYear()]
            break;
        case '2':
            labels = [new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear()]
            break;
        default:
            break;
    }
    const [budgetCategoryChartData, setbudgetCategoryChartData] = useState({
        labels: labels,
        datasets: [
            {
                label: 'Construction',
                data: [],
                backgroundColor: "#9C85C2"
            },
            {
                label: 'Design',
                data: [],
                backgroundColor: '#CBC4D7'
            }
        ]
    })
    const [budgetSourceChartData, setbudgetSourceChartData] = useState({
        data1: {
            labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
            datasets: [
                {
                    label: new Date().getFullYear() - 2,
                    data: [],
                    backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                }
            ]
        },
        data2: {
            labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
            datasets: [
                {
                    label: new Date().getFullYear() - 1,
                    data: [],
                    backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                }
            ]
        },
        data3: {
            labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
            datasets: [
                {
                    label: new Date().getFullYear(),
                    data: [],
                    backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                }
            ]
        }
    })
    const [projectCategoryBudgetChartData, setprojectCategoryBudgetChartData] = useState({})
    useEffect(() => {
        const call = async () => {
            setisLoading([true, true, true])
            await axios.get(HOST + BUDGET_CHART, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    chart: "Budget Category",
                    years: year,
                },
            }).then((res) => {
                const arr = res.data.res;

                let construction = [], design = [], l = [];

                if (year === '0') {
                    construction = [0];
                    design = [0];
                    l = [new Date().getFullYear()];
                } else if (year === '1') {
                    construction = [0, 0];
                    design = [0, 0];
                    l = [new Date().getFullYear() - 1, new Date().getFullYear()];
                } else if (year === '2') {
                    construction = [0, 0, 0];
                    design = [0, 0, 0];
                    l = [new Date().getFullYear() - 2, new Date().getFullYear() - 1, new Date().getFullYear(),];
                }

                const y = new Date().getFullYear();

                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].Budget_Category === "Construction") {
                        construction[arr[i].Budget_Year - y + parseInt(year)] = arr[i].Total_Amount / 1000;
                    } else {
                        design[arr[i].Budget_Year - y + parseInt(year)] = arr[i].Total_Amount / 1000;
                    }
                }

                setbudgetCategoryChartData({
                    labels: l,
                    datasets: [
                        {
                            label: "Construction",
                            data: construction,
                            backgroundColor: "#9C85C2",
                        },
                        {
                            label: "Design",
                            data: design,
                            backgroundColor: "#CBC4D7",
                        },
                    ],
                });
                setisLoading(prev => [false, ...prev.splice(1, 3)]);
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + BUDGET_CHART, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    chart: "Source",
                    years: year,
                },
            }).then((res) => {
                const arr = res.data.res;
                let data1 = [0, 0, 0, 0], data2 = [0, 0, 0, 0], data3 = [0, 0, 0, 0]
                const y = new Date().getFullYear();
                arr.map(e => {
                    if (y - e.Budget_Year === 0) {
                        if (e.Source === "Construct Connect") data3[0] = e.Count
                        if (e.Source === "Merx") data3[1] = e.Count
                        if (e.Source === "Biddingo") data3[2] = e.Count
                        if (e.Source === "Bids and Tenders") data3[3] = e.Count
                    } else if (y - e.Budget_Year === 1) {
                        if (e.Source === "Construct Connect") data2[0] = e.Count
                        if (e.Source === "Merx") data2[1] = e.Count
                        if (e.Source === "Biddingo") data2[2] = e.Count
                        if (e.Source === "Bids and Tenders") data2[3] = e.Count
                    } else if (y - e.Budget_Year === 2) {
                        if (e.Source === "Construct Connect") data1[0] = e.Count
                        if (e.Source === "Merx") data1[1] = e.Count
                        if (e.Source === "Biddingo") data1[2] = e.Count
                        if (e.Source === "Bids and Tenders") data1[3] = e.Count
                    }
                })
                setbudgetSourceChartData({
                    data1: {
                        labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
                        datasets: [
                            {
                                label: new Date().getFullYear() - 2,
                                data: data1,
                                backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                            }
                        ]
                    },
                    data2: {
                        labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
                        datasets: [
                            {
                                label: new Date().getFullYear() - 1,
                                data: data2,
                                backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                            }
                        ]
                    },
                    data3: {
                        labels: ['Construct Connect', 'Merx', 'Biddingo', 'Bids & tenders'],
                        datasets: [
                            {
                                label: new Date().getFullYear(),
                                data: data3,
                                backgroundColor: ['#B38EEE', 'rgba(155, 122, 208, 0.65)', 'rgba(145, 134, 164, 0.81)', 'rgba(224, 216, 236, 1)']
                            }
                        ]
                    }
                })
                setisLoading(prev => [prev[0], false, ...prev.splice(2, 3)]);
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + BUDGET_CHART_DEPARTMENT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            }).then((res) => {
                const arr = res.data.res;
                let obj = projectCategoryBudgetChartData
                arr.map(e => {
                    obj[e.Department] = {}
                    obj[e.Department]['percent'] = e.Percent
                })
                setprojectCategoryBudgetChartData(obj)
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + BUDGET_CHART, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    chart: "Department",
                    years: year,
                },
            }).then((res) => {
                const arr = res.data.res;
                let obj = projectCategoryBudgetChartData
                for (let i = 0; i < arr.length;) {
                    if (arr[i].Department in obj) {
                        obj[arr[i].Department][arr[i].Budget_Year] = arr[i].Total_Amount
                        i++;
                    } else {
                        obj[arr[i].Department] = {}
                    }
                }
                setprojectCategoryBudgetChartData(obj)
                setisLoading(prev => [...prev.splice(0, 2), false]);
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })
        }
        call()
    }, [year])

    const addComma = (num) => {
        if (num === null || num === "" || num === undefined) return "";
        return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    return (
        <>
            <div style={{...budgetChartStyles.container, marginLeft: "-19px"}} className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-between' style={budgetChartStyles.headingContainer}>
                    <p style={budgetChartStyles.heading}>Budget Category</p>
                    <img src={pinnedActive} alt="Dashboard Icon" style={budgetChartStyles.pinnedIcon} />
                </div>
                <div style={budgetChartStyles.chartContainer}>
                    {isLoading[0] ? <LoadingSpinner /> : <Bar options={budgetCategoryOptions} data={budgetCategoryChartData} />}
                </div>
            </div>
            <div style={budgetChartStyles.container}>
                <div className='d-flex flex-row justify-content-between' style={budgetChartStyles.headingContainer}>
                    <p style={budgetChartStyles.heading}>Budget Source</p>
                    <img src={pinnedActive} alt="Dashboard Icon" style={budgetChartStyles.pinnedIcon} />
                </div>
                <div style={budgetChartStyles.chartContainer} >
                    {isLoading[1] ? <LoadingSpinner /> :
                        <div className='d-flex flex-row justify-content-around'>
                            {parseInt(year) >= 2 ? <div style={budgetChartStyles.triplePieChart}>
                                <Pie data={budgetSourceChartData.data1} options={{
                                    ...budgetSourceOptions, plugins: {
                                        title: {
                                            display: true,
                                            text: new Date().getFullYear() - 2,
                                            position: 'bottom'
                                        }, legend: {
                                            display: false,
                                        },
                                    }
                                }} />
                            </div> : <></>}
                            {parseInt(year) >= 1 ? <div style={year === '1' ? budgetChartStyles.doublePieChart : budgetChartStyles.triplePieChart}>
                                <Pie data={budgetSourceChartData.data2} options={{
                                    ...budgetSourceOptions, plugins: {
                                        title: {
                                            display: true,
                                            text: new Date().getFullYear() - 1,
                                            position: 'bottom'
                                        }, legend: {
                                            display: false,
                                        },
                                    }
                                }} />
                            </div> : <></>}
                            {parseInt(year) >= 0 ? <div style={year === '0' ? budgetChartStyles.singlePieChart : (year === '1' ? budgetChartStyles.doublePieChart : budgetChartStyles.triplePieChart)}>
                                <Pie data={budgetSourceChartData.data3} options={{
                                    ...budgetSourceOptions, plugins: {
                                        title: {
                                            display: true,
                                            text: new Date().getFullYear(),
                                            position: 'bottom'
                                        }, legend: {
                                            display: false,
                                        },
                                    }
                                }} />
                            </div> : <></>}
                        </div>}
                    {isLoading[1] ? <></> : <div className='d-flex flex-row justify-content-around' style={{ marginTop: "12px " }}>
                        <div style={budgetChartStyles.legend}>
                            <div style={{ ...budgetChartStyles.legendColour, backgroundColor: "rgba(155, 122, 208, 0.65)" }}></div>
                            <p style={budgetChartStyles.legendText}>Construct Connect</p>
                        </div>
                        <div style={budgetChartStyles.legend}>
                            <div style={{ ...budgetChartStyles.legendColour, backgroundColor: "rgba(224, 216, 236, 1)" }}></div>
                            <p style={budgetChartStyles.legendText}>Merx</p>
                        </div>
                        <div style={budgetChartStyles.legend}>
                            <div style={{ ...budgetChartStyles.legendColour, backgroundColor: "rgba(179, 142, 238, 1)" }}></div>
                            <p style={budgetChartStyles.legendText}>Biddingo</p>
                        </div>
                        <div style={budgetChartStyles.legend}>
                            <div style={{ ...budgetChartStyles.legendColour, backgroundColor: "rgba(145, 134, 164, 0.81)" }}></div>
                            <p style={budgetChartStyles.legendText}>Bids & Tenders</p>
                        </div>
                    </div>}
                </div>
            </div>
            <div style={budgetChartStyles.largeContainer}>
                <div style={budgetChartStyles.largeContainerHeader}>
                    <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "16px", marginRight: "16px" }}>
                        <p style={budgetChartStyles.largeContainerHeading}>Project Category Budget Overview</p>
                        <img src={pinnedActive} alt="Dashboard Icon" style={budgetChartStyles.pinnedIcon} />
                    </div>

                </div>
                <div style={{width: "900px"}}>
                    <table className='table' style={budgetChartStyles.table}>
                        <thead style={budgetChartStyles.th}>
                            <tr className="" style={budgetChartStyles.largeContainerSubHeader}>
                                <th style={budgetChartStyles.tableHeaders} scope="col">Department</th>
                                {parseInt(year) >= 2 ? <th style={budgetChartStyles.tableHeaders} scope="col">{new Date().getFullYear() - 2} Budget $</th> : <></>}
                                {parseInt(year) >= 1 ? <th style={budgetChartStyles.tableHeaders} scope="col">{new Date().getFullYear() - 1} Budget $</th> : <></>}
                                {parseInt(year) >= 0 ? <th style={budgetChartStyles.tableHeaders} scope="col">{new Date().getFullYear()} Budget $</th> : <></>}
                                <th style={budgetChartStyles.tableHeaders} scope="col">Average Increase/Decrease</th>
                            </tr>
                        </thead>

                        {isLoading[2] ? <LoadingSpinner /> : <>
                            <tbody style={budgetChartStyles.tableBody}>
                                {Object.keys(projectCategoryBudgetChartData).map(e => {
                                    const y = new Date().getFullYear()
                                    return (
                                        <tr style={budgetChartStyles.tableRow} className='' key={e}>
                                            <td style={budgetChartStyles.tableCell}>{e}</td>
                                            {parseInt(year) >= 2 ? <td style={budgetChartStyles.tableCell}>{addComma(projectCategoryBudgetChartData[e][y - 2])}</td> : <></>}
                                            {parseInt(year) >= 1 ? <td style={budgetChartStyles.tableCell}>{addComma(projectCategoryBudgetChartData[e][y - 1])}</td> : <></>}
                                            <td style={budgetChartStyles.tableCell}>{addComma(projectCategoryBudgetChartData[e][y])}</td>
                                            <td style={budgetChartStyles.tableCell} className='d-flex justify-content-center'>
                                                {projectCategoryBudgetChartData[e]['percent'] >= 0 ?
                                                    <div style={budgetChartStyles.percentContainer1}>{projectCategoryBudgetChartData[e]['percent']} %</div>
                                                    : <div style={budgetChartStyles.percentContainer2}>{-projectCategoryBudgetChartData[e]['percent']} %</div>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </>}

                    </table>
                </div>

            </div>
        </>
    )
}

export default BudgetCharts