import React from 'react'
import peopleicon from '../icons/people_black_24dp (2) 1.svg'
import Styles from './Cards.module.css'
type Props = {
    name : string,
    count : string,
};

const CardTemplate = (props: Props) => {
  return (
    <>
         <div className={Styles.cardMain}>
     <div className={Styles.card}>
     <div className={Styles.card1}><img src={peopleicon} className={Styles.imgStyles} alt="" /></div>
     <div className={Styles.flexContainer}>
     <p className={Styles.topContainerHeading}>{props.name}</p>
    <p className={Styles.topContainerSubheading}>{props.count}</p>
     </div>
</div>
</div>
   <p className='heading-2' style={{marginLeft : "32px"}}>{props.name}</p>
</>
  )
}

export default CardTemplate