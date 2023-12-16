import React,{useState,useEffect} from 'react'
 import group from '../icons/Ellipse 1823.svg'
 import eye from '../icons/visibility_black_24dp (1) 1.svg'
 import TFChip from '../../../../components/form/TFChip/TFChip.js';
 import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar';
 import TFButton from '../../../../components/ui/TFButton/TFButton'
 import PlusIcon from '../../../../Images/addPlus.svg'
import CompanyTable from '../Tables/CompanyTable.js';
import AddNewPerson from '../Forms/AddnewPerson';

 type Props={
     organizationData: Object
}
const CompanyPage = (props:Props) => {
    const [search,setSearch]= useState<String>("")
    const [showModal,setShowModal] =useState<boolean>(false);
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
      },
      addressBox:{
        display: "flex",
        width: "210px",
        padding: "0px var(--8-pad, 8px)",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "var(--8-pad, 8px)",
        borderRight: "1px solid var(--New-Outline, #EBEDF8)",
      },
     websiteBox:{
      display: "flex",
      width: "218px",
      padding: "0px var(--8-pad, 8px) 0px 24px",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "var(--8-pad, 8px)",
      borderRight: "1px solid var(--New-Outline, #EBEDF8)",
     },
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
     }
    }
  return (
    <div style={{display: "inline-flex",paddingTop: "20px",flexDirection: "column",justifyContent: "flex-end",alignItems: "center",gap: "32px", background: "#F8FAFB"}}> 
       <div style={{width: "-webkit-fill-available",height: "166px"}}>
         <div style={{display: "inline-flex",padding: "16px 20px",justifyContent: "space-between",alignItems: "flex-start", borderRadius: "16px 16px 0px 0px",border: "1px solid var(--New-Outline, #EBEDF8)", width:"-webkit-fill-available", background: "#FFF"}}>
              <div style={{display: "inline-flex",alignItems: "center",gap: "var(--12-pad, 12px)"}}>
                    <img src={group} alt=""/>
                    <div style={{display: "flex",flexDirection: "column",justifyContent: "center",alignItems: "flex-start"}}>
                         <div style={{display: "flex",alignItems: "center",gap: "var(--8-pad, 8px)"}}>
                            <div style={{color: "var(--Black-text, #3D424F)",fontFamily: "Roboto",fontSize: "16px",fontStyle: "normal",fontWeight: "500",lineHeight: "24px",letterSpacing: "0.103px"}}>
                                  {props.organizationData.company_name}
                            </div>
                            <TFChip value={props.organizationData.company_type}/>
                            <TFChip value={props.organizationData.contact_type}/>
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
          <div style={styles.detailsText}>{props.organizationData.address}</div>
          </div>
          </div>
         <div style={styles.websiteBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
          <div style={styles.lightText}>website</div>
         <div style={styles.detailsText}>{props.organizationData.website}</div>
         </div>
         </div>
         <div style={styles.emailBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
           <div style={styles.lightText}>email</div>
           <div style={styles.detailsText}>{props.organizationData.email}</div>
         </div>
         </div>
         <div style={styles.emailBox}><div style={{display: "flex",flexDirection: "column",alignItems: "flex-start"}}>
           <div style={styles.lightText}>phone</div>
           <div style={styles.detailsText}>{props.organizationData.fax}</div>
         </div>
         </div>
         </div>
         <div style={{width: "1212px", height:"108px", marginTop:"32px",paddingTop:"12px",paddingLeft:"32px"}}>
            <div style={{ color: "var(--Black-text, #3D424F)", fontFamily: "Roboto", fontSize: "18px", fontStyle: "normal", fontWeight: "500", lineHeight: "28px",}}>
              People In {props.organizationData.company_name}
            </div>
           <div style={{marginTop:"14px", display:"flex", justifyContent:"space-between", paddingRight:"32px"}}>
    <TFSearchBar
      placeholder={'name,label'}
      searchFunc={[search, setSearch]}
      style={{ 'margin-right': '12px' }}
    />
       <TFButton icon={PlusIcon} label={`Add new person`} handleClick={() => setShowModal(true)} />

       </div>
         </div>
          { showModal && <AddNewPerson  show={showModal} setShow={setShowModal} id={props.organizationData.company_id}/>}
         <CompanyTable id={props.organizationData.company_id} search={search}/>
    </div>
    </div>
  )
}

export default CompanyPage