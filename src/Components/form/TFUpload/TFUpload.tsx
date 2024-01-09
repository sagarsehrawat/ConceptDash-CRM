import React, { useRef, useState, DragEvent } from "react";
import "./TFUpload.css";
import TFIcon from "../../ui/TFIcon/TFIcon";
import ICONS from "../../../constants/Icons";

interface TFUploadProps {
  onChange: (fileList: File[]) => void;
  isMultiUpload: boolean;
}

export default function TFUpload({
  onChange,
  isMultiUpload = false,
}: TFUploadProps) {
  const dndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragIsOver, setDragIsOver] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragIsOver(false);
    const fileList = Array.from(event.dataTransfer.files);
    onChange(fileList);
  };

  console.log(dragIsOver);

  return (
    <div className="cmp-upload-attachments-container">
      <div>
        <p>Upload Attachments</p>
        <span>
          Click here to upload the attachments <span>(less than 2mb)</span>
        </span>
      </div>
      <div
        ref={dndRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <TFIcon
          icon={ICONS.CAMPAIGN_FILE_UPLOAD}
          style={{ marginBottom: "12px" }}
        />
        <p>Drag and Drop to upload file</p>
        <p>Or</p>
        <button type="button">Browse file</button>
        <p>You can upload png, jpeg or pdf</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple={isMultiUpload}
          hidden
          onChange={(e) => {
            const fileList = e.target.files ? [...e.target.files] : [];
            e.target.value = "";
            onChange(fileList);
          }}
        />
      </div>
    </div>
  );
}
