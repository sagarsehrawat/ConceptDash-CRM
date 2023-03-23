import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Chart, Line } from 'react-chartjs-2'
import { HOST, RFP_ACTION, PROJECT_TRENDING, GET_PROJECT_VALUES, GET_PROJECT_NAMES, GET_HOURS_WORKED } from '../Constants/Constants'
import LoadingSpinner from '../Loader/Loader'
import pinnedActive from '../../Images/Pin icon_Active.svg'
import { Form } from 'react-bootstrap'

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
        width: "208px",
        height: "140px",
        left: "20px",
        top: "116px",
        background: "#FEFEFE",
        border: "1px solid #EBE9F1",
        borderRadius: "12px"
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
        width: "192px",
        height: "28px",
        marginLeft: "8px",
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
        width: "892px",
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
    designPrice1: {
        width: "auto",
        height: "20px",
        marginLeft: "9px",
        marginTop: "12px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "20px",
        color: "#0A0A0A"
    },
    designPrice12green: {
        width: "26px",
        height: "16px",
        marginLeft: "24px",
        marginTop: "14px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#34A853"
    },
    designPrice12red: {
        width: "26px",
        height: "16px",
        marginLeft: "24px",
        marginTop: "14px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#ff0000"
    },
    designPrice2:{
        width: "134px",
        height: "16px",
        marginLeft: "8px",
        marginTop: "8px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        color: "#70757A"
    },
    headerDropdown3: {
        padding: "8px 12px",
      gap: "12px",
      width: "157px",
      height: "40px",
      border: "1px solid #EBE9F1",
      borderRadius: "5px",
      marginTop: "12px",
    }
}
function ProjectCharts(props) {
    const { month } = props
    const [isLoading, setisLoading] = useState([true, true, true])
    const [trending, settrending] = useState({ City: [], Category: [] })
    const [trending1, settrending1] = useState({ Price_this_month: [], Price_last_month: [], Closing_this_month: [], Closing_last_month: [] })
    const [projectName, setprojectName] = useState([]);
    useEffect(() => {
        const call = async () => {
            setisLoading([true, true, true])
            await axios.get(HOST + PROJECT_TRENDING, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    month: month
                },
            }).then((res) => {
                const arr = res.data.res;

                let obj = { City: [], Category: [] }
                arr.map(e => {
                    obj[e.Type].push(e.Name)
                })
                settrending(obj)
                setisLoading(prev => [false, ...prev.splice(1, 3)]);
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + GET_PROJECT_VALUES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            }).then((res) => {
                const arr = res.data.res;

                let obj = { Price_this_month: [], Price_last_month: [], Closing_this_month: [], Closing_last_month: [] }
                arr.map(e => {
                    obj[e.Type].push(e.sum)
                })
                settrending1(obj);
                setisLoading(prevState => [prevState[0], false, ...prevState.splice(2, 3)])
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })
            await axios.get(HOST + GET_PROJECT_NAMES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            }).then((res) => {
                setprojectName(res.data.res)
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })

            await axios.get(HOST + GET_HOURS_WORKED, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    month: month+1,
                    project: 'Culvert Placement and Lining Rehabilitation'
                },
            }).then((res) => {
                console.log(res.data.res)
            }).catch((err) => {
                console.error("Error fetching chart data: ", err);
            })
            
        }

        call()
    }, [month])
  const [project, setproject] = useState('');
  return (
    <>
        <p style={styles.trendingHeader}>Trending</p>
            <div style={{ padding: "0px" }} className='d-flex flex-row justify-content-evenly'>
                <div style={styles.trendingContainer}>
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
                {/* <div style={styles.trendingContainer}>
                    <p style={styles.trendingContainerHeading}>Departments</p>
                    {isLoading[0]
                        ? <LoadingSpinner />
                        : trending.Department.map(e => {
                            return (
                                <div style={styles.trendingContainer2} key={e}>{e}</div>
                            )
                        })
                    }
                </div> */}
                <div style={styles.trendingContainer}>
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
                {/* <div style={{ ...styles.trendingContainer, backgroundColor: "#FFFFFF" }}>
                    <p style={styles.trendingContainerHeading}>Design Price</p>
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
                </div> */}
                <div style={styles.trendingContainer}>
                    <p style={styles.trendingContainerHeading}>Project Value</p>
                    {isLoading[1]
                        ? <LoadingSpinner />
                        : <>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={styles.designPrice1}>$ {trending1.Price_this_month}</div>
                                <div style= {trending1.Price_this_month<trending1.Price_last_month ? styles.designPrice12green: styles.designPrice12red} >{((Math.abs(trending1.Price_this_month-trending1.Price_last_month) / trending1.Price_this_month) * 100).toFixed(1)}%</div>
                            </div>
                            <div style={styles.designPrice2}>
                                v/s last month : $ <b  style={{color: '#000000'}}>{trending1.Price_last_month}</b>
                            </div>
                        </>
                    }
                </div>
                <div style={styles.trendingContainer}>
                <p style={styles.trendingContainerHeading}>Project Closing this month</p>
                    {isLoading[1]
                        ? <LoadingSpinner />
                        : <>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <div style={styles.designPrice1}>{trending1.Closing_this_month?trending1.Closing_this_month:'-'}</div>
                                <div style= {trending1.Closing_this_month<trending1.Closing_last_month ? styles.designPrice12green: styles.designPrice12red} >{((Math.abs(trending1.Closing_this_month-trending1.Closing_last_month) / trending1.Closing_last_month) * 100).toFixed(1)}%</div>
                            </div>
                            <div style={styles.designPrice2}>
                                v/s last month : <b  style={{color: '#000000'}}>{trending1.Closing_last_month}</b>
                            </div>
                        </>
                    }
                </div>
                
            </div>
            <div style={styles.largeContainer}>
                <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "16px", marginRight: "16px" }}>
                    <p style={styles.largeContainerHeading}>Hours Worked</p>
                    <Form.Select
                        style={styles.headerDropdown3}
                        onChange={(e) => {
                            e.preventDefault();
                            setproject(e.target.value);
                        }}
                        >
                        {projectName.map((e)=>(
                            <option value={e.Project_Name}>{e.Project_Name}</option>
                        ))}
                    </Form.Select>
                    <img src={pinnedActive} alt="Dashboard Icon" style={styles.pinnedIcon} />
                </div>
                
            </div>
    </>
  )
}

export default ProjectCharts
