import React from 'react'
import './PendingReq.css'
import Button from '@material-ui/core/Button';
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
function PendingReq() {
  return (
    <>
        <TableContainer component={Paper} className='main' style={{'backgroundColor':'rgb(195, 193, 193)'}}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow className='rowWidth'>
              <TableCell align="center">Request ID</TableCell>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Request</TableCell>
              <TableCell align="center">Request Dept.</TableCell>
              <TableCell align="center">File Type</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Accept Request</TableCell>
              <TableCell align="center">Decline Request</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {customers.map((row) => ( */}
              <TableRow
                // key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">1233456</TableCell>
                <TableCell align="center">1234567</TableCell>
                <TableCell align="center">Country Sales</TableCell>
                <TableCell align="center">Sales</TableCell>
                <TableCell align="center">PDF</TableCell>
                <TableCell align="center">12-3-20</TableCell>
                <TableCell align="center"><Button className='btnres1'>Approve</Button></TableCell>
                <TableCell align="center"><Button variant="contained" className='btnres2'>Decline</Button></TableCell>
              </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PendingReq