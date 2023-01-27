import React from "react";
import "./Loader.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container" style={{opacity:'0.5'}}>
      <div className="loading-spinner"></div>
    </div>
  );
}