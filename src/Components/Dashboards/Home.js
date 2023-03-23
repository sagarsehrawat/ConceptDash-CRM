import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { primaryColour } from "../Constants/styles";
import pinnedActive from "../../Images/Pin icon_Active.svg";
import pinnedInactive from "../../Images/Pin icon.svg";
import cross from "../../Images/cross.svg";
import BudgetCharts from "./BudgetCharts";
import axios from "axios";
import { HOST, PROJECT_CHART, GET_ADMIN_TASKS } from "../Constants/Constants";
import deadlineImage from "../../Images/Vector.png";
import Time from "../../Images/Time.png";
import RFPCharts from "./RFPCharts";
import LoadingSpinner from "../Loader/Loader";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization, extend } from "@syncfusion/ej2-base";
import { gapi } from "gapi-script";
import ProjectCharts from "./ProjectCharts";

const Home = (props) => {
  const { isCollapsed } = props;
  const styles = {
    contentArea: {
      width: "64.722vw",
      height: "842px",
      background: "#F8FAFB",
    },
    projectOverviewLine: {
      height: "0px",
      marginLeft: "20px",
      marginRight: "20px",
      top: "152px",
      border: "1px solid #EBE9F1",
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
      marginTop: "20px",
    },
    projectOverviewContainers: {
      width: "208px",
      height: "68px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
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
      marginBottom: "0px",
    },
    projectOverviewNumber: {
      width: "31px",
      height: "28px",
      marginLeft: "12px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      color: "#0A0A0A",
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
      marginRight: "20px",
    },
    exportButtonIcon: {
      height: "20px",
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
      marginBottom: "0px",
    },
    headerDropdown2: {
      padding: "8px 12px",
      gap: "12px",
      width: "317px",
      height: "40px",
      border: "1px solid #EBE9F1",
      borderRadius: "5px",
    },
    headerDropdown3: {
      padding: "8px 12px",
      gap: "12px",
      width: "157px",
      height: "40px",
      border: "1px solid #EBE9F1",
      borderRadius: "5px",
    },
    chartsContainer: {
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "20px",
    },
    deadlines: {
      boxSizing: "border-box",
      width: "18.056vw",
      height: "93px",
      left: "1180px",
      marginTop: "20px",
      background: "#E84C3D",
      border: "1px solid #E84C3D",
      boxShadow: "0px 5px 4px rgba(232, 76, 61, 0.25)",
      borderRadius: "12px",
    },
    celebrations: {
      width: "18.056vw",
      height: "96px",
      left: "1180px",
      marginTop: "16px",
      background:
        "linear-gradient(102.69deg, #EFE2F7 1.6%, rgba(216, 236, 244, 0.807866) 39.1%, rgba(239, 226, 247, 0) 96.08%)",
      filter: "drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.08))",
      borderRadius: "12px",
    },
    tasks: {
      boxSizing: "border-box",
      width: "18.056vw",
      height: "252px",
      left: "1180px",
      marginTop: "16px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
    },
    calendar: {
      boxSizing: "border-box",
      width: "18.056vw",
      height: "321px",
      left: "1180px",
      marginTop: "16px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
    },
    celebrationHeading: {
      width: "102px",
      height: "28px",
      marginLeft: "16px",
      marginTop: "12px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    tasksHeading: {
      width: "127px",
      height: "28px",
      marginLeft: "16px",
      marginTop: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    deadlineImage: {
      marginLeft: "17.67px",
      marginTop: "17.67px",
      transform: "rotate(-180deg)",
    },
    deadlineHeading: {
      width: "149px",
      height: "20px",
      marginLeft: "5.67px",
      marginTop: "16px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "14px",
      lineHeight: "20px",
      color: "#FBFBFB",
    },
    calendarHeading: {
      width: "159px",
      height: "28px",
      marginLeft: "20px",
      marginTop: "5px",
      marginBottom: "1px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    calendarBottom: {
      width: "90px",
      height: "14px",
      marginLeft: "85px",
      marginTop: "6px",
      marginBottom: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: "#6519E1",
      cursor: "pointer",
    },
    tasksBottom: {
      width: "90px",
      height: "14px",
      marginLeft: "105px",
      marginBottom: "12px",
      marginTop: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: "#6519E1",
      cursor: "pointer",
    },
    celebrationsCross: {
      marginLeft: '113.6px',
      marginTop: '12.6px',
    },
    celebrationBottom: {
      width: "52px",
      height: "14px",
      left: "105px",
      top: "100px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: "#6519E1",
    },
    rect1: {
      width: "3px",
      height: "46px",
      left: "16px",
      top: "48px",
      background: "#C12F23",
      borderRadius: "40px",
    },
    task1: {
      width: "225px",
      height: "44px",
      left: "19px",
      top: "49px",
      background: "#FFF6F5",
      borderRadius: "0px 8px 8px 0px",
      paddingLeft: "10px",
      fontSize: "13px",
      fontFamily: "Roboto",
    },
    //   task1Heading: {
    //     position: "absolute",
    //     width: "211px",
    //     height: "20px",
    //     left: "24px",
    //     top: "53px",
    //     fontFamily: "'Roboto'",
    //     fontStyle: "normal",
    //     fontWeight: 400,
    //     fontSize: "13px",
    //     lineHeight: "20px",
    //     color: "#0A0A0A",
    //   },
    rect2: {
      width: "3px",
      height: "46px",
      left: "16px",
      top: "106px",
      background: "#EBAF38",
      borderRadius: "40px",
    },
    task2: {
      width: "225px",
      height: "44px",
      left: "19px",
      top: "107px",
      background: "#FFF8EA",
      borderRadius: "0px 8px 8px 0px",
      paddingLeft: "10px",
      fontSize: "13px",
      fontFamily: "Roboto",
    },
    rect3: {
      width: "3px",
      height: "46px",
      left: "16px",
      top: "164px",
      background: "#3DB9EA",
      borderRadius: "40px",
    },
    task3: {
      width: "225px",
      height: "44px",
      left: "19px",
      top: "165px",
      background: "#ECFAFF",
      borderRadius: "0px 8px 8px 0px",
      paddingLeft: "10px",
      fontSize: "13px",
      fontFamily: "Roboto",
    },
  };
  const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar";

  const [events, setEvents] = useState(null);
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    const handleScriptLoad = () => {
      if (window.gapi) {
        window.gapi.load("client:auth2", initClient);
        script.removeEventListener("load", handleScriptLoad);
      }
    };

    script.addEventListener("load", handleScriptLoad);

    return () => {
      script.removeEventListener("load", handleScriptLoad);
    };
  }, []);
  const openSignInPopup = async () => {
    localStorage.removeItem("access_token");
    await window.gapi.auth2.authorize(
      {
        client_id:
          "52169325708-ujav1fof3lgebds8reurj0e74ua0tsgo.apps.googleusercontent.com",
        scope: SCOPES,
      },
      (res) => {
        if (res) {
          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);

          // Load calendar events after authentication
          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };
  const [isLoadingCal, setisLoadingCal] = useState(false);
  const initClient = async () => {
    setisLoadingCal(true);
    if (!localStorage.getItem("access_token")) {
      await openSignInPopup();
    } else {
      // Get events if access token is found without sign in popup
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyCD_8FIN6MsCjNbFY7GxOWxwDm7kmn-tX4&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          // Check if unauthorized status code is return open sign in popup
          if (res.status !== 401) {
            return res.json();
          } else {
            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
            setisLoadingCal(false);
          }
        });
    }
  };
  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        showDeleted: true,
        singleEvents: true,
        timeMax: "2024-09-29T10:00:00+05:30",
        timeMin: "2021-10-26T13:00:00+05:30",
        maxResults: 500,
      })
      .then(function (response) {
        let events = response.result.items;
        if (events.length > 0) {
          setEvents(formatEvents(events));
        }
        setisLoadingCal(false);
      });
  };
  const formatEvents = (list) => {
    return list.map((item) => ({
      Id: item.id,
      Subject: item.summary,
      StartTime: new Date(item.start.dateTime) || new Date(item.start.date),
      EndTime: new Date(item.end.dateTime) || new Date(item.end.date),
      meetingLink: item.hangoutLink,
      isAllDay: false,
    }));
  };
  const handleEventClick = (e) => {
    const googleMeetLink = e.event.meetingLink;
    window.open(googleMeetLink, "_blank");
  };

  const instance = new Internationalization();
  function getTimeString(value) {
    return instance.formatDate(value, { skeleton: "hm" });
  }
  function eventTemplate(props) {
    return (
      <div className="template-wrap">
        <div className="subject">{props.Subject}</div>
        <div className="time">
          Time: {getTimeString(props.StartTime)} -{" "}
          {getTimeString(props.EndTime)}
        </div>
      </div>
    );
  }
  const [chartComponent, setchartComponent] = useState("0");
  const [year, setyear] = useState("0");
  const [month, setmonth] = useState(new Date().getMonth().toString());
  const [projects, setprojects] = useState([0, 0, 0, 0]);

  const handleChartsComponent = () => {
    if (chartComponent === "0") return <BudgetCharts year={year} />;
    if (chartComponent === "1") return <RFPCharts month={month} />;
    if (chartComponent === "2") return proposalCharts();
    if (chartComponent === "3") return <ProjectCharts month={month}/>;
  };

  const proposalCharts = () => {
    return <></>;
  };

  const projectCharts = () => {
    return <></>;
  };

  const [isLoadingTasks, setisLoadingTasks] = useState(false);
  const [title1, settitle1] = useState([]);
  const [title2, settitle2] = useState([]);
  const [title3, settitle3] = useState([]);

  const [dDate1, setdDate1] = useState([]);
  const [dDate2, setdDate2] = useState([]);
  const [dDate3, setdDate3] = useState([]);

  const [month1, setmonth1] = useState([]);
  const [month2, setmonth2] = useState([]);
  const [month3, setmonth3] = useState([]);
  useEffect(() => {
    setisLoadingTasks(true);
    const call = async () => {
      await axios
        .get(HOST + PROJECT_CHART, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            chart: "Status",
          },
        })
        .then((res) => {
          const arr = res.data.res;
          let p = projects;
          arr.map((e) => {
            if (e.Status === null) p[1] = e.Count;
            if (e.Status === "Ongoing") p[0] = e.Count;
            if (e.Status === "Not Started Yet") p[3] = e.Count;
            if (e.Status === "Completed") p[2] = e.Count;
          });
          setprojects(p);
        })
        .catch((err) => {
          console.error("Error fetching chart data: ", err);
        });

      await axios
        .get(HOST + GET_ADMIN_TASKS, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            id: localStorage.getItem("employeeId"),
          },
        })
        .then((res) => {
          settitle1(res.data.res[0].Title);
          settitle2(res.data.res[1].Title);
          settitle3(res.data.res[2].Title);
          const date1 = res.data.res[0].Due_Date;
          const date2 = res.data.res[1].Due_Date;
          const date3 = res.data.res[2].Due_Date;
          const utcDate1 = new Date(date1);
          const utcDate2 = new Date(date2);
          const utcDate3 = new Date(date3);
          const options = { month: "long" };
          setmonth1(utcDate1.toLocaleString("en-US", options));
          setmonth2(utcDate2.toLocaleString("en-US", options));
          setmonth3(utcDate3.toLocaleString("en-US", options));
          setdDate1(utcDate1.getUTCDate());
          setdDate2(utcDate2.getUTCDate());
          setdDate3(utcDate3.getUTCDate());
          setisLoadingTasks(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    call();
  }, []);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={styles.contentArea}>
          <div style={styles.projectOverviewBox}>
            <p style={styles.projectOverviewHeading}>Projects Overview</p>
            <div
              className="d-flex flex-row justify-content-between"
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                marginBottom: "20px",
              }}
            >
              <div style={styles.projectOverviewContainers}>
                <p style={styles.projectOverviewSubheading}>Ongoing Projects</p>
                <p style={styles.projectOverviewNumber}>{projects[0]}</p>
              </div>
              <div style={styles.projectOverviewContainers}>
                <p style={styles.projectOverviewSubheading}>New Projects</p>
                <p style={styles.projectOverviewNumber}>{projects[1]}</p>
              </div>
              <div style={styles.projectOverviewContainers}>
                <p style={styles.projectOverviewSubheading}>
                  Completed Projects
                </p>
                <p style={styles.projectOverviewNumber}>{projects[2]}</p>
              </div>
              <div style={styles.projectOverviewContainers}>
                <p style={styles.projectOverviewSubheading}>Total Projects</p>
                <p style={styles.projectOverviewNumber}>
                  {projects[0] + projects[1] + projects[2] + projects[3]}
                </p>
              </div>
            </div>
            <div style={styles.projectOverviewLine}></div>
          </div>
          <div
            style={styles.header}
            className="d-flex flex-row justify-content-between"
          >
            <Form.Select
              style={styles.headerDropdown}
              onChange={(e) => setchartComponent(e.target.value)}
            >
              <option value="0" style={{ fontFamily: "'Roboto'" }}>
                Budgets
              </option>
              <option value="1" style={{ fontFamily: "'Roboto'" }}>
                RFPs
              </option>
              <option value="2" style={{ fontFamily: "'Roboto'" }}>
                Proposals
              </option>
              <option value="3" style={{ fontFamily: "'Roboto'" }}>
                Projects
              </option>
            </Form.Select>
            <div className="d-flex flex-row">
              {/* <Button style={styles.exportButton}>
                <FontAwesomeIcon
                  icon={faCloudArrowDown}
                  style={styles.exportButtonIcon}
                  color={primaryColour}
                />
                <p style={styles.exportButtonText}>Export</p>
              </Button> */}
              {chartComponent === "1" || chartComponent === "3" ? (
                <Form.Select
                  style={styles.headerDropdown3}
                  onChange={(e) => {
                    e.preventDefault();
                    setmonth(e.target.value);
                  }}
                  value={month}
                >
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
              ) : (
                <Form.Select
                  style={styles.headerDropdown2}
                  onChange={(e) => {
                    e.preventDefault();
                    setyear(e.target.value);
                  }}
                >
                  <option value="0">
                    This Year: 1 Jan {new Date().getFullYear()} - Present
                  </option>
                  <option value="1">
                    Last 2 Years: 1 Jan {new Date().getFullYear() - 1} - Present
                  </option>
                  <option value="2">
                    Last 3 Years: 1 Jan {new Date().getFullYear() - 2} - Present
                  </option>
                </Form.Select>
              )}
            </div>
          </div>
          <div
            style={styles.chartsContainer}
            className="row justify-content-between"
          >
            {handleChartsComponent()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={styles.deadlines}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <img
                style={styles.deadlineImage}
                src={deadlineImage}
                alt="Deadline Icon"
              />
              <div style={styles.deadlineHeading}>Deadlines Approaching!</div>
            </div>
          </div>
          <div style={styles.celebrations}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={styles.celebrationHeading}>Celebrations</div>
              <img src={cross} style={styles.celebrationsCross} />
            </div>
          </div>
          <div style={styles.tasks}>
            <div style={styles.tasksHeading}>Tasks Assigned</div>
            {isLoadingTasks ? (
              <LoadingSpinner />
            ) : (
              <>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '5px', marginLeft: '16px'}}>
                  <div style={styles.rect1}></div>
                  <div style={styles.task1}>
                    {title1}
                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {`${month1[0]}${month1[1]}${month1[2]}`} </span>
                      <span>{dDate1}</span>
                    </div>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '14px', marginLeft: '16px'}}>
                  <span style={styles.rect2}></span>
                  <div style={styles.task2}>
                    {title2}

                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {`${month2[0]}${month2[1]}${month2[2]}`} </span>
                      <span>{dDate2}</span>
                    </div>
                  </div>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', marginTop: '14px', marginLeft: '16px'}}>
                  <span style={styles.rect3}></span>
                  <div style={styles.task3}>
                    {title3}

                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {`${month3[0]}${month3[1]}${month3[2]}`} </span>
                      <span>{dDate3}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div style={styles.tasksBottom}>View All</div>
          </div>
          <div style={styles.calendar}>
            <p style={styles.calendarHeading}>Calendar Upcoming</p>
            {isLoadingCal ? (
              <LoadingSpinner />
            ) : (
              <ScheduleComponent
                allowEditing={false}
                allowDeleting={false}
                height="252px"
                eventSettings={{ dataSource: events }}
                agendaDaysCount={3}
                eventClick={handleEventClick}
                showHeaderBar={false}
                style={{border: 'none'}}
              >
                <ViewsDirective>
                  <ViewDirective
                    option="Agenda"
                    eventTemplate={eventTemplate.bind(this)}
                    allowVirtualScrolling={false}
                  />
                </ViewsDirective>
                <Inject services={[Agenda]} />
              </ScheduleComponent>
            )}
            <div style={styles.calendarBottom}>View Calendar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
