import {React, useEffect, useState} from 'react'
import './Assets.css'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import LoadingSpinner from '../Loader/Loader';
import {HOST, GET_ASSETS, GET_SOFTWARES} from '../../Components/Constants/Constants'


function Assets() {
    const [value, setValue] = useState("1");
    const { SearchBar,ClearSearchButton } = Search;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [assets, setassets] = useState([])
  const [software, setsoftware] = useState([])
  const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      setIsLoading(true);
        const call = async () => {
          await axios.get(HOST + GET_ASSETS, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setassets(res.data.res)
            setIsLoading(false)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      useEffect(() => {
        setIsLoading(true);
        const call = async () => {
          await axios.get(HOST + GET_SOFTWARES, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setsoftware(res.data.res)
            setIsLoading(false)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const columns = [{
        dataField: 'Asset_ID',
        text: 'Asset ID',
        // filter: textFilter(),
        sort: true
      },{
        dataField: 'Asset_Category',
        text:'Asset Category',
        // filter: textFilter()
      sort:true
      },{
        dataField:'Hardware_Details',
        text:'Hardware Details'
      },{
        dataField:'Purchase_Price',
        text:'Purchase Price',
        sort: true,
        // filter: textFilter(),
      },{
        dataField:'Aquired_Date',
        text:'Aquired On',
        // filter: dateFilter(),
      sort:true
      }
      ,{
        dataField:'Shipped_On',
        text:'Shipped On',
        // filter: dateFilter(),
      sort:true
      },{
        dataField:'Retired_Date',
        text:'Retired Date',
        // filter: dateFilter(),
      sort:true
      },{
        dataField:'Attachments',
        text:'Attachments',
      },{
        dataField:'Notes',
        text:'Notes',
      }
    ]
    const columns1 = [{
      dataField: 'Software_ID',
      text: 'Software ID',
      // filter: textFilter(),
      sort: true
    },{
      dataField: 'Software',
      text:'Software',
      // filter: textFilter()
    },
    {
      dataField: 'Price',
      text:'Price',
      // filter: textFilter()
    },{
      dataField:'Company',
      text:'Company',
      // filter: textFilter()
    },{
      dataField:'Version',
      text:'Version',
      // filter: textFilter()
      sort:true
    }
    ,{
      dataField:'Manufacturer',
      text:'Manufacturer'
    },{
      dataField:'Used_By',
      text:'Used By',
      // filter: textFilter()
    },{
      dataField:'Attachments',
      text:'Attachments',
      // filter: textFilter()
    }
    ,{
      dataField:'Notes',
      text:'Notes',
      // filter: textFilter()
    }
  ]
  return (
    <div>
        <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
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
        <TabPanel centered value="1">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
          <ToolkitProvider
            keyField="id"
            data={ assets }
            columns={ columns }
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
        <TabPanel value="3">
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
          <ToolkitProvider
            keyField="id"
            data={ software }
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
      </TabContext>
    </Box>
    </div>
  )
}

export default Assets