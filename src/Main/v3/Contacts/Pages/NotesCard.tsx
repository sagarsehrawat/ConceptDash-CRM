import React, {useState} from 'react'
import editicon from '../icons/edit_black_24dp (1) 2edit_grey.svg'
import deleteicon from '../icons/delete_black_24dp 3.svg'
import notificon from '../icons/notifications_black_24dp (3) 1.svg'
import moment from 'moment';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { HOST1,UPDATE_GENERAL_NOTES, UPDATE_PROJECT_NOTES} from '../../../Constants/Constants';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap Modal and Button

type Props={
   data: object
   index: number
   value :String
}
const NotesCard = (props : Props) => {
   const [isDateChipOpen, setDateChipOpen] = useState<Boolean>(false);
   const [date,setDate] = useState<any>(null);
   const [showModal, setShowModal] = useState<Boolean>(false);
   const [editModal, setEditModal] = useState<String>(props.data.note);
   const handleDateChange = (date) => {
      axios.post(HOST1 + UPDATE_GENERAL_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: props.data.note,
        peopleId: 1,
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
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };
    const handleDateChange1 = (date) => {
      axios.post(HOST1 + UPDATE_PROJECT_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: props.data.note,
        peopleId: 1,
        projectId: 4,
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
        peopleId: 1,
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
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };  
    const handleEditChange1 = () => {
      axios.post(HOST1 + UPDATE_PROJECT_NOTES, {
        name: props.data.name,
        date: props.data.date,
        notes: editModal,
        peopleId: 1,
        projectId:4,
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
            gap: 'var(--8-pad,8px)',
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
        <div style={styles.content}>{props.data.note}</div>
        <div style={styles.subcontent}>
            <div style={styles.subcontent1}>{props.data.name}&nbsp;&nbsp;&nbsp;&nbsp;{props.data.date}</div>
            <div style={styles.subcontent2}>
               <img src={editicon}  alt="" onClick={openModal}/>
               <img src={deleteicon} alt=""  />
               {isDateChipOpen ? (
               <TFDateChip
                 onChange={(date) => {
                 console.log(props.data);
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
          <textarea
            value={editModal} // Set the initial value based on your data
            rows="5"
            cols="50"
            onChange={(e)=>setEditModal(e.target.value)}
          />
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