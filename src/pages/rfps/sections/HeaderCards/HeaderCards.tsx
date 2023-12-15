// import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initData,
  selectNewRFPs,
  selectPercentage,
  selectTotalRFPs,
} from "../../../../redux/slices/rfpSlice";
import SERVICES from "../../../../services/Services";
import "./HeaderCards.css";
import { icons } from "../../../../assets/icons";
import "./HeaderCards.scss";

const HeaderCards = () => {
  const dispatch = useDispatch();
  const newRfps: number | string = useSelector(selectNewRFPs);
  const percent: number | string = useSelector(selectPercentage);
  const totalRfps: number | string = useSelector(selectTotalRFPs);

  const { total_rfp_icon, new_rfp_icon, trending_rfp_icon, trending_up_icon } =
    icons;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SERVICES.rfpCount();
        dispatch(initData(response.res[0]));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const cardData = [
    {
      icon: total_rfp_icon,
      rfp: totalRfps,
      percent: percent,
      heading: "Total RFP's",
    },
    {
      icon: new_rfp_icon,
      rfp: newRfps,
      percent: percent,
      heading: "New RFP's",
    },
    {
      icon: trending_rfp_icon,
      rfp: newRfps,
      percent: percent,
      heading: "Tracking RFP's",
    },
  ];

  return (
    <>
      <div className="rfp-cards-wrapper">
        {/* <div className='header-card'>
          <p className='header-card-heading'>New RFPs</p>
          <div className=''>
            <p className='header-card-subheading'>{newRfps}</p>
            {0 >= 0
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
        </div> */}
        {cardData.map((item, key) => {
          return (
            <div key={key} className="rfp-card-container">
              <div className="rfp-data-wrapper">
                <div>
                  <img src={item.icon} />
                </div>
                <div>
                  <p>{item.heading}</p>
                  <h3>{item.rfp}</h3>
                </div>
              </div>
              <div className="rfp-percent-wrapper">
                <div className="gap-2">
                  <img src={trending_up_icon} /> <span>{percent}%</span>
                </div>
                <p>Last Month</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="header-line"></div> */}
      {/* <p className='heading-2' style={{marginLeft : "32px"}}>RFPs</p> */}
    </>
  );
};

export default HeaderCards;
