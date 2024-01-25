import React,{useState,useEffect} from 'react'
import email from'../icons/email_black_24dp 1email_grey.svg'
import webicon from '../icons/language_black_24dp 1website_grey.svg'
import locationicon from '../icons/location_on_black_24dp (1) 1location_grey.svg'
import TFSearchBar from '../../../../components/ui/TFSearchBar/TFSearchBar'
import ProfileClient from './ProfileClient'
import arrow from '../icons/Group 1000005450.svg'
import LoadingSpinner from '../../../Loader/Loader.js';
import TFChip from '../../../../components/form/TFChip/TFChip.js';
import backarrow from '../icons/arrow_back_black_24dp 1.svg'
import SERVICES from '../../../../services/Services'
type Props ={
  contactPersonData: any,
  setnav:Function
}
const ContactPerson = (props: Props) => {
  const [value,setValue] =useState<string>("");
  const[api,setApi] = useState<number>(0);
  const [organizationData,setOrganisationData] = useState<any>({});
  const [allPeopleData, setAllPeopleData] = useState<Array<Person>>();
  const [isloading,setIsLoading] = useState<boolean>(false);
  const [personId, setPersonId] = useState<number>(props.contactPersonData.id);

     const styles={
        card:{
          width: "-webkit-fill-available",
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
            padding: '16px 16px 16px 20px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 'var(--8-pad, 8px)',
            borderRadius: '16px',
            border: '1px solid var(--New-Outline, #EBEDF8)',
            margin: '16px 20px'
        }  as React.CSSProperties,
        searchCard1:{
          display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--8-pad, 8px)",
  alignSelf: "stretch",
        }  as React.CSSProperties,
        peopleCard:{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "var(--12-pad, 12px)",
          alignSelf: "stretch",
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
lineHeight: "20px", /* 142.857% */
        }
     }
     useEffect(() => {
      setIsLoading(true);
      const call = async () => {
          await SERVICES.getOrganizationDetails(props.contactPersonData.company_id)
              .then((res) => {
                   console.log(res.res[0]);
                   setOrganisationData(res.res[0]);                 
              })
              .catch((err) => {
                  console.log(err);
              });
     }
      call()
      setIsLoading(false);

  }, [])  

  useEffect(() => {
    const call1 = async () => {
        setIsLoading(true);
        await SERVICES.getAllPeopleInOrganization(props.contactPersonData.company_id, value)
            .then((res) => {
              console.log(res);
             const filteredData = res.res.filter((item: { name: string }) => item.name.toLowerCase().startsWith(value.toLowerCase()));
             filteredData !== null ? setAllPeopleData(filteredData) : setAllPeopleData(res.res);

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
  <div style={styles.backbtn} onClick={()=>props.setnav(21)}><img src={backarrow}/> <div style={styles.back}>Back</div></div>
      {isloading ?
       <div style={{position:"absolute", top:"50%", left:"50%"}}><LoadingSpinner /></div>: 
     (<div style={{display:"flex"}}>
      <div style={{height: "100vh",width: "350px",flexShrink: "0",borderRight: "1px solid var(--New-Outline, #EBEDF8)",background: "#FFF"}}>
      <div style={styles.card}>
        <div style={styles.company}>Company</div>
        <div style={styles.companyName}>{organizationData?.company_name}</div>
        <div style={{border: "1px solid #EBEDF8", background: "#E8EAEF",height: "1px",flexShrink: "0", marginTop:"12px", marginBottom:"16px"}}></div>
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
           { allPeopleData && allPeopleData.map((each: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: React.SetStateAction<number> })=>(
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