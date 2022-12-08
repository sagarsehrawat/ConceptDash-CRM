import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function AssetUpdate() {
    const navigate = useNavigate();
    
    const [assets, setassets] = useState([])
    const [software, setsoftware] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [dataSource, setdataSource] = useState([])
    const [dataSourceSoft, setdataSourceSoft] = useState([])
        useEffect(() => {
        setIsLoading(true);
            const call = async () => {
            await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/assets', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setassets(res.data.res)
                setdataSource(res.data.res)
                setIsLoading(false)
                }).catch((err) => {
                    console.log(err)
                })
            await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/softwares', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                setsoftware(res.data.res)
                setdataSourceSoft(res.data.res)
                setIsLoading(false)
              }).catch((err) => {
                console.log(err)
              })
            }
            call()
        },[])
        const [value1, setValue1] = useState("1");
    const handleChange = (event, newValue) => {
        setValue1(newValue);
      };
    const[value, setValue] = useState('')
    const [tableFilter, settableFilter] = useState([])
    const [tableFilterSoft, settableFilterSoft] = useState([])
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
    const filterDataSoft = (e) =>{
        if(e.target.value!=""){
          setValue(e.target.value);
          const filterTableSoft = dataSourceSoft.filter(o=>Object.keys(o).some(k=>
            String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())))
            settableFilterSoft([...filterTableSoft])
        } else {
          setValue(e.target.value);
          setdataSourceSoft([...dataSourceSoft])
        }
      }
  return (
    <div>
         <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value1}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Assets" value="1" />
            <Tab label="Softwares" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{'margin':'0'}}>
        {isLoading?<LoadingSpinner />:
    <div>
      <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterData} placeholder='Search'/>
      <br />
      <Button onClick={(e) => {navigate("/assetform")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add a New Asset</Button>
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell >Edit</TableCell>
                                        <TableCell align="right">Asset ID</TableCell>
                                        <TableCell align="right">Asset Category</TableCell>
                                        <TableCell align="right">Hardware Details</TableCell>
                                        <TableCell align="right">Purchase Price</TableCell>
                                        <TableCell align="right">Acquired On</TableCell>
                                        <TableCell align="right">Shipped On</TableCell>
                                        <TableCell align="right">Retired Date</TableCell>
                                        <TableCell align="right">Attachments</TableCell>
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
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateProjectForm", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Asset_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Asset_Category}</TableCell>
                                        <TableCell align="right">{row.Hardware_Details}</TableCell>
                                        <TableCell align="right">{row.Purchase_Price}</TableCell>
                                        <TableCell align="right">{row.Aquired_Date}</TableCell>
                                        <TableCell align="right">{row.Shipped_On}</TableCell>
                                        <TableCell align="right">{row.Retired_Date}</TableCell>
                                        <TableCell align="right">{row.Attachments}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  assets.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="right"><Button onClick={(e) => {navigate("/updateProjectForm", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Asset_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Asset_Category}</TableCell>
                                        <TableCell align="right">{row.Hardware_Details}</TableCell>
                                        <TableCell align="right">{row.Purchase_Price}</TableCell>
                                        <TableCell align="right">{row.Aquired_Date}</TableCell>
                                        <TableCell align="right">{row.Shipped_On}</TableCell>
                                        <TableCell align="right">{row.Retired_Date}</TableCell>
                                        <TableCell align="right">{row.Attachments}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer></div>}
        </TabPanel>
        <TabPanel value="3" style={{'margin':'0'}}>
        {isLoading?<LoadingSpinner />:
    <div>
      <input style={{'marginLeft':'41vw', 'marginBottom':'4vh','width':'20vw'}} type="text" value={value} onChange={filterDataSoft} placeholder='Search'/>
      <br />
      <Button onClick={(e) => {navigate("/addsoftware")}} style={{'marginLeft':'45vw', 'marginBottom':'4vh'}}>Add a New Software</Button>
        <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell align='left'>Edit</TableCell>
                                        <TableCell align="left">Software ID</TableCell>
                                        <TableCell align="right">Software</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Company</TableCell>
                                        <TableCell align="right">Version</TableCell>
                                        <TableCell align="right">Manufacturer</TableCell>
                                        <TableCell align="right">Used By</TableCell>
                                        <TableCell align="right">Attachments</TableCell>
                                        <TableCell align="right">Notes</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {value.length > 0 ? tableFilterSoft.map((row) => {
                                      return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="left"><Button onClick={(e) => {navigate("/updateProjectForm", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Software_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Software}</TableCell>
                                        <TableCell align="right">{row.Price}</TableCell>
                                        <TableCell align="right">{row.Company}</TableCell>
                                        <TableCell align="right">{row.Version}</TableCell>
                                        <TableCell align="right">{row.Manufacturer}</TableCell>
                                        <TableCell align="right">{row.Used_By}</TableCell>
                                        <TableCell align="right">{row.Attachments}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                      )
                                      })
                                  :
                                  software.map((row) => {
                                    return (
                                        <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell align="left"><Button onClick={(e) => {navigate("/updateProjectForm", {state: row})}} style={{'backgroundColor':'rgb(99, 138, 235)'}}>Edit</Button></TableCell>
                                        <TableCell component="th" scope="row">
                                        {row.Software_ID}
                                        </TableCell>
                                        <TableCell align="right">{row.Software}</TableCell>
                                        <TableCell align="right">{row.Price}</TableCell>
                                        <TableCell align="right">{row.Company}</TableCell>
                                        <TableCell align="right">{row.Version}</TableCell>
                                        <TableCell align="right">{row.Manufacturer}</TableCell>
                                        <TableCell align="right">{row.Used_By}</TableCell>
                                        <TableCell align="right">{row.Attachments}</TableCell>
                                        <TableCell align="right">{row.Notes}</TableCell>
                                        </TableRow>
                                    )
                                  })}
                                    </TableBody>
                                </Table>
                                </TableContainer></div>}
        </TabPanel>
        </TabContext>
        </Box>
    </div>
  )
}

export default AssetUpdate