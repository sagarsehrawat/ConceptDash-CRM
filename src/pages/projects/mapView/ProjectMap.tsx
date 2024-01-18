import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import styles from "./ProjectMap.module.css";
import { DivIcon, Icon, LatLngExpression, point } from "leaflet";
import {
  initProjects,
  selectProjects,
} from "../../../redux/slices/projectSlice";
import MarkerClusterGroup from "react-leaflet-cluster";
import pinIcon from "../../../assets/icons/Pin.svg";
import expandIcon from "../../../assets/icons/Expand.svg";
import arrowRight from "../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../assets/icons/Arrow_Left.svg";
import rightPurple from "../../../assets/icons/Right_Purple.svg";
import SERVICES from "../../../services/Services";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../../Main/Loader/Loader";
import Dropdown from "../../../components/form/DropDown/Dropdown";

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

const createCityOptions = (
  data: Array<{
    City_ID: number | string;
    City: string;
  }>
) => {
  let temp: Array<{ value: number | string; label: string }> = [];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.City, value: e.City_ID });
    });
  }
  return temp;
};
const createDeptOptions = (
  data: Array<{
    Department_ID: string | number;
    Department: string;
  }>
) => {
  let temp: Array<{ value: number | string; label: string }> = [];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.Department, value: e.Department_ID });
    });
  }
  return temp;
};
const createProjOptions = (
  data: Array<{
    Project_Cat_ID: number;
    Project_Category: string;
  }>
) => {
  let temp: Array<{ value: number | string; label: string }> = [];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.Project_Category, value: e.Project_Cat_ID });
    });
  }
  return temp;
};
const createEmpOptions = (
  data: Array<{
    Employee_ID: number;
    Full_Name: string;
  }>
) => {
  let temp: Array<{ value: number | string; label: string }> = [];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.Full_Name, value: e.Employee_ID });
    });
  }
  return temp;
};

const ProjectMap = ({ expand, setExpand, api, filter, setFilter }: Props) => {
  const [type, setType] = useState<number>(1); //1: Regular, 2: Satellite
  const [center, setCenter] = useState<LatLngExpression | undefined>([
    45.4215, -75.6972,
  ]);
  const [zoom, setZoom] = useState<number>(8);
  const [openRightBar, setOpenRightBar] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [cities, setcities] = useState<
    Array<{ value: number | string; label: string }>
  >([]);
  const [depts, setdepts] = useState<
    Array<{ value: number | string; label: string }>
  >([]);
  const [projectCategories, setProjectCategories] = useState<
    Array<{ value: number | string; label: string }>
  >([]);
  const [employees, setemployees] = useState<
    Array<{ value: number | string; label: string }>
  >([]);
  const [currentProject, setcurrentProject] = useState<Project | null>(null);
  console.log(setType, setCenter, setZoom);
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
       
        const response = await SERVICES.getProjects(
          expand ? 999999 : 50,
          1,
          filter,
          "",
          "date_created DESC",
        );
        dispatch(initProjects(response.res));
        setZoom(8);
        setcurrentProject(null);
        if (response.res.length > 0) {
            console.log(response.res[0])
          setCenter([
            Number(response.res[0].city_coordinates[0]),
            Number(response.res[0].city_coordinates[1]),
          ]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [api, filter, expand, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading2(true);
      const citiesResponse = await SERVICES.getCities();

      const departmentsResponse = await SERVICES.getDepartments();

      const employeeResponse = await SERVICES.getManagers();

      const projectCategoryResponse = await SERVICES.getProjectCategories("");
      setIsLoading2(false);
      setcities(createCityOptions(citiesResponse.res));
      setdepts(createDeptOptions(departmentsResponse.res));
      setemployees(createEmpOptions(employeeResponse.res));
      setProjectCategories(createProjOptions(projectCategoryResponse.res));
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className={expand ? styles["container-expanded"] : styles.container}>
        {expand && (
          <div className={styles.header}>
            <Dropdown
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
            />
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
                {projects &&
                  projects
                    .filter(
                      (project) =>
                        project.city_coordinates &&
                        project.city_coordinates.length === 2 &&
                        project.city_coordinates.every((coord) => coord !== null)
                    )
                    .map((project, idx) => (
                      <Marker
                        key={idx}
                        icon={customIcon}
                        position={[
                          Number(project.city_coordinates[0]),
                          Number(project.city_coordinates[1]),
                        ]}
                        eventHandlers={{
                          click: () => {
                            setCenter([
                              Number(project.city_coordinates[0]),
                              Number(project.city_coordinates[1]),
                            ]);
                            setZoom(14);
                            setcurrentProject(project);
                          },
                        }}
                      ></Marker>
                    ))}
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
              {currentProject && (
                <div
                  onClick={() => {
                    setZoom(8);
                    setCenter([
                      Number(projects[0].city_coordinates[0]),
                      Number(projects[0].city_coordinates[1]),
                    ]);
                    setcurrentProject(null);
                  }}
                  className={styles.back}
                >
                  <img src={arrowLeft} alt="" /> Back
                </div>
              )}
              <div className={styles.title}>
                {currentProject
                  ? "Project Details:"
                  : `Projects: ${projects.length}`}
              </div>
              <div className={styles.projectList}>
                {currentProject && (
                  <div className={styles.proposalDetails}>
                    <div className={styles.metric}>
                      <div className={styles.label}>Name:</div>
                      <div className={styles.value}>
                        {currentProject.project_name ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>City:</div>
                      <div className={styles.value}>
                        {currentProject.city ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Province:</div>
                      <div className={styles.value}>
                        {currentProject.province ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Project Manager:</div>
                      <div className={styles.value}>
                        {currentProject.project_manager ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Department:</div>
                      <div className={styles.value}>
                        {currentProject.department ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Project Category:</div>
                      <div className={styles.value}>
                        {currentProject.project_category ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Client:</div>
                      <div className={styles.value}>
                        {currentProject.client ?? "Not Available"}
                      </div>
                    </div>
                    <div className={styles.metric}>
                      <div className={styles.label}>Result:</div>
                      <div className={styles.value}>
                        {currentProject.result ?? "Not Available"}
                      </div>
                    </div>
                  </div>
                )}
                {!currentProject &&
                  projects.map((e) => {
                    return (
                      <div
                        onClick={() => {
                          setCenter([
                            Number(e.city_coordinates[0]),
                            Number(e.city_coordinates[1]),
                          ]);
                          setZoom(14);
                          setcurrentProject(e);
                        }}
                        className={styles.projectListItem}
                      >
                        {e.project_name}
                      </div>
                    );
                  })}
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

export default ProjectMap;