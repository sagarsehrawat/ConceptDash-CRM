import React, { useEffect,useState } from 'react'
import './Dashboard.css'
import { Dropdown } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import Select from "react-select";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { HOST, TOP_SALES, TOP_EMPLOYEES } from '../../Constants/Constants'
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
    const navigate = useNavigate();
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

    useEffect(() => {
        const callAPI = async () => {
            const sale = await axios.get(HOST + TOP_SALES)
            const emp = await axios.get(HOST + TOP_EMPLOYEES)
            if (sale && sale.data.success) {

            }
        }
        callAPI()
    }, [])
    const [value, setValue] = React.useState("1");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
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

    return (
        <div>
            <div className='fin-dash-body'>
                <h1>Sales</h1>
                <div className='row d-flex justify-content-between body-1'>
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

                
                {/* <div className='row d-flex justify-content-around body-2'> */}

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
                
                <div className="form-container"></div>
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
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/addProject")}}>
                                New Project
                            </Button>
                            <Button variant="dark" size="lg">
                                New Client
                            </Button>
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/orderform")}}>
                                Add Order
                            </Button>
                            <Button variant="dark" size="lg">
                                Meeting Notes
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
                                Request Sales by Employee-ID
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowprod}>
                                Request Sales Details by Product-ID
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request Sales Details by Month
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowapp}>
                                Request Purchase Details by Region
                            </Button>
                            <Button variant="dark" size="lg">
                                Request Purchase Details by Year
                            </Button>
                            </div>
                            </li>
                        </ul>
                        </TabPanel>
                    </TabContext>
        </Box>
        </div>
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
                <input type="text" placeholder="Product-ID" className='input-text' required/>
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
                        <input type="text" placeholder="Month" className='input-text' required/>
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
    )
}

export default Dashboard