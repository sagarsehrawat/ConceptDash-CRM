import React, { useEffect, useState } from "react";
import styles from "./MapView.module.css";
import expandIcon from "../../../assets/icons/Expand.svg";
import arrowRight from "../../../assets/icons/Arrow_Right.svg";
import arrowLeft from "../../../assets/icons/Arrow_Left.svg";
import { Circle, MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import LoadingSpinner from "../../../Main/Loader/Loader";
import rightPurple from "../../../assets/icons/Right_Purple.svg";
import back from "../../../assets/icons/Arrow_Left.svg";
import { Icon } from "leaflet";
import moment from "moment";
import SERVICES from "../../../services/Services";
import Dropdown from "../../../omponents/form/DropDown/Dropdown";

interface City {
  city_id: string;
  city_coordinates: string[];
  capital_budget_23: number;
  city: string;
  geographic_area: string;
  geographical_coordinates: string[];
}
interface citiesDataprops {
  showCities: boolean;
  cities: City[];
}
interface MapViewProps {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
  citiesMain: City[];
  isLoading: boolean;
}
interface filterprops {
  dept: string[];
  cat: string[];
  budgetCategory: string[];
}
interface budgetarrayProps {
  budget_amount: number;
  project_name: string;
}
interface BudgetProps {
  showBudgets: boolean;
  budgets: budgetarrayProps[];
}
interface deptsprops {
  label: string;
  value: number | string;
}
interface projectCategoriesprops {
  label: string;
  value: number | string;
}

const getRadius = (
  budget: number,
  baseRadius: number,
  city: Boolean = false
) => {
  if (city) {
    if (budget < 500000) {
      return baseRadius * 5;
    } else if (budget < 1000000) {
      return baseRadius * 10;
    } else if (budget < 5000000) {
      return baseRadius * 15;
    } else {
      return baseRadius * 20;
    }
  } else {
    if (budget < 1000000) {
      return baseRadius * 5;
    } else if (budget < 10000000) {
      return baseRadius * 10;
    } else if (budget < 100000000) {
      return baseRadius * 15;
    } else {
      return baseRadius * 20;
    }
  }
};

const getOpacity = (budget: number, city: Boolean = false) => {
  if (city) {
    if (budget < 500000) {
      return 0.1;
    } else if (budget < 1000000) {
      return 0.3;
    } else if (budget < 5000000) {
      return 0.6;
    } else {
      return 0.8;
    }
  } else {
    if (budget < 1000000) {
      return 0.1;
    } else if (budget < 10000000) {
      return 0.3;
    } else if (budget < 100000000) {
      return 0.6;
    } else {
      return 0.8;
    }
  }
};

const createRegionOptions = (data: City[]) => {
  let temp = [{ label: "All Regions", value: "" }];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.geographic_area, value: e.geographic_area });
    });
  }
  return temp;
};

const createCityOptions = (data: City[]) => {
  let temp = [{ label: "All Cities", value: "" }];
  if (data.length > 0) {
    data.forEach((e) => {
      temp.push({ label: e.city, value: e.city_id });
    });
  }
  return temp;
};

const customIcon = new Icon({
  iconUrl: require("../../../assets/icons/Pin.png"),
  iconSize: [38, 38],
});

const getWidth = (budget: number, maxVal: number) => {
  return (budget / maxVal) * 100 + "%";
};

const MapView: React.FC<MapViewProps> = ({
  expand,
  setExpand,
  citiesMain,
  isLoading,
}: MapViewProps) => {
  // const [type, setType] = useState<number>(1); ///1: Regular, 2: Satellite
  const type: number = 1; //1: Regular, 2: Satellite
  const [openRightBar, setOpenRightBar] = useState<Boolean>(true);
  const [regionData, setRegionData] = useState<City[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<String>("");
  const [citiesData, setCitiesData] = useState<citiesDataprops>({
    showCities: false,
    cities: [],
  });
  const [center, setCenter] = useState<string[]>(["45.4215", "-75.6972"]);
  const [zoom, setZoom] = useState<number>(8);
  const [cityID, setCityID] = useState<string>("");
  const [year, setYear] = useState<string>(moment().year().toString());
  const [filter, setfilter] = useState<filterprops>({
    dept: [],
    cat: [],
    budgetCategory: [],
  });
  const [budgets, setBudgets] = useState<BudgetProps>({
    showBudgets: false,
    budgets: [],
  });
  const [loading, setLoading] = useState<Boolean>(false);
  const [depts, setdepts] = useState<deptsprops[]>([]);
  const [projectCategories, setProjectCategories] = useState<
    projectCategoriesprops[]
  >([]);

  const createRegionData = (cities: City[]) => {
    let tempData: City[] = [];
    cities.forEach((city: City) => {
      let tempIndex = tempData.findIndex((e: City, _) => {
        return e.geographic_area === city.geographic_area;
      });
      if (tempIndex !== -1) {
        tempData[tempIndex].capital_budget_23 =
          Number(city.capital_budget_23) +
          tempData[tempIndex].capital_budget_23;
      } else {
        let tempObj = {
          city_id: "",
          city: "",
          city_coordinates: ["", ""],
          capital_budget_23: Number(city.capital_budget_23),
          geographical_coordinates: city.geographical_coordinates,
          geographic_area: city.geographic_area,
        };
        tempData.push(tempObj);
      }
    });
    // tempData = tempData.filter((e) => e.capital_budget_23 > 0);
    tempData.sort((a, b) => b.capital_budget_23 - a.capital_budget_23);
    setCenter(tempData[0].geographical_coordinates);
    setRegionData(tempData);
  };

  const createCitiesData = (region: string) => {
    let tempData: City[] = [];
    citiesMain.forEach((city: City) => {
      if (city.geographic_area === region) {
        tempData.push(city);
      }
    });
    // console.log("before: ", tempData);
    // tempData = tempData.filter((e) => e.capital_budget_23 > 0);
    // console.log("after: ", tempData);
    tempData.sort(
      (a: City, b: City) => b.capital_budget_23 - a.capital_budget_23
    );
    setZoom(10);
    setCenter(tempData[0].city_coordinates);
    setCitiesData({ ...citiesData, showCities: true, cities: tempData });
  };

  useEffect(() => {
    if (citiesMain.length > 0) {
      createRegionData(citiesMain);
    }
  }, [citiesMain]);

  useEffect(() => {
    const fetchData = async () => {
      const departmentsResponse = await SERVICES.getDepartments();
      let tempDeptArr: deptsprops[] = [];
      departmentsResponse.res.forEach((e) => {
        tempDeptArr.push({ label: e.Department, value: e.Department_ID });
      });
      setdepts(tempDeptArr);
      const projectCategoryResponse = await SERVICES.getProjectCategories("");
      let tempProjArr: deptsprops[] = [];
      projectCategoryResponse.res.forEach((e) => {
        tempProjArr.push({
          label: e.Project_Category,
          value: e.Project_Cat_ID,
        });
      });
      setProjectCategories(tempProjArr);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await SERVICES.getCityBudgets(
          year,
          "",
          parseInt(cityID),
          filter
        );
        setCitiesData({ ...citiesData, showCities: false });
        setBudgets({
          showBudgets: true,
          budgets: response.res
            .map((budget: Budget) => ({
              ...budget,
              budget_amount: budget.budget_amount ?? 0,
            }))
            .sort((a, b) => b.budget_amount - a.budget_amount),
        });
        console.log(response.res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (cityID !== "") {
      fetchData();
    }
  }, [cityID, year, filter]);

  const addComma = (num: Number) => {
    if (num === null || num === undefined) return "";
    const n = num;
    return `$ ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const handleRegionSelect = (val: string) => {
    if (val !== "") {
      createCitiesData(val);
    } else {
      setZoom(8);
      setCenter(regionData[0].geographical_coordinates);
      setCitiesData({ showCities: false, cities: [] });
    }
    setBudgets({ showBudgets: false, budgets: [] });
    setCityID("");
    setOpenRightBar(true);
    setSelectedRegion(val);
  };

  const handleCitySelect = (val: string, coordinate: string[] = ["", ""]) => {
    if (val !== "") {
      setZoom(12);
      if (coordinate) {
        setCenter(coordinate);
      } else {
        setCenter(
          citiesData.cities.filter((e: City) => e.city_id === val)[0]
            .city_coordinates
        );
      }
    } else {
      setBudgets({ showBudgets: false, budgets: [] });
      setCitiesData({ ...citiesData, showCities: true });
    }
    setOpenRightBar(true);
    setCityID(val);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className={expand ? styles["container-expanded"] : styles.container}>
        {expand && (
          <div className={styles.header}>
            <Dropdown
              name={"Regions"}
              search
              value={selectedRegion}
              onChange={(val: string): void => {
                handleRegionSelect(val);
              }}
              options={createRegionOptions(regionData)}
              checkbox={undefined}
              type={undefined}
              disable={undefined}
            />
            <Dropdown
              name={"Cities"}
              value={cityID}
              search
              disable={!(citiesData.showCities || budgets.showBudgets)}
              onChange={(val: string): void => {
                handleCitySelect(val);
              }}
              options={createCityOptions(citiesData.cities)}
              checkbox={undefined}
              type={undefined}
            />
            <Dropdown
              name={"Year"}
              value={year}
              search
              disable={!cityID}
              onChange={(val: string): void => {
                setYear(val);
              }}
              options={[
                { label: "2021", value: "2021" },
                { label: "2022", value: "2022" },
                { label: "2023", value: "2023" },
                { label: "2024", value: "2024" },
              ]}
              checkbox={undefined}
              type={undefined}
            />
            <Dropdown
              name={"Budget Category"}
              value={filter.budgetCategory}
              search
              disable={!cityID}
              checkbox
              onChange={(val: string[]): void => {
                setfilter({ ...filter, budgetCategory: val });
              }}
              options={[
                { label: "Design", value: "Design" },
                { label: "Construction", value: "Construction" },
              ]}
              type={undefined}
            />
            <Dropdown
              name={"Department"}
              value={filter.dept}
              search
              disable={!cityID}
              checkbox
              onChange={(val: string[]): void => {
                setfilter({ ...filter, dept: val });
              }}
              options={depts}
              type={undefined}
            />
            <Dropdown
              name={"Project Category"}
              value={filter.cat}
              search
              disable={!cityID}
              checkbox
              onChange={(val: string[]): void => {
                setfilter({ ...filter, cat: val });
              }}
              options={projectCategories}
              type={undefined}
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
              {citiesData.showCities || budgets.showBudgets
                ? citiesData.cities.map((e: City, idx: number) => {
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
                : regionData.map((e: City) => {
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
                  })}
            </>
          </MapContainer>
        </div>
        {expand && (
          <div
            className={openRightBar ? styles.rightBar : styles.rightBarClose}
          >
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div className={styles.contents}>
                <div
                  onClick={() => {
                    setCitiesData({ showCities: false, cities: [] });
                    setSelectedRegion("");
                    setZoom(8);
                    setCenter(regionData[0].geographical_coordinates);
                    setExpand(false);
                  }}
                  className={styles.backToTable}
                >
                  Go to Table View <img src={rightPurple} alt="" />
                </div>
                {budgets.showBudgets && (
                  <div className={styles.metricsContainer}>
                    <div
                      onClick={() => {
                        setBudgets({ showBudgets: false, budgets: [] });
                        setCitiesData({ ...citiesData, showCities: true });
                        setCityID("");
                        setZoom(10);
                      }}
                      className={styles.backToRegions}
                    >
                      <div className={styles.backBTN}>
                        <img src={back} alt="" />
                      </div>
                      Back
                    </div>
                    <div>
                      {
                        citiesData.cities.filter(
                          (e: City) => e.city_id === cityID
                        )[0]?.city
                      }{" "}
                      ({budgets.budgets.length})
                    </div>
                    {budgets.budgets.map((e: budgetarrayProps) => {
                      return (
                        <div className={styles.metric}>
                          <div className="d-flex justify-content-between">
                            <div
                              style={{ fontWeight: "400", fontSize: "12px" }}
                            >
                              {e?.project_name}
                            </div>
                            <div
                              style={{ fontWeight: "600", fontSize: "12px" }}
                            >
                              {addComma(e?.budget_amount)}
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
                                  e?.budget_amount,
                                  budgets.budgets[0].budget_amount * 1.2
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
                {citiesData.showCities && (
                  <div className={styles.metricsContainer}>
                    <div
                      onClick={() => {
                        handleRegionSelect("");
                      }}
                      className={styles.backToRegions}
                    >
                      <div className={styles.backBTN}>
                        <img src={back} alt="" />
                      </div>
                      Back
                    </div>
                    <div>
                      {selectedRegion} ({citiesData.cities.length})
                    </div>
                    {citiesData.cities.map((city: City) => {
                      return (
                        <div
                          onClick={() => {
                            handleCitySelect(
                              city.city_id,
                              city?.city_coordinates
                            );
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
                                  citiesData.cities[0].capital_budget_23 * 1.2
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
                {!citiesData.showCities && !budgets.showBudgets && (
                  <div className={styles.metricsContainer}>
                    <div>Regions ({regionData.length})</div>
                    {regionData.map((region: City) => {
                      return (
                        <div
                          onClick={() => {
                            handleRegionSelect(region?.geographic_area);
                          }}
                          className={styles.metric}
                        >
                          <div className="d-flex justify-content-between">
                            <div
                              style={{ fontWeight: "400", fontSize: "12px" }}
                            >
                              {region?.geographic_area}
                            </div>
                            <div
                              style={{ fontWeight: "600", fontSize: "12px" }}
                            >
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
                                  regionData[0].capital_budget_23 * 1.2
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
            )}
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
