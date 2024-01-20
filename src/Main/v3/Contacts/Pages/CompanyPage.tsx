import React,{useState} from 'react'
 import group from '../icons/Ellipse 1823.svg'
 import eye from '../icons/visibility_black_24dp (1) 1.svg'
 import TFChip from '../../../../components/form/TFChip/TFChip.js';
 import TFButton from '../../../../components/ui/TFButton/TFButton'
 import PlusIcon from '../../../../Images/addPlus.svg'
import CompanyTable from '../Tables/CompanyTable/CompanyTable.tsx';
import AddNewPerson from '../Forms/AddnewPerson';
import backarrow from '../icons/arrow_back_black_24dp 1.svg'

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
    const styles={
        lightText:{
            color: "#8B9FAF",
          fontFamily: "Roboto",
          fontSize: "12px",
          fontStyle: "normal",
            fontWeight: "400",
          lineHeight: "22px",
        },
        headerContent:{
            color: "var(--Black-text, #3D424F)",
fontFamily: "Roboto",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "400",
lineHeight: "24px",
        },
      detailsBox:{
        display: "inline-flex",
  padding: "var(--12-pad, 12px) 20px",
  alignItems: "center",
    borderRadius: "0px 0px 16px 16px",
    borderRight: "1px solid var(--New-Outline, #EBEDF8)",
    borderBottom: "1px solid var(--New-Outline, #EBEDF8)",
    borderLeft: "1px solid var(--New-Outline, #EBEDF8)",
    background: "#FFF",
    width:"-webkit-fill-available",
    marginLeft:"15px",
    marginRight:"15px"
      } as React.CSSProperties ,
      addressBox:{
        display: "flex",
        width: "210px",
        padding: "0px var(--8-pad, 8px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--8-pad, 8px)",
        borderRight: "1px solid var(--New-Outline, #EBEDF8)",
      }  as React.CSSProperties,
     websiteBox:{
      display: "flex",
      width: "218px",
      padding: "0px var(--8-pad, 8px) 0px 24px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "var(--8-pad, 8px)",
      borderRight: "1px solid var(--New-Outline, #EBEDF8)",
     }  as React.CSSProperties,
     detailsText:{
      color: "var(--Black-text, #3D424F)",
      fontFamily: "Roboto",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "24px",
     },
     emailBox:{
      display: "flex",
      width: "218px",
      padding: "0px var(--8-pad, 8px) 0px 24px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "var(--8-pad, 8px)",
      borderRight: "1px solid var(--New-Outline, #EBEDF8)",
     }  as React.CSSProperties,
     backbtn:{
      width: "85px",
      height: "37px",
      flexShrink: "0",
      borderRadius: "10px",
      border: "1px solid #E8EAEF",
      background: "#FFF",  
      position: "fixed" as const, 
       top:"8px",
      left:"246px",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      cursor:"pointer",
      gap:"5px"
    },
    back:{
      color: "#37325A",
fontFamily: "Roboto",
fontSize: "14px",
fontStyle: "normal",
fontWeight: "500",
lineHeight: "20px"
    }
  }

  return (
    <>  <div style={styles.backbtn} onClick={()=>props.setnav(20)}><img src={backarrow} alt=''/> <div style={styles.back}>Back</div></div>
    <div style={{display: "inline-flex",paddingTop: "20px",flexDirection: "column",justifyContent: "flex-end",alignItems: "center",gap: "32px", background: "#F8FAFB"}}> 
       <div style={{width: "-webkit-fill-available",height: "166px"}}>
         <div style={{display: "inline-flex",padding: "16px 20px",justifyContent: "space-between",alignItems: "flex-start", borderRadius: "16px 16px 0px 0px",border: "1px solid var(--New-Outline, #EBEDF8)",  marginLeft:"15px", marginRight:"15px", width:"-webkit-fill-available", background: "#FFF"}}>
              <div style={{display: "inline-flex",alignItems: "center",gap: "var(--12-pad, 12px)"}}>
                    <img src={group} alt=""/>
                    <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "flex-start"}}>
                         <div style={{display: "flex",alignItems: "center",gap: "var(--8-pad, 8px)"}}>
                            <div style={{color: "var(--Black-text, #3D424F)",fontFamily: "Roboto",fontSize: "16px",fontStyle: "normal",fontWeight: "500",lineHeight: "24px",letterSpacing: "0.103px"}}>
                                  {props.organizationData?.company_name}
                            </div>
                            <TFChip value={props.organizationData?.company_type ?? ''}/>
                            <TFChip value={props.organizationData?.contact_type ?? ''}/>
                         </div>
                         <div style={{color: "#8B9FAF",fontFamily: "Roboto",fontSize: "12px",fontStyle: "normal",fontWeight: "400",lineHeight: "16px",letterSpacing: "0.103px"}}> Address,City,Country</div>
                    </div>
              </div>
              <div style={{display: "inline-flex",padding: "var(--8-pad, 8px) 24px var(--8-pad, 8px) 16px",alignItems: "center",gap: "var(--8-pad, 8px)", borderRadius: "6px",border: "1px solid #8361FE"}}>
                     <img src={eye} alt=""/> 
                     <div style={{color: "#8361FE",fontFamily: "Roboto",fontSize: "16px",fontStyle: "normal",fontWeight: "500",lineHeight: "24px"}}>Resume</div>
                    </div>
         </div>
         <div style={styles.detailsBox}>
          <div style={styles.addressBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
            <div style={styles.lightText}>address</div>
          <div style={styles.detailsText}>{props.organizationData?.address}</div>
          </div>
          </div>
         <div style={styles.websiteBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
          <div style={styles.lightText}>website</div>
         <div style={styles.detailsText}>{props.organizationData?.website}</div>
         </div>
         </div>
         <div style={styles.emailBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
           <div style={styles.lightText}>email</div>
           <div style={styles.detailsText}>{props.organizationData?.email}</div>
         </div>
         </div>
         <div style={styles.emailBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
           <div style={styles.lightText}>phone</div>
           <div style={styles.detailsText}>{props.organizationData?.fax}</div>
         </div>
         </div>
         </div>
         <div style={{height:"108px", marginTop:"32px",paddingTop:"12px",paddingLeft:"32px"}}>
            <div style={{ color: "var(--Black-text, #3D424F)", fontFamily: "Roboto", fontSize: "18px", fontStyle: "normal", fontWeight: "500", lineHeight: "28px",}}>
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
         <CompanyTable isCollapsed={props.isCollapsed} id={props.organizationData?.company_id} setApi={setapi} api={api} search='' setnav={props.setnav} setContactPersonData={props.setContactPersonData }/>
    </div>
    </div>
    </>
  )
}

export default CompanyPage