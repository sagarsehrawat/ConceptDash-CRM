import React, {useState,useEffect} from 'react'
import editicon from '../icons/edit_black_24dp (1) 2edit_grey.svg'
import deleteicon from '../icons/delete_black_24dp 3.svg'
import notificon from '../icons/notifications_black_24dp (3) 1.svg'
import moment from 'moment';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { HOST1,UPDATE_GENERAL_NOTES, UPDATE_PROJECT_NOTES,DELETE_GENERAL_NOTES, DELETE_PROJECT_NOTES} from '../../../Constants/Constants';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Moment from 'moment';
type Props={
   data: object
   index: number
   value :String
   api:number
     setApi : Function
     id: any
}
const NotesCard = (props : Props) => {
   const [isDateChipOpen, setDateChipOpen] = useState<Boolean>(false);
   const [date,setDate] = useState<any>(Moment.moment);
   const [showModal, setShowModal] = useState<Boolean>(false);
   const [editModal, setEditModal] = useState<String>(props.data.note);
   const handleDelete1 = () => {
    axios.post(HOST1 + DELETE_PROJECT_NOTES, {
      peopleId: props.id, // Replace with actual peopleId
      projectId: 1, // Replace with actual projectId
      index: props.index,
    }, {
      headers: {
        auth: "Rose " + localStorage.getItem("auth")
      }
    },)
      .then((response) => {
        console.log('API Updated:', response.data);
        props.setApi(props.api+1);
      })
      .catch((error) => {
        console.error('Error updating API:', error);
      });
  };
  const handleDelete = () => {
    axios.post(HOST1 + DELETE_GENERAL_NOTES, {
      peopleId: props.id, 
      index: props.index,
    }, {
      headers: {
        auth: "Rose " + localStorage.getItem("auth")
      }
    },)
      .then((response) => {
        console.log('API Updated:', response.data);
        props.setApi(props.api+1);
      })
      .catch((error) => {
        console.error('Error updating API:', error);
      });
  };
   const handleDateChange = (date) => {
      axios.post(HOST1 + UPDATE_GENERAL_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: props.data.note,
        peopleId: props.id,
        index: props.index,
        reminder: true,
        reminderDate: JSON.stringify(date),
      }, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth")
        }
      },)
        .then((response) => {
          console.log('API Updated:', response.data);
          props.setApi(props.api+1);
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };
    const handleDateChange1 = (date) => {
      console.log(date)
      axios.post(HOST1 + UPDATE_PROJECT_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: props.data.note,
        peopleId: props.id,
        projectId: 1,
        index: props.index,
        reminder: true,
        reminderDate: JSON.stringify(date),
      }, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth")
        }
      })
        .then((response) => {
          console.log('API Updated:', response.data);
          props.setApi(props.api+1)
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };
    const handleEditChange = () => {
      axios.post(HOST1 + UPDATE_GENERAL_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: editModal,
        peopleId: props.id,
        index: props.index,
        reminder: props.data.reminder,
        reminderDate: props.data.reminderDate,
      }, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth")
        }
      })
        .then((response) => {
          console.log('API Updated:', response.data);
         setShowModal(false);
         props.setApi(props.api+1)
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    }
    const handleEditChange1 = () => {
      axios.post(HOST1 + UPDATE_PROJECT_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: editModal,
        peopleId: props.id,
        projectId:1,
        index: props.index,
        reminder: props.data.reminder,
        reminderDate: props.data.reminderDate,
      }, {
        headers: {
          auth: "Rose " + localStorage.getItem("auth")
        }
      })
        .then((response) => {
          console.log('API Updated:', response.data);
         setShowModal(false);
         props.setApi(props.api+1)

        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };  
  const openModal = () => {
   setShowModal(true);
 };

 const closeModal = () => {
   setShowModal(false);
 };

     const styles={
        Card:{
            display: 'flex',
            padding: 'var(--12-pad, 12px) 16px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '5 px',
            alignSelf: 'stretch',
            borderRadius: 'var(--12-pad, 12px)',
  border: '1px solid var(--New-Outline, #EBEDF8)',
  background: '#FFF',
        },
        content:{
            color: 'var(--Black-text, #3D424F)',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px', // 171.429%
            width: '403px'
          },
          subcontent:{
            display: 'flex',
            padding: '0px var(--8-pad, 8px)',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignSelf: 'stretch',
          },
          subcontent1:{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--12-pad, 12px)',
                    color: 'var(--New-grey, #728492)',
                    fontFamily: 'Roboto',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '16px', // 133.333%
                  
          },
         subcontent2:{ 
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--8-pad, 8px)',
          // padding : '0px var(--8-pad, 8px)',
          // justifyContent: 'space-between',
          // alignSelf: 'stretch'
        }   
          
     }
  return (
    <div style={styles.Card}>
        <div style={styles.content} dangerouslySetInnerHTML={{ __html: props.data.note }} />
        <div style={styles.subcontent}>
            <div style={styles.subcontent1}>{props.data.name}&nbsp;&nbsp;&nbsp;&nbsp;{props.data.date}</div>
            <div style={styles.subcontent2}>
               <img src={editicon}  alt="" onClick={openModal}/>
               <img src={deleteicon} alt="" onClick={props.value === "General" ?  handleDelete : handleDelete1} />
               {isDateChipOpen ? (
               <TFDateChip
                 value={date}
                 onChange={(date) => {
                 console.log(props.data);
                 console.log(date);
                 props.value === "General" ?  handleDateChange(date) : handleDateChange1(date);
                setDateChipOpen(!isDateChipOpen) ;
                 }}
               />
             ):
               <img src={notificon} alt="" onClick={()=>setDateChipOpen(!isDateChipOpen)}/>
             }
      <Modal show={showModal} onHide={closeModal} centered style={{width:"400px", position:"fixed", left:"50%"}} >
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CKEditor
                editor={ClassicEditor}
              config={{         
             toolbar: ['bold', 'italic', 'link', 'numberedList', 'bulletedList', '|', 'undo', 'redo']
        }}                
                data={editModal}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  console.log(data);
                  setEditModal(data);
                }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { props.value == "General" ? handleEditChange(): handleEditChange1()}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

            </div>
            </div>
        </div>
  )
}

export default NotesCard