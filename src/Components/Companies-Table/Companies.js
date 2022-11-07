import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import './Companies.css'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import LoadingSpinner from '../Loader/Loader';
function Companies() {
    const [companies, setcompanies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { SearchBar,ClearSearchButton } = Search;
    useEffect(() => {
      setIsLoading(true);
        const call = async () => {
          await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/COMPANIES', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setcompanies(res.data.res)
            setIsLoading(false)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const columns = [{
        dataField: 'ID',
        text: 'Company ID',
        sort: true
      },{
        dataField: 'Name',
        text:'Company Name',
        // filter: textFilter()
        sort:true
      },{
        dataField:'Category',
        text:'Category',
        // filter: textFilter()
        sort:true
      },{
        dataField:'Address',
        text:'Address',
        // filter: textFilter()
      },{
        dataField:'City',
        text:'City',
        // filter: textFilter()
        sort:true
      },{
        dataField:'Province',
        text:'Province',
        sort:true
      },{
        dataField:'Country',
        text:'Country',
        sort:true
      },{
        dataField:'Business_Phone',
        text:'Business_Phone',
      },{
        dataField:'Email',
        text:'Email',
      }
      ,{
        dataField:'Web_Page',
        text:'Web_Page',
      }
      ,{
        dataField:'Notes',
        text:'Notes',
      }
    ]
  return (
    <>
    {isLoading?<LoadingSpinner/>:
        <div className="div1" >
          <ToolkitProvider
            keyField="id"
            cellEdit={ cellEditFactory({ mode: 'click' }) }
            data={ companies }
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
                  cellEdit={ cellEditFactory({ mode: 'click' }) }
                    { ...props.baseProps }
                  />
                </div>
              )
            }
          </ToolkitProvider>
        </div>}
    </>
  )
}

export default Companies