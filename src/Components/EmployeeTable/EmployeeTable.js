import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper, Button } from '@material-ui/core';
import './EmployeeTable.css'
import { GET_ALL_EMPLOYEES, HOST } from '../Constants/Constants';
import axios from 'axios'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import LoadingSpinner from '../Loader/Loader';
import Form from 'react-bootstrap/Form';
function EmployeeTable() {
  const [employees, setemployees] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const { SearchBar,ClearSearchButton } = Search;
  const [timesheet, settimesheet] = useState([])
  const handleChange1 = async (e) => {
    console.log(e.target.value);
    await axios.get('http://localhost:8080/api/get/timesheet',{headers:{'auth':'Rose '+ localStorage.getItem('auth'),'id':e.target.value}}).then(async (res) => {
      settimesheet(res.data.res)
      console.log(res.data);
      console.log(timesheet)
    setIsLoading(false)
  }).catch((err) => {
    console.log(err)
  })
};
useEffect(() => {
    const call = async () => {
      const res = await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/employeeNames',{headers:{'auth':'Rose '+ localStorage.getItem('auth')}});
      setemployeess(res.data.res)
      console.log(res.data);
    }
    call()
  },[]);
  const [employeess, setemployeess] = useState([]);
    useEffect(() => {
      setIsLoading(true);
        const call = async () => {
          await axios.get(HOST + GET_ALL_EMPLOYEES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {

            setemployees(res.data.res)
            setIsLoading(false)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  const columns1 = [{
      dataField: 'Employee_ID',
      text: 'ID',
      sort: true
    },{
      dataField: 'Username',
      text:'User',
      // filter: textFilter()
    },{
      dataField:'Salutation',
      text:'Salutation',
    },{
      dataField:'First_Name',
      text:'First Name',
      // filter: textFilter()
    },{
      dataField:'Last_Name',
      text:'Last Name',
      
    },
    {
      dataField:'Department',
      text:'Dept.',
      // filter: textFilter()
    },
    {
      dataField:'Company',
      text:'Company',
    },{
      dataField:'Email_Work',
      text:'Email Work',
    }
    ,{
      dataField:'Job_Title_ID',
      text:'Job Title',
    }
    ,{
      dataField:'Joining_Date',
      text:'Joining Date',
      sort:true
    }
    ,{
      dataField:'Business_Phone',
      text:'Business',
    },{
      dataField:'Address',
      text:'Address',
    }
    ,{
      dataField:'City',
      text:'City',
      
    },{
      dataField:'State',
      text:'State',
    },{
      dataField:'ZIP',
      text:'ZIP',
    },{
      dataField:'Country',
      text:'Country',
    },{
      dataField:'Notes',
      text:'Notes'
    }
  ]
  const columns2 = [{
    dataField: 'Employee_ID',
    text: 'ID',
    sort: true
  },{
    dataField: 'Birthday',
    text:'Birthday',
    sort:true
    // filter: textFilter()
  },{
    dataField:'Anniversary',
    text:'Anniversary',
    sort:true
  },{
    dataField:'Sports',
    text:'Sports',
    // filter: textFilter()
  },{
    dataField:'Activities',
    text:'Activity',
    
  },
  {
    dataField:'Beverage',
    text:'Beverage',
    // filter: textFilter()
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
const columns3 = [{
  dataField: 'Employee_ID',
  text: 'ID',
  sort: true
},{
  dataField: 'Proficiency',
  text:'Proficiency',
  // filter: textFilter()
  // sort: true
},{
  dataField:'Expertise',
  text:'Expertise',
  // sort: true
},{
  dataField:'Interests',
  text:'Interests',
  // filter: textFilter()
},{
  dataField:'Cocurricular',
  text:'Cocurricular',
  
},
{
  dataField:'Trainings',
  text:'Trainings',
  // filter: textFilter()
}
]
const columns4 = [{
  dataField: 'Employee_ID',
  text: 'ID',
  sort: true
},{
  dataField: 'Strengths',
  text:'Strengths',
  // filter: textFilter()
  // sort: true
},{
  dataField:'Weakness',
  text:'Weakness',
  // sort: true
},{
  dataField:'Social_Active_Index',
  text:'Social Active Index',
  sort:true
  // filter: textFilter()
}]
const columns5 = [{
  dataField: 'Date',
  text: 'Date',
  sort: true
},{
  dataField: 'Start_Time',
  text:'Start Time',
  // filter: textFilter()
  sort:true
},{
  dataField:'End_Time',
  text:'End Time',
  // filter: textFilter()
  sort:true
},{
  dataField:'Project_Name',
  text:'Project Name',
  // filter: textFilter()
},{
  dataField:'Comments',
  text:'Comments',
  // filter: textFilter()
  sort:true
}
]
  return (
    <>
    <Box sx={{ width: "100%", typography: "body1" }} style={{'margin':'0'}}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Employees" value="1" />
            <Tab label="Personal Details" value="2" />
            <Tab label="Employee Skills" value="3" />
            <Tab label="Personal Traits" value="5" />
            <Tab label="TimeSheet" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1" style={{'margin':'0'}}>
        {isLoading?<LoadingSpinner/>:
        <div className="div1" style={{'overflowX':'auto'}}>
          <ToolkitProvider
            keyField="id"
            data={ employees }
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
        <TabPanel centered value="2">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <ToolkitProvider
          keyField="id"
          data={ employees }
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
        <TabPanel centered value="3">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <ToolkitProvider
          keyField="id"
          data={ employees }
          columns={ columns3 }
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
        
        <TabPanel centered value="5">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
        <ToolkitProvider
          keyField="id"
          data={ employees }
          columns={ columns4 }
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
        <TabPanel centered value="4">
        <h1 style={{'textAlign':'center'}}>Select Employee</h1>
        <Form.Select onChange={handleChange1}>
        {employeess.length!==0?employeess.map((options) => (
          <option value={options.Employee_ID} key={options.Employee_ID}>
            {options.Full_Name}
          </option>
        )):
        <option value=''>None</option>
        }
        </Form.Select>
        {isLoading?<LoadingSpinner/>:
          <ToolkitProvider
            keyField="id"
            data={ timesheet }
            columns={ columns5 }
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
          </ToolkitProvider>}
        </TabPanel>
        </TabContext>
      </Box>
    
      </>
  )
}

export default EmployeeTable