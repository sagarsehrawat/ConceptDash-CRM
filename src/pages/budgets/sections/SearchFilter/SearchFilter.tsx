import React, { useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../../../../Main/Constants/Constants";
import SERVICES from "../../../../services/Services";
import TFButton from "../../../../components/ui/TFButton/TFButton";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faX } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import TFSearchBar from "../../../../components/ui/TFSearchBar/TFSearchBar";
import filterIcon from "../../../../Images/Filter.svg";
import ICONS from "../../../../constants/Icons";
import AddBudget from "../../forms/AddBudget";
import TFSelect from "../../../../components/form/TFSelect/TFSelect";

type Props = {
  api: number;
  setApi: Function;
  value: string;
  setValue: Function;
  filter: FilterType;
  setFilter: Function;
  isCollapsed: boolean;
  year: string;
  setYear: Function;
  cityId: number;
};

interface FilterType {
  dept: (string | number)[];
  cat: (string | number)[];
  budgetCategory: (string | number)[];
}

const SearchFilter = ({
  api,
  setApi,
  value,
  setValue,
  filter,
  setFilter,
  isCollapsed,
  year,
  setYear,
  cityId,
}: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState([false, true, true, true]);
  const [depts, setdepts] = useState<
    Array<{ Department_ID: string | number; Department: string }>
  >([]);
  const [projectCategories, setProjectCategories] = useState<
    Array<{ Project_Cat_ID: number; Project_Category: string }>
  >([]);
  const [prevFilter, setprevFilter] = useState<FilterType>({
    dept: [],
    cat: [],
    budgetCategory: [],
  });
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const styles = {
    filterModal: {
      position: "absolute" as "absolute",
      width: "786px",
      height: "fit-content",
      left: isCollapsed ? "336px" : "496px",
      top: "324px",
      background: "#FFFFFF",
      boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
      borderRadius: "6px",
    },
    filterButton: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      padding: "8px 12px",
      gap: "8px",
      width: "115px",
      height: "36px",
      left: "268px",
      top: "220px",
      background: "#FFFFFF",
      border: "1px solid #EBE9F1",
      borderRadius: "6px",
      marginRight: "12px",
    },
    filterButton3: {
      padding: "4px 12px",
      gap: "10px",
      width: "56px",
      height: "28px",
      background: PRIMARY_COLOR,
      border: "1px solid #6519E1",
      boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)",
      borderRadius: "6px",
      fontFamily: "'Roboto'",
      fontStyle: "normal",
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "20px",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading2((prev) => [false, ...prev.slice(1, 4)]);

      const departmentsResponse = await SERVICES.getDepartments();
      setdepts(departmentsResponse.res);
      setIsLoading2((prev) => [prev[0], false, ...prev.slice(2, 4)]);

      setIsLoading2((prev) => [...prev.slice(0, 2), false, prev[3]]);

      const projectCategoryResponse = await SERVICES.getProjectCategories("");
      setProjectCategories(projectCategoryResponse.res);
      setIsLoading2((prev) => [...prev.slice(0, 3), false]);
    };
    fetchData();
  }, []);

  const handleFilter = (key: keyof FilterType, value: string | number) => {
    setFilter((prevFilter: FilterType) => {
      const updatedFilter = { ...prevFilter };

      if (updatedFilter[key] && updatedFilter[key].includes(value)) {
        updatedFilter[key] = updatedFilter[key].filter(
          (element) => element !== value
        );
      } else {
        updatedFilter[key] = [...(updatedFilter[key] || []), value];
      }
      console.log(updatedFilter);

      return updatedFilter;
    });
  };

  const filterSize = () => {
    return (
      filter.budgetCategory.length + filter.cat.length + filter.dept.length
    );
  };

  return (
    <>
      <div
        className="d-flex flex-row justify-content-between"
        style={{
          marginTop: "8px",
          marginBottom: "24px",
          marginLeft: "32px",
          marginRight: "32px",
        }}
      >
        <div className="d-flex flex-row">
          {/* Searchbar */}
          <TFSearchBar
            placeholder={"Projects"}
            searchFunc={[value, setValue]}
            style={{ "margin-right": "12px" }}
            apiFunc={[api, setApi]}
          />

          {/* Filter */}
          <Button
            className="d-flex flex-row align-items-center"
            style={{
              backgroundColor: filterSize() > 0 ? "#DBDBF4" : "white",
              marginRight: "12px",
            }}
            onClick={() => setShow(true)}
          >
            <img src={filterIcon} alt="Filter Icon" />
            <p
              style={{
                fontStyle: "normal",
                fontWeight: 400,
                fontSize: "14px",
                color: "#0A0A0A",
                margin: "0",
              }}
            >
              Filters{filterSize() > 0 ? `/ ${filterSize()}` : ""}
            </p>
            {filterSize() > 0 ? (
              <></>
            ) : (
              <FontAwesomeIcon icon={faChevronDown} color="#70757A" />
            )}
          </Button>
          <Modal
            show={show}
            onHide={() => setShow(false)}
            style={styles.filterModal}
            dialogClassName="filter-dialog"
            backdropClassName="filter-backdrop"
            animation={false}
          >
            <div
              style={{
                width: "786px",
                height: "356px",
                boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
                borderRadius: "6px",
              }}
            >
              <div
                className="d-flex flex-row justify-content-between align-items-center"
                style={{ margin: "16px 30px 20px 20px" }}
              >
                <p className="filter-modal-heading">Filters</p>
                <div className="d-flex align-items-center">
                  <Button
                    style={{
                      fontFamily: "'Roboto'",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "14px",
                      backgroundColor: "white",
                      border: "none",
                      color: PRIMARY_COLOR,
                      marginRight: "32px",
                    }}
                    disabled={filterSize() === 0}
                    onClick={() => {
                      setFilter({ dept: [], cat: [], budgetCategory: [] });
                      setprevFilter({ dept: [], cat: [], budgetCategory: [] });
                      setApi(api + 1);
                      setShow(false);
                    }}
                  >
                    Clear All
                  </Button>
                  <FontAwesomeIcon
                    icon={faX}
                    style={{ height: "9px", cursor: "pointer" }}
                    color={PRIMARY_COLOR}
                    onClick={() => {
                      setFilter(prevFilter);
                      setShow(false);
                    }}
                  />
                </div>
              </div>

              <div
                className="d-flex flex-row justify-content-between"
                style={{ marginLeft: "20px", marginRight: "20px" }}
              >
                <div className="filter-container filter-subcontainer">
                  <p className="filter-subheading">
                    Budget Category{" "}
                    {filter.budgetCategory.length === 0
                      ? ""
                      : `/${filter.budgetCategory.length}`}
                  </p>

                  {isLoading2[0] ? (
                    <LoadingSpinner />
                  ) : (
                    <>
                      <div
                        style={{
                          backgroundColor: filter.budgetCategory.includes(
                            "Design"
                          )
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        className="filter-sub-subcontainer"
                        onClick={() => handleFilter("budgetCategory", "Design")}
                      >
                        <p className="filter-body-text">Design</p>
                      </div>
                      <div
                        style={{
                          backgroundColor: filter.budgetCategory.includes(
                            "Construction"
                          )
                            ? "#DBDBF4"
                            : "#F7F7F9",
                        }}
                        className="filter-sub-subcontainer"
                        onClick={() =>
                          handleFilter("budgetCategory", "Construction")
                        }
                      >
                        <p className="filter-body-text">Construction</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="filter-container filter-subcontainer">
                  <p className="filter-subheading">
                    Department{" "}
                    {filter.dept.length === 0 ? "" : `/${filter.dept.length}`}
                  </p>
                  {isLoading2[1] ? (
                    <LoadingSpinner />
                  ) : (
                    depts.map((e) => {
                      return (
                        <div
                          style={{
                            backgroundColor: filter.dept.includes(
                              e.Department_ID
                            )
                              ? "#DBDBF4"
                              : "#F7F7F9",
                          }}
                          className="filter-sub-subcontainer"
                          onClick={() => handleFilter("dept", e.Department_ID)}
                        >
                          <p className="filter-body-text">{e.Department}</p>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="filter-container filter-subcontainer">
                  <p className="filter-subheading">
                    Project Category{" "}
                    {filter.cat.length === 0 ? "" : `/${filter.cat.length}`}
                  </p>
                  {isLoading2[2] ? (
                    <LoadingSpinner />
                  ) : (
                    projectCategories.map((e) => {
                      return (
                        <div
                          style={{
                            backgroundColor: filter.cat.includes(
                              e.Project_Cat_ID
                            )
                              ? "#DBDBF4"
                              : "#F7F7F9",
                          }}
                          className="filter-sub-subcontainer"
                          onClick={() => handleFilter("cat", e.Project_Cat_ID)}
                        >
                          <p className="filter-body-text">
                            {e.Project_Category}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              <div
                className="d-flex flex-row justify-content-end"
                style={{
                  marginLeft: "20px",
                  marginRight: "20px",
                  marginTop: "20px",
                }}
              >
                <TFButton
                  label="Filter"
                  style={styles.filterButton3}
                  handleClick={() => {
                    setprevFilter(filter);
                    setApi(api + 1);
                    setShow(false);
                  }}
                />
              </div>
            </div>
          </Modal>

          <TFSelect
            value={year}
            onChange={(_name: string, value: string) => setYear(value)}
            options={[
              { label: "2021", value: "2021" },
              { label: "2022", value: "2022" },
              { label: "2023", value: "2023" },
              { label: "2024", value: "2024" },
            ]}
          />
        </div>
        <div>
          <TFButton
            label="Add Budget"
            icon={ICONS.PLUS_WHITE}
            handleClick={() => setShowAdd(true)}
            variant={"primary"}
          />
        </div>
      </div>

      {showAdd && (
        <AddBudget
          show={showAdd}
          onHide={() => setShowAdd(false)}
          setApi={setApi}
          cityId={cityId}
        />
      )}
    </>
  );
};

export default SearchFilter;
