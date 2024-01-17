import React, { useState } from "react";
import styles from "./RFPMaps.module.css";
// import pinIcon from "../../../../../assets/icons/Pin.svg";
import expandIcon from "../../../../../assets/icons/Expand.svg";
import arrowRight from "../../../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../../../assets/icons/Arrow_Left.svg";
import rightPurple from "../../../../../assets/icons/Right_Purple.svg";
import { MapContainer, TileLayer } from "react-leaflet";
import { DivIcon, LatLngExpression, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

type Props = {
  expand: boolean;
  setExpand: Function;
  // api: number;
  // setApi: Function;
  // filter: FilterType;
  // setFilter: Function;
};

// interface FilterType {
//   dept: (string | number)[];
//   cat: (string | number)[];
//   city: (string | number)[];
//   manager: (string | number)[];
//   bookmark: boolean;
// }

const createClusterCustomIcon = function (cluster: any) {
  return new DivIcon({
    html: `<span class=${styles.clusterIcon}>${cluster.getChildCount()}</span>`,
    className: styles["cluster-icon"],
    iconSize: point(33, 33, true),
  });
};

// const customIcon = new Icon({
//   iconUrl: pinIcon,
//   iconSize: [38, 38],
// });

const RFPMaps = ({ setExpand, expand }: Props) => {
  const type = 1;
  const [center, setCenter] = useState<LatLngExpression | undefined>([
    45.4215, -75.6972,
  ]);
  const [zoom, setZoom] = useState<number>(8);
  const [openRightBar, setOpenRightBar] = useState<boolean>(true);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [isLoading2, setIsLoading2] = useState<boolean>(false);
  console.log(setExpand, expand, setCenter, setZoom);

  return (
    <div className={expand ? styles["container-expanded"] : styles.container}>
      {expand && (
        <div className={styles.header}>
          {/* <Dropdown
            name={"Cities"}
            value={filter.city}
            checkbox
            type={false}
            search
            disable={isLoading2}
            onChange={(val: string | number) => {
              setFilter({ ...filter, city: val });
            }}
            options={cities}
          />
          <Dropdown
            name={"Department"}
            value={filter.dept}
            checkbox
            type={false}
            search
            disable={isLoading2}
            onChange={(val: string | number) => {
              setFilter({ ...filter, dept: val });
            }}
            options={depts}
          />
          <Dropdown
            name={"Project Category"}
            value={filter.cat}
            checkbox
            type={false}
            search
            disable={isLoading2}
            onChange={(val: string | number) => {
              setFilter({ ...filter, cat: val });
            }}
            options={projectCategories}
          />
          <Dropdown
            name={"Manager"}
            value={filter.manager}
            checkbox
            type={false}
            search
            disable={isLoading2}
            onChange={(val: string | number) => {
              setFilter({ ...filter, manager: val });
            }}
            options={employees}
          /> */}
        </div>
      )}
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
              {/* {proposals &&
                proposals.map((proposal, idx) => {
                  if (
                    proposal.city_coordinates &&
                    proposal.city_coordinates.length === 2
                  ) {
                    return (
                      <Marker
                        key={idx}
                        icon={customIcon}
                        position={[
                          Number(proposal.city_coordinates[0]),
                          Number(proposal.city_coordinates[1]),
                        ]}
                        eventHandlers={{
                          click: () => {
                            if (proposal.city_coordinates)
                              setCenter([
                                Number(proposal.city_coordinates[0]),
                                Number(proposal.city_coordinates[1]),
                              ]);
                            setZoom(14);
                            setcurrentProposal(proposal);
                          },
                        }}
                      ></Marker>
                    );
                  } else {
                    return <></>;
                  }
                })} */}
            </MarkerClusterGroup>
          </>
        </MapContainer>
      </div>
      {expand && (
        <div className={openRightBar ? styles.rightBar : styles.rightBarClose}>
          <div className={styles.contents}>
            <div
              onClick={() => {
                setExpand(false);
              }}
              className={styles.backToTable}
            >
              Go to Table View <img src={rightPurple} alt="" />
            </div>
            {/* {currentProposal && (
              <div
                onClick={() => {
                  setZoom(8);
                  if (proposals[0].city_coordinates)
                    setCenter([
                      Number(proposals[0].city_coordinates[0]),
                      Number(proposals[0].city_coordinates[1]),
                    ]);
                  setcurrentProposal(null);
                }}
                className={styles.back}
              >
                <img src={arrowLeft} alt="" /> Back
              </div>
            )} */}
            <div className={styles.title}>
              {/* {currentProposal
                ? "Proposal Details:"
                : `Proposals: ${proposals.length}`} */}
            </div>
            <div className={styles.projectList}>
              {/* {currentProposal && (
                <div className={styles.proposalDetails}>
                  <div className={styles.metric}>
                    <div className={styles.label}>Name:</div>
                    <div className={styles.value}>
                      {currentProposal.project_name ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>City:</div>
                    <div className={styles.value}>
                      {currentProposal.city ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Province:</div>
                    <div className={styles.value}>
                      {currentProposal.province ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Project Manager:</div>
                    <div className={styles.value}>
                      {currentProposal.project_manager ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Department:</div>
                    <div className={styles.value}>
                      {currentProposal.department ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Project Category:</div>
                    <div className={styles.value}>
                      {currentProposal.project_category ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Client:</div>
                    <div className={styles.value}>
                      {currentProposal.client ?? "Not Available"}
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.label}>Result:</div>
                    <div className={styles.value}>
                      {currentProposal.result ?? "Not Available"}
                    </div>
                  </div>
                </div>
              )} */}
              {/* {!currentProposal &&
                proposals.map((e) => {
                  return (
                    <div
                      onClick={() => {
                        if (e.city_coordinates)
                          setCenter([
                            Number(e.city_coordinates[0]),
                            Number(e.city_coordinates[1]),
                          ]);
                        setZoom(14);
                        setcurrentProposal(e);
                      }}
                      className={styles.projectListItem}
                    >
                      {e.project_name}
                    </div>
                  );
                })} */}
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
};

export default RFPMaps;
