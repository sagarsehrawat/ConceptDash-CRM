import React, { useEffect, useState, useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'

import TFButton from "../../../../components/ui/TFButton/TFButton.js"
import { GET_ORGANIZATION_LIST, HOST, UPDATE_PEOPLE } from "../../../Constants/Constants.js";
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead.js";
import Utils from '../../../../utils/Utils'
import FormUtils from "../../../../utils/FormUtils.js";
import axios from "axios";
type Props={
    show: boolean,
    setShow: Function,
    data:Object
    api:number,
    setApi: Function
    setselectedPeople : Function
} 
const UpdatePerson = ({show,setShow,data,api,setApi, setselectedPeople}: Props) => {
  const styles = {
    text: {
      color: "var(--Dark-grey, #70757A)",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "20px", 
    },
  };
  const [formData, setFormData] = useState({
    id:data.id,
    name: data.name,
    jobTitle: data.job_title,
    companyType: data.company_type,
    companyName: data.company_name,
    companyId: data.company_id,
    contactType: data.contact_type,
    email: data.email,
    phone: data.phone,
    altphone:data.alternate_phone,
    cv: '', // Will store the file object
    address: data.address,
    cityId: 1,
    remarks: data.remarks,
  });
  const formUtils = FormUtils(setFormData);

  
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.placeholder.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, []);


  const [organization,setOrganization] = useState<any>()
  useEffect(() => {
    const call1 = async () => {
        try {
            const response = await axios.get(HOST + GET_ORGANIZATION_LIST, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success) {
                console.log(response.data.res);
                setOrganization(Utils.convertToTypeaheadOptions(response.data.res, 'company_name', 'company_id'));
                console.log(organization);
                setApi(api+1)
                setselectedPeople([]);
               
            } else {
                console.error(response.data.error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    call1();
}, []);

const handleForm = (key, value) => {
  console.log(key, value);
   switch (key) {
       case "companyName":
             formUtils.typeaheadForm(key, value);
             break;
             default:
          formUtils.typeInputForm(key,value)
}
}

  const handleSubmit = async () => {
    try {
      const response = await axios.post( HOST + UPDATE_PEOPLE,{
        id: formData.id,
        name: formData.name,
        companyType: formData.companyType,
        companyID: formData.companyId,
        contactType: formData.contactType,
        email: formData.email,
        phone: formData.phone,
         cv: formData.cv,
         address: formData.address,
        //  cityId:null,
         remarks: formData.remarks,
         jobTitle: formData.jobTitle,
         alternatePhone: formData.altphone,
      }, 
      {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      });
        console.log('API Response:', response);

        setFormData({
          id:0,
          name: '',
    jobTitle: '',
    companyType: '',
    companyName: '',
    companyId: 0,
    contactType: '',
    email: '',
    phone: '',
    altphone: '',
    cv: '', // Will store the file object
    address: '',
    cityId:1,
    remarks: '',
        });
        setShow(false)
        setApi(api+1)
      } 
     catch (error) {
      console.error('API Error:', error);
    }
     console.log(formData);
  };
  return (
    <>  {console.log(data)}
        <div
            className='tf-modal-backdrop d-flex justify-content-end align-items-start'
            >
               <div>
      <div style={{display: "inline-flex",height:"900px", padding: "54px 48px",flexDirection: "column", alignItems: "flex-start", gap: "20px", background:"#fff"}}>
        <div style={{
                    display: 'flex',
                    flexDirection: 'coloumn',
                    alignItems: 'flex-start',
                    gap: '20px',       
        }}>
              <div style={{display: "flex",alignItems: "flex-start", gap:"20px"}}> 
                  <img src={peopleblack}/>
                  <div className='heading-2'>Update Person</div>
              </div>
        </div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}> 
        <input
          type="text"
          name="name"
          className="project-input project-name-input"
          placeholder="Enter Name"
          value={formData.name}
          ref={inputRef}
          required={true}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
        />  
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}>
           <div style={{display:"flex",width: "624px",height: "var(--32-pad, 32px)"}}>
            <div style={{...styles.text,display: "flex",width: "160px",alignItems:"center",gap: "var(--8-pad, 8px)"}}>Job Title</div>
            <input type="text" placeholder="Type in Role" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'}style={{...styles.text,display:"flex",width:"456px",padding:" 6px var(--8-pad, 8px)",alignItems: "center",gap:" var(--12-pad, 12px)",outline:"none", border: "none",background: "#F6F7F7"}} value={formData.jobTitle}    required={true}
            onChange={(e) => handleForm(e.target.name, e.target.value)} name="jobTitle" />           </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <TFChip
                          name="companyType"
                          value={formData.companyType}
                          onChange={handleForm} 
                          options={["Client", "Consultant","Partner","Subconsultant"]}
                        />  </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Organisation</div>
             <div><TFTypeahead
            name='companyName'
            placeholder='ABC Startup'
            width='100%'
            onChange={handleForm}
            options={organization}
            defaultValue={formData.companyName}
          />    </div>          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <TFChip
                          value={formData.contactType}
                          name="contactType"
                          onChange={handleForm}
                          options={["Primary","Secondary","Tertiary"]}
                        />
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Email</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter email id" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="email" value={formData.email} onChange={(e )=>handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Phone</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Phone no." style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="phone" value={formData.phone}  onChange={(e) => handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Alternate number</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="altphone" value={formData.altphone}  onChange={(e) => handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Remarks</div>
             <input  type="text"  onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Remarks" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.remarks}  onChange={(e) => handleForm(e.target.name, e.target.value)} name="remarks"></input>
          </div>
          </div>  
        </div>
        </div>
        <div className='project-modal-footer w-100'>
        <div style={{display: "flex",gap: "20px",width:"624px",padding:" 16px 20px",justifyContent: "flex-end",alignItems: "flex-start",background: "#FFF",boxShadow: "0px -2px 2px 0px rgba(235, 233, 241, 0.45)"}}>
            <button style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "center",alignItems: "center",gap: "var(--8-pad, 8px)", borderRadius: "5px",border: "1px solid var(--mob-primary-colour, #8361FE)",boxShadow: "0px 4px 8px 0px rgba(88, 82, 246, 0.25)"}}
             onClick={()=>setShow(false)}>
             Cancel
            </button>
            <TFButton label='Update Person' handleClick={handleSubmit}/>
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default UpdatePerson 