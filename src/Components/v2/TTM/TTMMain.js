import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import taskList from "../../../Images/TaskList.svg";
import timesheet from "../../../Images/Timesheet.svg";
import TTMTable from './TTMTable';
import Timeline from './Timeline';
import { PRIMARY_COLOR } from "../../Constants/Constants";

function TTMMain() {
    const [value1, setValue1] = useState("2");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  return (
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
                    color: value1 == 1 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="TTM"
                  value="1"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={taskList}
                    />
                  }
                />
                
                <Tab
                  style={{
                    color: value1 == 2 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 12 }}
                  label="Timeline"
                  value="2"
                  icon={
                    <img
                      style={{ marginRight: "6px", marginTop: "6px" }}
                      src={timesheet}
                    />
                  }
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                <TTMTable/>
              </div>
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left', }}>
                <Timeline />
              </div>
            </TabPanel>
            
          </TabContext>
        </Box>
      </div>
  )
}

export default TTMMain