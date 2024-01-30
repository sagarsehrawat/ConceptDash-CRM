import React, { useEffect, useState,useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'
import TFButton from "../../../../components/ui/TFButton/TFButton"
import TFChip from '../../../../components/form/TFChip/TFChip';
import FormUtils from "../../../../utils/FormUtils.js";
import TFTypeahead from "../../../../components/form/TFTypeahead/TFTypeahead.js";
import Utils from '../../../../utils/Utils'
import { useDispatch } from 'react-redux';
import SERVICES from "../../../../services/Services";
import { showErrorModal } from "../../../../redux/slices/alertSlice";

type Props={
    show: boolean,
    setShow: Function
    id? : number | null
    api : number
    setApi: Function
} 
const AddNewPerson = ({setShow,api, setApi}: Props) => {
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
  const [formData,  setFormData] = useState({
    id: 0,
    company_id: 0,
    company_type_id: [],
    name: '',
    company_type: "Client" ,
    contact_type: "Primary" ,
    email: '',
    job_title: '',
    phone:'',
    cv: '',
    remarks: '',
    alternate_phone: '',
    address: '',
    city: '',
    company_name: '',
    company_nameId : 0
  });
  const formUtils = FormUtils(setFormData);
  const inputRef = useRef(null);
  const [organization,setOrganization] = useState<any>()
  const dispatch = useDispatch();

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
            
        }
    };

    call1();
}, []);
const handleForm = (key: string|number, value: string|number|null) => {
  console.log(key, value);
   switch (key) {
       case "company_name":
             console.log(key +" "+ value)
             formUtils.typeaheadForm(key, value);
             console.log(formData.company_name);
             break;
             default:
          formUtils.typeInputForm(key,value)
}
}

  const handleSubmit = async () => {
    try {
        console.log(formData)
      const response = await SERVICES.addPeople(
        formData.name,
        formData.job_title,
        formData.company_type,
        formData.company_nameId,
        formData.contact_type,
        formData.email,
        formData.phone,
        formData.cv,
        formData.address,
        formData.remarks,
        formData.alternate_phone
      )
        console.log('API Response:', response);

        setFormData({
          company_nameId:0,
          id: 0,
    company_id: 0,
    company_type_id: [],
    name: '',
    company_type: "Client" ,
    contact_type: "Primary" ,
    email: '',
    job_title: '',
    phone:'',
    cv: '',
    remarks: '',
    alternate_phone: '',
    address: '',
    city: '',
    company_name: '',
    });
        setShow(false)
        setApi(api+1);
      } 
     catch (error) {
      console.error('API Error:', error);
      dispatch(showErrorModal("Something Went Wrong!"));

    }
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
                  <img src={peopleblack} alt=""/>
                  <div className='heading-2'>Add new People</div>
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
            <input type="text" placeholder="Type in Role" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'}style={{...styles.text,display:"flex",width:"456px",padding:" 6px var(--8-pad, 8px)",alignItems: "center",gap:" var(--12-pad, 12px)",outline:"none", border: "none",background: "#F6F7F7"}} value={formData.job_title}    required={true}
            onChange={(e) => handleForm(e.target.name, e.target.value)} name="job_title" />
           </div>
           <div style={{display:"flex"}}>
           <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Label</div>
           <TFChip
                          name="company_type"
                          value={formData.company_type}
                          onChange={handleForm} 
                          options={["Client", "Consultant","Partner","Subconsultant"]}
                        /> </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Organisation</div>
             <div><TFTypeahead
            name='company_name'
            placeholder='ABC Startup'
            width='100%'
            onChange={handleForm}
            options={organization}
          />    </div></div>
          <div style={{display:"flex"}}>
          <div style={{...styles.text,display: "flex",width: "160px",alignItems: "center",gap: "var(--8-pad, 8px)"}}>Contact Type</div>
          <TFChip
                          value={formData.contact_type}
                          name="contact_type"
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
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} name="alternate_phone" value={formData.alternate_phone}  onChange={(e) => handleForm(e.target.name, e.target.value)} />
         
          </div>
          <div style={{display:"flex"}}>
             <div style={{...styles.text,display: "flex",width:"160px",alignItems: "center",gap:" var(--8-pad, 8px)"}}>Remarks</div>
             <input  type="text"  onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Remarks" style={{...styles.text,fontWeight:"400px", display: "flex",width: "456px",padding: "6px var(--8-pad, 8px)",alignItems: "center",gap: "var(--12-pad, 12px)",outline:"none",border:"none"}} value={formData.remarks}  onChange={(e) => handleForm(e.target.name, e.target.value)} name="remarks"></input>
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
        <div className='project-modal-footer w-100'>
        <div style={{display: "flex",gap: "20px",width:"624px",padding:" 16px 20px",justifyContent: "flex-end",alignItems: "flex-start",background: "#FFF",boxShadow: "0px -2px 2px 0px rgba(235, 233, 241, 0.45)"}}>
        <TFButton
                    label="Cancel"
                    handleClick={() => setShow(false)}
                    variant="secondary"
                  />
            <TFButton label='Add People' handleClick={handleSubmit} />
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default AddNewPerson