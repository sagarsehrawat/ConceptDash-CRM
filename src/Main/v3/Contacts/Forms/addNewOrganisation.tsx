import React, {useState,useRef } from "react";
import peopleblack from '../icons/people_black_24dp (2) 1.svg'
import TFButton from "../../../../components/ui/TFButton/TFButton"
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import FormUtils from "../../../../utils/FormUtils.js";
import SERVICES from "../../../../services/Services";
import { useDispatch } from 'react-redux';
import { showErrorModal } from "../../../../redux/slices/alertSlice";
import Styles from './addNewOrganisation.module.css'
type Props={
    show: boolean,
    setShow: Function,
    api:number,
    setApi: Function
} 
const AddNewOrganisation= ({setApi,api,setShow}: Props) => {
  const [formData, setFormData] = useState({
    company_name: '',
    address: '',
    business_phone: '',
    fax: '',
    email: '',
    website: '',
    contact_type: "Primary",
    company_type: "Client" ,
  });
  const formUtils = FormUtils(setFormData);
  const dispatch = useDispatch();

  const handleForm =  (key: string|number, value: string|number) => {
   
    console.log(key, value);
            formUtils.typeInputForm(key,value)
  }

  const inputRef = useRef(null);
  
  const handleSubmit = async () => {
    try {
      const response = await SERVICES.addOrganization(
         formData.company_name,
         formData.address,
         formData.business_phone,
         formData.fax,
         formData.email,
         formData.website,
         formData.contact_type,
         formData.company_type,

      );
        console.log('API Response:', response);

        setFormData({
          company_name: '',
          address: '',
          business_phone: '',
          fax: '',
          email: '',
          website: '',
          contact_type: "Primary",
          company_type: "Client" ,
        });
        setApi(api+1);
        setShow(false)
  
      } 
     catch (error) {
      console.error('API Error:', error);
      dispatch(showErrorModal("Something Went Wrong!"));


    }
     console.log(formData);
  };
  return (
    <>
        <div
            className={`tf-modal-backdrop ${Styles.main}`}
            >
               <div>
      <div className={Styles.main1}>
        <div className={Styles.main2}>
              <div style={{display: "flex",gap:"20px"}}> 
                  <img src={peopleblack}/>
                  <div className='heading-2'>Add new Organization</div>
              </div>
        </div>
        <div className={Styles.formInput}> 
        <input
          type="text"
          name="company_name"
          className="project-input project-name-input"
          placeholder="Enter Organization Name"
          value={formData.company_name}
          required={true}
          onChange={(e) => handleForm(e.target.name, e.target.value)}
          ref={inputRef}
        />        
        <div className={Styles.formInput}>
        <div style={{display:"flex"}}>
          <div className={`${Styles.text} ${Styles.address}`}>Address</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter address" className={`${Styles.text} ${Styles.addressInput}`} 
          value={formData.address} name="address" required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} />
          </div>
           <div style={{display:"flex"}}>
           <div className={`${Styles.text} ${Styles.address}`}>Label</div>
           <TFChip
                          name="company_type"
                          value={formData.company_type}
                          onChange={handleForm} 
                          options={["Client", "Consultant","Partner","Subconsultant"]}                        />
         </div>
          <div style={{display:"flex"}}>
             <div className={`${Styles.text} ${Styles.address}`}>Website</div>
             <input  type="text" placeholder="ABC STARTUP" className={`${Styles.text} ${Styles.addressInput}`} value={formData.website} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)} onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} name="website"></input>
          </div>
          <div style={{display:"flex"}}>
          <div className={`${Styles.text} ${Styles.address}`}>Contact Type</div>
          <TFChip        
                          name="contact_type"
                          value={formData.contact_type}
                          onChange={handleForm}
                          options={["Primary", "Secondary","Tertiary"]}
                        />
          </div>
          <div style={{display:"flex"}}>
          <div className={`${Styles.text} ${Styles.address}`}>Email</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter email id" className={`${Styles.text} ${Styles.addressInput}`} name="email" value={formData.email} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
         
          </div>
          <div style={{display:"flex"}}>
          <div className={`${Styles.text} ${Styles.address}`}>Alternate number</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter alternative contact number" className={`${Styles.text} ${Styles.addressInput}`} name="fax" value={formData.fax} required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>
          </div>
          <div style={{display:"flex"}}>
          <div className={`${Styles.text} ${Styles.address}`}>Fax</div>
          <input  type="text" onFocus={(e) => e.target.style.backgroundColor = '#F6F7F7'} onBlur={(e) => e.target.style.backgroundColor = 'white'} placeholder="Enter Phone no." className={`${Styles.text} ${Styles.addressInput}`} name="business_phone" value={formData.business_phone}required={true} onChange={(e) => handleForm(e.target.name, e.target.value)}></input>  
          </div>
          </div>  
        </div>
        </div>
        <div className='project-modal-footer w-100'>
        <div className={Styles.footerComp}>
        <TFButton
                    label="Cancel"
                    handleClick={() => setShow(false)}
                    variant="secondary"
                  />
            <TFButton label='Add Organization' handleClick={handleSubmit} />
           </div>
           </div>
           </div>
      </div>
    </>
  )
}

export default AddNewOrganisation