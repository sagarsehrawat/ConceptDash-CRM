
import React, { useState,useEffect } from 'react'
import peopleicon from '../icons/people_black_24dp (2) 1.svg'
import {HOST1, ORGANIZATION_COUNT,PEOPLE_COUNT } from '../../../Constants/Constants';
import axios from 'axios'
type Props = {
    name : string,
    count : number,
    setValue1: Function,
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
      const [count,setCount] = useState<any>([])
      const [client, setClient] = useState<number>(0);
      const [consultants, setConsultants] = useState<number>(0);
      const [partners, setParnters] = useState<number>(0);
      const [apiCall, setApiCall] = useState<any>(ORGANIZATION_COUNT);
      useEffect(() => {
          const call = async () => {
            props.name==="People"? setApiCall(PEOPLE_COUNT) : setApiCall(ORGANIZATION_COUNT);
              await axios
                  .get(HOST1 + apiCall, {
                      headers: {
                          auth: "Rose " + localStorage.getItem("auth"),
                      },
                  })
                  .then((res) => {
                       console.log(res.data);
                       setClient(res.data.res[2].total_count)
                       setParnters(res.data.res[0].total_count)
                       setConsultants(res.data.res[1].total_count)
                  })
                  .catch((err) => {
                      console.log(err);
                  });
          }
          call()
      }, [])
  return (
    <>
                  <div className='d-flex flex-row' style={styles.cardMain}>
               <div style={styles.card} >
               <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>All {props.name}</p>
                            <p style={{ ...styles.topContainerSubheading}}>{Number(client)+Number(partners)+Number(consultants)}</p>
                             </div>
                        </div>
                        <div style={styles.card} onClick={()=> props.setValue1("2")}>
                        <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Clients</p>
                            <p style={{ ...styles.topContainerSubheading}}>{client}</p>
                             </div>
                        </div>
                        <div style={styles.card}  onClick={()=> props.setValue1("3")}>
                            <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Consultants</p>
                            <p style={{ ...styles.topContainerSubheading}}>{consultants}</p>
                             </div>
                        </div>
                        <div style={styles.card}  onClick={()=> props.setValue1("4")}>
                        <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
                             <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
                             <p style={styles.topContainerHeading}>Partners</p>
                            <p style={{ ...styles.topContainerSubheading}}>{partners}</p>
                             </div>
                        </div>
                    </div>
                    <p className='heading-2'style={{marginLeft:"32px"}}>Total {props.name}</p>
    </>
  )
}

export default AllCards