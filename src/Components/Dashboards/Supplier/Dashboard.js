import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import newO from '../../../Images/new-orders.jpg'
import submittedIcon from '../../../Images/submitted.png'
import approvedIcon from '../../../Images/approved.png'
import closedIcon from '../../../Images/closed.webp'
import { PieChart } from 'react-minimal-pie-chart';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import { HOST, INVENTORY_PURCHASED, SUPPLIERS_DASHBOARD } from '../../Constants/Constants'
import axios from 'axios'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

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

const Dashboard = () => {
  const [rows, setRows] = useState([])
  const [inventory, setInventory] = useState([])
  const [neworders, setneworders] = useState(0)
  const [sub, setsub] = useState(0)
  const [app, setapp] = useState(0)
  const [close, setclose] = useState(0)
  const [posted, setposted] = useState(0)
  const [notposted, setnotposted] = useState(0)

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await axios.get(HOST + INVENTORY_PURCHASED)
        const dash = await axios.get(HOST + SUPPLIERS_DASHBOARD)
        console.log(dash)
        if (res && res.data.success)
          setInventory(res.data.res)
        if (dash && dash.data.success) {
          setposted(dash.data.res[0][0].Posted)
          setnotposted(dash.data.res[0][0].Not_Posted)
          setneworders(dash.data.res[0][0].New_Purchases)
          setsub(dash.data.res[0][0].Submitted_Purchases)
          setapp(dash.data.res[0][0].Approved_Purchases)
          setclose(dash.data.res[0][0].Closed_Purchases)
          setRows(dash.data.res[1])
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    callAPI()
  }, [])

  const labels = inventory.map((e) => e.Product_ID)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
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
    <>
      <div className='fin-dash-body' align="center">
        <div className='row d-flex justify-content-around body-1'>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
            <img src={newO} className='card-img' alt="New Purchases" />
            <h5 className='card-title'>New Purcahses</h5>
            <p>{neworders}</p>

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
            <img src={submittedIcon} className='card-img' alt="Submitted Purchases" />
            <h5 className='card-title' align="center">Submitted Purcahses</h5>
            <p>{sub}</p>

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
            <img src={approvedIcon} className='card-img' alt="Approved Purchases" />
            <h5 className='card-title'>Approved Purchases</h5>
            <p>{app}</p>

          </div>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
            <img src={closedIcon} className='card-img' alt="Closed Purchases" />
            <h5 className='card-title'>Closed Purchases</h5>
            <p>{close}</p>

          </div>
        </div>


        <div className='row d-flex justify-content-around body-2'>
          <div className='card col-3 d-flex align-items-center' style={{ "width": "20rem", "padding": "2rem" }}>
            <h3 className='card-title'>Inventory Data</h3>
            <PieChart style={{ height: '30vh' }}
              radius={PieChart.defaultProps.radius - 4}
              data={[
                { title: 'Items Added to Inventory', value: posted, color: '#E38627' },
                { title: 'Items Not Added to Inventory', value: notposted, color: '#C13C37' }
              ]}
              segmentsShift={(index) => (index === 0 ? 4 : 0.5)}
              animate={true} />
            <div className='pie-labels d-flex align-items-center'>
              <div className='color' style={{ backgroundColor: "#E38627" }}></div>
              <p style={{ margin: "0" }}>{posted}   - Items added to Inventory</p>
            </div>
            <div className='pie-labels d-flex align-items-center'>
              <div className='color' style={{ backgroundColor: "#C13C37" }}></div>
              <p style={{ margin: "0" }}>{notposted}   - Items not added to Inventory</p>
            </div>
          </div>

          <div className='col-3 card d-flex align-items-center' style={{ "width": "60rem", "padding": "0.8rem", "height": "30rem" }}>
            <h3 className='card-title'>Product Transactions</h3>
            <TableContainer component={Paper} className='main'>
              <Table sx={{ minWidth: 150 }} aria-label="simple table">
                <TableHead>
                  <TableRow className='rowWidth'>
                    <TableCell>Order ID</TableCell>
                    <TableCell align="center">Order Date</TableCell>
                    <TableCell align="center">Shipper ID</TableCell>
                    <TableCell align="center">Ship Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length === 0 ? <></> : rows.map((row) => (
                    <TableRow
                      key={row.Order_ID}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{row.Purchase_Order_ID}</TableCell>
                      <TableCell align="center">{row.Submitted_Date}</TableCell>
                      <TableCell align="center">{row.Supplier_ID}</TableCell>
                      <TableCell align="center">{row.Employee_Name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className='row d-flex justify-content-around body-2'>
          <div className='col-3 card d-flex align-items-center' style={{ "width": "60rem", "padding": "0.8rem", "height": "35rem" }}>
            <h3 className='card-title'>Inventory Purcahsed</h3>
            <Bar options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                }
              }
            }} data={{
              labels,
              datasets: [
                {
                  label: 'Inventory Purchased',
                  data: inventory.map((e) => e.Quantity_Purchased),
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ],
            }} />
          </div>
        </div>
        <div className='formsContainer'>
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
              <Button variant="dark" size="lg">
                New Purchase
              </Button>
              <Button variant="dark" size="lg" onClick={handleShow}>
                Approve Purchase
              </Button>
              <Button variant="dark" size="lg" onClick={handleShow}>
                Close Purchase
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
              <Button variant="dark" size="lg" onClick={handleShowall}>
                Request All Purchase Details
              </Button>
              <Button variant="dark" size="lg" onClick={handleShow}>
                Request Purchase Details by Purchase-ID
              </Button>
              <Button variant="dark" size="lg" onClick={handleShowprod}>
                Request Purchase Details by Product-ID
              </Button>
              <Button variant="dark" size="lg" onClick={handleShowsupp}>
                Request Purchase Details by Supplier-ID
              </Button>
              <Button variant="dark" size="lg" onClick={handleShowcre}>
                Request Purchase Details by Creator-ID
              </Button>
              <Button variant="dark" size="lg" onClick={handleShowapp}>
                Request Purchase Details by Approved-ID
              </Button>
              <Button variant="dark" size="lg">
                Request Purchase Details by Date
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
            <input type="text" placeholder="Purchase-ID" className='input-text' required/>
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
            <input type="text" placeholder="Supplier-ID" className='input-text' required/>
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
            <input type="text" placeholder="Creator-ID" className='input-text' required/>
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
            <input type="text" placeholder="Approved-ID" className='input-text' required/>
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
    </>

  )
}

export default Dashboard