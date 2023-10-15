import React, { useEffect, useState } from 'react'
import { GanttComponent, EditDialogFieldsDirective, DayMarkers, EditDialogFieldDirective, Inject, Edit, Selection, Toolbar, ColumnsDirective, ColumnDirective, EventMarkersDirective, EventMarkerDirective } from '@syncfusion/ej2-react-gantt';
import { GET_TTM, HOST, PRIMARY_COLOR, UPDATE_TTM } from '../../../../Main/Constants/Constants';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import axios from 'axios';
function Timeline(props) {
    const {Name, Id} = props;
  const [editingData, seteditingData] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [emps, setemps] = useState([])
  const [desigs, setdesigs] = useState([])
  const [a, seta] = useState(0)
    useEffect(() => {
        setisLoading(true);
        const call = async() => {
          await axios
            .get(HOST + GET_TTM, {
              headers: { auth: "Rose " + localStorage.getItem("auth"), proposalId:Id }
            })
            .then((res) => {
                let data = JSON.parse(res.data.res[0].Data)
                let empRates = JSON.parse(res.data.res[0].Employee_Info)
                let desigs = JSON.parse(res.data.res[0].Designations)
                setemps(empRates)
                seteditingData(data)
                setdesigs(desigs)
            })
            .catch((err) => {
              console.log(err);
            });
    
          setisLoading(false);
        };
        call();
      }, []);
    

    const handleSubmit = async(e) =>{
        e.preventDefault();
            setisLoading(true);
            await axios
                .post(
                    HOST + UPDATE_TTM,
                    {
                      data: JSON.stringify(editingData),
                      employeeInfo: JSON.stringify(emps),
                      designations: JSON.stringify(desigs),
                      proposalId: Id,
                    },
                    { headers: { auth: "Rose " + localStorage.getItem("auth") } }
                )
                .then((res) => {
                    console.log(res)
                    if(res.data.success) {
                        // setsubmitLoading(false)
                        seta(a+1);
                    }
                    // seteditProfile(false);
                    setisLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                });
    
      }

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
const styles={
    addButton: {
        marginRight:'2vw',
        marginBottom:'1vh',
        marginTop:'1vh',
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 16px",
        gap: "8px",
        // width: "177px",
        height: "40px",
        background: PRIMARY_COLOR,
        border: "1px solid #6519E1",
        boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
        borderRadius: "5px",
    },
    addButtonText: {
        height: "24px",
        fontFamily: "'Roboto'",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#FBFBFB",
        flex: "none",
        margin: 0,
        flexGrow: 0
    },
}
  return (
   isLoading?<LoadingSpinner/>:
   <div className='control-pane'>
   <div className='control-section'>
   <div className='d-flex flex-row justify-content-end'>
   <button style={styles.addButton}  onClick={handleSubmit}><p style={styles.addButtonText} >Save Changes</p></button>
     </div>
     <GanttComponent id='Editing' dataSource={editingData} dateFormat={'MMM dd, y'} treeColumnIndex={1} allowSelection={true} showColumnMenu={false} highlightWeekends={true} allowUnscheduledTasks={true} taskFields={taskFields} timelineSettings={timelineSettings} labelSettings={labelSettings} splitterSettings={splitterSettings} height='100%' editSettings={editSettings} toolbar={toolbar}>
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
