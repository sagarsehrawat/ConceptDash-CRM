import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import { HOST, RFP_ACTION, RFP_TRENDING } from '../Constants/Constants'
import LoadingSpinner from '../Loader/Loader'
import pinnedActive from '../../Images/Pin icon_Active.svg'

const styles = {
    trendingHeader: {
        width: "72px",
        height: "28px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A",
        paddingLeft: "0px",
        marginBottom: "8px",
    },
    trendingContainer: {
        width: "25%",
        height: "140px",
        background: "#FEFEFE",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        margin: "0px 10px"
    },
    trendingContainerHeading: {
        height: "20px",
        marginLeft: "8px",
        marginTop: "8px",
        marginBottom: "4px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#6519E1"
    },
    trendingContainer2: {
        padding: "4px 8px",
        gap: "50px",
        height: "28px",
        marginLeft: "8px",
        marginRight: "8px",
        marginBottom: "6px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "6px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#0A0A0A",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    actionChartSubheader: {
        width: "83px",
        height: "20px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#0A0A0A",
        display: "inline-block",
        marginBottom: "0px"
    },
    actionChartSubheader2: {
        width: "97px",
        height: "16px",
        left: "103px",
        top: "36px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "10px",
        lineHeight: "16px",
        color: "#0A0A0A",
        display: "inline-block",
        marginBottom: "0px"
    },
    largeContainer: {
        width: "100%",
        height: "402px",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        borderRadius: "12px",
        marginTop: "24px"
    },
    pinnedIcon: {
        width: "20px"
    },
    largeContainerHeading: {
        width: "276px",
        height: "28px",
        marginTop: "16px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "18px",
        color: "#0A0A0A"
    },
}

const RFPCharts = (props) => {
    const { month } = props
    const [isLoading, setisLoading] = useState([true, true, true])
    const [trending, settrending] = useState({ City: [], Department: [], Category: [] })
    const [action, setaction] = useState([0, 0, 0, 0, 0])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                },

                grid: {
                    drawBorder: false,
                    display: false,
                },
            },
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
        }
    };

    const rfpOverviewOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                boxHeight: 5,
                boxWidth: 40,
            },
        },
    };

    const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

    const data = {
        labels,
        datasets: [
            {
                type: 'line',
                label: 'Construct Connect',
                data: [1, 2, 3, 4],
                borderColor: '#E98484',
                borderWidth: '1',
                backgroundColor: '#E98484',
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: 'transparent',
            },
            {
                type: 'line',
                label: 'Merx',
                data: [3, 1, 3, 4],
                borderColor: '#7493B9',
                borderWidth: '1',
                backgroundColor: '#7493B9',
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: 'transparent',
            },
            {
                type: 'line',
                label: 'Biddingo',
                data: [2, 2, 3, 4],
                borderColor: '#DDCA88',
                borderWidth: '1',
                backgroundColor: '#DDCA88',
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: 'transparent',
            },
            {
                type: 'line',
                label: 'Bids & Tenders',
                data: [4, 3, 2, 1],
                borderColor: '#88DDBF',
                borderWidth: '1',
                backgroundColor: '#88DDBF',
                fill: false,
                pointRadius: 3,
                pointBackgroundColor: 'transparent',
            },
        ],
    };

    useEffect(() => {
        const call = async () => {
            setisLoading([true, true, true])
            await axios.get(HOST + RFP_TRENDING, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            }).then((res) => {
                const arr = res.data.res;

                let obj = { City: [], Department: [], Category: [] }
                arr.map(e => {
                    obj[e.Type].push(e.Name)
                })
                settrending(obj)
                setisLoading(prev => [false, ...prev.splice(1, 3)]);
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + RFP_ACTION, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            }).then((res) => {
                const arr = res.data.res;
                let newArr = action
                let i = 1;
                arr.map(e => {
                    newArr[i++] = e.Count
                })
                setaction(newArr)
                setisLoading(prevState => [prevState[0], false, ...prevState.splice(2, 3)])
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })
        }

        call()
    }, [month])

    return (
        <>
            <p style={styles.trendingHeader}>Trending</p>
            <div style={{ padding: "0px" }} className='d-flex flex-row justify-content-between'>
                <div className='col p-0' style={{...styles.trendingContainer, marginLeft: "0px"}}>
                    <p style={styles.trendingContainerHeading}>Cities</p>
                    {isLoading[0]
                        ? <LoadingSpinner />
                        : trending.City.map(e => {
                            return (
                                <div style={styles.trendingContainer2} key={e}>{e}</div>
                            )
                        })
                    }
                </div>
                <div className='col p-0' style={styles.trendingContainer}>
                    <p style={styles.trendingContainerHeading}>Departments</p>
                    {isLoading[0]
                        ? <LoadingSpinner />
                        : trending.Department.map(e => {
                            return (
                                <div style={styles.trendingContainer2} key={e}>{e}</div>
                            )
                        })
                    }
                </div>
                <div className='col p-0' style={styles.trendingContainer}>
                    <p style={styles.trendingContainerHeading}>Project Category</p>
                    {isLoading[0]
                        ? <LoadingSpinner />
                        : trending.Category.map(e => {
                            return (
                                <div style={styles.trendingContainer2} key={e}>{e}</div>
                            )
                        })
                    }
                </div>
                <div className='col p-0' style={{ ...styles.trendingContainer, backgroundColor: "#FFFFFF", marginRight: "0px" }}>
                    <p style={styles.trendingContainerHeading}>Action Go/No Go</p>
                    {isLoading[1] ? <LoadingSpinner /> :
                        <>
                            <div style={{ marginLeft: "8px" }} className='d-flex flex-row align-items-center'>
                                <p style={styles.actionChartSubheader}>{action[4]} RFPs</p>
                                <p style={styles.actionChartSubheader2}>{(Math.abs(action[4] - action[3]) / action[3]) * 100}% than last week</p>
                            </div>
                            <div style={{ width: "200px", height: "75px", }} className='d-flex flex-row justify-content-center align-items-center'>
                                <Line options={options} data={{
                                    labels: [1, 2, 3, 4, 5],
                                    datasets: [
                                        {
                                            data: action,
                                            borderColor: 'rgb(255, 99, 132)',
                                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                            pointRadius: 0
                                        },
                                    ],
                                }} width={265} height={90} /></div>
                        </>}
                </div>
            </div>
            <div style={styles.largeContainer}>
                <div className='row justify-content-between' style={{ marginLeft: "16px", marginRight: "16px" }}>
                    <p style={styles.largeContainerHeading}>RFP Overview</p>
                    <img src={pinnedActive} alt="Dashboard Icon" style={styles.pinnedIcon} />
                </div>
                <Line options={rfpOverviewOptions} data={data} height={105} />
            </div>
        </>
    )
}

export default RFPCharts