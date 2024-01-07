import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./ProposalsMap.module.css";
import { LatLngExpression } from "leaflet";

type Props = {
  expand: boolean;
  setExpand: Function;
};

const ProposalsMap = ({ expand, setExpand }: Props) => {
  const [type, setType] = useState<number>(1); //1: Regular, 2: Satellite
  const [center, setCenter] = useState<LatLngExpression | undefined>([
    45.4215, -75.6972,
  ]);
  const [zoom, setZoom] = useState<number>(8);
  console.log(expand, setExpand, setType, setCenter, setZoom);

  return (
    <div className={expand ? styles["container-expanded"] : styles.container}>
      <div className={styles["map-container"]}>
        <MapContainer
          center={center}
          zoom={zoom}
          maxZoom={21}
          key={Math.random()}
          zoomControl={false}
          className={styles["leaflet-container"]}
        >
          <>
            <TileLayer
              url={`${
                type === 1
                  ? "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                  : type === 2
                  ? "http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}"
                  : ""
              }`}
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
            {/* {citiesData.showCities || budgets.showBudgets
        ? citiesData.cities.map((e, idx) => {
            if (e.city_coordinates) {
              return (
                <>
                  <Circle
                    center={[
                      Number(e.city_coordinates[0]),
                      Number(e.city_coordinates[1]),
                    ]}
                    radius={getRadius(
                      Number(e.capital_budget_23),
                      200,
                      true
                    )}
                    pathOptions={{
                      color: "#8361fe",
                      fillColor: "#8361fe",
                      fillOpacity: getOpacity(
                        Number(e.capital_budget_23),
                        true
                      ),
                    }}
                    eventHandlers={{
                      click: () => {
                        handleCitySelect(
                          e?.city_id,
                          e?.city_coordinates
                        );
                      },
                    }}
                  />
                  <Marker
                    eventHandlers={{
                      click: () => {
                        handleCitySelect(
                          e?.city_id,
                          e?.city_coordinates
                        );
                      },
                    }}
                    key={idx}
                    icon={customIcon}
                    position={[
                      Number(e.city_coordinates[0]),
                      Number(e.city_coordinates[1]),
                    ]}
                  />
                </>
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
                      handleRegionSelect(e?.geographic_area);
                    },
                  }}
                />
              );
            } else {
              return <></>;
            }
          })} */}
          </>
        </MapContainer>
      </div>
    </div>
  );
};

export default ProposalsMap;
