import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import { HOST, GET_PURCHASE_DETAILS } from '../Constants/Constants'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';

function Tables() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const call = async () => {

      await axios.get(HOST + GET_PURCHASE_DETAILS).then((res) => {
        setRows(res.data.res)
      }).catch((err) => {
        console.log(err)
      })
    }
    call()
  }, [])

  return (
    <>
      <TableContainer component={Paper} className='main'>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow className='rowWidth'>
              <TableCell>ID</TableCell>
              <TableCell align="center">Purchase Order ID</TableCell>
              <TableCell align="center">Product ID</TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Unit Cost</TableCell>
              <TableCell align="center">Date Recieved</TableCell>
              <TableCell align="center">Posted to Inventory</TableCell>
              <TableCell align="center">Inventory ID</TableCell>
              <TableCell align="center">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.ID}</TableCell>
                <TableCell align="center">{row.Purchase_Order_ID}</TableCell>
                <TableCell align="center">{row.Product_ID}</TableCell>
                <TableCell align="center">{row.product_name}</TableCell>
                <TableCell align="center">{row.Quantity}</TableCell>
                <TableCell align="center">{row.Unit_Cost}</TableCell>
                <TableCell align="center">{row.Date_Received}</TableCell>
                <TableCell align="center">{row.Posted_To_Inventory}</TableCell>
                <TableCell align="center">{row.Inventory_ID}</TableCell>
                <TableCell align="center">{row.Subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Tables