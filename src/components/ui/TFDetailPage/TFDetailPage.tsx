import React from "react";
import "./TFDetailPage.css";
import TFButton from "../TFButton/TFButton";
import TFIcon from "../TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";

type Props = {
  children?: React.ReactNode;
  headerLabel?: string;
  footerButtonLabel?: string;
  handleSubmit?: () => void;
  handleBack: () => void;
};

const TFDetailPage = ({
  children,
  handleSubmit,
  handleBack,
  footerButtonLabel = "Save Changes",
  headerLabel = "Detail Page",
}: Props) => {
  return (
    <div className="detail-page-wrapper">
      <div className="detail-page-body">
        <div className="detail-header">
          <TFIcon
            icon={ICONS.CHEVRON_LEFT_BLACK}
            style={{ cursor: "pointer" }}
            onClick={handleBack}
          />
          <p className="detail-heading">{headerLabel}</p>
        </div>

        {children}
      </div>

      <div className="detail-page-footer w-100">
        <TFButton label="Cancel" variant="secondary" handleClick={handleBack} />
        <TFButton
          label={footerButtonLabel}
          handleClick={handleSubmit}
          variant="primary"
        />
      </div>
    </div>
  );
};

export default TFDetailPage;
