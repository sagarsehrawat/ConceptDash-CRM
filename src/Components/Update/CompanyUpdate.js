import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import { HOST, GET_COMPANIES } from '../Constants/Constants';
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

function CompanyUpdate() {
    const navigate = useNavigate();
    const [companies, setcompanies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([])
    useEffect(() => {
        setIsLoading(true);
          const call = async () => {
            await axios.get(HOST + GET_COMPANIES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
              setcompanies(res.data.res)
              setdataSource(res.data.res)
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
      <div style={{'marginLeft':'2vw','marginTop':'2vh','marginBottom':'2vh','marginRight':'3vw'}}>
                <Button style={{'marginRight':'1vh'}} onClick={() => navigate(-1)}>Back</Button>
                <Button style={{'float':'right'}} onClick={() => navigate(1)}>Forward</Button>
            </div>
      <h1 style={{'margin':'auto', 'textAlign':'center','textDecoration':'underline', 'marginTop':'5vh','marginBottom':'4vh'}}>Companies</h1>
      <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterData} placeholder='Search'/>
      <br />
      <Button onClick={(e) => {navigate("/companyform")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add a New Company</Button>
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell >Edit</TableCell>
                                        <TableCell align="right">Company ID</TableCell>
                                        <TableCell align="right">Company Name</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Address</TableCell>
                                        <TableCell align="right">City</TableCell>
                                        <TableCell align="right">Province</TableCell>
                                        <TableCell align="right">Country</TableCell>
                                        <TableCell align="right">Business Phone</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Web Page</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilter.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateCompany", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right">{row.Category}</TableCell>
                                        <TableCell align="right">{row.Address}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        <TableCell align="right">{row.Business_Phone}</TableCell>
                                        <TableCell align="right">{row.Email}</TableCell>
                                        <TableCell align="right">{row.Web_Page}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  companies.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateCompany", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell align="right" component="th" scope="row">
                                        {row.ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Name}</TableCell>
                                        <TableCell align="right">{row.Category}</TableCell>
                                        <TableCell align="right">{row.Address}</TableCell>
                                        <TableCell align="right">{row.City}</TableCell>
                                        <TableCell align="right">{row.Province}</TableCell>
                                        <TableCell align="right">{row.Country}</TableCell>
                                        <TableCell align="right">{row.Business_Phone}</TableCell>
                                        <TableCell align="right">{row.Email}</TableCell>
                                        <TableCell align="right">{row.Web_Page}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer></div>}
    </div>
  )
}

export default CompanyUpdate