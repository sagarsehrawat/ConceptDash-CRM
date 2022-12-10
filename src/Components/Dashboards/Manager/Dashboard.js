import React, { useEffect,useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import rfpIcon from '../../../Images/rfps.png'
import upcomingProjects from '../../../Images/upcomingProject.png'
import completedProject from '../../../Images/completedProject.png'
import { HOST, GET_PROJECT_TASKS_BY_ID } from '../../Constants/Constants'
import allProjects from '../../../Images/allProjects.png'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ops = [
    { value: 'state sales', label: 'Sales by states', color: '#00B8D9' },
    { value: 'blue', label: 'Blue', color: '#0052CC' }
]
const Dashboard = () => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    let sales = []
    let employees = []
    const [projectTasks, setProjectTasks] = useState([])
    useEffect(() => {
          const call = async () => {
            await axios.get(HOST + GET_PROJECT_TASKS_BY_ID, {headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':localStorage.getItem('employeeId')}}).then((res) => {
                setProjectTasks(res.data.res)
                console.log(localStorage.getItem('employeeId'));
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
        },[])
    const [value, setValue] = React.useState("1");
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const dhm=(ms)=> {
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms = ms % (24*60*60*1000);
        const hours = Math.floor(daysms / (60*60*1000));
        const hoursms = ms % (60*60*1000);
        const minutes = Math.floor(hoursms / (60*1000));
        const minutesms = ms % (60*1000);
        const sec = Math.floor(minutesms / 1000);
        if(days<0 || hours<0 || minutes<0 || sec<0) {
            return null;
        }
        return days + "d " + hours + "hrs ";
      }

    const [show, setShow] = useState(false);
  const [showprod, setShowprod] = useState(false);
  const [showall, setShowall] = useState(false);
  const [showsupp, setShowsupp] = useState(false);
  const [showcre, setShowcre] = useState(false);
  const [showapp, setShowapp] = useState(false);

  const handleClose = () => setShow(false);
  const handleCloseprod = () => setShowprod(false);
  const handleCloseall = () => setShowall(false);
  const handleClosesupp = () => setShowsupp(false);
  const handleClosecre = () => setShowcre(false);
  const handleCloseapp = () => setShowapp(false);

  const handleShow = () => setShow(true);
  const handleShowprod = () => setShowprod(true);
  const handleShowall = () => setShowall(true);
  const handleShowsupp = () => setShowsupp(true);
  const handleShowcre = () => setShowcre(true);
  const handleShowapp = () => setShowapp(true);
  const navigate = useNavigate();
  return (
    <>
      <div>
            <div className='fin-dash-body'>
                <Button className='allBtn' onClick={() => {navigate('/'); localStorage.clear()}} style={{'float':'right','marginRight':'3vw','marginTop':'1vh','box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 1), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}> Log Out</Button>
                <h1><b>Manager Dashboard</b></h1>
                {/* <div className='row d-flex justify-content-between body-1'>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "20rem", "padding": "2rem" }}>
                        <h5 className='card-title'>Gross Amount</h5>
                        <p>$6969</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "20rem", "padding": "2rem" }}>
                        <h5 className='card-title' align="center">Shipping Fee</h5>
                        <p>$2356</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "20rem", "padding": "2rem" }}>
                        <h5 className='card-title'>Equity Ratio</h5>
                        <p>78.5%</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "20rem", "padding": "2rem" }}>
                        <h5 className='card-title'>TotalAmount Payable</h5>
                        <p>$7584</p>
                    </div>
                </div> */}
                <div className='row d-flex justify-content-around'>
                    <div className='card card1 col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#a1ddf1', 'borderRadius':'0','box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <img src={upcomingProjects} className='card-img' alt="New Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>Budgets</h5>
                        <Button className='allBtn' onClick={(e) => {navigate("/Budgettable")}} style={{'marginTop':'2vh','marginBottom':'2vh','backgroundColor':'#1a73e8','borderRadius':'25px','box-shadow': '3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Click Here</Button>
                        

                    </div>
                    <div className='card card1 col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#a1ddf1', 'borderRadius':'0','box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <img src={rfpIcon} className='card-img' alt="Invoiced Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>RFPs</h5>
                        <Button className='allBtn' onClick={(e) => {navigate("/RFPtable")}} style={{'marginTop':'2vh','marginBottom':'2vh','backgroundColor':'#1a73e8','borderRadius':'25px','box-shadow': '3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Click Here</Button>
                        

                    </div>
                    <div className='card card1 col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#a1ddf1', 'borderRadius':'0','box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <img src={completedProject} className='card-img' alt="Shipped Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>Proposals</h5>
                        <Button className='allBtn' onClick={(e) => {navigate("/Proposaltable")}} style={{'marginTop':'2vh','marginBottom':'2vh','backgroundColor':'#1a73e8','borderRadius':'25px','box-shadow': '3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Click Here</Button>
                        

                    </div>

                    <div className='card card1 col-3 d-flex align-items-center' style={{ "margin": "2vh",'paddingTop':'2vh','width':'10vw','backgroundColor':'#a1ddf1', 'borderRadius':'0','box-shadow': '0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                        <img src={allProjects} className='card-img' alt="Shipped Orders"/>
                        <h5 className='card-title' style={{'textAlign':'center'}}>All Projects</h5>
                        <Button className='allBtn' onClick={(e) => {navigate("/updateProject")}} style={{'marginTop':'2vh','marginBottom':'2vh','backgroundColor':'#1a73e8','borderRadius':'25px','box-shadow': '3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>Click Here</Button>
                        
 
                    </div>
                </div>
                <div classname='tableCont' style={{'marginTop':'4vh','backgroundColor':'#d3d3d3','padding':'4vh'}}>
                <h2 style={{'fontWeight':'bold','textAlign':'center'}}>My Focus</h2>
                <TableContainer component={Paper} style={{'box-shadow': '3px 4px 8px 1px rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><b>Title</b></TableCell>
                                        <TableCell align="center"><b>Time Remaining</b></TableCell>
                                        <TableCell align="center"><b>Description</b></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {projectTasks.map((row) => (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="center">{row.Title}</TableCell>
                                        <TableCell align="center">{row.Due_Date?(dhm(((new Date(row.Due_Date).getTime())-(new Date()).getTime())))?dhm(((new Date(row.Due_Date).getTime())-(new Date()).getTime())):'Missing':''}</TableCell>
                                        <TableCell align="center">{row.Description}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                                </TableContainer>
                            </div>

                <div className='row d-flex justify-content-around body-2'>
                    <div className='card col-6 d-flex align-items-center' style={{ "width": "46rem", "padding": "2rem" }}>
                        <h3 className='card-title'>Top 10 Products by Sales</h3>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }} data={{
                            sales,
                            datasets: [
                                {
                                    label: 'Top 10 Products by Sales',
                                    data: [],
                                    backgroundColor: '#3E92CC',
                                }
                            ],
                        }} />
                    </div>

                    <div className='card col-6 d-flex align-items-center' style={{ "width": "46rem", "padding": "2rem" }}>
                        <h3 className='card-title'>Top 10 Employees by Sales</h3>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }} data={{
                            employees,
                            datasets: [
                                {
                                    label: 'Top 10 Employees by Sales',
                                    data: [],
                                    backgroundColor: '#13293D',
                                }
                            ],
                        }} />
                    </div>

                </div>
                <div className='row d-flex justify-content-around body-2'>

                    <div className='card col-6 d-flex align-items-center' style={{ "width": "46rem", "padding": "2rem" }}>
                        <h3 className='card-title'>Top 10 States by Sales</h3>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }} data={{
                            sales,
                            datasets: [
                                {
                                    label: 'Top 10 States by Sales',
                                    data: [],
                                    backgroundColor: '#3E92CC',
                                }
                            ],
                        }} />
                    </div>

                    <div className='card col-6 d-flex align-items-center' style={{ "width": "46rem", "padding": "2rem" }}>
                        <h3 className='card-title'>Every Month Sales</h3>
                        <Bar options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                }
                            }
                        }} data={{
                            sales,
                            datasets: [
                                {
                                    label: 'Every Month Sales',
                                    data: [],
                                    backgroundColor: '#3E92CC',
                                }
                            ],
                        }} />
                    </div>
                </div>
                
                <div className="form-container">
                    <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext centered value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            centered
                            onChange={handleChange}
                            aria-label="lab API tabs example"
                        >
                            <Tab label="Forms" value="1" />
                            <Tab label="Requests" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel centered value="1">
                        <ul className='formsList'>
                            <li className='list-item'>
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/employeeform")}}>
                                Add Employee
                            </Button>
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/shipperform")}}>
                                Add Shipper
                            </Button>
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/supplierform")}}>
                                Add Supplier
                            </Button>
                            </div>
                            </li>
                            {/* <li className='list-item'>Approve Purchase</li>
                            <li className='list-item'>Close Purchase</li> */}
                        </ul>
                        </TabPanel>
                        <TabPanel value="3">
                        <ul className="requestList">
                            <li className="list-item">
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={handleShow}>
                                Request All Projects
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowprod}>
                                Request All Sales
                            </Button>
                            <Button variant="dark" size="lg">
                                Request Inventory
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request All Employees
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request All Engineers
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request All Shippers
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request All Suppliers
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowapp}>
                                Request Sales Details by Region
                            </Button>
                            <Button variant="dark" size="lg">
                                Request Sales Details by Client
                            </Button>
                            </div>
                            </li>
                        </ul>
                        </TabPanel>
                    </TabContext>
        </Box>
        </div>
        </div>
        {/* Approve and Close Purchase */}
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                {/* <input type="text" placeholder="Employee-ID" className='input-text' required/>
                <br />
                <br /> */}
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
                {/* <input type="text" placeholder="Product-ID" className='input-text' required/>
                <br />
                <br /> */}
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
                        {/* <input type="text" placeholder="Month" className='input-text' required/>
                        <br />
                        <br /> */}
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
                        <input type="text" placeholder="Category" className='input-text' required/>
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
                        <input type="text" placeholder="Region" className='input-text' required/>
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
                </div>
    </>
  )
}

export default Dashboard