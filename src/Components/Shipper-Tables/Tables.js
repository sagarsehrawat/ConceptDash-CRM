import React, { useState, useEffect } from 'react'
import './Tables.css'
import axios from 'axios';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import {HOST, GET_ALL_ORDERS} from '../Constants/Constants'

function Tables() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    axios.get(HOST + GET_ALL_ORDERS).then((res) => {
      setOrders(res.data.res)
    }).catch((err) => {
      console.log(err)
    })
  }, [])



  return (
    <>
      <TableContainer component={Paper} className='main'>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow className='rowWidth'>
              <TableCell>Order ID</TableCell>
              <TableCell align="right">Employee ID</TableCell>
              <TableCell align="right">Customer ID</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Shipped Date</TableCell>
              <TableCell align="right">Shipper ID</TableCell>
              <TableCell align="right">Ship Name</TableCell>
              <TableCell align="right">Ship Address</TableCell>
              <TableCell align="right">Ship City</TableCell>
              <TableCell align="right">Ship State</TableCell>
              <TableCell align="right">Ship ZIP</TableCell>
              <TableCell align="right">Ship Country</TableCell>
              <TableCell align="right">Shipping Fee</TableCell>
              <TableCell align="right">Taxes</TableCell>
              <TableCell align="right">Payment Type</TableCell>
              <TableCell align="right">Paid Date</TableCell>
              <TableCell align="right">Notes</TableCell>
              <TableCell align="right">Tax Rate</TableCell>
              <TableCell align="right">Tax Status</TableCell>
              <TableCell align="right">Status ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Order_ID}
                </TableCell>
                <TableCell align="center">{row.Employee_ID}</TableCell>
                <TableCell align="center">{row.Customer_ID}</TableCell>
                <TableCell align="center">{row.Order_Date}</TableCell>
                <TableCell align="center">{row.Shipped_Date}</TableCell>
                <TableCell align="center">{row.Shipper_ID}</TableCell>
                <TableCell align="center">{row.Ship_Name}</TableCell>
                <TableCell align="center">{row.Ship_Address}</TableCell>
                <TableCell align="center">{row.Ship_City}</TableCell>
                <TableCell align="center">{row.Ship_State}</TableCell>
                <TableCell align="center">{row.Ship_ZIP}</TableCell>
                <TableCell align="center">{row.Ship_Country}</TableCell>
                <TableCell align="center">{row.Shipping_Fee}</TableCell>
                <TableCell align="center">{row.Taxes}</TableCell>
                <TableCell align="center">{row.Payment_Type}</TableCell>
                <TableCell align="center">{row.Paid_Date}</TableCell>
                <TableCell align="center">{row.Notes}</TableCell>
                <TableCell align="center">{row.Tax_Rate}</TableCell>
                <TableCell align="center">{row.Tax_Status}</TableCell>
                <TableCell align="center">{row.Status_ID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Tables