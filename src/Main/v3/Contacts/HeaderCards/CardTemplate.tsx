import React from 'react'
import peopleicon from '../icons/people_black_24dp (2) 1.svg'
type Props = {
    name : string,
    count : string,
};

const CardTemplate = (props: Props) => {
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
  return (
    <>
         <div style={styles.cardMain}>
     <div style={styles.card}>
     <div style={{width:"48px", height:"48px",borderRadius:"var(--8-pad, 8px)",background:"#F7F5FF"}}><img src={peopleicon} style={{width:"24px",height:"24px", margin:"12px"}} alt="" /></div>
     <div style={{display:"flex",flexDirection:"column", alignItems:"flex-start"}}>
     <p style={styles.topContainerHeading}>{props.name}</p>
    <p style={{ ...styles.topContainerSubheading}}>{props.count}</p>
     </div>
</div>
</div>
   <p className='heading-2' style={{marginLeft : "32px"}}>{props.name}</p>
</>
  )
}

export default CardTemplate