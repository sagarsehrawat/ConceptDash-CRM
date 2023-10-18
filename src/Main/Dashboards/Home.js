import { faCloudArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import pinnedActive from "../../Images/Pin icon_Active.svg";
import pinnedInactive from "../../Images/Pin icon.svg";
import arrow from '../../Images/Celebrations/arrow.svg'
import BudgetCharts from "./BudgetCharts";
import axios from "axios";
import { HOST, PROJECT_CHART, GET_ADMIN_TASKS, PRIMARY_COLOR } from "../Constants/Constants";
import deadlineImage from "../../Images/Vector.png";
import Time from "../../Images/Time.png";
import RFPCharts from "./RFPCharts";
import LoadingSpinner from "../Loader/Loader";
import {
  ScheduleComponent,
  Agenda,
  Inject,
  ViewsDirective,
  ViewDirective,
  Day,
} from "@syncfusion/ej2-react-schedule";
import { Internationalization, extend } from "@syncfusion/ej2-base";
import { gapi } from "gapi-script";
import ProjectCharts from "./ProjectCharts";
import ProposalCharts from "./ProposalCharts";
import moment from 'moment';
import Celebrations from "../v2/Updated_Module/Celebrations";
import groupicon from '../../Images/Celebrations/groupicon.svg'
const Home = (props) => {
  const { setnav } = props;
  const { isCollapsed, viewportWidth } = props;
  const [ishovered,setishovered]=useState(false)
  const styles = {
  
    celebrations: {
      width: "100%",
      height: "96px",
      left: "1180px",
      marginTop: "16px",
      background:ishovered?"linear-gradient(134deg, #FAD3E1 0%, rgba(244, 231, 220, 0.89) 23.11%, rgba(240, 244, 216, 0.81) 39.69%, rgba(245, 214, 154, 0.29) 78.22%, rgba(178, 231, 243, 0.00) 100%)":"linear-gradient(134deg, #EFE2F6 0%, rgba(216, 236, 244, 0.81) 39.69%, rgba(239, 226, 246, 0.00) 100%)",
     filter: "drop-shadow(0px 4px 25px rgba(0, 0, 0, 0.08))",
      borderRadius: "12px",
      "&:hover":{
        background: "black"
      },
    },
    notifModal: {
      position: "absolute",
      width: "37vw",
      height: "90vh",
      left: "63vw",
      top: "56px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.12)",
      borderRadius: "24px 0px 0px 24px"
    },
    celebrationHeading: {
      width: "102px",
      height: "28px",
      marginLeft: "16px",
      marginTop: "12px",
      marginBottom: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "28px",
      color: "#0A0A0A",
    },
    celebrationsCross: {
     
      marginRight: '12.6px',
     
    },
    celebrationBottom: {
      width: "50%",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "11px",
      lineHeight: "16px",
      color: "#0A0A0A",
      textAlign: "left",
       
    },
    contentArea: {
      width: `${viewportWidth - 280 - (isCollapsed ? 68 : 228)}px`,
      height: `${window.innerHeight - 56}px`,
      background: "#F8FAFB",
      overflowY: "auto"
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
      width: "25%",
      height: "68px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
      margin: "0px 10px"
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
      margin: "20px",
    },
    deadlines: {
      boxSizing: "border-box",
      width: "100%",
      height: "93px",
      left: "1180px",
      marginTop: "20px",
      background: "#E84C3D",
      border: "1px solid #E84C3D",
      boxShadow: "0px 5px 4px rgba(232, 76, 61, 0.25)",
      borderRadius: "12px",
    },
    
    tasks: {
      boxSizing: "border-box",
      width: "100%",
      height: "252px",
      left: "1180px",
      marginTop: "16px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
    },
    calendar: {
      boxSizing: "border-box",
      width: "18vw",
      height: "321px",
      left: "1180px",
      marginTop: "16px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "12px",
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
      width: "100%",
      height: "14px",
      marginTop: "6px",
      marginBottom: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: PRIMARY_COLOR,
      cursor: "pointer",
      textAlign: 'center'
    },
    tasksBottom: {
      width: "100%",
      height: "14px",
      // marginLeft: "105px",
      marginBottom: "12px",
      marginTop: "10px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "100%",
      color: PRIMARY_COLOR,
      cursor: "pointer",
      textAlign: 'center'
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
      width: "100%",
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
      width: "100%",
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
      width: "100%",
      height: "44px",
      left: "19px",
      top: "165px",
      background: "#ECFAFF",
      borderRadius: "0px 8px 8px 0px",
      paddingLeft: "10px",
      fontSize: "13px",
      fontFamily: "Roboto",
    },
    celetext:{
     paddingTop: "10px",
      width: "50%",
      color: "#0A0A0A",
      fontFamily: "Roboto",
       fontSize: "12px",
      fontStyle: "normal",
     fontWeight: "400",
     lineHeight: "16px"
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
  // celebrations
  const [celeShow, setceleShow] = useState(false);
  const handleCloseCele = () => setceleShow(false);
  const handleShowCele = () => setceleShow(true);

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
      <div className="template-wrap" style={{width:'100%'}}>
        <div className="subject">{props.Subject}</div>
        <div className="time">
          Time: {getTimeString(props.StartTime)} -{" "}
          {getTimeString(props.EndTime)}
        </div>
      </div>
    );
  }
  function onEventRendered(args) {
    // console.log(((new Date(args.data.StartTime)).getDate()===(new Date()).getDate()))
    // const element = ((new Date(args.data.StartTime)).getDate()===(new Date()).getDate());
    // if (element) {
    //   element.innerText = 'Today';
    // }
  }
  const [chartComponent, setchartComponent] = useState("0");
  const [year, setyear] = useState("0");
  const [month, setmonth] = useState(new Date().getMonth().toString());
  const [projects, setprojects] = useState([0, 0, 0, 0]);

  const handleChartsComponent = () => {
    if (chartComponent === "0") return <BudgetCharts year={year} />;
    if (chartComponent === "1") return <RFPCharts month={month} />;
    if (chartComponent === "2") return <ProposalCharts month={month} />;
    if (chartComponent === "3") return <ProjectCharts month={month}/>;
  };

  const proposalCharts = () => {
    return <></>;
  };

  const projectCharts = () => {
    return <></>;
  };

  const [isLoadingTasks, setisLoadingTasks] = useState(false);
  
  const [sideTasks, setsideTasks] = useState([]);

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
          let arr = res.data.res;
          let sidetasks = []
          if(res.data.res.length!==0) {
            for(let i=0;i<arr.length;i++) {
              let title = arr[i].Title
              let dDate = formatDate(arr[i].Due_Date)
              sidetasks.push({title, dDate})
            }
            setsideTasks(sidetasks);
            setisLoadingTasks(false);
          } else {
          setisLoadingTasks(false);}
        })
        .catch((err) => {
          console.log(err);
        });
    };

    call();
  }, []);
  const formatDate = (date) => {
    if (date === "" || date === null || date === undefined) return "";
    const formattedDate = moment(date)
    return formattedDate.format('MMM D')
}
console.log(sideTasks[0]);
  return (
    <>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={styles.contentArea}>
          <div style={styles.projectOverviewBox}>
            <p style={styles.projectOverviewHeading}>Projects Overview</p>
            <div
              className="row justify-content-between" style={{margin: "20px"}}
            >
              <div style={{...styles.projectOverviewContainers, marginLeft: "0px"}} className='col p-0'>
                <p style={styles.projectOverviewSubheading}>Ongoing Projects</p>
                <p style={styles.projectOverviewNumber}>{projects[0]}</p>
              </div>
              <div style={styles.projectOverviewContainers} className='col p-0'>
                <p style={styles.projectOverviewSubheading}>New Projects</p>
                <p style={styles.projectOverviewNumber}>{projects[1]}</p>
              </div>
              <div style={styles.projectOverviewContainers} className='col p-0'>
                <p style={styles.projectOverviewSubheading}>Completed Projects</p>
                <p style={styles.projectOverviewNumber}>{projects[2]}</p>
              </div>
              <div style={{...styles.projectOverviewContainers, marginRight: "0px"}} className='col p-0'>
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
              {chartComponent === "1" || chartComponent === "3" || chartComponent === "2" ? (
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
            className=""
          >
            {handleChartsComponent()}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", paddingRight:'20px', width:'278px' }}>
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
            <button style={{border:"none"}}>  
          <div onClick={handleShowCele}  style={styles.celebrations} onMouseEnter={() => setishovered(true)} onMouseLeave={() => setishovered(false)}>
            <div className="d-flex justify-content-between align-items-center " style={{ display: "flex", flexDirection: "row" }}>
              <div style={styles.celebrationHeading}>Celebrations</div>
              <img src={arrow} style={styles.celebrationsCross} alt='crossimg' />
            </div>
            <div className="d-flex justify-content-evenly align-items-center">
                <img src={groupicon} style={{marginLeft:"0px"}}alt=""/>
                <div style={styles.celebrationBottom}>
              Colleague's special day: Share in the joy! 🥳
                </div>
            </div>
          </div>
          </button>
          <Modal
            show={celeShow}
            onHide={handleCloseCele}
            style={styles.notifModal}
            dialogClassName="filter-dialog"
            backdropClassName="filter-backdrop"
            animation={false}
          >
            <div style={{paddingBottom:'24px', marginTop:'24px'}}>

            <Celebrations setnav={setnav}/> 
            </div>
          </Modal>
          <div style={styles.tasks}>
            <div style={styles.tasksHeading}>Tasks Assigned</div>
            {isLoadingTasks ? (
              <LoadingSpinner />
            ) : (
              <>
                {sideTasks[0]?<div style={{display: 'flex', flexDirection: 'row', marginTop: '5px', marginLeft: '16px', paddingRight:'20px'}}>
                  <div style={styles.rect1}></div>
                  <div style={styles.task1}>
                    {sideTasks[0]?sideTasks[0].title:"--"}
                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {sideTasks[0]?sideTasks[0].dDate:"--"} </span>
                    </div>
                  </div>
                </div>:<></>}
                {sideTasks[1]?<div style={{display: 'flex', flexDirection: 'row', marginTop: '14px', marginLeft: '16px', paddingRight:'20px'}}>
                  <span style={styles.rect2}></span>
                  <div style={styles.task2}>
                    {sideTasks[1]?sideTasks[1].title:"--"}

                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {sideTasks[1]?sideTasks[1].dDate:"--"} </span>
                    </div>
                  </div>
                </div>:<></>}
                {sideTasks[2]?<div style={{display: 'flex', flexDirection: 'row', marginTop: '14px', marginLeft: '16px', paddingRight:'20px'}}>
                  <span style={styles.rect3}></span>
                  <div style={styles.task3}>
                    {sideTasks[2]?sideTasks[2].title:"--"}

                    <div>
                      <img src={Time} alt="Time Icon" />
                      <span> {sideTasks[2]?sideTasks[2].dDate:"--"} </span>
                    </div>
                  </div>
                </div>:<></>}
              </>
            )}
            <div style={styles.tasksBottom} onClick={()=>setnav(2)}>View All</div>
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
                eventRendered={onEventRendered}
              >
                <ViewsDirective>
                  <ViewDirective
                    option="Agenda"
                    eventTemplate={eventTemplate.bind(this)}
                    allowVirtualScrolling={false}
                  />
                </ViewsDirective>
                <Inject services={[Agenda, Day]} />
              </ScheduleComponent>
            )}
            <div style={styles.calendarBottom} onClick={()=>setnav(8)}>View Calendar</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
