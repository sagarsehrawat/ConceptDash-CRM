import React, { useState,useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'
import TFButton from "../../../../components/ui/TFButton/TFButton"
import { HOST,UPDATE_ORGANIZATION } from "../../../Constants/Constants";
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import FormUtils from "../../../../utils/FormUtils.js";
import axios from "axios";

type Props={
    show: boolean,
    setShow: Function
    data: Organization,
    api:number
    setApi: Function
} 
const UpdateOrganisation= ({setShow,data,setApi,api}: Props) => {
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
    company_id:data.company_id,
    companyName:data.company_name,
    address:data.address,
    label:data.company_type,
    contact:data.contact_type,
    email:data.email,
    website:data.website,
    phone:data.fax,
    alternate_phone:data.alternate_phone,
    cv: '',
  });
  const formUtils = FormUtils(setFormData);
  const handleForm = (key: string|number, value: string|number) => {
    console.log(key, value);
              formUtils.typeInputForm(key,value)
    }
  


  const inputRef = useRef(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post( HOST + UPDATE_ORGANIZATION,{
        company_id: formData.company_id,
        company_name: formData.companyName,
        company_type: formData.label,
        contact_type: formData.contact,
        email: formData.email,
        website:formData.website,
        fax: formData.phone,
         cv: formData.cv,
         address: formData.address,
         city_id: 1,  // Assuming "altphone" corresponds to "cityId"
         notes: "",
         alternate_phone : formData.alternate_phone
      }, 
      {
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
        },
      });
        console.log('API Response:', response);
        setApi(api+1)
        setFormData({
          company_id:0,
          companyName:'',
          address:'',
          label:'Client',
          contact:'Primary',
          email:'',
          website:'',
          phone:null,
          alternate_phone:null,
          cv: '',
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
    <>   {console.log(data)}
        <div
            className='tf-modal-backdrop d-flex justify-content-end align-items-start'
            >
               <div>
      <div style={{display: "inline-flex",margin: "auto",  padding: "54px 48px",flexDirection: "column", alignItems: "flex-start", gap: "20px", background:"#fff", height:"100vh", width: "50vw"}}>
        <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '20px',       
        }}>
              <div style={{display: "flex",alignItems: "flex-start", gap:"20px"}}> 
                  <img src={peopleblack} alt=""/>
                  <div className='heading-2'>Update Organization</div>
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
          value={formData.address ?? ''} name="address" required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} />          </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <TFChip
                          value={formData.label ?? ''}
                          name="label"
                          onChange={handleForm}
                          options={["Client", "Consultant","Partner","Subconsultant"]}
                        />
         </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Website</div>
             <input  type="text" placeholder="ABC STARTUP" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.website ?? ''} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} name="website"></input>
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <TFChip        
                          name="contact"
                          value={formData.contact ?? ''}
                          onChange={handleForm}
                          options={["Primary", "Secondary","Tertiary"]}
                        />
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Email</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter email id" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="email" value={formData.email ?? ''} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
         
          </div>
          {/* <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Alternate number</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="alternate_phone" value={formData.alternate_phone} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
          </div> */}
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Fax</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Phone no." style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="phone" value={formData.phone ?? ''} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
         
          </div>
          </div>  
        </div>
        {/* <div style={{display: "flex",width: "624px",flexDirection: "column",alignItems: "center"}}>
          <div style={{display: "flex",padding:" 6px var(--8-pad, 8px)",justifyContent:"center",alignItems: "center",gap:"var(--8-pad, 8px)"}}>
              <div style={{color: "#000",textAlign:"center",fontFamily: "Roboto",fontSize: "22px",fontStyle: "normal",fontWeight: "700",lineHeight: "32px"}}>Upload CV</div>
              </div>
              <div style={{color: "var(--Dark-grey, #70757A)",textAlign: "center",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal",fontWeight: "400",lineHeight: "20px"}}>
              Upload resume/CV of the person  
              </div>
        </div> */}
        {/* <div style={{display: "flex",alignItems: "flex-start",gap: "20px"}}>
           <div style={{display: "inline-flex",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--8-pad, 8px)"}}>
            <div style={{...styles.text,fontSize:"16px",lineHeight:"24px"}}>CV / Resume</div>
           </div>
           <div style={{display: "flex",width: "456px",padding:" var(--32-pad, 32px)",flexDirection:"column",alignItems: "flex-start",gap: "var(--32-pad, 32px)",borderRadius: "16px",border:"1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
            <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap: "4px",alignSelf: "stretch"}}>
                <div style={{color: "#081621",fontFamily: "Roboto",fontSize: "16px",fontStyle: "normal",fontWeight: "600",lineHeight: "24px"}}>Upload CV</div>
                <div>
                     <span style={{color: "var(--Dark-grey, var(--New-grey, #70757A))",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal",fontWeight: "500",lineHeight: "20px"}}>Click here to upload file</span >
                      <span style={{color: "var(--Black-text, var(--New-grey, #3D424F))",fontFamily: "Roboto",fontSize:"14px",fontStyle: "italic",fontWeight: "500",lineHeight: "20px"}}>(less than 2mb)</span>
                </div>
            </div>
            <div style={{display: "flex",padding: "24px 0px",flexDirection: "column",alignItems: "center",gap: "var(--8-pad, 8px)",alignSelf: "stretch"}}>
               <div style={{display: "flex",flexDirection: "column",alignItems: "center",gap: "var(--8-pad, 8px)"}}>
                  <img src={cloud} alt=""/>
                  <div style={{color: "#081621",fontFamily:"Inter",fontSize:"16px",fontStyle: "normal",fontWeight: "500",lineHeight:"22px"}}>
                    Drag and Drop to upload file</div>
                  <div style={{color: "var(--New-grey, #728492)",textAlign: "center",fontFamily: "Inter",fontSize: "14px",fontStyle: "italic",fontWeight: "500",lineHeight: "22px"}}>Or</div>
                  <div style={{display: "flex",padding: "6px 20px",alignItems: "center",gap: "8px",borderRadius: "6px",background: "var(--Black-text, #3D424F)"}}>
                      <div style={{color: "#FBFBFB",fontFamily: "Roboto",fontSize: "16px",fontStyle: "normal",fontWeight: "500",lineHeight: "24px"}}>Browse File
                      <input type="file" accept=".pdf, .doc, .docx" style={{ display: 'inline-block',position:"absolute",opacity: 0, cursor: 'pointer' }} />
                      </div>
                  </div>
               </div>
            </div>
           </div>
        </div> */}
        </div>
        <div className='project-modal-footer w-100' style={{boxShadow: "none"}}>
        <div style={{display: "flex",gap: "20px",marginRight: "20px" ,justifyContent: "flex-end",alignItems: "flex-start",border: "transparent"}}>
        <TFButton
                    label="Cancel"
                    handleClick={() => setShow(false)}
                    variant="secondary"
                  />
            <TFButton label='Update Organization' handleClick={handleSubmit} />
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default UpdateOrganisation