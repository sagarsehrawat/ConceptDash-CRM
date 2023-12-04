import React, { useState } from "react";
import styles from "./MapView.module.css";
import expandIcon from "../../../assets/icons/Expand.svg";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ expand, setExpand }) => {
  const [viewport, setViewport] = useState({
    center: ["45.4215", "-75.6972"], // initial center
    zoom: 12, // initial zoom
  });
  const [type, setType] = useState(1); //1: Regular, 2: Satellite

  const updateCenter = (newCenter) => {
    setViewport({
      ...viewport,
      center: newCenter,
    });
  };

  const updateZoom = (newZoom) => {
    setViewport({
      ...viewport,
      zoom: newZoom,
    });
  };

  return (
    <div className={expand ? styles["container-expanded"] : styles.container}>
      {!expand && (
        <div onClick={() => setExpand(true)} className={styles.expand}>
          <img src={expandIcon} alt="" />
        </div>
      )}
      <div className={styles["map-container"]}>
        <MapContainer
          center={viewport.center}
          zoom={viewport.zoom}
          key={Math.random()}
          zoomControl={false}
          className={styles["leaflet-container"]}
        >
          <>
            <TileLayer
              attribution="Google Maps"
              url={`${
                type === 1
                  ? "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  : type === 2
                  ? "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  : ""
              }`}
              maxZoom={21}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;
