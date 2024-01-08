import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import styles from "./ProposalsMap.module.css";
import { DivIcon, Icon, LatLngExpression, point } from "leaflet";
import {
  initproposals,
  selectProposals,
} from "../../../redux/slices/proposalSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import pinIcon from "../../../assets/icons/Pin.svg";
import expandIcon from "../../../assets/icons/Expand.svg";
import arrowRight from "../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../assets/icons/Arrow_Left.svg";
import rightPurple from "../../../assets/icons/Right_Purple.svg";
import SERVICES from "../../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../Main/Loader/Loader";

type Props = {
  expand: boolean;
  setExpand: Function;
  api: number;
  setApi: Function;
  filter: FilterType;
  setFilter: Function;
};

interface FilterType {
  dept: (string | number)[];
  cat: (string | number)[];
  city: (string | number)[];
  manager: (string | number)[];
  bookmark: boolean;
}

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

const ProposalsMap = ({ expand, setExpand, api, filter }: Props) => {
  const [type, setType] = useState<number>(1); //1: Regular, 2: Satellite
  const [center, setCenter] = useState<LatLngExpression | undefined>([
    45.4215, -75.6972,
  ]);
  const [zoom, setZoom] = useState<number>(8);
  const [openRightBar, setOpenRightBar] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(expand, setExpand, setType, setCenter, setZoom);
  const proposals = useSelector(selectProposals);
  const dispatch = useDispatch();
  console.log(proposals);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await SERVICES.getProposals(
          expand ? 999999 : 50,
          1,
          filter,
          "",
          "created_at DESC",
          localStorage.getItem("employeeId") ?? ""
        );
        dispatch(initproposals(response.res));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [api, filter, expand, dispatch]);

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
        {expand && (
          <div
            className={openRightBar ? styles.rightBar : styles.rightBarClose}
          >
            <div className={styles.contents}>
              <div
                onClick={() => {
                  setExpand(false);
                }}
                className={styles.backToTable}
              >
                Go to Table View <img src={rightPurple} alt="" />
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

export default ProposalsMap;
