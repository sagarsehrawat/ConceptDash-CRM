import React from "react";
// import { icons } from "../../../assets/icons/index";
import "./AddForm.scss";

const AddForm = (props: any) => {
  const { children, heading_icon, heading } = props;
  // const { expand_icon } = icons;
  return (
    <div className="tf-modal-backdrop d-flex justify-content-end align-items-start">
      <div className="rfp-modal-container">
        {/* <div>
          <img src={expand_icon} />
        </div> */}
        <div className="rfp-modal-wrapper">
          <div className="d-flex justify-content-start align-items-center gap-3" style={{padding: "0px 45px"}}>
            <div className="heading-icon-wrapper">
              <img src={heading_icon} />
            </div>
            <div>
              <h5 className="heading-2">{heading}</h5>
            </div>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AddForm;
