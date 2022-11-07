import axios from 'axios'
import {React,useState,useEffect} from 'react'
import { GET_ALL_EMPLOYEES, HOST } from '../Constants/Constants';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function Dummy() {
  const navigate = useNavigate();
    const [employees, setemployees] = useState([])
    useEffect(() => {
    const call = async()=>{
        await axios.get(HOST + GET_ALL_EMPLOYEES, {headers:{'auth':'Rose '+ localStorage.getItem('auth') }}).then((res)=>{
            setemployees(res.data.res);
        }).catch((err) => {
            console.log(err)
          })
        }
        call()
    },[])
    const handleEdit = (e) =>{

    }
  return (
    <div>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Salutation</TableCell>
            <TableCell align="right">Firstname</TableCell>
            <TableCell align="right">Lastname</TableCell>
            <TableCell align="right">Department</TableCell>
            <TableCell align="right">Update</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Employee_ID}
              </TableCell>
              <TableCell align="right">{row.Username}</TableCell>
              <TableCell align="right">{row.Salutation}</TableCell>
              <TableCell align="right">{row.First_Name}</TableCell>
              <TableCell align="right">{row.Last_Name}</TableCell>
              <TableCell align="right">{row.Department}</TableCell>
              <TableCell align="right"><Button onClick={(e) => {navigate("/updateEmployee", {state: row})}} variant='success'>Edit</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
export default Dummy   