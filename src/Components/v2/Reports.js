import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { faCalendarDays, faChevronDown, faChevronLeft, faChevronRight, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { style } from "@mui/system";
import axios from "axios";
import filter from "../../Images/Filter.svg";
import { HOST, GET_PAGE_REPORT } from "../Constants/Constants";
import LoadingSpinner from "../Loader/Loader";

function Reports(props) {
  const { isCollapsed } = props;
  const [apiCall, setCall] = useState(0);
    const styles = {
        Topbar: {
            marginLeft: '30px',
            marginTop: '10px',
            marginBottom: '35px',
        },
        tableBody: {
            background: "#FFFFFF",
            width: '100%'
          },
          tasktitle: {
            height: "20px",
            left: "60px",
            marginBottom: "8px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#70757A"
          },
          taskowner: {
            height: "20px",
            left: "497px",
            top: "45px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "20px",
            color: "#70757A"
          },
          taskhrs: {
            width: "26px",
            height: "20px",
            left: "858px",
            top: "46px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "20px",
            // textAlign: "center",
            color: "#70757A"
          },
        tableHeader: {
            background: "#F7F7F9",
            borderWidth: "1px 0px 0px 0px",
            borderStyle: "solid",
            borderColor: "#EBE9F1",
            padding: "13px 32px 0px 32px",
            height: "64px",
            zIndex: "1",
            position: "relative",
          },
          table: {
            width: "100%",
            overflowX: "hidden",
            borderCollapse: "collapse"
          },
          tableHeader2: {
            height: "35px",
            background: "#F7F7F9",
            textAlign: "center",
            borderBottom: "0px"
          },
          tableHeading: {
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "13px",
            color: "#70757A",
            borderBottom: "1px solid #EBE9F1",
            verticalAlign: "middle",
            // textAlign: "center"
          },
          fromText: {
            width: "33px",
            height: "20px",
            fontFamily: "'Roboto'",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "20px",
            color: "#70757A"
          },
          filterBox: {
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 12px",
            gap: "8px",
            width: "115px",
            height: "36px",
            background: "#FFFFFF",
            border: "1px solid #EBE9F1",
            borderRadius: "6px",
            marginTop: '36px'
          }
    }
    const [radio, setradio] = useState("3");
    const radioChange = (e) => {
    setradio(e.target.id.toString());
  };
  const [projects, setprojects] = useState([])
  const [proposals, setproposals] = useState([])
  const [rfp, setrfp] = useState([])
  const [general, setgeneral] = useState([])
  const [finance, setfinance] = useState([])
  const [hr, sethr] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [sDate, setsDate] = useState('')
  const [dDate, setdDate] = useState('')
  const dateChange1 = (e) =>{
    setsDate(e.target.value.toString())
  }
  const dateChange2 = (e) =>{
    setdDate(e.target.value.toString())
  }
  useEffect(() => {
    setisLoading(true)
    const call = async () => {
      await axios
        .get(HOST + GET_PAGE_REPORT, {
          headers: {
            auth: "Rose " + localStorage.getItem("auth"),
            sdate: sDate,
            ddate: dDate,
          },
        })
        .then((res) => {
          let proj = [], prop = [], rf = [], gen = [], fin = [], HR = [];
          let arr = res.data.res;
          for(let i=0;i<arr.length;i++) {
            if(arr[i].Type==="Proposals") {
                prop.push(arr[i]);
            } else if(arr[i].Type==="Projects") {
                proj.push(arr[i]);
            }
            else if(arr[i].Type==="RFP") {
                rf.push(arr[i]);
            }
            else if(arr[i].Type==="General") {
                gen.push(arr[i]);
            }
            else if(arr[i].Type==="Finance") {
                fin.push(arr[i]);
            } else {
                HR.push(arr[i]);
            }
          }
          setprojects(proj)
          setproposals(prop)
          setrfp(rf)
          setgeneral(gen)
          setfinance(fin)
          sethr(HR)
        console.log(res.data.res)
          setisLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    };
    call();
  }, [apiCall]);
  const proposalData = proposals.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  
  const projectData = projects.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  const rfpData = rfp.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  const generalData = general.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  const financeData = finance.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  const hrData = hr.reduce((result, current) => {
    if (!result[current.Project_Name]) {
      result[current.Project_Name] = [];
    }
    result[current.Project_Name].push(current);
    return result;
  }, {});
  const proposalvalues = Object.keys(proposalData)
  const projectvalues = Object.keys(projectData)
  const rfpvalues = Object.keys(rfpData)
  const generalvalues = Object.keys(generalData)
  const financevalues = Object.keys(financeData)
  const hrvalues = Object.keys(hrData)

  const [name, setname] = useState('');
  const minutesToHoursAndMinutes = (durationInMinutes)=> {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    return {
      hours: hours,
      minutes: minutes
    };
  }
  
  return (
    <div>
      <div style={styles.Topbar}>
        <Form.Group onChange={radioChange}>
            <Form.Check
              value='General'
              inline
              type="radio"
              name="group1"
              id="1"
              label="General"
              style={{marginRight:'45px'}}
            />
            <Form.Check
              value='Projects'
              inline
              type="radio"
              name="group1"
              id="2"
              label="Projects"
              style={{marginRight:'45px'}}
            />
            <Form.Check
              value='Proposals'
              inline
              type="radio"
              name="group1"
              id="3"
              defaultChecked
              label="Proposals"
              style={{marginRight:'45px'}}
            />
            <Form.Check value='RFP' inline type="radio" name="group1" id="4" label="RFPs" style={{marginRight:'45px'}} />
            <Form.Check value='HR' inline type="radio" name="group1" id="5" label="HR" style={{marginRight:'45px'}} />
            <Form.Check
              value='Finance'
              inline
              type="radio"
              name="group1"
              id="6"
              label="Finance"
              style={{marginRight:'45px'}}
            />
        </Form.Group>
      </div>
      {/* Table Header */}
      <div style={styles.tableHeader} className='d-flex flex-row justify-content-start align-items-center'>
        {/* <FontAwesomeIcon icon={faChevronLeft} color="#6519E1" style={{ cursor: "pointer", marginRight: "18px" }} /> */}
        <div style={{width:'172px', marginRight:'12px', marginTop:'16px'}}>
            <p style={styles.fromText}>From</p>
            <div><Form.Control style={{height:'36px'}} type="date" onChange={dateChange1} /></div>
        </div>
        <div style={{width:'172px', marginRight:'12px', marginTop:'16px'}}>
            <p style={styles.fromText}>To</p>
            <div><Form.Control style={{height:'36px'}} type="date" onChange={dateChange2} /></div>
        </div>
        <div style={styles.filterBox} onClick={()=>setCall(apiCall+1)}>
            Filter

        </div>
        {/* <FontAwesomeIcon icon={faCalendarDays} color="#6519E1" style={{ marginRight: "10px" }} />
        <div style={{ width: "0px", height: "22px", border: "1px solid #EBE9F1", marginRight: "8px" }}></div>
        <p style={{ fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 400, fontSize: "14px", lineHeight: "20px", color: "#0A0A0A", marginRight: "16px" }}>nb</p>
        <FontAwesomeIcon icon={faChevronRight} color="#6519E1" style={{ cursor: "pointer", marginRight: "18px" }}  /> */}
      </div>
      <div style={{ borderBottom: "1px solid #EBE9F1", height: "548px", overflow: "auto", position: "relative", marginTop:'32px', width:'100%' }}>
                <table style={styles.table} className='rfp-table'>
                    <thead style={styles.tableHeader2}>
                        <tr>
                        <th scope="col" style={{ ...styles.tableHeading, width: "33vw", borderBottom: "1px solid #EBE9F1", textAlign: "left", paddingLeft: "32px" }} className='fixed-header'>Projects</th>
                        <th scope="col" style={{ ...styles.tableHeading, width:isCollapsed? '27vw': '23vw' }} className='fixed-header2'>Owner</th>
                        <th scope="col" style={{ ...styles.tableHeading, width:isCollapsed? '17vw': '15vw' }} className='fixed-header2'>Hours Worked</th>
                        <th scope="col" style={{ ...styles.tableHeading, width:isCollapsed? '17vw': '15vw' }} className='fixed-header2'>Total Hours</th>
                        </tr>
                    </thead>
                    <tbody style={styles.tableBody}>
                        {isLoading ? <tr style={{ height: "512px", width: "100%", background: "white" }}>
                        <td colSpan={9}>
                            <LoadingSpinner />
                        </td>
                        </tr>:
                        <>
                        {radio==='3'?proposalvalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?proposalData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        }):
                        radio==='2'?
                        projectvalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?projectData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        }):
                        radio==='4'?
                        rfpvalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?rfpData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        }):
                        radio==='5'?
                        hrvalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?hrData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        }):
                        radio==='6'?
                        financevalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?financeData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        }):
                        generalvalues.map((e)=>{
                            return(
                                <>
                                <tr>
                                <td style={{height: "32px", fontFamily: "'Roboto'", fontStyle: "normal", fontWeight: 500, fontSize: "13px", color: "#0A0A0A", cursor: "pointer" }} onClick={()=>{name===""?setname(e):setname("")}} >
                                    <FontAwesomeIcon icon={faChevronRight} color="#70757A" style={{ marginLeft: "36px", marginRight: "8px" }} />
                                    {e}
                                </td>
                                <td> </td>
                                <td> </td>
                                <td>Total</td>
                                </tr>
                                <div style={{width:'100vw', paddingTop:'6px', background:"#FFFFFF"}}>
                                {name===e?generalData[e].map((f)=>{
                                return(
                                    <div style={{display:'flex', flexDirection:'row', width:'100%',borderBottom: '1px solid #EBE9F1', paddingTop:'9px'}}>
                                        <div style={{...styles.tasktitle, paddingLeft:'60px', width:'33vw'}}>{f.Title}</div>
                                        <div style={{...styles.taskowner, width:isCollapsed? '27vw': '23vw'}}>{f.Assigned}</div>
                                        <div style={{...styles.taskhrs, width:isCollapsed? '17vw': '15vw' }}>{f.total?`${minutesToHoursAndMinutes(f.total).hours} h`:'0'}</div>
                                    </div>
                                )
                                }):<></>}</div>
                                </>
                            )
                        })
                        }
                        </>}
                    </tbody>
                </table>
       </div>
       
    </div>
  )
}

export default Reports
