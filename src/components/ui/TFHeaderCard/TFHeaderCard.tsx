import React from "react";
import "./TFHeaderCard.css";
import TFIcon from "../TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";
import Utils from "../../../utils/Utils";

type Props = {
  variant: "PERCENTAGE" | "NOT_PERCENTAGE";
  label: string;
  icon: string;
  value: number | null;
  percentage?: number;
  iconBgColor?: string;
};

const TFHeaderCard = ({ variant, label, icon, value, percentage = 0, iconBgColor="#F7F5FF" }: Props) => {
  return variant === "NOT_PERCENTAGE" 
  ? (
    <div className="tf-header-card flex-row">
      <div className="tf-header-card-icon" style={{background: iconBgColor}}>
        <TFIcon icon={icon} alt="Header Card Icon" />
      </div>
      <div className="d-flex flex-column">
        <p className="tf-header-card-heading">{label}</p>
        <p className="tf-header-card-subheading">{Utils.formatMoney(value)}</p>
      </div>
    </div>
  ) : (
    <div className="d-flex flex-column">
      <div className="tf-header-card" style={{borderRadius: "var(--12-pad, 12px) var(--12-pad, 12px) 0px 0px"}}>
        <div className="tf-header-card-icon" style={{background: iconBgColor}}>
          <TFIcon icon={icon} alt="Header Card Icon" />
        </div>
        <div className="d-flex flex-column">
          <p className="tf-header-card-heading">{label}</p>
          <p className="tf-header-card-subheading">{Utils.formatMoney(value)}</p>
        </div>
      </div>
      <div className="tf-header-card-footer">
        <div className="d-flex justify-content-center align-items-center" style={{ gap: "4px" }}>
          <TFIcon
            icon={
              percentage >= 0
                ? ICONS.TRENDING_UP_GREEN
                : ICONS.TRENDING_DOWN_RED
            }
            alt="Trending Icon"
          />
          <p className="tf-header-card-percentage">{percentage}%</p>
        </div>
        <p className="tf-header-card-last-month">Last Month</p>
      </div>
    </div>
  );
};

export default TFHeaderCard;
