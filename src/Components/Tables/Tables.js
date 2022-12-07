import React, { useState, useEffect, useContext } from 'react'
import './Tables.css'
import axios from 'axios';
import { HOST, GET_ALL_USERS, GET_ALL_SHIPPERS, GET_ALL_SUPPLIERS } from '../Constants/Constants'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import LoadingSpinner from '../Loader/Loader';

function Tables(props) {
  const [customers, setcustomers] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const category = props.category

  useEffect(() => {
    const call = async () => {
      setIsLoading(true);
      let apiCall = ""
      if (category === "Shippers")
        apiCall = GET_ALL_SHIPPERS
      else if (category === "Customers")
        apiCall = GET_ALL_USERS
      else if (category === "Suppliers")
        apiCall = GET_ALL_SUPPLIERS

      await axios.get(HOST + apiCall, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
        setcustomers(res.data.res)
        setIsLoading(false);
      }).catch((err) => {
        console.log(err)
      })
    }
    call()
  }, [category])
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  const columns1 = [{
    dataField: 'Company_ID',
    text: 'Company ID',
    sort: true
  },{
    dataField: 'Salutation',
    text:'Salutation',
    // filter: textFilter()
    // sort: true
  },{
    dataField:'First_Name',
    text:'First Name',
    // sort: true
  },{
    dataField:'Last_Name',
    text:'Last Name',
    // filter: textFilter()
  },{
    dataField:'Email_Perosnal',
    text:'Email Perosnal',
    
  },
  {
    dataField:'Email_Work',
    text:'Email Work',
    // filter: textFilter()
  },
  {
    dataField:'Job_Title',
    text:'Job Title',
  },{
    dataField:'Business_Phone',
    text:'Business',
  }
  ,{
    dataField:'Mobile_Phone_Personal',
    text:'Mobile',
  }
  ,{
    dataField:'Address',
    text:'Address',
    // sort: true
  }
  ,{
    dataField:'City',
    text:'City',
  },{
    dataField:'Province',
    text:'Province',
  }
  ,{
    dataField:'ZIP',
    text:'ZIP',
    
  },{
    dataField:'Country',
    text:'Country',
  }
]
const columns2 = [{
  dataField: 'ID',
  text: 'Client ID',
  sort: true
},{
  dataField: 'Birthday',
  text:'Birthday',
  // filter: textFilter()
  sort: true
},{
  dataField:'Anniversary',
  text:'Anniversary',
  sort: true
},{
  dataField:'Sports',
  text:'Sports',
  // filter: textFilter()
},{
  dataField:'Activities',
  text:'Activity',
  
},{
  dataField:'Beverage',
  text:'Beverage',
  
},
{
  dataField:'Alcohol',
  text:'Alcohol',
},{
  dataField:'Travel_Destination',
  text:'Travel Destination',
}
,{
  dataField:'Spouse_Name',
  text:'Spouse',
}
,{
  dataField:'Children',
  text:'Children',
  sort: true
}
,{
  dataField:'TV_Show',
  text:'TV Show',
},{
  dataField:'Movies',
  text:'Movies',
}
,{
  dataField:'Actor',
  text:'Actor',
  
},{
  dataField:'Dislikes',
  text:'Dislikes',
}
]
const { SearchBar,ClearSearchButton } = Search;
  return (
    <>
    <Box sx={{ width: "100%", typography: "body1" }} /* style={{'backgroundColor':'rgb(195, 193, 193)'}} */>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Clients" value="1" />
            <Tab label="Personal Details" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <ToolkitProvider
          keyField="id"
          data={ customers }
          columns={ columns1 }
          search  
        >
          {
            props => (
              <div>
                <div style={{'marginLeft':'43%'}}>
                <SearchBar { ...props.searchProps } />
                <br />
                <div style={{'marginLeft':'8%'}}>
                <ClearSearchButton { ...props.searchProps } /></div>
                </div>
                <BootstrapTable
                  { ...props.baseProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>}
      </TabPanel>
      <TabPanel value="2">
      {isLoading?<LoadingSpinner/>:
      <div className="div1" >
        <ToolkitProvider
          keyField="id"
          data={ customers }
          columns={ columns2 }
          search  
        >
          {
            props => (
              <div>
                <div style={{'marginLeft':'43%'}}>
                <SearchBar { ...props.searchProps } />
                <br />
                <div style={{'marginLeft':'8%'}}>
                <ClearSearchButton { ...props.searchProps } /></div>
                </div>
                <BootstrapTable
                  { ...props.baseProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
      </div>}
      </TabPanel>
      </TabContext>
    </Box>
    </>
  )
}

export default Tables