
import React, { useState,useEffect } from 'react'
import peopleicon from '../icons/people_black_24dp (2) 1.svg'
import SERVICES from '../../../../services/Services';
import Styles from './Cards.module.css';
type Props = {
    name : string,
    count : number,
    setValue1: Function,
    api : number
}

const AllCards = (props: Props) => {
      const [client, setClient] = useState<string>('0');
      const [consultants, setConsultants] = useState<string>('0');
      const [partners, setParnters] = useState<string>('0');
      const [total,setTotal] = useState<string>('0');
  
      useEffect(() => {
        const call = async () => {
          await SERVICES.getOrgPeopleCount(props.name)
                  .then((res) => {
                    console.log(res);
                     setClient('0');
                     setConsultants('0');
                     setParnters('0');
                     setTotal('0')
                       res.res.map((each: { company_type: string; count_per_type: React.SetStateAction<string>; total_count : React.SetStateAction<string> })=>{
                        if(each.company_type==='Consultant')  setConsultants(each.count_per_type)
                        else if(each.company_type==='Client')  setClient(each.count_per_type)
                        else if(each.company_type==='Partner')  setParnters(each.count_per_type)
                       setTotal(each.total_count);
                       })
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
          call()
      }, [props.api,props.name])
  return (
    <>            {console.log(props)}   
                  <div className={Styles.cardMain}>
               <div className={Styles.card} >
               <div className={Styles.card1}><img src={peopleicon} className={Styles.imgStyles}alt="" /></div>
                             <div className={Styles.flexContainer}>
                             <p className={Styles.topContainerHeading}>{props.name == 'org' ? 'All Organizations' : 'All People'}</p>
                            <p className={Styles.topContainerSubheading}>{total}</p>
                             </div>
                        </div>
                        <div className={Styles.card} onClick={()=> props.setValue1("Clients")}>
                        <div className={Styles.card1}><img src={peopleicon} className={Styles.imgStyles} alt="" /></div>
                        <div className={Styles.flexContainer}>
                             <p className={Styles.topContainerHeading}>Clients</p>
                            <p className={Styles.topContainerSubheading}>{client}</p>
                             </div>
                        </div>
                        <div className={Styles.card}  onClick={()=> props.setValue1("Consultants")}>
                            <div className={Styles.card1}><img src={peopleicon} className={Styles.imgStyles} /></div>
                            <div className={Styles.flexContainer}>
                             <p className={Styles.topContainerHeading}>Consultants</p>
                            <p className={Styles.topContainerSubheading}>{consultants}</p>
                             </div>
                        </div>
                        <div className={Styles.card}  onClick={()=> props.setValue1("Partners")}>
                        <div className={Styles.card1}><img src={peopleicon} className={Styles.imgStyles}  alt="" /></div>
                        <div className={Styles.flexContainer}>
                             <p className={Styles.topContainerHeading}>Partners</p>
                            <p className={Styles.topContainerSubheading}>{partners}</p>
                             </div>
                        </div>
                    </div>
                    <p className='heading-2'style={{marginLeft:"32px"}}>Total {props.name == "org" ? "Organization" : "Person"}</p>
    </>
  )
}

export default AllCards