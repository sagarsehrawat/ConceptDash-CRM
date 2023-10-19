import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectNewRFPs, selectPercentage, selectTotalRFPs } from '../../../../redux/slices/rfpSlice'

type Props = {}

const HeaderCards = (props: Props) => {
  const newRfps : number = useSelector(selectNewRFPs);
  const percent : number = useSelector(selectPercentage);
  const totalRfps : number = useSelector(selectTotalRFPs);
  return (
    <>
      <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
        <div className='header-card'>
          <p className='header-card-heading'>New RFPs</p>
          <div className=''>
            <p className='header-card-subheading'>{newRfps}</p>
            {percent >= 0
              ? <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                <FontAwesomeIcon icon={faArrowUp} color="#34A853" />
                <p className='percentage'>{percent}% increase</p>
              </div>
              : <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                <FontAwesomeIcon icon={faArrowDown} color="#FE3766" />
                <p className='percentage' style={{ color: "#FE3766" }}>{percent}% decrease</p>
              </div>
            }
          </div>
        </div>
        <div className='header-card'>
          <p className='header-card-heading'>Total RFPs</p>
          <p className='header-card-subheading'>{totalRfps}</p>
        </div>
      </div>
      <div style={styles.headerLine}></div>
      <p className='heading-2'>RFPs</p>
    </>
  )
}

export default HeaderCards