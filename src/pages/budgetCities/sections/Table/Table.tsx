import React, { useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { initCities, selectCities } from "../../../../redux/slices/budgetSlice";
// import SERVICES from "../../../../services/Services";
import LoadingSpinner from "../../../../Main/Loader/Loader";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

type Props = {
  search: string;
  isCollapsed: boolean;
  setCityId: Function;
  isLoading: boolean;
  cities: City[];
};

const Table = ({ search, setCityId, isLoading, cities }: Props) => {
  const tableRef = useRef(null);

  return isLoading ? (
    <div className="w-100" style={{ height: "492px" }}>
      <LoadingSpinner />
    </div>
  ) : (
    <div className="table-wrapper" ref={tableRef}>
      <table
        className="w-100"
        style={{ borderCollapse: "separate" }}
        ref={tableRef}
      >
        <TableHeader />
        {cities.map((city) => {
          if (city.city?.toLowerCase().startsWith(search.toLowerCase())) {
            return (
              <TableRow city={city} tableRef={tableRef} setCityId={setCityId} />
            );
          }
          return <></>;
        })}
      </table>
    </div>
  );
};

export default Table;
