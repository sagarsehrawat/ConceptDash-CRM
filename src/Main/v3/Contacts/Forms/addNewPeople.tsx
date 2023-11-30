import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap'
import peopleblack from '../icons/people_black_24dp (2) 1.svg'
import cross from "../../../../Images/cross.svg";
import cloud from "../../../../Images/cloud_upload_black_24dp 1.svg"
import TFButton from "../../../../components/ui/TFButton/TFButton"
import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";
import { HOST1, ADD_PEOPLE } from "../../../Constants/Constants";
import axios from "axios";
type Props={
    show: boolean,
    setShow: Function
} 
const AddNewPeople = ({show,setShow}: Props) => {
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
    name: '',
    jobTitle: '',
    companyType: '',
    companyID: '',
    contactType: '',
    email: '',
    phone: '',
    altphone: '',
    cv: '', // Will store the file object
    address: '',
    cityId: '',
    remarks: '',
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name+" and "+value);
    setFormData({
      ...formData,
       [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        cv: e.target.files[0],
      });
    }
  }; 
  
  const handleSubmit = async () => {
    try {
      const response = await axios.post( HOST1 + ADD_PEOPLE, {
        method: 'POST',
        headers: {
          auth: "Rose " + localStorage.getItem("auth"),
          'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData),
      });
        console.log('API Response:', response);

        setFormData({
          name: '',
          jobTitle: '',
          companyType: '',
          companyID: '',
          contactType: '',
          email: '',
          phone: '',
          altphone: '',
          cv: '', // Will store the file object
          address: '',
          cityId: '',
          remarks: '',
        });
      } 
     catch (error) {
      console.error('API Error:', error);
    }
  };
  return (
    <>
        <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        style={{  
        position: "absolute",
        // width: "256px",
        height: "100%",
        left: "720px",
        background: "#FFFFFF",
        boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
        borderRadius: "12px",
        }}
        dialogClassName="filter-dialog"
        animation={false}
      >
         <div style={{display: "inline-flex", padding: "54px 48px",flexDirection: "column", alignItems: "flex-start", gap: "20px",}}>
        <div style={{
                    display: 'flex',
                    flexDirection: 'coloumn',
                    alignItems: 'flex-start',
                    gap: '20px',       
        }}>
              <div style={{display: "flex",alignItems: "center", gap:"20px"}}> 
                  <img src={peopleblack}/>
                  <div className='heading-2'>Add new People</div>
              </div>
        </div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}> 
        <input type="text" placeholder="Enter name" style={{border: "none", outline: "none", padding:"0", margin: "0", fontFamily: "Roboto", fontSize:"20px", fontStyle: "normal", fontWeight: "500", lineHeight: "30px", color: "#1C1B20"}} value={formData.name} onChange={handleInputChange} name="name">
        </input>
        <div style={{display: "flex",flexDirection: "column",alignItems: "flex-start",gap:" var(--8-pad, 8px)"}}>
           <div style={{display:"flex",width: "624px",height: "var(--32-pad, 32px)"}}>
            <div style={{...styles.text,display: "flex",width: "160px",alignItems:"center",gap: "var(--8-pad, 8px)"}}>Job Title</div>
            <input type="text" placeholder="Type in Role"style={{...styles.text,display:"flex",width:"456px",padding:" 6px var(--8-pad, 8px)",alignItems: "center",gap:" var(--12-pad, 12px)",outline:"none", border: "none",background: "#F6F7F7"}} value={formData.jobTitle} onChange={handleInputChange} name="jobTitle"></input>
           </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <select style={{...styles.text,fontWeight:"400px", border:"none",outline:"none",display: "flex",padding: "4px 12px",justifyContent: "center",alignItems:"center",gap: "8px"}} value={formData.companyType} onChange={handleInputChange} name="companyType">
                   <option value="Client">Client</option>
                   <option value="Consultant">Consultant</option>
                   <option value="Partner">Partner</option>
          </select>          </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Organisation</div>
             <input  type="text" placeholder="ABC STARTUP" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.companyID} onChange={handleInputChange} name="companyID"></input>
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <select style={{...styles.text,fontWeight:"400px", border:"none",outline:"none",display: "flex",padding: "4px 12px",justifyContent: "center",alignItems:"center",gap: "8px"}} value={formData.contactType} onChange={handleInputChange} name="contactType">
                   <option value="Primary">Primary</option>
                   <option value="Secondry">Secondary</option>
                   <option value="Tertiary">Tertiary</option>
          </select>
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Email</div>
          <input  type="text" placeholder="Enter email id" style={{...styles.text, fontWeight:"400px",display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="email" value={formData.email} onChange={handleInputChange}></input>
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Phone</div>
          <input  type="text" placeholder="Enter Phone no." style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="phone" value={formData.phone} onChange={handleInputChange}></input>
         
          </div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Alternate number</div>
          <input  type="text" placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}}></input>
         
          </div>
          </div>  
        </div>
        <div style={{display: "flex",width: "624px",flexDirection: "column",alignItems: "center"}}>
          <div style={{display: "flex",padding:" 6px var(--8-pad, 8px)",justifyContent:"center",alignItems: "center",gap:"var(--8-pad, 8px)"}}>
              <div style={{color: "#000",textAlign:"center",fontFamily: "Roboto",fontSize: "22px",fontStyle: "normal",fontWeight: "700",lineHeight: "32px"}}>Upload CV</div>
              </div>
              <div style={{color: "var(--Dark-grey, #70757A)",textAlign: "center",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal",fontWeight: "400",lineHeight: "20px"}}>
              Upload resume/CV of the person  
              </div>
        </div>
        <div style={{display: "flex",alignItems: "flex-start",gap: "20px"}}>
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
        </div>
        <div style={{display: "flex",gap: "20px",width:"624px",padding:" 16px 20px",justifyContent: "flex-end",alignItems: "flex-start",background: "#FFF",boxShadow: "0px -2px 2px 0px rgba(235, 233, 241, 0.45)"}}>
            <button style={{display: "flex",padding: "var(--8-pad, 8px) 16px",justifyContent: "center",alignItems: "center",gap: "var(--8-pad, 8px)", borderRadius: "5px",border: "1px solid var(--mob-primary-colour, #8361FE)",boxShadow: "0px 4px 8px 0px rgba(88, 82, 246, 0.25)"}}
             onClick={()=>setShow(false)}>
             Cancel
            </button>
            <TFButton label='Add People' handleClick={handleSubmit}/>
           </div>
        </div>
      </Modal>
    </>
  )
}

export default AddNewPeople