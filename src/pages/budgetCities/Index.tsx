import React, { useState } from "react";
import Header from "./sections/Header/Header";
import HeaderCards from "./sections/Header-Cards/HeaderCards";
import SearchFilter from "./sections/SearchFilter/SearchFilter";
import Table from "./sections/Table/Table";
import Budgets from "../budgets/Index";
import MapView from "./mapView/MapView";

type Props = {
  isCollapsed: boolean;
};
const Index = (props: Props) => {
  const [value, setValue] = useState<string>("");
  const [expand, setExpand] = useState<boolean>(false);
  const [cityId, setCityId] = useState<number | null>(null);

  return cityId === null ? (
    <>
      {expand ? (
        <MapView expand={expand} setExpand={setExpand} />
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Header />
              <HeaderCards />
              <SearchFilter value={value} setValue={setValue} />
            </div>
            <div className="">
              <MapView expand={expand} setExpand={setExpand} />
            </div>
          </div>
          <Table
            search={value}
            isCollapsed={props.isCollapsed}
            setCityId={setCityId}
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
