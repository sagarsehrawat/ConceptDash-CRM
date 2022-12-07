import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import shipped from '../../../Images/shipped.png'
import newO from '../../../Images/new-orders.jpg'
import invoice from '../../../Images/invoice.jpg'
import closed from '../../../Images/closed.png'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import {HOST, LOGISTICS_DASHBOARD} from '../../Constants/Constants'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { useNavigate } from 'react-router-dom'
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Dashboard = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState([])
    const [shippingFees, setShippingFees] = useState(0)
    const [newOrders, setNewOrders] = useState(0)
    const [invoiceOrders, setinvoice] = useState(0)
    const [shippedOrders, setshipped] = useState(0)
    const [closedOrders, setclosed] = useState(0)

    useEffect(() => {
      const orders = async () => {
        await axios.get(HOST + LOGISTICS_DASHBOARD).then((res) => {
            console.log(res.data);
            setOrder(res.data.res)
            setShippingFees(res.data.fees)
            setNewOrders(res.data.newOrders)
            setinvoice(res.data.invoiceOrders)
            setshipped(res.data.shippedOrders)
            setclosed(res.data.closedOrders)
          }).catch((err) => {
            console.log(err)
          })
      }
      orders()
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
        <>
            <div className='log-dash-body' >
                <div className='row d-flex justify-content-around'>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
                        <img src={newO} className='card-img' alt="New Orders"/>
                        <h5 className='card-title'>New Orders</h5>
                        <p>{newOrders}</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
                        <img src={invoice} className='card-img' alt="Invoiced Orders"/>
                        <h5 className='card-title'>Invoiced Orders</h5>
                        <p>{invoiceOrders}</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
                        <img src={shipped} className='card-img' alt="Shipped Orders"/>
                        <h5 className='card-title'>Shipped Orders</h5>
                        <p>{shippedOrders}</p>

                    </div>
                    <div className='card col-3 d-flex align-items-center' style={{ "width": "16rem", "padding": "2rem" }}>
                        <img src={closed} className='card-img' alt="Closed Orders"/>
                        <h5 className='card-title'>Closed Orders</h5>
                        <p>{closedOrders}</p>

                    </div>
                </div>

                <div className='row body-2 d-flex justify-content-around'>
                    <div className='col-3 card d-flex align-items-center' style={{ "width": "60rem", "padding": "0.8rem", "height": "30rem" }}>
                        <h5>Orders To be Shipped</h5>
                        <TableContainer component={Paper} className='main'>
                            <Table sx={{ minWidth: 150 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow className='rowWidth'>
                                        <TableCell>Order ID</TableCell>
                                        <TableCell align="center">Order Date</TableCell>
                                        <TableCell align="center">Shipper ID</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.map((row) => (
                                        <TableRow
                                            key={row.Order_ID}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.Order_ID}</TableCell>
                                            <TableCell align="center">{row.Order_Date}</TableCell>
                                            <TableCell align="center">{row.Shipper_ID}</TableCell>
                                            <TableCell align="center">{row.Ship_Name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                    <div className='col-3 card d-flex align-items-center' style={{ "width": "20rem", "padding": "3rem", "height": "25rem" }}>
                        <h3 className='card-title'>Shipping Fee</h3>
                        <div className='container fees'>
                            <p style={{ "color": "#ffffff" }}>${shippingFees}</p>
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
                            <Tab label="Forms" value="1" />
                            <Tab label="Requests" value="3" />
                        </TabList>
                        </Box>
                        <TabPanel centered value="1">
                        <ul className='formsList'>
                            <li className='list-item'>
                            <div className="d-grid gap-2">
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/orderform")}} >
                                New Order
                            </Button>
                            <Button variant="dark" size="lg">
                                Update Order
                            </Button>
                            <Button variant="dark" size="lg">
                                Close Order
                            </Button>
                            <Button variant="dark" size="lg" onClick={(e) => {navigate("/generateInvoice")}} >
                                Generate Invoice
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
                                Request All Orders
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowprod}>
                                Request Sales Details by Order-ID
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowsupp}>
                                Request Sales Details by Employee-ID
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowapp}>
                                Request Purchase Details by State
                            </Button>
                            <Button variant="dark" size="lg" onClick={handleShowcre}>
                                Request Purchase Details by Customer-ID
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
                <input type="text" placeholder="Order-ID" className='input-text' required/>
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
        </>
    )
}

export default Dashboard