import React, { useEffect, useRef, useState } from 'react'
import {PRIMARY_COLOR} from '../../../../Constants/Constants.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,  faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Loader/Loader.js';
import {Button} from 'react-bootstrap'
import TFDeleteModal from '../../../../../components/modals/TFDeleteModal/TFDeleteModal.tsx'
import UpdateOrganisation from '../../Forms/UpdateOrganisation.tsx';
import OrgTableHeader from './OrgTableHeader.tsx';
import OrgTableRow from './OrgTableRow.tsx';
import styles from './OrgTable.module.css'
import SERVICES from '../../../../../services/Services.ts';
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../../redux/slices/alertSlice.ts";

type Props ={
  api:number,
  setApi: Function,
  setnav: Function,
  search: string,
  currPage: number,
  setOrganizationData?: Function ,
  case?: string
  setPages: Function

}

const OrgTable = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOrganizations, setselectedOrganizations]= useState([]);
    const [data, setData] = useState<Array<Organization>>([]);
    const [showDelete,setShowDelete] = useState(false)
    const [edit,setEdit] = useState(false);
    const [editform,setEditForm] = useState<Organization>({
      alternate_phone: null, 
      company_id: 0,
      company_name: '',
      label: '',
      company_type_id:[],
      address:  null,
      city_id: 0 ,
      business_phone:null,
      fax:  null,
      email:  null,
      website:  null,
      notes:  null,
      contact_type: "Primary",
      cv: null,
      category: null,
      status: null,
      events: {
          "Open": [],
          "Click": [],
          "Bounce": [],
          "Delivery": [],
          "Complaint": [],
          "Subscription":[]
      },
      company_type: "Client" ,
      city: '',
    });
    const tableRef = useRef(null); 
    const dispatch = useDispatch();


    const handleClickUpdate = () => {
        const obj = data.find(each => each.company_id === selectedOrganizations[0]);
        console.log(obj)
        if (!obj) return;
        setEditForm(obj);
        setEdit(true);
        console.log(editform);
      }

      const handleDelete = async () => {
        try {
          const response = await SERVICES.deleteOrganizations(selectedOrganizations);
            console.log('API Response:', response);
            props.setApi(props.api+1);
            setShowDelete(false);
            setselectedOrganizations([]);
          
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
                  const response = await SERVICES.getOrganizations(props.search, props.case, offset);
                 console.log(response)
                if (response.success) {
                    setData(response.res);
                    props.setPages(response.totalPages);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                dispatch(showErrorModal("Something Went Wrong!"));
            }
        };

        fetchData();
    }, [props.api,props.currPage]);
    return (
        <> 
         {isLoading ?
            <div style={{position:"absolute", top:"50%", left:"50%"}}>
            <LoadingSpinner />
            </div>
          :
             <> 
            <div className="table-wrapper" style={{  borderTop: '1px solid var(--New-Outline, #EBEDF8)', borderBottom: '1px solid var(--New-Outline, #EBEDF8)', background: '#F7F7F9'}} ref={tableRef}>
               
                <table className={styles.table} >
                  <OrgTableHeader/>
                    <tbody style={{ background: "#FFFFFF" }}>
  {data && data.map(org => (
     <OrgTableRow tableRef={tableRef} setApi={props.setApi} api={props.api} setOrganizationData={props.setOrganizationData} org={org} selectedOrganizations={selectedOrganizations} setselectedOrganizations={setselectedOrganizations} setnav={props.setnav} />
  ))}
</tbody>

                </table>
                </div>
            <div style={{ display: selectedOrganizations.length === 0 ? "none" : "", visibility: selectedOrganizations.length === 0 ? "hidden" : "visible" }}>

            <div  className='floating-container'>
              <p  className='floating-container-text'>{selectedOrganizations.length}</p>
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
                disabled={selectedOrganizations.length !== 1}
                onClick={handleClickUpdate}
              >
                <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
                <p className='floating-container-icon-text'>Edit</p>
              </Button>
            
              <div style={{ marginLeft: "10px" }} className='floating-container-line'></div>
            
              <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={() => setselectedOrganizations([])} />
              </div>
            </div>
             </div>    
             {edit && <UpdateOrganisation api={props.api} setApi={props.setApi} show={edit} setShow={setEdit} data ={editform} setselectedOrganizations = {setselectedOrganizations}/>}
       {<TFDeleteModal show={showDelete} onHide={()=>{setShowDelete(false);setselectedOrganizations([])}} onDelete={handleDelete}  label='People'/>} 
             </>
            
}
        </>
    )
}

export default OrgTable;