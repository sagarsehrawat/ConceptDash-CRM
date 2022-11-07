import React, {useState, useEffect} from 'react'
import './Tables.css'
import axios from 'axios';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
function Tables() {
    const [sales, setsales] = useState([])
    useEffect(() => {
        axios.get('https://localhost:8080/api/getAllSales').then((res) => {
            setsales(res.data.res)
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
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Country/Region</TableCell>
            <TableCell align="right">Customer ID</TableCell>
            <TableCell align="right">Product ID</TableCell>
            <TableCell align="right">Employee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                asdf
              </TableCell>
              <TableCell align="right">{row.Country}</TableCell>
              <TableCell align="right">{row.Customer }</TableCell>
              <TableCell align="right">{row.Product}</TableCell>
              <TableCell align="right">{row.Employee}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Tables