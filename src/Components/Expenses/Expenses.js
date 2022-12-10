import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import LoadingSpinner from '../Loader/Loader';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function TimeSheetTable() {
  const [value, setValue] = useState("1");
    const { SearchBar,ClearSearchButton } = Search;
    const [expenseCat, setexpenseCat] = useState([]);
    const [expenseTrans, setexpenseTrans] = useState([]);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    useEffect(() => {
        const call = async () => {
          const res = await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/expenseCat',{headers:{'auth':'Rose '+ localStorage.getItem('auth')}});
          setexpenseCat(res.data.res)
          console.log(res.data);
          const res1 = await axios.get('http://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/expenseTrans',{headers:{'auth':'Rose '+ localStorage.getItem('auth')}});
          setexpenseTrans(res1.data.res);
          console.log(res1.data);
        }
        call()
    },[]);

      const columns = [{
        dataField: 'ExpCat_ID',
        text: 'Expense ID',
        sort: true
      },{
        dataField: 'Description',
        text:'Description',
      },{
        dataField:'Expense',
        text:'Expense',
      },{
        dataField:'Taxable',
        text:'Taxable',
      }
    ]
    const columns1 = [{
      dataField: 'Expense_ID',
      text: 'Expense ID',
      sort: true
    },{
      dataField: 'Client',
      text:'Client',
    },{
      dataField:'Date',
      text:'Date',
      sort:true
    },{
      dataField:'Category',
      text:'Category',
    },{
      dataField:'Amount',
      text:'Amount',
    },{
      dataField:'Tax',
      text:'Tax',
    },{
      dataField:'Total_Amount',
      text:'Total Amount',
    },{
      dataField:'Remarks',
      text:'Remarks',
    }
  ]
  return (
    <>
    <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            centered
            onChange={handleChange}
            aria-label=""
          >
            <Tab label="Expense Categories" value="1" />
            <Tab label="Expense Transactions" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">

    <div className="div1" >
          <ToolkitProvider
            keyField="id"
            data={ expenseCat }
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
        </div>
        </TabPanel>
        <TabPanel value="3">
        <div className="div1" >
          <ToolkitProvider
            keyField="id"
            data={ expenseTrans }
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
        </div>
        </TabPanel>
        </TabContext>
    </Box>
    </>
  )
}

export default TimeSheetTable