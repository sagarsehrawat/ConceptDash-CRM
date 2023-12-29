import React from "react";
import "./TFViewChip.css";
import TFIcon from "../TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";

type Props = {
  label: string;
  onClick?: () => void;
};

const TFViewChip = ({ label, onClick }: Props) => {
  return (
    <>
      <div className="chip-wrapper">
        <div className={`tf-view-chip`} onClick={onClick}>
          <TFIcon icon={ICONS.EYE_GREY} style={{ pointerEvents: "none"}} />
          <p className="tf-view-chip-label">{label}</p>
        </div>
      </div>
    </>
  );
};

export default TFViewChip;
