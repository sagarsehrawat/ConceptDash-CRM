import React, {useState,useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'
import TFButton from "../../../../components/ui/TFButton/TFButton"
import { HOST,ADD_ORGANIZATION } from "../../../Constants/Constants";
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import FormUtils from "../../../../utils/FormUtils.js";
import axios from "axios";
type Props={
    show: boolean,
    setShow: Function,
    api:number,
    setApi: Function
} 
const AddNewOrganisation= ({setApi,api,setShow}: Props) => {
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
    companyName: '',
    address: '',
    label: 'Consultant',
    contact: 'Secondary',
    email: '',
    website:"",
    phone: '',
    altphone: '',
    cv: '',
  });
  const formUtils = FormUtils(setFormData);

  const handleForm =  (key: string|number, value: string|number) => {
   
    console.log(key, value);
            formUtils.typeInputForm(key,value)
  }

  const inputRef = useRef(null);
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post( HOST + ADD_ORGANIZATION,{
        companyName: formData.companyName,
        companyType: formData.label,
        contactType: formData.contact,
        email: formData.email,
        website:formData.website,
        fax: '',
         cv: formData.cv,
         address: formData.address,
         cityId: 1,
      }, 
      {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      });
        console.log('API Response:', response);

        setFormData({
            companyName: '',
            address: '',
            label: 'Client',
            contact: 'Primary',
            email: '',
            website:"",
            phone: '',
            altphone: '',
            cv: '',
        });
        setApi(api+1);
        setShow(false)
      } 
     catch (error) {
      console.error('API Error:', error);
    }
     console.log(formData);
  };
  return (
    <>
        <div
            className='tf-modal-backdrop d-flex justify-content-end align-items-start'
            >
               <div>
      <div style={{display: "inline-flex", padding: "54px 48px",flexDirection: "column", alignItems: "flex-start", gap: "20px", background:"#fff", height:"900px"}}>
        <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '20px',       
        }}>
              <div style={{display: "flex",alignItems: "flex-start", gap:"20px"}}> 
                  <img src={peopleblack}/>
                  <div className='heading-2'>Add new Organization</div>
              </div>
        </div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}> 
        <input
          type="text"
          name="companyName"
          className="project-input project-name-input"
          placeholder="Enter Organization Name"
          value={formData.companyName}
          required={true}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          ref={inputRef}
        />        
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}>
        <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Address</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter address" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} 
          value={formData.address} name="address" required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} />
          </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <TFChip
                          name="label"
                          value={formData.label}
                          onChange={handleForm} 
                          options={["Client", "Consultant","Partner","Subconsultant"]}                        />
         </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Website</div>
             <input  type="text" placeholder="ABC STARTUP" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.website} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} name="website"></input>
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <TFChip        
                          name="contact"
                          value={formData.contact}
                          onChange={handleForm}
                          options={["Primary", "Secondary","Tertiary"]}
                        />
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Email</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter email id" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="email" value={formData.email} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Alternate number</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="altphone" value={formData.altphone} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Fax</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Phone no." style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="phone" value={formData.phone} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
         
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
            <TFButton label='Add Organization' handleClick={handleSubmit} />
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default AddNewOrganisation