import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import { GET_ALL_EMPLOYEES, HOST, GET_TIMESHEET,GET_EMPLOYEENAMES } from '../Constants/Constants';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Form from 'react-bootstrap/Form';

function EmployeeUpdate() {
    const navigate = useNavigate();
    const [employee, setemployee] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        setIsLoading(true);
          const call = async () => {
            await axios.get(HOST + GET_ALL_EMPLOYEES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
              setemployee(res.data.res)
              setdataSource(res.data.res)
              setIsLoading(false)
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
    },[])
    const [timesheet, settimesheet] = useState([])
    const handleChange1 = async (e) => {
        await axios.get(HOST + GET_TIMESHEET,{headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':e.target.value}}).then(async (res) => {
        settimesheet(res.data.res)
        setIsLoading(false)
    }).catch((err) => {
        console.log(err)
    })
    };
    useEffect(() => {
        const call = async () => {
          const res = await axios.get(HOST + GET_EMPLOYEENAMES,{headers:{'auth':'Rose '+ localStorage.getItem('auth')}});
          setemployeess(res.data.res)
          console.log(res.data);
        }
        call()
    },[]);
    const [employeess, setemployeess] = useState([]);
    const [value1, setValue1] = useState("1");
    const handleChange = (event, newValue) => {
        setValue1(newValue);
      };
    const[value, setValue] = useState('')
    const [tableFilter, settableFilter] = useState([])
    const filterData = (e) =>{
      if(e.target.value!=""){
        setValue(e.target.value);
        const filterTable = dataSource.filter(o=>Object.keys(o).some(k=>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
          settableFilter([...filterTable])
      } else {
        setValue(e.target.value);
        setdataSource([...dataSource])
      }
    }
  return (
    <div>
      <div style={{'marginLeft':'2vw','marginTop':'2vh','marginBottom':'2vh','marginRight':'3vw'}}>
                <Button style={{'marginRight':'1vh'}} onClick={() => navigate(-1)}>Back</Button>
                <Button style={{'float':'right'}} onClick={() => navigate(1)}>Forward</Button>
            </div>
      <br />
        <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterData} placeholder='Search'/>
        
      <Button onClick={(e) => {navigate("/employeeform")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add to Employee</Button>
      <br />
        <Box sx={{ width: "100%", typography: "body1" }} style={{'margin':'0'}}>
        <TabContext value={value1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Employees" value="1" />
            <Tab label="Personal Details" value="2" />
            <Tab label="Employee Skills" value="3" />
            <Tab label="Personal Traits" value="5" />
            <Tab label="TimeSheet" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{'margin':'0'}}>
        {isLoading?<LoadingSpinner/>:
        <div className="div1" style={{'overflowX':'auto'}}>
          <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell >Edit</TableCell>
                                        <TableCell align="right">Employee ID</TableCell>
                                        <TableCell align="right">Username</TableCell>
                                        <TableCell align="right">Salutation</TableCell>
                                        <TableCell align="right">First Name</TableCell>
                                        <TableCell align="right">Last Name</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Email Work</TableCell>
                                        <TableCell align="right">Email Personal</TableCell>
                                        <TableCell align="right">Job Title</TableCell>
                                        <TableCell align="right">Joining Date</TableCell>
                                        <TableCell align="right">Business Phone</TableCell>
                                        <TableCell align="right">Mobile</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="right">City</TableCell>
                                        <TableCell align="right">Province</TableCell>
                                        <TableCell align="right">ZIP</TableCell>
                                        <TableCell align="right">Country</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateEmployee", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Username}</TableCell>
                                        <TableCell align="right">{row.Salutation}</TableCell>
                                        <TableCell align="right">{row.First_Name}</TableCell>
                                        <TableCell align="right">{row.Last_Name}</TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Email_Work}</TableCell>
                                        <TableCell align="right">{row.Email_Personal}</TableCell>
                                        <TableCell align="right">{row.Job_Title_ID}</TableCell>
                                        <TableCell align="right">{(row.Joining_Date?row.Joining_Date.substring(0,10):'')}</TableCell>
                                        <TableCell align="right">{row.Business_Phone}</TableCell>
                                        <TableCell align="right">{row.Mobile_Phone}</TableCell>
                                        <TableCell align="right">{row.Address}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.ZIP}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  employee.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateEmployee", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Username}</TableCell>
                                        <TableCell align="right">{row.Salutation}</TableCell>
                                        <TableCell align="right">{row.First_Name}</TableCell>
                                        <TableCell align="right">{row.Last_Name}</TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Company}</TableCell>
                                        <TableCell align="right">{row.Email_Work}</TableCell>
                                        <TableCell align="right">{row.Email_Personal}</TableCell>
                                        <TableCell align="right">{row.Job_Title_ID}</TableCell>
                                        <TableCell align="right">{(row.Joining_Date?row.Joining_Date.substring(0,10):'')}</TableCell>
                                        <TableCell align="right">{row.Business_Phone}</TableCell>
                                        <TableCell align="right">{row.Mobile_Phone}</TableCell>
                                        <TableCell align="right">{row.Address}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.ZIP}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer>
        </div>}
        </TabPanel>
        <TabPanel centered value="2">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell align="right">Birthday</TableCell>
                                        <TableCell align="right">Anniversary</TableCell>
                                        <TableCell align="right">Sports</TableCell>
                                        <TableCell align="right">Activities</TableCell>
                                        <TableCell align="right">Beverage</TableCell>
                                        <TableCell align="right">Alcohol</TableCell>
                                        <TableCell align="right">Travel Destination</TableCell>
                                        <TableCell align="right">Spouse</TableCell>
                                        <TableCell align="right">Children</TableCell>
                                        <TableCell align="right">TV Show</TableCell>
                                        <TableCell align="right">Movies</TableCell>
                                        <TableCell align="right">Actor</TableCell>
                                        <TableCell align="right">Dislikes</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Birthday?row.Birthday.substring(0,10):''}</TableCell>
                                        <TableCell align="right">{row.Anniversary?row.Anniversary.substring(0,10):''}</TableCell>
                                        <TableCell align="right">{row.Sports}</TableCell>
                                        <TableCell align="right">{row.Activities}</TableCell>
                                        <TableCell align="right">{row.Beverage}</TableCell>
                                        <TableCell align="right">{row.Alcohol}</TableCell>
                                        <TableCell align="right">{row.Travel_Destination}</TableCell>
                                        <TableCell align="right">{row.Spouse_Name}</TableCell>
                                        <TableCell align="right">{row.Children}</TableCell>
                                        <TableCell align="right">{row.TV_Show}</TableCell>
                                        <TableCell align="right">{row.Movies}</TableCell>
                                        <TableCell align="right">{row.Actor}</TableCell>
                                        <TableCell align="right">{row.Dislikes}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  employee.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Birthday?row.Birthday.substring(0,10):''}</TableCell>
                                        <TableCell align="right">{row.Anniversary?row.Anniversary.substring(0,10):''}</TableCell>
                                        <TableCell align="right">{row.Sports}</TableCell>
                                        <TableCell align="right">{row.Activities}</TableCell>
                                        <TableCell align="right">{row.Beverage}</TableCell>
                                        <TableCell align="right">{row.Alcohol}</TableCell>
                                        <TableCell align="right">{row.Travel_Destination}</TableCell>
                                        <TableCell align="right">{row.Spouse_Name}</TableCell>
                                        <TableCell align="right">{row.Children}</TableCell>
                                        <TableCell align="right">{row.TV_Show}</TableCell>
                                        <TableCell align="right">{row.Movies}</TableCell>
                                        <TableCell align="right">{row.Actor}</TableCell>
                                        <TableCell align="right">{row.Dislikes}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer>
      </div>}
        </TabPanel>
        <TabPanel centered value="3">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell align="right">Proficiency</TableCell>
                                        <TableCell align="right">Expertise</TableCell>
                                        <TableCell align="right">Interests</TableCell>
                                        <TableCell align="right">Cocurricular</TableCell>
                                        <TableCell align="right">Trainings</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Proficiency}</TableCell>
                                        <TableCell align="right">{row.Expertise}</TableCell>
                                        <TableCell align="right">{row.Interests}</TableCell>
                                        <TableCell align="right">{row.Cocurricular}</TableCell>
                                        <TableCell align="right">{row.Trainings}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  employee.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Proficiency}</TableCell>
                                        <TableCell align="right">{row.Expertise}</TableCell>
                                        <TableCell align="right">{row.Interests}</TableCell>
                                        <TableCell align="right">{row.Cocurricular}</TableCell>
                                        <TableCell align="right">{row.Trainings}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer>
      </div>}
        </TabPanel>
        <TabPanel centered value="5">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Employee ID</TableCell>
                                        <TableCell align="right">Strengths</TableCell>
                                        <TableCell align="right">Weakness</TableCell>
                                        <TableCell align="right">Social Active Index</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Strengths}</TableCell>
                                        <TableCell align="right">{row.Weakness}</TableCell>
                                        <TableCell align="right">{row.Social_Active_Index}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  employee.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                        {row.Employee_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Strengths}</TableCell>
                                        <TableCell align="right">{row.Weakness}</TableCell>
                                        <TableCell align="right">{row.Social_Active_Index}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer>
      </div>}
        </TabPanel>
        <TabPanel centered value="4">
        <h1 style={{'textAlign':'center'}}>Select Employee</h1>
        <Form.Select style={{'marginBottom':'4vh'}} onChange={handleChange1}>
        {employeess.length!==0?employeess.map((options) => (
          <option value={options.Employee_ID} key={options.Employee_ID}>
            {options.Full_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        
        </Form.Select>
        {isLoading?<LoadingSpinner/>:
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Start Time</TableCell>
                <TableCell align="right">End Time</TableCell>
                <TableCell align="right">Project Name</TableCell>
                <TableCell align="right">Comments</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {value.length > 0 ? tableFilter.map((row) => {
              return (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                {row.Date}
                </TableCell>
                <TableCell align="right">{row.Start_Time}</TableCell>
                <TableCell align="right">{row.End_Time}</TableCell>
                <TableCell align="right">{row.Project_Name}</TableCell>
                <TableCell align="right">{row.Comments}</TableCell>
                </TableRow>
              )
              })
          :
          timesheet.map((row) => {
            return (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                {row.Date}
                </TableCell>
                <TableCell align="right">{row.Start_Time}</TableCell>
                <TableCell align="right">{row.End_Time}</TableCell>
                <TableCell align="right">{row.Project_Name}</TableCell>
                <TableCell align="right">{row.Comments}</TableCell>
                </TableRow>
            )
          })}
            </TableBody>
        </Table>
        </TableContainer>
          }
        </TabPanel>
        </TabContext>
        </Box>
    </div>
  )
}

export default EmployeeUpdate