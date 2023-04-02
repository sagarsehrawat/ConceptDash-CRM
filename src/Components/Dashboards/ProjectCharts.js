import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart, Line, Bar } from "react-chartjs-2";
import {
  HOST,
  RFP_ACTION,
  PROJECT_TRENDING,
  GET_PROJECT_VALUES,
  GET_PROJECT_NAMES,
  GET_HOURS_WORKED,
  GET_PROJECT_CITY,
} from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";
import pinnedActive from "../../Images/Pin icon_Active.svg";
import { Form } from "react-bootstrap";

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
    width: "24%",
    height: "140px",
    left: "20px",
    top: "116px",
    background: "#FEFEFE",
    border: "1px solid #EBE9F1",
    borderRadius: "12px",
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
    color: "#6519E1",
  },
  trendingContainer2: {
    padding: "4px 8px",
    marginRight: "8px",
    gap: "50px",
    // width: "100%",
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
    paddingBottom:'10px'
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
    // marginLeft: "500px",
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
};
function ProjectCharts(props) {
  const { month } = props;
  const [isLoading, setisLoading] = useState([true, true, true]);
  const [trending, settrending] = useState({ City: [], Category: [] });
  const [trending1, settrending1] = useState({
    Price_this_month: [],
    Price_last_month: [],
    Closing_this_month: [],
    Closing_last_month: [],
  });
  const [projectName, setprojectName] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);
  const [isLoadingChart1, setisLoadingChart1] = useState(false);
  const [isLoadingChart2, setisLoadingChart2] = useState(false);
  const [projectsCount, setprojectCount] = useState([]);
  const [sum, setsum] = useState(0);
  let year = new Date().getFullYear();
  let mon = parseInt(month) + 1;
  let mont = mon < 10 ? `0${mon}` : mon;
  let d = `${year}-${mont}-01`;
  useEffect(() => {
    const call = async () => {
      setisLoading([true, true, true]);
      setisLoadingChart2(true);
      setisLoadingChart1(true);
      await axios
        .get(HOST + PROJECT_TRENDING, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          const arr = res.data.res;

          let obj = { City: [], Category: [] };
          arr.map((e) => {
            obj[e.Type].push(e.Name);
          });
          settrending(obj);
          setisLoading((prev) => [false, ...prev.splice(1, 3)]);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

      await axios
        .get(HOST + GET_PROJECT_VALUES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          const arr = res.data.res;

          let obj = {
            Price_this_month: [],
            Price_last_month: [],
            Closing_this_month: [],
            Closing_last_month: [],
          };
          arr.map((e) => {
            obj[e.Type].push(e.sum);
          });
          settrending1(obj);
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
        .get(HOST + GET_PROJECT_NAMES, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
          },
        })
        .then((res) => {
          setprojectName(res.data.res);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

      await axios
        .get(HOST + GET_HOURS_WORKED, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            day: d,
            project: project
            //  "Culvert Placement and Lining Rehabilitation"
          },
        })
        .then((res) => {
          console.log(res.data.res)
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
        .get(HOST + GET_PROJECT_CITY, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth")
          },
        })
        .then((res) => {
         setprojectCount(res.data.res)
         setisLoadingChart2(false)
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
    labels: projectsCount?projectsCount.map(e=>e.City):["City 1", "City 2", "City 3", "City 4"],
    datasets: [
      {
        label: "No. Of Projects",
        data: projectsCount
        ? projectsCount.map((e) => e.count)
        : [0, 0, 0, 0],
        backgroundColor: "#CBC4D7",
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
  const [project, setproject] = useState("");
  const [projectValue, setprojectValue] = useState(0);

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
          <p style={styles.trendingContainerHeading}>Project Value</p>
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
                    trending1.Price_this_month < trending1.Price_last_month
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
          <p style={styles.trendingContainerHeading}>
            Project Closing this month
          </p>
          {isLoading[1] ? (
            <LoadingSpinner />
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div style={styles.designPrice1}>
                  {trending1.Closing_this_month
                    ? trending1.Closing_this_month
                    : "-"}
                </div>
                <div
                  style={
                    trending1.Closing_this_month < trending1.Closing_last_month
                      ? styles.designPrice12green
                      : styles.designPrice12red
                  }
                >
                  {(
                    (Math.abs(
                      trending1.Closing_this_month -
                        trending1.Closing_last_month
                    ) /
                      trending1.Closing_last_month) *
                    100
                  ).toFixed(1)}
                  %
                </div>
              </div>
              <div style={styles.designPrice2}>
                v/s last month :{" "}
                <b style={{ color: "#000000" }}>
                  {trending1.Closing_last_month}
                </b>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="d-flex flex-row justify-content-evenly">
      <div style={styles.largeContainer}>
        <div
        className="d-flex flex-row justify-content-between"
          style={{
            marginLeft: "16px",
            marginRight: "16px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={styles.largeContainerHeading}>Hours Worked</div>
          <div style={{dispaly:'flex', flexDirection:'row'}}>
            <Form.Select
              style={styles.headerDropdown3}
              onChange={(e) => {
                e.preventDefault();
                setproject(e.target.value);
              }}
            >
              <option>Select Project</option>
              {projectName.map((e) => (
                <option value={e.Project_Name}>{e.Project_Name}</option>
              ))}
            </Form.Select>
            {/* <img src={pinnedActive} alt="Dashboard Icon" /> */}
            </div>
        </div>
        {isLoadingChart1?<LoadingSpinner/>:<>{project === "" ? (
          <div style={{textAlign: 'center', fontSize: '2rem', marginTop: '100px'}}>Please Select a project</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{ marginLeft: "50px", width: "65%", marginTop: "30px" }}
            >
              <Bar options={projectOverViewOptions} data={data} height={165} />
            </div>
            <div>
              <div style={styles.projectName}>{project}</div>
              <div style={styles.hoursWorkedHeading}>Total Worked Hours</div>
              <div style={styles.hoursWorked}>{sum} Hrs</div>
              <div style={styles.valueHeading}>Project Value</div>
              <div style={styles.value}>{projectValue} $</div>
            </div>
          </div>
        )}</>}
      </div></div>

      <div className="d-flex flex-row justify-content-evenly">
      <div style={styles.largeContainer}>
        <div
          className="d-flex flex-row justify-content-between"
          style={{ marginLeft: "16px", marginRight: "16px" }}
        >
          <p style={styles.largeContainerHeading}>Projects v/s Cities</p>
          <img
            src={pinnedActive}
            alt="Dashboard Icon"
            style={styles.pinnedIcon}
          />
        </div>
        {isLoadingChart2?<LoadingSpinner/>:
        <div style={{marginTop:'20px', marginLeft: '40px', marginRight:'40px'}}><Bar options={projectOverViewOptions}  data={data1} height={120} /></div>}
      </div></div>
    </>
  );
}

export default ProjectCharts;
