import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import { HOST, GET_RFP, GET_PROPOSALS } from '../Constants/Constants';
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function RFPUpdate() {
    const navigate = useNavigate();
    const [rfps, setrfps] = useState([])
    const [porps, setporps] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        setIsLoading(true);
          const call = async () => {
            await axios.get(HOST + GET_RFP, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
              setrfps(res.data.res)
              setdataSource(res.data.res)
              setIsLoading(false)
            }).catch((err) => {
              console.log(err)
            })

            await axios.get(HOST + GET_PROPOSALS, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
              setporps(res.data.res)
              console.log(res.data)
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
    },[])
    const[value, setValue] = useState('')
    const [tableFilter, settableFilter] = useState([])
    const filterData = (e) =>{
      if(e.target.value!=""){
        setValue(e.target.value);
        const filterTable = dataSource.filter(o=>Object.keys(o).some(k=>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
          settableFilter([...filterTable])
      } else {
        setValue(e.target.value);
        setdataSource([...dataSource])
      }
    }
    
  return (
    <div>
        {isLoading?<LoadingSpinner />:
    <div>
      <div style={{'marginLeft':'2vw','marginTop':'2vh','marginBottom':'2vh','marginRight':'3vw'}}>
                <Button style={{'marginRight':'1vh'}} onClick={() => navigate(-1)}>Back</Button>
                <Button style={{'float':'right'}} onClick={() => navigate(1)}>Forward</Button>
            </div>
      <h1 style={{'margin':'auto', 'textAlign':'center','textDecoration':'underline', 'marginTop':'5vh','marginBottom':'4vh'}}>RFPs</h1>
      <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterData} placeholder='Search'/>
      <br />
      <Button onClick={(e) => {navigate("/addRFP")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add to RFPs</Button>
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">RFP ID</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Source</TableCell>
                                        <TableCell align="right">Bid Date</TableCell>
                                        <TableCell align="right">Start Date</TableCell>
                                        <TableCell align="right">Submission Date</TableCell>
                                        <TableCell align="right">Project Name</TableCell>
                                        <TableCell align="right">Project Manager</TableCell>
                                        <TableCell align="right">City</TableCell>
                                        <TableCell align="right">Province</TableCell>
                                        <TableCell align="right">Country</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateRFP", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.RFP_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Action}</TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
                                        <TableCell align="right">{row.Source}</TableCell>
                                        <TableCell align="right">{row.Bid_Date?row.Bid_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Start_Date?row.Start_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Submission_Date?row.Submission_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Project_Name}</TableCell>
                                        <TableCell align="right">{row.Manager_Name}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  rfps.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateRFP", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.RFP_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Action}</TableCell>
                                        <TableCell align="right">{row.Amount}</TableCell>
                                        <TableCell align="right">{row.Source}</TableCell>
                                        <TableCell align="right">{row.Bid_Date?row.Bid_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Start_Date?row.Start_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Submission_Date?row.Submission_Date.substring(0, 10):''}</TableCell>
                                        <TableCell align="right">{row.Project_Name}</TableCell>
                                        <TableCell align="right">{row.Manager_Name}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer></div>}
    </div>
  )
}

export default RFPUpdate