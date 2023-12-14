import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart, Line, Bar, Doughnut } from "react-chartjs-2";
import {
  HOST,
  RFP_ACTION,
  PROJECT_TRENDING,
  GET_PROJECT_VALUES,
  GET_PROJECT_NAMES,
  GET_HOURS_WORKED,
  GET_PROJECT_CITY,
  PROPOSALS_TRENDING,
  GET_PROPOSAL_VALUES,
  GET_HOURS_WORKED_PROPOSALS,
  GET_PROPOSAL_DEPARTMENT,
  GET_PROPOSAL_STATUS,
  GET_PROPOSAL_MANAGER,
  GET_PROPOSAL_CITY,
  PRIMARY_COLOR
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import pinnedActive from "../../Images/Pin icon_Active.svg";
import { Form } from "react-bootstrap";

const styles = {
    container: {
        width: "32%",
        margin: "0px 10px",
        boxSizing: "border-box",
        height: "auto",
        background: "#FFFFFF",
        border: "1px solid #EBE9F1",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        marginTop: "24px",
    },
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
    width: "24%",
    height: "140px",
    left: "20px",
    top: "116px",
    background: "#FEFEFE",
    border: "1px solid #EBE9F1",
    borderRadius: "12px",
    paddingRight: "8px",
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
    color: PRIMARY_COLOR,
  },
  trendingContainer2: {
    padding: "4px 8px",
    gap: "50px",
    // width: "192px",
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
    textOverflow: "ellipsis",
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
    marginBottom: "0px",
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
    marginBottom: "0px",
  },
  largeContainer: {
    width: "100%",
    height: "auto",
    background: "#FFFFFF",
    border: "1px solid #EBE9F1",
    borderRadius: "12px",
    marginTop: "24px",
    paddingBottom:'20px'
  },
  pinnedIcon: {
    width: "20px",
    float: "right",
  },
  largeContainerHeading: {
    width: "auto",
    height: "28px",
    marginTop: "16px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    color: "#0A0A0A",
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
    color: "#0A0A0A",
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
    color: "#34A853",
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
    color: "#ff0000",
  },
  designPrice2: {
    width: "134px",
    height: "16px",
    marginLeft: "8px",
    marginTop: "8px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#70757A",
  },
  headerDropdown3: {
    padding: "8px 12px",
    gap: "12px",
    width: "200px",
    height: "40px",
    border: "1px solid #EBE9F1",
    borderRadius: "5px",
    marginTop: "12px",
    marginLeft: "500px",
  },
  projectName: {
    marginLeft: "40px",
    marginTop: "36px",
    width: "auto",
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#70757A",
  },
  hoursWorkedHeading: {
    marginTop: "8px",
    marginLeft: "40px",
    width: "106px",
    height: "16px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#70757A",
  },
  hoursWorked: {
    marginTop: "2px",
    marginLeft: "40px",
    width: "auto",
    height: "16px",
    left: "671px",
    top: "122px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#0A0A0A",
  },
  valueHeading: {
    marginTop: "16px",
    marginLeft: "40px",
    width: "71px",
    height: "16px",
    left: "671px",
    top: "154px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#70757A",
  },
  value: {
    marginTop: "2px",
    marginLeft: "40px",
    width: "auto",
    height: "16px",
    left: "671px",
    top: "172px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#0A0A0A",
  },
  length: {
    marginTop: '8px',
    marginLeft: '8px',
    width: "9px",
    height: "20px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "20px",
    color: "#0A0A0A"
  },
  list: {
    marginTop: '4px',
    marginLeft: '8px',
    width: "192px",
    height: "64px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "12px",
    lineHeight: "16px",
    color: "#70757A"
  },
  heading: {
    width: "211px",
    height: "28px",
    marginLeft: "16px",
    marginTop: "12px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#0A0A0A"
  }
};
function ProposalCharts(props) {
  const { month } = props;
  const [isLoading, setisLoading] = useState([true, true, true]);
  const [trending, settrending] = useState({ City: [], Category: [] });
  const [trending1, settrending1] = useState({
    Price_this_month: [],
    Price_last_month: [],
    Closing_this_month: [],
  });

  const [isLoadingChart1, setisLoadingChart1] = useState(false);
  const [isLoadingChart2, setisLoadingChart2] = useState(false);
  const [isLoadingd1, setisLoadingd1] = useState(false);
  const [isLoadingd2, setisLoadingd2] = useState(false);
  const [isLoadingd3, setisLoadingd3] = useState(false);
  const [len, setlen] = useState(0);
  const [hoursWorked, setHoursWorked] = useState([]);
  const [sum, setsum] = useState(0);
  const [departmentData, setdepartmentData] = useState([]);
  const [statusData, setstatusData] = useState([]);
  const [managerData, setmanagerData] = useState([]);
  const [proposalsCount, setproposalsCount] = useState([]);

  let year = new Date().getFullYear();
  let mon = parseInt(month) + 1;
  let mont = mon < 10 ? `0${mon}` : mon;
  let d = `${year}-${mont}-01`;
  useEffect(() => {
    const call = async () => {
      setisLoading([true, true, true]);
      setisLoadingChart2(true);
      setisLoadingChart1(true);
      setisLoadingd1(true)
      setisLoadingd2(true)
      setisLoadingd3(true)
      await axios
        .get(HOST + PROPOSALS_TRENDING, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          const arr = res.data.res;
          console.log(arr);

          let obj = { City: [], Category: [] };
          arr.map((e) => {
            obj[e.type].push(e.name);
          });
          
          settrending(obj);
          setisLoading((prev) => [false, ...prev.splice(1, 3)]);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_PROPOSAL_VALUES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
            const arr = res.data.res;

          let obj = { Price_this_month: [], Price_last_month: [], Closing_this_month: [] };
          arr.map((e) => {
            obj[e.Type].push(e.sum);
          });
          setlen(obj.Closing_this_month.length)
          settrending1(obj)
          setisLoading((prevState) => [
            prevState[0],
            false,
            ...prevState.splice(2, 3),
          ]);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_HOURS_WORKED_PROPOSALS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            day: d,
            //  "Culvert Placement and Lining Rehabilitation"
          },
        })
        .then((res) => {
          setHoursWorked(res.data.res);
          let total = 0;
          res.data.res.map((e) => {
            total += e.Time_Worked;
          });
          setsum((total / 60).toFixed(1));
          setisLoadingChart1(false);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_PROPOSAL_DEPARTMENT, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
            console.log(res.data.res)
          setdepartmentData(res.data.res);
          setisLoadingd1(false);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_PROPOSAL_STATUS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setstatusData(res.data.res);
          setisLoadingd2(false);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_PROPOSAL_MANAGER, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setmanagerData(res.data.res);
          setisLoadingd3(false);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

        await axios
        .get(HOST + GET_PROPOSAL_CITY, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            month: month+1
          },
        })
        .then((res) => {
            console.log(res.data.res)
          setproposalsCount(res.data.res);
          setisLoadingChart2(false);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });
    };

    call();
  }, [month]);

  const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
  const data = {
    labels,
    datasets: [
      {
        label: "Hours Worked",
        data: hoursWorked
          ? hoursWorked.map((e) => (e.Time_Worked / 60).toFixed(1))
          : [0, 0, 0, 0],
        backgroundColor: "#DBDBF4",
      },
    ],
  };
  const data1 = {
    labels: proposalsCount?proposalsCount.map(e=>e.City):["City 1", "City 2", "City 3", "City 4"],
    datasets: [
      {
        label: "# of Proposals",
        data: proposalsCount
          ? proposalsCount.map((e) => e.count)
          : [0, 0, 0, 0],
        backgroundColor: "#DBDBF4",
      },
    ],
  };
  const projectOverViewOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        boxHeight: 5,
        boxWidth: 20,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
            precision: 0
        },
        grid: {
            display: false,
        }
      }
    },
  };
  
  const dData1 = {
    labels: departmentData?departmentData.map(e=>e.Department):[],
    datasets: [
      {
        label: "# of Proposals",
        data: departmentData?departmentData.map(e=>e.count):[],
        backgroundColor: [
          "#A9A9C6",
          "#C6D27D",
          "#D27DAB",
          "#D29C7D",
          "#F3683C",
          "#6960A3",
          "#60A392",
          "#CF40E7",
          "#87B3F6",
          "#7D6557",
          "#989492",
          "#F2C85B"
        ]
      }
    ]
  };
  const dData2 = {
    labels: statusData?statusData.map(e=>e.Status):[],
    datasets: [
      {
        label: "# of Proposals",
        data: statusData?statusData.map(e=>e.count):[],
        backgroundColor: [
          "#559776",
          "#D93838",
          "#FD9568",
        ]
      }
    ]
  };

  const dData3 = {
    labels: managerData?managerData.map(e=>e.Full_Name):[],
    datasets: [
      {
        label: "# of Proposals",
        data: managerData?managerData.map(e=>e.count):[],
        backgroundColor: [
          "#625597",
          "#CAC4D7",
          "#AFD8B6",
        ]
      }
    ]
  };
  const dOptions = {
    cutout: 130,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          generateLabels: function (chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels
                .map((label, index) => {
                  const value = data.datasets[0].data[index];
                  return {
                    text: `${label}: ${value}`,
                    fillStyle: data.datasets[0].backgroundColor[index],
                    hidden: isNaN(value) || value <= 0,
                    index: index
                  };
                })
                .filter((label) => label.text.indexOf(": 0") < 0);
            }
            return [];
          },
          // Set the maximum width of each legend label
          maxWidth: 100,
          padding: 10,
          // Wrap label text when it exceeds the maximum width
          wordWrap: true,
          // Show legend labels in a vertical layout
          multiLine: true
        }
      }
    },
    maintainAspectRatio: true
  };
  return (
    <>
      <p style={styles.trendingHeader}>Trending</p>
      <div
        style={{ padding: "0px" }}
        className="d-flex flex-row justify-content-evenly"
      >
        <div style={styles.trendingContainer}>
          <p style={styles.trendingContainerHeading}>Cities</p>
          {isLoading[0] ? (
            <LoadingSpinner />
          ) : (
            trending.City.map((e) => {
              return (
                <div style={styles.trendingContainer2} key={e}>
                  {e}
                </div>
              );
            })
          )}
        </div>
        <div style={styles.trendingContainer}>
          <p style={styles.trendingContainerHeading}>Project Category</p>
          {isLoading[0] ? (
            <LoadingSpinner />
          ) : (
            trending.Category.map((e) => {
              return (
                <div style={styles.trendingContainer2} key={e}>
                  {e}
                </div>
              );
            })
          )}
        </div>
        <div style={styles.trendingContainer}>
          <p style={styles.trendingContainerHeading}>Design Price</p>
          {isLoading[1] ? (
            <LoadingSpinner />
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={styles.designPrice1}>
                  $ {trending1.Price_this_month}
                </div>
                <div
                  style={
                    trending1.Price_this_month > trending1.Price_last_month
                      ? styles.designPrice12green
                      : styles.designPrice12red
                  }
                >
                  {(
                    (Math.abs(
                      trending1.Price_this_month - trending1.Price_last_month
                    ) /
                      trending1.Price_this_month) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
              <div style={styles.designPrice2}>
                v/s last month : ${" "}
                <b style={{ color: "#000000" }}>{trending1.Price_last_month}</b>
              </div>
            </>
          )}
        </div>
        <div style={styles.trendingContainer}>
          <p style={styles.trendingContainerHeading}>Proposals Closing this month</p>
          {isLoading[1] ? (
            <LoadingSpinner />
          ) : (
            <>
            <div style={styles.length}>{len}</div>
            <div style={styles.list}>
            {len<=3?
            trending1.Closing_this_month.map((e)=>{
                return (
                    <div>{e}</div>
                )
            }):<>
            <div>{trending1.Closing_this_month[0]}</div>
            <div>{trending1.Closing_this_month[1]}</div>
            <div>{trending1.Closing_this_month[2]}</div>
            <div>+{len-3} others</div>
            </>}</div>
          </>)}
        </div>
        
      </div>
      <div className="d-flex flex-row justify-content-evenly">
      </div>
      <div className='d-flex flex-row justify-content-between' style={{ marginLeft: "16px", marginRight: "16px" }}>

      <div style={{ ...styles.container, marginLeft: "0px" }} className='col'>
        <div style={styles.heading}>Proposals v/s Department</div>
        {isLoadingd1?<LoadingSpinner/>:<div style={{ textAlign:'center', marginTop: '20px', marginBottom:'20px'}}><Doughnut options={dOptions} data={dData1} width={35}/></div>}
      </div>
      <div style={{ ...styles.container, marginLeft: "0px" }} className='col'>
        <div style={styles.heading}>Proposal Status</div>
        {isLoadingd2?<LoadingSpinner/>:<div style={{ textAlign:'center', marginTop: '20px'}}><Doughnut options={dOptions} data={dData2} width={35}/></div>}
      </div>
      <div style={{ ...styles.container, marginLeft: "0px" }} className='col'>
        <div style={styles.heading}>Projest Managers</div>
        {isLoadingd3?<LoadingSpinner/>:<div style={{ textAlign:'center', marginTop: '20px'}}><Doughnut options={dOptions} data={dData3} width={35}/></div>}
      </div>
      </div>
      <div className="d-flex flex-row justify-content-evenly">
        <div style={styles.largeContainer}>
          <div
            className="d-flex flex-row justify-content-between"
            style={{ marginLeft: "16px", marginRight: "16px" }}
          >
            <p style={styles.largeContainerHeading}>Proposals v/s Cities</p>
            <img
              src={pinnedActive}
              alt="Dashboard Icon"
              style={styles.pinnedIcon}
            />
          </div>
          {isLoadingChart2 ? (
            <LoadingSpinner />
          ) : (
            <div
              style={{
                marginTop: "20px",
                marginLeft: "40px",
                marginRight: "40px",
              }}
            >
              <Bar options={projectOverViewOptions} data={data1} height={120} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProposalCharts;
