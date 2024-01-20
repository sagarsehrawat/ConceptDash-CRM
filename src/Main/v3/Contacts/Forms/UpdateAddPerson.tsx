import React, { useEffect, useState, useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'

import TFButton from "../../../../components/ui/TFButton/TFButton.js"
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead.js";
import Utils from '../../../../utils/Utils'
import FormUtils from "../../../../utils/FormUtils.js";
import SERVICES from "../../../../services/Services";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../../../../redux/slices/alertSlice";

  
type Props={
    show: boolean,
    setShow: Function,
    data:Person,
    api:number,
    setApi: Function
} 
  
const UpdatePerson = ({setShow,data,api,setApi}: Props) => {
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
  const [formData, setFormData] = useState(data);
  const formUtils = FormUtils(setFormData);

  
  const inputRef = useRef(null);
  const dispatch = useDispatch();


  const [organization,setOrganization] = useState<any>()
  useEffect(() => {
    const call1 = async () => {
        try {
            const response = await SERVICES.getOrganizationList();
            if (response.success) {
                console.log(response);
                setOrganization(Utils.convertToTypeaheadOptions(response.res, 'company_name', 'company_id'));
               
            } 
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(showErrorModal("Something Went Wrong!"));

        }
    };

    call1();
}, []);

const handleForm = (key: string|number, value: string|number) => {
  console.log(key, value);
   switch (key) {
       case "company_name":
             formUtils.typeaheadForm(key, value);
             break;
             default:
          formUtils.typeInputForm(key,value)
}
}

  const handleSubmit = async () => {
    try {
      const response = await SERVICES.updatePeople(
        formData.id,
        formData.name,
        formData.job_title,
        formData.company_type,
        formData.company_id,
        formData.contact_type,
        formData.email,
        formData.phone,
        formData.address ?? '',
        formData.remarks,
        formData.alternate_phone,
      );
        console.log('API Response:', response);

        setFormData({
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
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '20px',       
        }}>
              <div style={{display: "flex",alignItems: "flex-start", gap:"20px"}}> 
                  <img src={peopleblack} alt=""/>
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
            <input type="text" placeholder="Type in Role" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'}style={{...styles.text,display:"flex",width:"456px",padding:" 6px var(--8-pad, 8px)",alignItems: "center",gap:" var(--12-pad, 12px)",outline:"none", border: "none",background: "#F6F7F7"}} value={formData.job_title ?? ''}    required={true}
            onChange={(e) => handleForm(e.target.name, e.target.value)} name="job_title" />           </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <TFChip
                          name="company_type"
                          value={formData.company_type ?? ''}
                          onChange={handleForm} 
                          options={["Client", "Consultant","Partner","Subconsultant"]}
                        />  </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Organisation</div>
             <div><TFTypeahead
            name='company_name'
            placeholder='ABC Startup'
            width='100%'
            onChange={handleForm}
            options={organization}
            defaultValue={formData.company_name}
          />    </div>          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <TFChip
                          value={formData.contact_type ?? ''}
                          name="contact_type"
                          onChange={handleForm}
                          options={["Primary","Secondary","Tertiary"]}
                        />
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Email</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter email id" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="email" value={formData.email ?? ''} onChange={(e )=>handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Phone</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Phone no." style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="phone" value={formData.phone}  onChange={(e) => handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Alternate number</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="alternate_phone" value={formData.alternate_phone ?? ''}  onChange={(e) => handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Remarks</div>
             <input  type="text"  onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Remarks" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.remarks ?? ''}  onChange={(e) => handleForm(e.target.name, e.target.value)} name="remarks"></input>
          </div>
          </div>  
        </div>
        </div>
        <div className='project-modal-footer w-100'>
        <div style={{display: "flex",gap: "20px",width:"624px",padding:" 16px 20px",justifyContent: "flex-end",alignItems: "flex-start",background: "#FFF",boxShadow: "0px -2px 2px 0px rgba(235, 233, 241, 0.45)"}}>
        <TFButton
                    label="Cancel"
                    handleClick={() => setShow(false)}
                    variant="secondary"
                  />
            <TFButton label='Update Person' handleClick={handleSubmit}/>
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default UpdatePerson 

