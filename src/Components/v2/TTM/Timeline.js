import React, { useEffect, useState } from 'react'
import './Timeline.css'
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective } from '@syncfusion/ej2-react-gantt';
import { editingData, editingResources } from './Data';
import { GET_TTM, HOST } from '../../Constants/Constants';
import LoadingSpinner from '../../Loader/Loader';
import axios from 'axios';
function Timeline() {

//   const [editingData, seteditingData] = useState([])
  const [isLoading, setisLoading] = useState(false)
//     useEffect(() => {
//         setisLoading(true);
//         const call = async() => {
//           await axios
//             .get(HOST + GET_TTM, {
//               headers: { auth: "Rose " + localStorage.getItem("auth"), proposalId:"78" }
//             })
//             .then((res) => {
//               let data = JSON.parse(res.data.res[0].Data)
//               seteditingData(data)
//               // seteditingData(JSON.parse(res.data.res[0].Data))
//             })
//             .catch((err) => {
//               console.log(err);
//             });
    
//           setisLoading(false);
//         };
//         call();
//       }, []);
    
const taskFields = {
    id: 'TaskID',
    name: 'TaskName',
    startDate: 'StartDate',
    endDate: 'EndDate',
    duration: 'Duration',
    progress: 'Progress',
    dependency: 'Predecessor',
    child: 'subtasks',
    notes: 'info',
    resourceInfo: 'resources'
};
const resourceFields = {
    id: 'resourceId',
    name: 'resourceName'
};
const editSettings = {
    allowAdding: true,
    allowEditing: true,
    allowDeleting: true,
    allowTaskbarEditing: true,
    showDeleteConfirmDialog: true
};
const splitterSettings = {
    columnIndex: 2
};
const projectStartDate = new Date('07/25/2023');
const projectEndDate = new Date('09/28/2023');
const gridLines = 'Both';
const toolbar = ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'Indent', 'Outdent'];
const timelineSettings = {
    topTier: {
        unit: 'Week',
        format: 'MMM dd, y',
    },
    bottomTier: {
        unit: 'Day',
    },
};
const labelSettings = {
    leftLabel: 'TaskName',
    rightLabel: 'resources'
};
  return (
   isLoading?<LoadingSpinner/>:
   <div className='control-pane'>
   <div className='control-section'>
     <GanttComponent id='Editing' dataSource={editingData} dateFormat={'MMM dd, y'} treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} allowUnscheduledTasks={true} taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} splitterSettings={splitterSettings} height='100%' editSettings={editSettings} toolbar={toolbar} resources={editingResources}>
       <ColumnsDirective>
         <ColumnDirective field='TaskID' width='80'></ColumnDirective>
         <ColumnDirective field='TaskName' headerText='Milestones and Tasks' width='250' clipMode='EllipsisWithTooltip'></ColumnDirective>
         <ColumnDirective field='StartDate'></ColumnDirective>
         <ColumnDirective field='Duration'></ColumnDirective>
         <ColumnDirective field='Progress'></ColumnDirective>
         <ColumnDirective field='Predecessor'></ColumnDirective>
       </ColumnsDirective>
       <EditDialogFieldsDirective>
         <EditDialogFieldDirective type='General' headerText='General'></EditDialogFieldDirective>
         <EditDialogFieldDirective type='Dependency'></EditDialogFieldDirective>
         <EditDialogFieldDirective type='Resources'></EditDialogFieldDirective>
         <EditDialogFieldDirective type='Notes'></EditDialogFieldDirective>
       </EditDialogFieldsDirective>
       <Inject services={[Edit, Selection, Toolbar, DayMarkers]}/>
     </GanttComponent>
   </div>

 </div>
  )
}

export default Timeline
