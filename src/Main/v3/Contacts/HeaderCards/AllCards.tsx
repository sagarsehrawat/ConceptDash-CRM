
import React, { useState,useEffect } from 'react'
import peopleicon from '../icons/people_black_24dp (2) 1.svg'
import SERVICES from '../../../../services/Services';
type Props = {
    name : string,
    count : number,
    setValue1: Function,
    api : number
}

const AllCards = (props: Props) => {
    const styles = {
         cardMain:{
            display: 'inline-flex',
            alignItems: "flex-start", 
            gap: "20px",
            marginLeft: "32px", 
            marginBottom: "24px",
            marginTop:"20px"
         },
         card:{
                display: 'flex',
                width: '240px',
                padding: '16px 20px',
                alignItems: 'center',
                gap: 'var(--12-pad, 12px)',
                borderRadius: 'var(--12-pad, 12px)',
                border: '1px solid var(--New-Outline, #EBEDF8)',
                background: '#FFF',
              
         },
      topContainerHeading: {
        color: 'var(--Black-text, #3D424F)',
        fontFamily: 'Roboto',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '24px', // 150%
        letterSpacing: '0.103px',
      },
      topContainerSubheading: {
        color: 'var(--Black-text, #3D424F)',
        fontFamily: 'Roboto',
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '32px', // 133.333%
        letterSpacing: '0.103px',
      },
      }
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
                  <div className='d-flex flex-row' style={styles.cardMain}>
               <div style={styles.card} >
               <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>All {props.name}</p>
                            <p style={{ ...styles.topContainerSubheading}}>{total}</p>
                             </div>
                        </div>
                        <div style={styles.card} onClick={()=> props.setValue1("Clients")}>
                        <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Clients</p>
                            <p style={{ ...styles.topContainerSubheading}}>{client}</p>
                             </div>
                        </div>
                        <div style={styles.card}  onClick={()=> props.setValue1("Consultants")}>
                            <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Consultants</p>
                            <p style={{ ...styles.topContainerSubheading}}>{consultants}</p>
                             </div>
                        </div>
                        <div style={styles.card}  onClick={()=> props.setValue1("Partners")}>
                        <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Partners</p>
                            <p style={{ ...styles.topContainerSubheading}}>{partners}</p>
                             </div>
                        </div>
                    </div>
                    <p className='heading-2'style={{marginLeft:"32px"}}>Total {props.name == "org" ? "Organization" : "Person"}</p>
    </>
  )
}

export default AllCards