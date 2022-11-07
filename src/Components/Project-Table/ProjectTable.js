import {React, useEffect, useState} from 'react'
import { TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Paper } from '@material-ui/core';
import './ProjectTable.css'
import axios from 'axios'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory, { textFilter,dateFilter } from 'react-bootstrap-table2-filter';
import LoadingSpinner from '../Loader/Loader';
function ProjectTable() {
    const [projects, setprojects] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const { SearchBar,ClearSearchButton } = Search;
    useEffect(() => {
      setIsLoading(true);
        const call = async () => {
          await axios.get('https://conceptdashcrm-env.eba-bjgvjq2h.ca-central-1.elasticbeanstalk.com/api/get/projects', {headers:{'auth':'Rose '+ localStorage.getItem('auth')}}).then((res) => {
            setprojects(res.data.res)
            setIsLoading(false)
          }).catch((err) => {
            console.log(err)
          })
        }
        call()
      },[])
      const columns = [{
        dataField: 'Project_ID',
        text: 'Project ID',
        sort: true
      },{
        dataField: 'Project_Name',
        text:'Project Name',
        // filter: textFilter()
      },{
        dataField:'Date_Created',
        text:'Date Created',
        sort:true
        // filter: dateFilter()
      },{
        dataField:'Project_Due_Date',
        text:'Project Due Date',
        // filter: textFilter()
      },{
        dataField:'Project_Stage',
        text:'Project Stage',
        // filter: textFilter()
      },
      // {
      //   dataField:'Follow_Up_Notes',
      //   text:'Follow Up Notes',
      // },
      {
        dataField:'Next_Follow_up',
        text:'Next Follow up',
      },{
        dataField:'Tentative_Closing',
        text:'Tentative Closing',
      }/* ,{
        dataField:'Employee',
        text:'Employee',
      } */
      ,{
        dataField:'Product_Qty',
        text:'Product Quatity',
      }
      // ,{
      //   dataField:'Product_Specified',
      //   text:'Product Specified',
      // }
      ,{
        dataField:'Project_Value',
        text:'Project Value',
      },{
        dataField:'Consultant',
        text:'Consultant',
        // filter: textFilter()
      },{
        dataField:'City',
        text:'City',
        
      },{
        dataField:'Province',
        text:'Province',
      },{
        dataField:'Department',
        text:'Department',
        // filter: textFilter()
      },{
        dataField:'Assigned_To',
        text:'Assigned To',
      },{
        dataField:'Contractor',
        text:'Contractor'
      },{
        dataField:'Distributor',
        text:'Distributor'
      }
    ]
  return (
    <>
    {isLoading?<LoadingSpinner />:
       <div className="div1" >
          <ToolkitProvider
            keyField="Project_ID"
            data={ projects }
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
    </>
  )
}

export default ProjectTable