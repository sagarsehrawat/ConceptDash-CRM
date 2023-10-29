import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initData, selectNewRFPs, selectPercentage, selectTotalRFPs } from '../../../../redux/slices/rfpSlice'
import SERVICES from '../../../../services/Services'
import './HeaderCards.css'

type Props = {}

const HeaderCards = (props: Props) => {
  const dispatch = useDispatch();
  const newRfps : number | string = useSelector(selectNewRFPs);
  const percent : number | string = useSelector(selectPercentage);
  const totalRfps : number | string = useSelector(selectTotalRFPs);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await SERVICES.rfpCount();
        dispatch(initData(response.res[0]));
      } catch(error) {
        console.log(error)
      }
    }
    fetchData();
  }, [])
  
  return (
    <>
      <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px" }}>
        <div className='header-card'>
          <p className='header-card-heading'>New RFPs</p>
          <div className=''>
            <p className='header-card-subheading'>{newRfps}</p>
            {parseFloat(percent.toString()) >= 0
              ? <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                <FontAwesomeIcon icon={faArrowUp} color="#34A853" />
                <p className='percentage percentage-green'>{percent}% increase</p>
              </div>
              : <div style={{ "marginLeft": "26px", display: "inline-block" }} className=''>
                <FontAwesomeIcon icon={faArrowDown} color="#FE3766" />
                <p className='percentage percentage-red' style={{ color: "#FE3766" }}>{percent}% decrease</p>
              </div>
            }
          </div>
        </div>
        <div className='header-card'>
          <p className='header-card-heading'>Total RFPs</p>
          <p className='header-card-subheading'>{totalRfps}</p>
        </div>
      </div>
      <div className='header-line'></div>
      <p className='heading-2' style={{marginLeft : "32px"}}>RFPs</p>
    </>
  )
}

export default HeaderCards