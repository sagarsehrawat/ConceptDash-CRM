import React,{useState} from 'react'
 import group from '../icons/Ellipse 1823.svg'
 import eye from '../icons/visibility_black_24dp (1) 1.svg'
 import TFChip from '../../../../components/form/TFChip/TFChip.js';
 import TFButton from '../../../../components/ui/TFButton/TFButton'
 import PlusIcon from '../../../../Images/addPlus.svg'
import CompanyTable from '../Tables/CompanyTable/CompanyTable.tsx';
import AddNewPerson from '../Forms/AddnewPerson';
import backarrow from '../icons/arrow_back_black_24dp 1.svg'
import Styles from './CompanyPage.module.css'
type Organization = {
  company_name: string;
  company_type: string;
  contact_type: string;
  address: string;
  website: string;
  email: string;
  fax: string;
  company_id: number 
  // ... other properties with their respective types
};

 type Props={
     isCollapsed : boolean,
     organizationData: Organization
     setnav:Function
     setContactPersonData?: Function
}


const CompanyPage = (props:Props) => {
    // const [search,setSearch]= useState<string>("")
    const [showModal,setShowModal] =useState<boolean>(false);
    const [api,setapi] = useState<number>(0);
  return (
    <>    {console.log(props.organizationData)}

       <div className={Styles.backbtn} onClick={()=>props.setnav(20)}><img src={backarrow} alt=''/>
     <div className={Styles.back}>Back</div></div>
    <div className={Styles.companyMainDiv}> 
       <div style={{width: "-webkit-fill-available",height: "166px"}}>
         <div className={Styles.companyMainDiv2}>
              <div style={{display: "inline-flex",alignItems: "center",gap: "var(--12-pad, 12px)"}}>
                    <img src={group} alt=""/>
                    <div className={Styles.companyDetails}>
                         <div style={{display: "flex",alignItems: "center",gap: "var(--8-pad, 8px)"}}>
                            <div className={Styles.orgName} >
                                  {props.organizationData?.company_name}
                            </div>
                            <TFChip value={props.organizationData?.company_type ?? ''}/>
                            <TFChip value={props.organizationData?.contact_type ?? ''}/>
                         </div>
                         <div className={Styles.addressHeader}> Address,City,Country</div>
                    </div>
              </div>
              <div className={Styles.resumeCard}>
                     <img src={eye} alt=""/> 
                     <div className={Styles.resume2}>Resume</div>
                    </div>
         </div>
         <div className={Styles.detailsBox}>
          <div className={Styles.addressBox}><div className={Styles.companyFlexContainer}>
            <div className={Styles.lightText}>address</div>
          <div className={Styles.detailsText}>{props.organizationData?.address}</div>
          </div>
          </div>
         <div className={Styles.websiteBox}><div className={Styles.companyFlexContainer}>
          <div className={Styles.lightText}>website</div>
         <div className={Styles.detailsText}>{props.organizationData?.website}</div>
         </div>
         </div>
         <div className={Styles.emailBox}><div className={Styles.companyFlexContainer}>
           <div className={Styles.lightText}>email</div>
           <div className={Styles.detailsText}>{props.organizationData?.email}</div>
         </div>
         </div>
         <div className={Styles.emailBox}><div className={Styles.companyFlexContainer}>
           <div className={Styles.lightText}>phone</div>
           <div className={Styles.detailsText}>{props.organizationData?.fax}</div>
         </div>
         </div>
         </div>
         <div className={Styles.orgMainHeder}>
            <div className={Styles.orgHeader}>
              People In {props.organizationData?.company_name}
            </div>
           <div style={{marginTop:"14px", display:"flex", justifyContent:"flex-end", paddingRight:"32px"}}>
    {/* <TFSearchBar
      placeholder={'name,label'}
      searchFunc={[search, setSearch]}
      style={{ 'margin-right': '12px' }}
    /> */}
       <TFButton icon={PlusIcon} label={`Add new person`} handleClick={() => setShowModal(true)} />

       </div>
         </div>
          { showModal && <AddNewPerson  show={showModal} setShow={setShowModal} id={props.organizationData?.company_id} api={api} setApi={setapi} />}
         <CompanyTable  isCollapsed={props.isCollapsed} id={props.organizationData?.company_id} setApi={setapi} api={api} search='' setnav={props.setnav} setContactPersonData={props.setContactPersonData }/>
    </div>
    </div>
    </>
  )
}

export default CompanyPage