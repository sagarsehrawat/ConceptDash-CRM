import React, {useState,useEffect, useRef} from 'react'
import editicon from '../icons/edit_black_24dp (1) 2edit_grey.svg'
import deleteicon from '../icons/delete_black_24dp 3.svg'
import notificon from '../icons/notifications_black_24dp (3) 1.svg'
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { Modal, Button } from 'react-bootstrap';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TFDeleteModal from '../../../../components/modals/TFDeleteModal/TFDeleteModal';
import SERVICES from '../../../../services/Services';
import Styles from './NotesCard.module.css'
type Note = {
  note: string;
  name: string;
  date: string; // You might want to use a Date type if the date is stored as a string
  reminder: boolean;
  reminderDate: string; // Again, you might want to use a Date type
};

type Props={
   data: Note
   index: number
   value :String
   api:number
     setApi : Function
     id: any
     projectId : number
}
const NotesCard = (props : Props) => {
  console.log(props);
   const [isDateChipOpen, setDateChipOpen] = useState<Boolean>(false);
   const [showModal, setShowModal] = useState<boolean>(false);
   const [editModal, setEditModal] = useState<string>(props.data.note);
   const [del,showDel] = useState<boolean>(false);
   useEffect(() => {
    
    if (props.data && props.data.note) {
        setEditModal(props.data.note);
    }
}, [props.data]); 
   const handleDelete1 = async() => {
    await SERVICES.deleteProjectNotes(props.id,props.projectId,props.index)
      .then((response) => {
        console.log('API Updated:', response);
        props.setApi(props.api+1);
      })
      .catch((error) => {
        console.error('Error updating API:', error);
      });
  };
  const handleDelete = async() => {
    await SERVICES.deleteGeneralNotes(props.id,props.index)
      .then((response) => {
        console.log('API Updated:', response);
        props.setApi(props.api+1);
      })
      .catch((error) => {
        console.error('Error updating API:', error);
      });
  };
   const handleDateChange = async(value: string) => {
    await SERVICES.editGeneralNotes(props.data.name,props.data.date,props.data.note,props.id,props.index,true,value)
    .then((response) => {
      console.log('API Updated:', response);
     setShowModal(false);
     props.setApi(props.api+1)

    })
        .then((response) => {
          console.log('API Updated:', response);
          props.setApi(props.api+1);
        })
        .catch((error) => {
          console.error('Error updating API:', error);
        });
    };
    const handleDateChange1 = async(value: any) => {
      console.log(value);
      await SERVICES.editProjectNotes(props.data.name,props.data.date,props.data.note,props.id,props.projectId,props.index,true,value)
      .then((response) => {
        console.log('API Updated:', response);
       setShowModal(false);
       props.setApi(props.api+1)

      })
      .catch((error) => {
        console.error('Error updating API:', error);
      });
    };
    const handleEditChange = async() => {
      await SERVICES.editGeneralNotes(props.data.name,props.data.date,editModal,props.id,props.index,props.data.reminder,props.data.reminderDate)
          .then((response) => {
            console.log('API Updated:', response);
           setShowModal(false);
           props.setApi(props.api+1)
  
          })
          .catch((error) => {
            console.error('Error updating API:', error);
          });
      };  
    const handleEditChange1 = async() => {
    await SERVICES.editProjectNotes(props.data.name,props.data.date,editModal,props.id,props.projectId,props.index,props.data.reminder,props.data.reminderDate)
        .then((response) => {
          console.log('API Updated:', response);
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

 const dateChipRef = useRef(null);

//  useEffect(() => {
//    const handleClickOutside = (event: { target: any }) => {
//      if (dateChipRef.current && !dateChipRef.current.contains(event.target)) {
//        setDateChipOpen(false);
//      }
//    };
//    document.addEventListener('click', handleClickOutside);
//    return () => {
//      document.removeEventListener('click', handleClickOutside);
//    };
//  }, [dateChipRef]);
  return (
    <div className={Styles.Card}>
        <div className={Styles.content} dangerouslySetInnerHTML={{ __html: props.data.note }} />
        <div className={Styles.subcontent}>
            <div className={Styles.subcontent1}>{props.data.name}&nbsp;&nbsp;&nbsp;&nbsp;{props.data.date}</div>
            <div className={Styles.subcontent2}>
               <img src={editicon}  alt="" onClick={openModal}/>
               <img src={deleteicon} alt="" onClick={()=>showDel(true)} />
               {isDateChipOpen ? (
               <TFDateChip
                 name={props.projectId}
                 value = { props.data.reminderDate ?? props.data.date}
                 tableRef={dateChipRef}
                 onChange={(name, value) => {
                 console.log(name,value);
                 props.value === "General" ?  handleDateChange(value) : handleDateChange1(value);
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
                  console.log(event);
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
       {<TFDeleteModal variant= "custom" show={del} onHide={()=>showDel(false)} onDelete={props.value === "General" ?  handleDelete : handleDelete1} 
          label='Notes'/>}
            </div>
            </div>
        </div>
  )
}

export default NotesCard
