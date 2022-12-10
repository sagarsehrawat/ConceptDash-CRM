import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import { HOST, GET_BUDGETS } from '../Constants/Constants';
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function BudgetUpdate() {
    const navigate = useNavigate();
    const [budgets, setbudgets] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        setIsLoading(true);
          const call = async () => {
            await axios.get(HOST + GET_BUDGETS, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
              setbudgets(res.data.res)
              setdataSource(res.data.res)
              console.log(res.data.res);
              setIsLoading(false)
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
      <h1 style={{'margin':'auto', 'textAlign':'center','textDecoration':'underline', 'marginTop':'5vh','marginBottom':'4vh'}}>Budgets</h1>
      <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterData} placeholder='Search'/>
      <br />
      <Button onClick={(e) => {navigate("/budgetForm")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add to Budgets</Button>
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Edit</TableCell>
                                        <TableCell align="right">Budget ID</TableCell>
                                        <TableCell align="right">Budget Category</TableCell>
                                        <TableCell align="right">Department</TableCell>
                                        <TableCell align="right">Source</TableCell>
                                        <TableCell align="right">Budget Amount</TableCell>
                                        <TableCell align="right">Budget Year</TableCell>
                                        <TableCell align="right">Project Name</TableCell>
                                        <TableCell align="right">Project Category</TableCell>
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
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateBudget", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.Budget_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Budget_Category}</TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Source}</TableCell>
                                        <TableCell align="right">{row.Budget_Amount}</TableCell>
                                        <TableCell align="right">{row.Budget_Year}</TableCell>
                                        <TableCell align="right">{row.Project_Name}</TableCell>
                                        <TableCell align="right">{row.Project_Category}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  budgets.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateBudget", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.Budget_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Budget_Category}</TableCell>
                                        <TableCell align="right">{row.Department}</TableCell>
                                        <TableCell align="right">{row.Source}</TableCell>
                                        <TableCell align="right">{row.Budget_Amount}</TableCell>
                                        <TableCell align="right">{row.Budget_Year}</TableCell>
                                        <TableCell align="right">{row.Project_Name}</TableCell>
                                        <TableCell align="right">{row.Project_Category}</TableCell>
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

export default BudgetUpdate