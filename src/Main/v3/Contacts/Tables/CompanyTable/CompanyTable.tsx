import React, {  useEffect, useRef, useState } from 'react'
import { PRIMARY_COLOR} from '../../../../Constants/Constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash,faXmark } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Loader/Loader.js';
import {Button} from 'react-bootstrap';
import UpdateAddPerson from '../../Forms/UpdateAddPerson.tsx';
import TFDeleteModal from '../../../../../components/modals/TFDeleteModal/TFDeleteModal.tsx';
import CompanyTableHeader from './CompanyTableHeader.tsx';
import CompanyTableRow from './CompanyTableRow.tsx';
import Styles from './CompanyTable.module.css'
import SERVICES from '../../../../../services/Services.ts';
type Props ={
  isCollapsed : boolean,
  search : string,
  setContactPersonData? : Function,
  setnav: Function,
  api : number,
  setApi : Function,
  id : number 
}
const CompanyTable = (props : Props) => {
    const { isCollapsed,api,setApi } = props
    const [isLoading, setIsLoading] = useState(false);
    const tableRef = useRef(null);
    const [selectedPeople, setselectedPeople]= useState([]);
    const [data, setData] = useState<Array<Person>>([]);
    const [showDelete,setShowDelete] = useState(false)
    const [edit,setEdit] = useState(false);
    const [editform,setEditForm] = useState<Person>({
           id: 0,
          company_id: 0,
          city_id : 0,
          status : '',
          events : {
            "Open": [],
            "Click": [],
            "Bounce": [],
            "Delivery": [],
            "Complaint":[],
            "Subscription": [],
          },
          label:'',
          company_type_id: [],
          name: '',
          company_type: "Client" ,
          contact_type: "Primary" ,
          email: '',
          job_title: '',
          phone:'',
          cv: null,
          remarks: '',
          alternate_phone: '',
          address: '',
          city: '',
          company_name: '',
          company_nameId : 0
    });


  
    const handleClickUpdate = () => {
        const obj = data.find(each => each.id === selectedPeople[0]);
        if (!obj) return;
        setEditForm(obj);
        setEdit(true);
      }
      
      const handleDelete = async () => {
        try {
          const response = await SERVICES.deletePeople(selectedPeople)
            console.log('API Response:', response);
            if(response.success){
            setShowDelete(false);
            setApi(api+1);
            setselectedPeople([]);
            }
          } 
         catch (error) {
          console.error('API Error:', error);
        }
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                 setIsLoading(true)
                const response = await SERVICES.getAllPeopleInOrganization(props.id, props.search)
                 console.log(response)
                if (response.success) {
                    setData(response.res);
                    setIsLoading(false);
                } 
            } catch (error) {
                console.error('Error fetching data:', error);
                
            }
        };

        fetchData();
    }, [props.search,props.id,api]);
    return (
        <> 
         {isLoading ?
            <div style={{position:"absolute", top:"50%", left:"50%"}}>
            <LoadingSpinner />
            </div>
          :
            <div className="table-wrapper" style={{  borderTop: '1px solid var(--New-Outline, #EBEDF8)', borderBottom: '1px solid var(--New-Outline, #EBEDF8)', background: '#F7F7F9'}} ref={tableRef}>
                <table className={Styles.table} >
                     <CompanyTableHeader/>
                    <tbody style={{ background: "#FFFFFF" }}>
  {data && data.map(each => (
      <CompanyTableRow tableRef={tableRef} setApi={setApi} api={api} setContactPersonData={props.setContactPersonData} each={each} selectedPeople={selectedPeople} setselectedPeople={setselectedPeople} setnav={props.setnav} />
      ))}
</tbody>

                </table>
                </div>
}
<div style={{ display: selectedPeople.length === 0 ? "none" : "", visibility: selectedPeople.length === 0 ? "hidden" : "visible", left: isCollapsed ? "34.236vw" : "45.347vw" }}>

<div className='floating-container'>
  <p  className='floating-container-text'>{selectedPeople.length}</p>
  <p  className='floating-container-text2'>Items Selected</p>
  <div style={{  marginLeft: "-23px" }} className='floating-container-line'></div>
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
       {edit && <UpdateAddPerson  setApi={setApi} show={edit} setShow={setEdit} data={editform} api={api} />}
       {<TFDeleteModal show={showDelete} onHide={()=>{setShowDelete(false);setselectedPeople([]); setApi(api+1)}} onDelete={handleDelete} label='People'/>}

        </>
    )
}

export default CompanyTable;