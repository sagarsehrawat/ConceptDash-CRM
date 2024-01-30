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
import Styles from './ContactPerson.module.css'
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
  <div className={Styles.backbtn} onClick={()=>props.setnav(21)}><img src={backarrow}/> <div className={Styles.back}>Back</div></div>
      {isloading ?
       <div style={{position:"absolute", top:"50%", left:"50%"}}><LoadingSpinner /></div>: 
     (<div style={{display:"flex"}}>
      <div className={Styles.contactPersonMain}>
      <div className={Styles.card}>
        <div className={Styles.company}>Company</div>
        <div className={Styles.companyName}>{organizationData?.company_name}</div>
        <div className={Styles.borderLine}></div>
           <div style={{width: "321px",height: "120px",flexShrink: "0"}}>
        <div className={Styles.companyDetails}><img src={email} alt=""style={{marginRight:"8px"}}/> {organizationData?.email}</div>
        <div className={Styles.companyDetails}><img src={webicon} alt=""style={{marginRight:"8px"}}/>{organizationData?.website}</div>
        <div className={Styles.companyDetails}><img src={locationicon} alt=""style={{marginRight:"8px"}}/>{organizationData?.address}</div>
        </div>
      </div>
      <div className={Styles.companyName}>Company Type</div>
      {/* the chip */}
       <div style={{display:"flex", gap:"24px", marginLeft:"20px", marginTop : "8px"}}>
       <TFChip value={organizationData.company_type}/>
       <TFChip value={organizationData.contact_type}/>
       </div>
      <div className={Styles.searchCard}>
         <div className={Styles.searchCard1}>
           <div className={Styles.peopleCard}>
          <div className={Styles.companyName} style={{marginLeft:"0px"}}>People</div>
          <TFSearchBar
          placeholder={'name'}
          searchFunc={[value, setValue]}
          // style={{ 'margin-left': '12px' }}
          apiFunc={[api, setApi]}
        />
        </div>
        <div className={Styles.allPeopleCard}>
           { allPeopleData && allPeopleData.map((each: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; id: React.SetStateAction<number> })=>(
              <div className={Styles.allPeopleCard2}>
                <div className={Styles.allPeopleCardText}>{each.name}</div>
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