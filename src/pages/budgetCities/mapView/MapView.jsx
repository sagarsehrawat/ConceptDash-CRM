import React, { useEffect, useState } from "react";
import styles from "./MapView.module.css";
import expandIcon from "../../../assets/icons/Expand.svg";
import arrowRight from "../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../assets/icons/Arrow_Left.svg";
import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LoadingSpinner from "../../../Main/Loader/Loader";
import tableIcon from "../../../assets/icons/Table_Icon.svg";
import back from "../../../assets/icons/Arrow_Left.svg";

const getRadius = (budget, baseRadius) => {
  if (budget < 1000000) {
    return baseRadius * 5;
  } else if (budget < 10000000) {
    return baseRadius * 5;
  } else if (budget < 100000000) {
    return baseRadius * 5;
  } else {
    return baseRadius * 5;
  }
};

const getOpacity = (budget) => {
  if (budget < 1000000) {
    return 0.1;
  } else if (budget < 10000000) {
    return 0.3;
  } else if (budget < 100000000) {
    return 0.6;
  } else {
    return 0.8;
  }
};

const getWidth = (budget, maxVal) => {
  return (budget / maxVal) * 100 + "%";
};

const MapView = ({ expand, setExpand, cities, isLoading }) => {
  const [type, setType] = useState(1); //1: Regular, 2: Satellite
  const [openRightBar, setOpenRightBar] = useState(true);
  const [regionData, setRegionData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [showCities, setShowCities] = useState(false);
  const [citiesData, setCitiesData] = useState([]);
  const [center, setCenter] = useState(["45.4215", "-75.6972"]);
  const [zoom, setZoom] = useState(10);

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
    setCenter(tempData[0].geographical_coordinates);
    setRegionData(tempData);
  };

  const createCitiesData = (region) => {
    let tempData = [];
    cities.forEach((city) => {
      if (city.geographic_area === region) {
        tempData.push(city);
      }
    });
    tempData.sort((a, b) => b.capital_budget_23 - a.capital_budget_23);
    setZoom(12);
    setCenter(tempData[0].city_coordinates);
    // console.log(tempData);
    setCitiesData(tempData);
    setShowCities(true);
  };

  useEffect(() => {
    if (cities.length > 0) {
      createRegionData(cities);
    }
  }, [cities]);

  const addComma = (num) => {
    if (num === null || num === undefined) return "";
    const n = num;
    return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

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
            center={center}
            zoom={zoom}
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
              {showCities
                ? citiesData.map((e) => {
                    if (e.city_coordinates) {
                      return (
                        <Circle
                          center={[
                            Number(e.city_coordinates[0]),
                            Number(e.city_coordinates[1]),
                          ]}
                          radius={getRadius(Number(e.capital_budget_23), 200)}
                          pathOptions={{
                            color: "#8361fe",
                            fillColor: "#8361fe",
                            fillOpacity: getOpacity(
                              Number(e.capital_budget_23)
                            ),
                          }}
                        />
                      );
                    } else {
                      return <></>;
                    }
                  })
                : regionData.map((e) => {
                    if (e.geographical_coordinates) {
                      return (
                        <Circle
                          center={[
                            Number(e.geographical_coordinates[0]),
                            Number(e.geographical_coordinates[1]),
                          ]}
                          radius={getRadius(Number(e.capital_budget_23), 1000)}
                          pathOptions={{
                            color: "#8361fe",
                            fillColor: "#8361fe",
                            fillOpacity: getOpacity(
                              Number(e.capital_budget_23)
                            ),
                          }}
                          eventHandlers={{
                            click: () => {
                              setSelectedRegion(e?.geographic_area);
                              createCitiesData(e?.geographic_area);
                            },
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
                onClick={() => {
                  setShowCities(false);
                  setCitiesData([]);
                  setSelectedRegion("");
                  setZoom(10);
                  setCenter(regionData[0].geographical_coordinates);
                  setExpand(false);
                }}
                className={styles.backToTable}
              >
                <img src={tableIcon} alt="" /> Back to Table View
              </div>
              {showCities ? (
                <>
                  <div className={styles.metricsContainer}>
                    <div
                      onClick={() => {
                        setShowCities(false);
                        setCitiesData([]);
                        setSelectedRegion("");
                        setZoom(10);
                        setCenter(regionData[0].geographical_coordinates);
                      }}
                      className={styles.backToRegions}
                    >
                      <div className={styles.backBTN}>
                        <img src={back} alt="" />
                      </div>
                      Back
                    </div>
                    <div>Cities</div>
                    {citiesData.map((city) => {
                      return (
                        <div
                          onClick={() => {
                            setCenter(city?.city_coordinates);
                            setZoom(14);
                          }}
                          className={styles.metric}
                        >
                          <div className="d-flex justify-content-between">
                            <div
                              style={{ fontWeight: "400", fontSize: "12px" }}
                            >
                              {city?.city}
                            </div>
                            <div
                              style={{ fontWeight: "600", fontSize: "12px" }}
                            >
                              {addComma(city?.capital_budget_23)}
                            </div>
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "6px",
                              borderRadius: "8px",
                              backgroundColor: "#F8F8FB",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                backgroundColor: "#8361FE",
                                width: getWidth(
                                  city?.capital_budget_23,
                                  200000000
                                ),
                                borderRadius: "8px",
                              }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className={styles.metricsContainer}>
                  <div>Regions</div>
                  {regionData.map((region) => {
                    return (
                      <div
                        onClick={() => {
                          setSelectedRegion(region?.geographic_area);
                          createCitiesData(region?.geographic_area);
                        }}
                        className={styles.metric}
                      >
                        <div className="d-flex justify-content-between">
                          <div style={{ fontWeight: "400", fontSize: "12px" }}>
                            {region?.geographic_area}
                          </div>
                          <div style={{ fontWeight: "600", fontSize: "12px" }}>
                            {addComma(region?.capital_budget_23)}
                          </div>
                        </div>
                        <div
                          style={{
                            width: "100%",
                            height: "6px",
                            borderRadius: "8px",
                            backgroundColor: "#F8F8FB",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              backgroundColor: "#8361FE",
                              width: getWidth(
                                region?.capital_budget_23,
                                200000000
                              ),
                              borderRadius: "8px",
                            }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
