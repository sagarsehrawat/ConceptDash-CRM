import React, { useEffect, useState } from "react";
import styles from "./MapView.module.css";
import expandIcon from "../../../assets/icons/Expand.svg";
import arrowRight from "../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../assets/icons/Arrow_Left.svg";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LoadingSpinner from "../../../Main/Loader/Loader";
import tableIcon from "../../../assets/icons/Table_Icon.svg";

const getRadius = (budget) => {
  if (budget < 1000000) {
    return 1000;
  } else if (budget < 10000000) {
    return 1500;
  } else if (budget < 50000000) {
    return 2000;
  } else if (budget < 100000000) {
    return 2500;
  } else {
    return 3000;
  }
};

const getOpacity = (budget) => {
  if (budget < 1000000) {
    return 0.1;
  } else if (budget < 10000000) {
    return 0.15;
  } else if (budget < 50000000) {
    return 0.25;
  } else if (budget < 100000000) {
    return 0.35;
  } else {
    return 0.4;
  }
};

const MapView = ({ expand, setExpand, cities, isLoading }) => {
  const [viewport, setViewport] = useState({
    center: ["45.4215", "-75.6972"], // initial center
    zoom: 12, // initial zoom
  });
  const [type, setType] = useState(1); //1: Regular, 2: Satellite
  const [openRightBar, setOpenRightBar] = useState(true);
  const [regionData, setRegionData] = useState([]);

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

  const createRegionData = (cities) => {
    let tempData = [];
    cities.forEach((city) => {
      let tempIndex = tempData.findIndex((e, ind) => {
        return e.geographic_area === city.geographic_area;
      });
      if (tempIndex !== -1) {
        tempData[tempIndex].capital_budget_23 =
          Number(city.capital_budget_23) +
          tempData[tempIndex].capital_budget_23;
      } else {
        let tempObj = {
          capital_budget_23: Number(city.capital_budget_23),
          geographical_coordinates: city.geographical_coordinates,
          geographic_area: city.geographic_area,
        };
        tempData.push(tempObj);
      }
    });
    tempData.sort((a, b) => b.capital_budget_23 - a.capital_budget_23);
    // console.log(tempData);
    setRegionData(tempData);
  };

  useEffect(() => {
    if (cities.length > 0) {
      updateCenter([
        Number(cities[0].geographical_coordinates[0]),
        Number(cities[0].geographical_coordinates[1]),
      ]);
      createRegionData(cities);
    }
  }, [cities]);

  // console.log(cities);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
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
              {regionData.map((e) => {
                if (e.geographical_coordinates) {
                  return (
                    <Circle
                      center={[
                        Number(e.geographical_coordinates[0]),
                        Number(e.geographical_coordinates[1]),
                      ]}
                      radius={getRadius(Number(e.capital_budget_23))}
                      pathOptions={{
                        color: "#8361fe",
                        fillColor: "#8361fe",
                        fillOpacity: getOpacity(Number(e.capital_budget_23)),
                      }}
                    />
                  );
                } else {
                  return <></>;
                }
              })}
            </>
          </MapContainer>
        </div>
        {expand && (
          <div
            className={openRightBar ? styles.rightBar : styles.rightBarClose}
          >
            <div className={styles.contents}>
              <div
                onClick={() => setExpand(false)}
                className={styles.backToTable}
              >
                <img src={tableIcon} alt="" /> Back to Table View
              </div>
            </div>
            <div
              onClick={() => setOpenRightBar(!openRightBar)}
              className={styles.open}
            >
              <img src={openRightBar ? arrowRight : arrowLeft} alt="" />
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default MapView;
