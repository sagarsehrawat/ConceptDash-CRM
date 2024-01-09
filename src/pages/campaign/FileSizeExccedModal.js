import React from "react";
import "./file-size-excced-modal.css";
import { useDispatch, useSelector } from "react-redux";
import ICONS from "../../constants/Icons";
import TFIcon from "../../components/ui/TFIcon/TFIcon";
import CloseIcon from "@mui/icons-material/Close";
import { setIsFileAccedingMaxSize } from "../../redux/slices/campaignListSlice";

export default function FileSizeExccedModal() {
  const { isFileAccedingMaxSize } = useSelector((state) => state.campaignList);
  const dispatch = useDispatch();
  if (isFileAccedingMaxSize) {
    return (
      <div className="cmp-fse-container">
        <div>
          <div>
            <TFIcon icon={ICONS.CAMPAIGN_FILE_EXCCED} />
            <p>The specified file is exceeding the maximum file size of 2mb.</p>
          </div>
          <div>
            <CloseIcon
              style={{ cursor: "pointer", width: "20px", height: "20px" }}
              onClick={(e) => dispatch(setIsFileAccedingMaxSize(false))}
            />
          </div>
        </div>
      </div>
    );
  }
  return null;
}
