import React, { useEffect, useState } from "react";
import Header from "./sections/Header/Header";
import HeaderCards from "./sections/Header-Cards/HeaderCards";
import SearchFilter from "./sections/SearchFilter/SearchFilter";
import Table from "./sections/Table/Table";
import Budgets from "../budgets/Index";
import MapView from "./mapView/MapView";
import { useDispatch, useSelector } from "react-redux";
import { initCities, selectCities } from "../../redux/slices/budgetSlice";
import SERVICES from "../../services/Services";
type Props = {
  isCollapsed: boolean;
};
const Index = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(true);
  const [cityId, setCityId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await SERVICES.getBudgetCities();

        dispatch(initCities(response.res));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return cityId === null ? (
    <>
      {expand ? (
        <MapView
          expand={expand}
          setExpand={setExpand}
          citiesMain={cities}
          isLoading={isLoading}
        />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Header />
              <HeaderCards />
              <SearchFilter value={value} setValue={setValue} />
            </div>
            <div style={{ marginRight: "32px" }}>
              <MapView
                expand={expand}
                setExpand={setExpand}
                citiesMain={cities}
                isLoading={isLoading}
              />
            </div>
          </div>
          <Table
            search={value}
            isCollapsed={props.isCollapsed}
            setCityId={setCityId}
            isLoading={isLoading}
            cities={cities}
          />
        </>
      )}
    </>
  ) : (
    <Budgets
      cityId={cityId}
      setCityId={setCityId}
      isCollapsed={props.isCollapsed}
    />
  );
};

export default Index;
