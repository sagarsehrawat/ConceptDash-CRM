import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeSuccessModal,
  selectSuccessMessage,
  showSuccessModal,
} from "../../../redux/slices/alertSlice";
import "./TFSuccessAlert.css";
import TFIcon from "../../ui/TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";

type Props = {};

const TFSuccessModal = (props: Props) => {
  const dispatch = useDispatch();
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    const timeId = setTimeout(() => {
      dispatch(removeSuccessModal());
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [successMessage]);

  return (
    successMessage !== "" && (
      <div className="tf-alert-backdrop d-flex justify-content-end align-items-start">
        <div className="tf-success-alert d-flex flex-row align-items-center">
          <div className="success-square-container d-flex justify-content-center align-items-center">
            <div className="success-circle-container d-flex justify-content-center align-items-center">
              <TFIcon icon={ICONS.TICK_GREEN} />
            </div>
          </div>
          <div>
            <p className="alert-heading">Successful!</p>
            <p className="alert-subheading">{successMessage}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default TFSuccessModal;
