import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import shipped from '../../../Images/shipped.png'
import { useNavigate } from 'react-router-dom'
import newO from '../../../Images/new-orders.jpg'
import invoice from '../../../Images/invoice.jpg'
import calendarIcon from '../../../Images/calendar.png'
import upcomingProjects from '../../../Images/upcomingProject.png'
import pendingProject from '../../../Images/pendingProject.jpg'
import completedProject from '../../../Images/completedProject.png'
import allProjects from '../../../Images/allProjects.png'
import timesheet from '../../../Images/timesheet.png'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TestDemo from '../../Calendar';
import TimeSheet from '../../TimeSheet/TimeSheet'

const Dashboard = () => {
    const handleClose1 = () => setShow(false);
    const handleShow1 = () => setShow(true);
    const navigate = useNavigate();
    const [value, setValue] = React.useState("1");
    const [tasks, settasks] = useState([])
    useEffect(() => {
          const call = async () => {
            await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/tasksById', {headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':localStorage.getItem('employeeId')}}).then((res) => {
                settasks(res.data.res)
                console.log(res.data.res);
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
        },[])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const [show, setShow] = useState(false);
    const [showTS, setShowTS] = useState(false);
  const [showprod, setShowprod] = useState(false);
  const [showall, setShowall] = useState(false);
  const [showsupp, setShowsupp] = useState(false);
  const [showcre, setShowcre] = useState(false);
  const [showapp, setShowapp] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseTS = () => setShowTS(false);
  const handleCloseprod = () => setShowprod(false);
  const handleCloseall = () => setShowall(false);
  const handleClosesupp = () => setShowsupp(false);
  const handleClosecre = () => setShowcre(false);
  const handleCloseapp = () => setShowapp(false);

  const handleShow = () => setShow(true);
  const handleShowTS = () => setShowTS(true);
  const handleShowprod = () => setShowprod(true);
  const handleShowall = () => setShowall(true);
  const handleShowsupp = () => setShowsupp(true);
  const handleShowcre = () => setShowcre(true);
  const handleShowapp = () => setShowapp(true);
  const columns = [
    {
    dataField: 'Task_ID',
    text: 'Task ID',
    sort: true
  },{
    dataField: 'Title',
    text:'Title',
    // filter: textFilter()
  },{
    dataField:'Priority',
    text:'Priority',
    // filter: textFilter()
    sort:true
  },{
    dataField:'Status',
    text:'Status',
    // filter: textFilter()
  },{
    dataField:'percentComplete',
    text:'% Completed',
    // filter: textFilter()
    sort:true
  },{
    dataField:'Assigned_To',
    text:'Assigned To',
  },{
    dataField:'Description',
    text:'Description',
  },{
    dataField:'Start_Date',
    text:'Start Date',
  },{
    dataField:'Due_Date',
    text:'Due Date',
  }
  ,{
    dataField:'Completed_Date',
    text:'Completion Date',
  }
//   
]
    return (
        <div className='mainCont'>
            <div>
        <Button onClick={() => {navigate('/'); localStorage.clear()}} style={{'float':'right','marginRight':'3vw','marginTop':'1vh'}}> Log Out</Button>
        <h1 style={{'textAlign':'center','marginTop':'2vh','marginBottom':'3vh','color':'#ffffff','fontSize':'3rem'}}>Engineer Dashboard</h1>
        
                <div className='row d-flex justify-content-around'>
                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={upcomingProjects} className='card-img' alt="New Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>Upcoming Projects</h5>
                        <p>20</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={pendingProject} className='card-img' alt="Invoiced Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>Pending Projects</h5>
                        <p>25</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={completedProject} className='card-img' alt="Shipped Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>Projects Completed</h5>
                        <p>20</p>

                    </div>

                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={allProjects} className='card-img' alt="Shipped Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>All Projects</h5>
                        <Button onClick={(e) => {navigate("/updateProject")}} style={{'marginTop':'2vh','backgroundColor':'rgb(99, 138, 235)'}}>Click Here</Button>
                        

                    </div>
                    
                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={calendarIcon} className='card-img' alt="Closed Orders"/>
                        <h5 className='card-title'>Calendar</h5>
                        <Button onClick={handleShow} style={{'marginTop':'2vh','backgroundColor':'rgb(99, 138, 235)'}}>Click Here</Button>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#e2d5f0' }}>
                        <img src={timesheet} className='card-img' alt="Closed Orders"/>
                        <h5 className='card-title'>TimeSheet</h5>
                        <Button onClick={handleShowTS} style={{'marginTop':'2vh','backgroundColor':'rgb(99, 138, 235)'}}>Click Here</Button>
                    </div>
                </div>

                <div className='row body-2 d-flex justify-content-around'>
                    <div className='col-3 card d-flex align-items-center tableCont' style={{ "width": "90%", "padding": "0.8rem", "height": "30rem",'overflowY':'auto','backgroundColor':'#e2d5f0' }}>
                        <h2 style={{'textDecoration':'underline','fontWeight':'bold'}}>My Focus</h2>
                        {/* <Button variant='success' onClick={(e) => {navigate("/addTask")}} style={{'marginTop':'2vh', 'marginBottom':'2vh','backgroundColor':'rgb(99, 138, 235)'}}>Add Task</Button> */}
        
                            <div className="" >
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        {/* <TableCell>Task ID</TableCell> */}
                                        <TableCell align="right">Title</TableCell>
                                        <TableCell align="right">Priority</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right">% Complete</TableCell>
                                        {/* <TableCell align="right">Assigned To</TableCell> */}
                                        <TableCell align="right">Description</TableCell>
                                        <TableCell align="right">Start Date</TableCell>
                                        <TableCell align="right">Due Date</TableCell>
                                        {/* <TableCell align="right">Completed On</TableCell> */}
                                        <TableCell align="right">Edit/Update</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {tasks.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        {/* <TableCell component="th" scope="row">
                                        {row.Task_ID}
                                        </TableCell> */}
                                        <TableCell align="right">{row.Title}</TableCell>
                                        <TableCell align="right">{row.Priority}</TableCell>
                                        <TableCell align="right">{row.Status}</TableCell>
                                        <TableCell align="right">{row.Percent_Completed}</TableCell>
                                        {/* <TableCell align="right">{row.Full_Name}</TableCell> */}
                                        <TableCell align="right">{row.Description}</TableCell>
                                        <TableCell align="right">{(row.Start_Date)?row.Start_Date.substring(0,10):''}</TableCell>
                                        <TableCell align="right">{(row.Due_Date)?row.Due_Date.substring(0,10):''}</TableCell>
                                        {/* <TableCell align="right">{row.Completed_Date}</TableCell> */}
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateTask", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </div>
                            </div>
                        </div>
                    </div>
            <div className="form-container"></div>
                    <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext centered value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            centered
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab style={{'color':'black'}} label="Forms" value="1" />
                            <Tab style={{'color':'black'}} label="Requests" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel centered value="1">
                        <ul className='formsList'>
                            <li className='list-item'>
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/addProject")}}>
                                New Project
                            </Button>
                            <Button variant="dark" size="lg">
                                Edit Project
                            </Button>
                            </div>
                            </li>
                        </ul>
                        </TabPanel>
                        <TabPanel value="3">
                        <ul className="requestList">
                            <li className="list-item">
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={handleShowall}>
                                Request All Projects
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowall}>
                                Request Upcoming Projects
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowprod}>
                                Request Sales Details by Project-ID
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request Sales Details by Employee-ID
                            </Button>
                            <Button variant="dark" size="lg">
                                Request Project Details by Month
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowall}>
                                Request Closed Projects
                            </Button>
                            
                            
                            </div>
                            </li>
                        </ul>
                        </TabPanel>
                    </TabContext>
        </Box>
        {/* Approve and Close Purchase */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <input type="text" placeholder="Employee-ID" className='input-text' required/>
                <br />
                <br />
                <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                <br />
                <br />
                <Button variant="primary" onClick={handleClose} className='submit-btn'>
                Submit
            </Button>
            </Modal.Body>
        </Modal>

        {/* All Purchase Details Product-ID*/}
        <Modal show={showprod} onHide={handleCloseprod}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <input type="text" placeholder="Project-ID" className='input-text' required/>
                <br />
                <br />
                <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                <br />
                <br />
                <Button variant="primary" onClick={handleCloseprod} className='submit-btn'>
                Submit
            </Button>
            </Modal.Body>
        </Modal>

                {/* All Purchase Details*/}
                <Modal show={showall} onHide={handleCloseall}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        {/* <input type="text" placeholder="Product-ID" className='input-text' required/>
                        <br />
                        <br /> */}
                        <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                        <br />
                        <br />
                        <Button variant="primary" onClick={handleCloseall} className='submit-btn'>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* All Purchase Details supplier-ID*/}
                <Modal show={showsupp} onHide={handleClosesupp}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="Employee-ID" className='input-text' required/>
                        <br />
                        <br />
                        <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                        <br />
                        <br />
                        <Button variant="primary" onClick={handleClosesupp} className='submit-btn'>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* All Purchase Details Creator-ID*/}
                <Modal show={showcre} onHide={handleClosecre}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="Customer-ID" className='input-text' required/>
                        <br />
                        <br />
                        <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                        <br />
                        <br />
                        <Button variant="primary" onClick={handleClosecre} className='submit-btn'>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>

                {/* All Purchase Details Approved-ID*/}
                <Modal show={showapp} onHide={handleCloseapp}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="State" className='input-text' required/>
                        <br />
                        <br />
                        <input type="email" name="" id="" placeholder='E-mail' className='input-text' required/>
                        <br />
                        <br />
                        <Button variant="primary" onClick={handleCloseapp} className='submit-btn'>
                            Submit
                        </Button>
                    </Modal.Body>
                </Modal>

                <Modal 
            // style={{'margin':'2rem'}}
            show={show} 
            onHide={handleClose} 
            size='lg'
            dialogClassName="modal-150w" 
            aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'marginLeft':'0.5rem'}}>{<TestDemo/>}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal 
            // style={{'margin':'2rem'}}
            show={showTS} 
            onHide={handleCloseTS} 
            size='lg'
            dialogClassName="modal-150w" 
            aria-labelledby="example-custom-modal-styling-title"
                >
                <Modal.Header closeButton>
                <Modal.Title>Calendar</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'marginLeft':'0.5rem'}}>{<TimeSheet/>}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseTS}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Dashboard