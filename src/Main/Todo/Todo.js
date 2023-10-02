import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
import LoadingSpinner from '../Loader/Loader';
import Button from 'react-bootstrap/Button';
import { HOST, GET_TASKS } from '../Constants/Constants';
import { useNavigate } from 'react-router-dom'

function Todo() {
    const [isLoading, setIsLoading] = useState(false);
    const { SearchBar,ClearSearchButton } = Search;
    const [tasks, settasks] = useState([])
    useEffect(() => {
        setIsLoading(true);
          const call = async () => {
            await axios.get(HOST + GET_TASKS, {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
                settasks(res.data.res)
              setIsLoading(false)
            }).catch((err) => {
              console.log(err)
            })
          }
          call()
        },[])
        const columns = [{
            dataField: 'Task_ID',
            text: 'Task ID',
            sort: true
          },{
            dataField: 'Title',
            text:'Title',
            // filter: textFilter()
          },{
            dataField:'Priority',
            text:'Priority',
            // filter: textFilter()
            sort:true
          },{
            dataField:'Status',
            text:'Status',
            // filter: textFilter()
          },{
            dataField:'percentComplete',
            text:'% Completed',
            // filter: textFilter()
            sort:true
          },{
            dataField:'Assigned_To',
            text:'Assigned To',
          },{
            dataField:'Description',
            text:'Description',
          },{
            dataField:'Start_Date',
            text:'Start Date',
          },{
            dataField:'Due_Date',
            text:'Due Date',
          }
          ,{
            dataField:'Completed_Date',
            text:'Completion Date',
          }
          ,{
            dataField:'Attachments',
            text:'Attachments',
          }
        ]
        const navigate = useNavigate();
  return (
    <div>
        <Button variant='success' onClick={(e) => {navigate("/addTask")}} style={{'marginLeft':'46%','marginTop':'2vh', 'marginBottom':'2vh'}}>Add Task</Button>
        {isLoading?<LoadingSpinner/>:
        <div className="div1" >
          <ToolkitProvider
            keyField="id"
            cellEdit={ cellEditFactory({ mode: 'click' }) }
            data={ tasks }
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
    </div>
  )
}

export default Todo