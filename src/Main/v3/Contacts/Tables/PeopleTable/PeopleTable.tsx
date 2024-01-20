import React, { useEffect, useRef, useState } from 'react'
import { PRIMARY_COLOR} from '../../../../Constants/Constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit,faTrash,faXmark } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Loader/Loader.js';
import {Button} from 'react-bootstrap'

import UpdateAddPerson from '../../Forms/UpdateAddPerson.tsx';
import TFDeleteModal from '../../../../../components/modals/TFDeleteModal/TFDeleteModal.tsx';
import PeopleTableHeader from './PeopleTableHeader.tsx';
import PeopleTableRow from './PeopleTableRow.tsx';
import Styles from './PeopleTable.module.css'
import { useDispatch } from 'react-redux';
import { showErrorModal } from "../../../../../redux/slices/alertSlice.ts";
import SERVICES from '../../../../../services/Services.ts';
type Props ={
  api:number,
  setApi: Function,
  setnav: Function,
  search: string,
  currPage: number,
  setContactPersonData? : Function
  case?: string
  setPages: Function

}
const PeopleTable = (props : Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);
    const [selectedPeople, setselectedPeople]= useState([]);
    const [data, setData] = useState<Array<Person>>([]);
    const [showDelete,setShowDelete] = useState(false)
    const [edit,setEdit] = useState(false);
    const [editform,setEditForm] = useState<Person>({
      id: 0,
      company_id: 0,
      company_type_id: [],
      name: '',
      company_type: "Client" ,
      contact_type: "Primary" ,
      email:  null,
      job_title:  null,
      phone: '',
      cv: null,
      remarks: null,
      alternate_phone: null,
      address: '',
      city_id: 0,
      status: '',
      events: {
          "Open": [],
          "Click": [],
          "Bounce": [],
          "Delivery": [],
          "Complaint": [],
          "Subscription": [],
      },
      label:  null,
      city: '',
      company_name: '',
    }
    );
    const handleClickUpdate = () => {
        const obj = data.find(each => each.id === selectedPeople[0]);
        console.log(obj);
       if (!obj) return;
        setEditForm(obj);
        setEdit(true);
    }
      const dispatch = useDispatch();
      const handleDelete = async () => {
        try {
          const response = await SERVICES.deletePeople(selectedPeople);
            console.log('API Response:', response);
            props.setApi(props.api+1);
            setShowDelete(false);
            setselectedPeople([]);
          
          } 
         catch (error) {
          console.error('API Error:', error);
          dispatch(showErrorModal("Something Went Wrong!"));
        }
      };

    useEffect(() => {
      const fetchData = async () => {
          try {
              setIsLoading(true)
              const offset = (props.currPage - 1) * 50;
                console.log("here")
                console.log(offset)
                const response = await SERVICES.getPeople(props.search, props.case, offset);
               console.log(response)
              if (response.success) {
                  setData(response.res);
                  console.log(response.res)
                  props.setPages(response.totalPages);
                  setIsLoading(false);
              } 
          } catch (error) {
              console.error('Error fetching data:', error);
              dispatch(showErrorModal("Something Went Wrong!"));
          }
      };

      fetchData();
  }, [props.search,props.api,props.currPage]);
    return (
        <> 
             {console.log(selectedPeople)}
         {isLoading ?
            <div style={{ position:"absolute", left:"50%", top:"50%" }}>
            <LoadingSpinner />
            </div>
          :
            <div className="table-wrapper" style={{  borderTop: '1px solid var(--New-Outline, #EBEDF8)', borderBottom: '1px solid var(--New-Outline, #EBEDF8)', background: '#F7F7F9'}} ref={tableRef}>
                <table className={Styles.table} >
                    <PeopleTableHeader/>
                    <tbody style={{ background: "#FFFFFF" }}>
  {data && data.map(each => (
      <PeopleTableRow tableRef={tableRef} setApi={props.setApi} api={props.api} setContactPersonData={props.setContactPersonData} each={each} selectedPeople={selectedPeople} setselectedPeople={setselectedPeople} setnav={props.setnav} />
      ))}
</tbody>

                </table>
                </div>
                 
}
<div style={{ display: selectedPeople.length === 0 ? "none" : "", visibility: selectedPeople.length === 0 ? "hidden" : "visible" }}>
<div  className='floating-container'>
  <p  className='floating-container-text'>{selectedPeople.length}</p>
  <p  className='floating-container-text2'>Items Selected</p>
  <div style={{ marginLeft: "-23px" }} className='floating-container-line'></div>
  <div
    style={{
      display: "inline-block",
      textAlign: "center",
      verticalAlign: "middle",
      marginLeft: "90px",
      cursor: "pointer",
    }}
    onClick={() => setShowDelete(true)}
  >
    <FontAwesomeIcon icon={faTrash} style={{ height: "20px" }} />
    <p className='floating-container-icon-text'>Delete</p>
  </div>

  <Button
    style={{
      display: "inline-block",
      textAlign: "center",
      verticalAlign: "middle",
      marginLeft: "35px",
      cursor: "pointer",
      backgroundColor: "transparent",
      border: "none",
    }}
    disabled={selectedPeople.length !== 1}
    onClick={handleClickUpdate}
  >
    <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
    <p className='floating-container-icon-text'>Edit</p>
  </Button>

  <div style={{  marginLeft: "10px" }} className='floating-container-line'></div>

  <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
    <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={() => setselectedPeople([])} />
  </div>
</div>
</div>
{edit && <UpdateAddPerson api={props.api} setApi={props.setApi} show={edit} setShow={setEdit} data ={editform}/>}
       {<TFDeleteModal show={showDelete} onHide={()=>setShowDelete(false)} onDelete={handleDelete} label='People'/>}
        </>
    )
}

export default PeopleTable;