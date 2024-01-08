import React, { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import styles from "./ProposalsMap.module.css";
import { DivIcon, Icon, LatLngExpression, point } from "leaflet";
import { useSelector } from "react-redux";
import { selectProposals } from "../../../redux/slices/proposalSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import pinIcon from "../../../assets/icons/Pin.svg";

type Props = {
  expand: boolean;
  setExpand: Function;
};

const createClusterCustomIcon = function (cluster: any) {
  return new DivIcon({
    html: `<span class=${styles.clusterIcon}>${cluster.getChildCount()}</span>`,
    className: styles["cluster-icon"],
    iconSize: point(33, 33, true),
  });
};

const customIcon = new Icon({
  iconUrl: pinIcon,
  iconSize: [38, 38],
});

const ProposalsMap = ({ expand, setExpand }: Props) => {
  const [type, setType] = useState<number>(1); //1: Regular, 2: Satellite
  const [center, setCenter] = useState<LatLngExpression | undefined>([
    45.4215, -75.6972,
  ]);
  const [zoom, setZoom] = useState<number>(8);
  console.log(expand, setExpand, setType, setCenter, setZoom);
  const proposals = useSelector(selectProposals);
  console.log(proposals);

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
            <MarkerClusterGroup
              iconCreateFunction={createClusterCustomIcon}
              chunkedLoading
            >
              {proposals &&
                proposals.map((proposal, idx) => {
                  if (
                    proposal.city_coordinates &&
                    proposal.city_coordinates.length === 2
                  ) {
                    console.log(proposal.city_coordinates);
                    return (
                      <Marker
                        key={idx}
                        icon={customIcon}
                        position={[
                          Number(proposal.city_coordinates[0]),
                          Number(proposal.city_coordinates[1]),
                        ]}
                      ></Marker>
                    );
                  } else {
                    return <></>;
                  }
                })}
            </MarkerClusterGroup>
          </>
        </MapContainer>
      </div>
    </div>
  );
};

export default ProposalsMap;
