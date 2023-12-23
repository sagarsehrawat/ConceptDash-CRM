import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   initData,
//   selectNewRFPs,
//   selectPercentage,
//   selectTotalRFPs,
// } from "../../../../redux/slices/rfpSlice";
import SERVICES from "../../../../services/Services";
import "./HeaderCards.css";
import { icons } from "../../../../assets/icons";
import "./HeaderCards.scss";

const HeaderCards = () => {

  const { total_rfp_icon, new_rfp_icon, trending_rfp_icon, trending_up_icon } =
    icons;
  const [countData, setcountData] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await SERVICES.rfpCount();
        setcountData(response.res)
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const cardData = [
    {
      icon: total_rfp_icon,
      rfp: countData.total_rfps,
      percent: countData.total_rfps,
      heading: "Total RFP's",
    },
    {
      icon: new_rfp_icon,
      rfp: countData.rfps_current_month,
      percent: countData.percent_increase_total_rfps,
      heading: "New RFP's",
    },
    {
      icon: trending_rfp_icon,
      rfp: countData.tracking_rfps_current_month,
      percent: countData.percent_increase_tracking_rfps,
      heading: "Tracking RFP's",
    },
  ];

  return (
    <>
      <div className="rfp-cards-wrapper">
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
              {key!==0?<div className="rfp-percent-wrapper">
                <div className="gap-2">
                  <img src={trending_up_icon} /> <span>{item.percent}%</span>
                </div>
                <p>Last Month</p>
              </div>:<></>}
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
