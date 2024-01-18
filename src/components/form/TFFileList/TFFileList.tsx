import React from "react";
import "./tf-file-list.css";
import ICONS from "../../../constants/Icons";
import TFIcon from "../../ui/TFIcon/TFIcon";
import CloseIcon from "@mui/icons-material/Close";

interface FileListProps {
  files: File[];
  handleFileCancel: (fileIndex: number, file: File) => void;
}

export default function TFFileList({ files, handleFileCancel }: FileListProps) {
  return (
    <div className="cmp-file-list-container">
      <p>Attachments</p>
      <div>
        {files?.map((file, index) => (
          <div key={`file-list-${index}`}>
            <div>
              <TFIcon
                icon={ICONS.CAMPAIGN_JPEG}
                style={{ width: "46px", height: "60px" }}
              />
            </div>
            <div>
              <p>{file?.name}</p>
              <CloseIcon
                style={{ cursor: "pointer", width: "20px", height: "20px" }}
                onClick={() => handleFileCancel(index, file)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
