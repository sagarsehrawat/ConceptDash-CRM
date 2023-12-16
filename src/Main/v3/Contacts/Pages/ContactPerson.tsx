import React,{useState,useEffect} from 'react'
import email from'../icons/email_black_24dp 1email_grey.svg'
import webicon from '../icons/language_black_24dp 1website_grey.svg'
import locationicon from '../icons/location_on_black_24dp (1) 1location_grey.svg'
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar'
import ProfileClient from './ProfileClient'
import {HOST1, ORGANIZATION_DETAILS, ALL_PEOPLE_IN_ORGANIZATION} from '../../../Constants/Constants';
import axios from 'axios';
import arrow from '../icons/Group 1000005450.svg'
import LoadingSpinner from '../../../Loader/Loader.js';
import TFChip from '../../../../components/form/TFChip/TFChip.js';
type Props ={
  contactPersonData: any,
}
const ContactPerson = (props: Props) => {
  const [value,setValue] =useState<String>("");
  const[api,setApi] = useState<Number>(0);
  const [organizationData,setOrganisationData] = useState<any>({});
  const [allPeopleData, setAllPeopleData] = useState<any>(null);
  const [filteredPeopleData, setFilteredPeopleData] = useState<any>(null);
  const [isloading,setIsLoading] = useState<boolean>(false);
  const [personId, setPersonId] = useState<Number>(props.contactPersonData.id);

     const styles={
        card:{
          width: "357px",
          height: "225px",
          flexShrink: "0",
          borderRadius:"16px",
          border: "1px solid var(--New-Outline, #EBEDF8)",
          background: "#FFF",
          margin:"20px"
        },
        company:{
          "color": "#728492",
          "font-family": "Roboto",
          "font-size": "12px",
          "font-style": "normal",
          "font-weight": "500",
          "line-height": "16px",
          "margin-top": "20px",
          "margin-left": "20px",
        },
        companyName:{
          color: "#3D424F",
          fontFamily: "Roboto",
         fontSize: "16px",
         fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "24px",
        marginLeft:"20px",
        },

  companyDetails:{
          color: "var(--New-grey, #728492)",
  fontFamily: "Roboto",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "24px",
  marginLeft:"20px",
  marginBottom:"12px",
  marginTop : "2px"
        },
        searchCard:{
            display: 'flex',
            width: '357px',
            padding: '16px 16px 16px 20px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'var(--8-pad, 8px)',
            borderRadius: '16px',
            border: '1px solid var(--New-Outline, #EBEDF8)',
            margin: '16px 20px'
        },
        searchCard1:{
          display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--8-pad, 8px)",
  alignSelf: "stretch",
        },
        peopleCard:{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "var(--12-pad, 12px)",
          alignSelf: "stretch",
        }
     }
     useEffect(() => {
      setIsLoading(true);
      const call = async () => {
          await axios
              .get(HOST1 + ORGANIZATION_DETAILS, {
                  headers: {
                      auth: "Rose " + localStorage.getItem("auth"),
                      companyId: props.contactPersonData.company_id 
                  },
              })
              .then((res) => {
                  //  console.log(res.data.res[0]);
                   setOrganisationData(res.data.res[0]);
                   setIsLoading(false);
                 
              })
              .catch((err) => {
                  console.log(err);
              });
      }
      call()
  }, [])  

  useEffect(() => {
    const call1 = async () => {
        setIsLoading(true);
        await axios
            .get(HOST1 + ALL_PEOPLE_IN_ORGANIZATION, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    companyId: props.contactPersonData.company_id 
                },
            })
            .then((res) => {
                 const filteredData = res.data.res.filter(item => item.name.toLowerCase().startsWith(value.toLowerCase()));
                 filteredData !== null ? setAllPeopleData(filteredData) : setAllPeopleData(res.data.res);
                 console.log(allPeopleData);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    call1()
    setIsLoading(false)
}, [value,props.contactPersonData]);
  return (
    <>
      {isloading ?
       <div style={{position:"absolute", top:"50%", left:"50%"}}><LoadingSpinner /></div>: 
     (<div style={{display:"flex"}}>
      <div style={{width: "397px",height:"1174px",flexShrink: "0",borderRight: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
      <div style={styles.card}>
        <div style={styles.company}>Company</div>
        <div style={styles.companyName}>{organizationData?.company_name}</div>
        <div style={{border: "1px solid #EBEDF8", background: "#E8EAEF",width: "357px",height: "1px",flexShrink: "0", marginTop:"12px", marginBottom:"16px"}}></div>
           <div style={{width: "321px",height: "120px",flexShrink: "0"}}>
        <div style={styles.companyDetails}><img src={email} alt=""style={{marginRight:"8px"}}/> {organizationData?.email}</div>
        <div style={styles.companyDetails}><img src={webicon} alt=""style={{marginRight:"8px"}}/>{organizationData?.website}</div>
        <div style={styles.companyDetails}><img src={locationicon} alt=""style={{marginRight:"8px"}}/>{organizationData?.address}</div>
        </div>
      </div>
      <div style={styles.companyName}>Company Type</div>
      {/* the chip */}
       <div style={{ display:"flex", gap:"24px", marginLeft:"20px", marginTop : "8px"}}>
       <TFChip value={organizationData.company_type}/>
       <TFChip value={organizationData.contact_type}/>
       </div>
      <div style={styles.searchCard}>
         <div style={styles.searchCard1}>
           <div style={styles.peopleCard}>
          <div style={styles.companyName}>People</div>
          <TFSearchBar
          placeholder={'name'}
          searchFunc={[value, setValue]}
          // style={{ 'margin-left': '12px' }}
          apiFunc={[api, setApi]}
        />
        </div>
        <div style={{display: "flex",flexDirection: "column",alignItems: "center",gap: "var(--8-pad, 8px)",alignSelf: "stretch"}}>
           { allPeopleData && allPeopleData.map(each=>(
              <div style={{display: "flex",justifyContent: "space-between",alignItems: "center",alignSelf: "stretch"}}>
                <div style={{color: "var(--Black-text, #3D424F)",fontFamily: "Roboto",fontSize: "14px",fontStyle: "normal",fontWeight: "400",lineHeight: "20px"}}>{each.name}</div>
                <img src={arrow} alt="" onClick={(e)=>{e.preventDefault();setPersonId(each.id); setApi(api+1)}} />
              </div>
           ))

           }
        </div>
        </div>
      </div>
     </div>
     <ProfileClient contactPersonData={props.contactPersonData} id={personId} api={api} setApi={setApi}/>
     </div>)}
     </>
  )
}

export default ContactPerson