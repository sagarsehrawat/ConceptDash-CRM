import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { PRIMARY_COLOR } from "../../../../../Main/Constants/Constants";
import SearchFilter from "../SearchFilter/SearchFilter";
import Pages from "../Pages/Pages";
import Table from "../Table/Table";
import TrackingTable from "../Table/TrackingTable";
import HeaderCards from "../HeaderCards/HeaderCards";
import RFPMaps from "../RFPMaps/RFPMaps";

interface FilterType {
  dept: (string | number)[];
  cat: (string | number)[];
  city: (string | number)[];
  manager: (string | number)[];
  source: (string | number)[];
}

type Props = {
  api: number;
  setApi: Function;
  currPage: number;
  setPages: Function;
  filter: FilterType;
  search: string;
  isCollapsed: boolean;
  setFilter: Function;
  setValue: Function;
  value: string;
  pages: number;
  setcurrPage: Function;
};

const Tabs = ({
  setcurrPage,
  pages,
  search,
  currPage,
  setPages,
  api,
  setApi,
  value,
  setValue,
  filter,
  setFilter,
  isCollapsed,
}: Props) => {
  const [value1, setvalue1] = useState<string>("1");
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: any
  ) => {
    console.log(event);
    setvalue1(newValue);
  };
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <>
      {expand && value1 === "1" ? (
        <RFPMaps expand={expand} setExpand={setExpand} />
      ) : (
        <div style={{ marginTop: "8px" }}>
          <Box
            sx={{
              width: "100%",
              typography: "body1",
              float: "left",
            }}
            style={{ margin: "0" }}
          >
            <TabContext value={value1}>
              <div
                className="d-flex justify-content-between"
                style={{ alignItems: "center" }}
              >
                <div className="d-flex flex-column gap-4">
                  <Box sx={{}}>
                    <TabList
                      centered
                      onChange={handleChange}
                      aria-label=""
                      TabIndicatorProps={{
                        style: {
                          backgroundColor: PRIMARY_COLOR,
                        },
                      }}
                      sx={{
                        //   marginRight: "400px",
                        marginLeft: "20px",
                        float: "left",
                        height: "57px",
                      }}
                    >
                      <Tab
                        style={{
                          color: value1 === "1" ? PRIMARY_COLOR : "#70757A",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          paddingBottom: 0,
                          fontSize: "18px",
                          textTransform: "capitalize",
                        }}
                        sx={{ fontSize: 12 }}
                        label="Request for proposals (RFP’s)"
                        value="1"
                      />

                      <Tab
                        style={{
                          color: value1 === "2" ? PRIMARY_COLOR : "#70757A",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          paddingBottom: 0,
                          fontSize: "18px",
                          textTransform: "capitalize",
                        }}
                        sx={{ fontSize: 12 }}
                        label="Tracking RFP’s"
                        value="2"
                      />
                    </TabList>
                  </Box>
                  <HeaderCards />
                </div>
                {value1 === "1" && (
                  <div style={{ marginRight: "32px" }}>
                    <RFPMaps expand={expand} setExpand={setExpand} />
                  </div>
                )}
              </div>

              <TabPanel value="1" style={{ padding: "0px" }}>
                <div style={{ width: "100%", float: "left" }}>
                  <SearchFilter
                    api={api}
                    setApi={setApi}
                    value={value}
                    setValue={setValue}
                    filter={filter}
                    setFilter={setFilter}
                    isCollapsed={isCollapsed}
                  />
                  <Table
                    api={api}
                    setApi={setApi}
                    currPage={currPage}
                    setPages={setPages}
                    filter={filter}
                    search={search}
                    isCollapsed={isCollapsed}
                  />
                  <Pages
                    pages={pages}
                    currPage={currPage}
                    setcurrPage={setcurrPage}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2" style={{ padding: "0px" }}>
                <div style={{ width: "100%", float: "left" }}>
                  <SearchFilter
                    api={api}
                    setApi={setApi}
                    value={value}
                    setValue={setValue}
                    filter={filter}
                    setFilter={setFilter}
                    isCollapsed={isCollapsed}
                  />
                  <TrackingTable
                    api={api}
                    setApi={setApi}
                    filter={filter}
                    search={search}
                    isCollapsed={isCollapsed}
                  />
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      )}
    </>
  );
};

export default Tabs;
