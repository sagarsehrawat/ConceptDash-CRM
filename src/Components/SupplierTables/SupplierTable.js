import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import './SupplierTable.css'
import { GET_ALL_SUPPLIERS, HOST } from '../Constants/Constants'
import axios from 'axios'
function SupplierTable() {
    const [suppliers, setsuppliers] = useState([])
    useEffect(() => {
        const call = async () => {
          await axios.get(HOST + GET_ALL_SUPPLIERS).then((res) => {
            setsuppliers(res.data.res)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
  return (
    <>
        <TableContainer component={Paper} className='main'>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow className='rowWidth'>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Job Title</TableCell>
              <TableCell align="right">Business</TableCell>
              <TableCell align="right">Mobile</TableCell>
              <TableCell align="right">Fax</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">City</TableCell>
              <TableCell align="right">State</TableCell>
              <TableCell align="right">Pin Code</TableCell>
              <TableCell align="right">Country</TableCell>
              <TableCell align="right">Web Page</TableCell>
              <TableCell align="right">Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {suppliers.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right">{row.ID}</TableCell>
                <TableCell align="right">{row.First_Name}</TableCell>
                <TableCell align="right">{row.Last_Name}</TableCell>
                <TableCell align="right">{row.Company}</TableCell>
                <TableCell align="right">{row.Email}</TableCell>
                <TableCell align="right">{row.Job_Title}</TableCell>
                <TableCell align="right">{row.Business_Phone}</TableCell>
                <TableCell align="right">{row.Mobile_Phone}</TableCell>
                <TableCell align="right">{row.Fax_Number}</TableCell>
                <TableCell align="right">{row.Address}</TableCell>
                <TableCell align="right">{row.City}</TableCell>
                <TableCell align="right">{row.State}</TableCell>
                <TableCell align="right">{row.ZIP}</TableCell>
                <TableCell align="right">{row.Country}</TableCell>
                <TableCell align="right">{row.Webpage}</TableCell>
                <TableCell align="right">{row.Notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default SupplierTable