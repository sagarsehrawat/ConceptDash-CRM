import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import taskList from "../../Images/TaskList.svg";
import timesheet from "../../Images/Timesheet.svg";
import report from "../../Images/Report.svg";
import TimeSheet from "../TimeSheet/TimeSheet";

const styles = {
  heading: {
    width: "48px",
    height: "28px",
    marginLeft: "32px",
    marginTop: "24px",
    fontFamily: "'Roboto'",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "28px",
    color: "#0A0A0A",
  },
};
function Tasks() {
  const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  return (
    <div>
      <div style={styles.heading}>Tasks</div>
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
                    backgroundColor: "#6519E1",
                  },
                }}
                sx={{
                  //   marginRight: "400px",
                  marginLeft: "20px",
                  float: 'left',
                  height: '57px'
                }}
              >
                <Tab
                  style={{
                    color: value1 == 1 ? "#6519E1" : "#70757A",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 0
                  }}
                  sx={{ fontSize: 12 }}
                  label="Task List"
                  value="1"
                  icon={<img style={{ marginRight: '6px', marginTop: '6px' }} src={taskList} />}
                />
                <Tab
                  style={{
                    color: value1 == 2 ? "#6519E1" : "#70757A",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 0
                  }}
                  sx={{ fontSize: 12 }}
                  label="Task Board"
                  value="2"
                  icon={<img style={{ marginRight: '6px', marginTop: '6px' }} src={timesheet} />}
                />
                <Tab
                  style={{
                    color: value1 == 3 ? "#6519E1" : "#70757A",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 0
                  }}
                  sx={{ fontSize: 12 }}

                  label="Timesheet"
                  value="3"
                  icon={<img style={{ marginRight: '6px', marginTop: '6px' }} src={timesheet} />}
                />
                <Tab
                  style={{
                    color: value1 == 4 ? "#6519E1" : "#70757A",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingBottom: 0
                  }}
                  sx={{ fontSize: 12 }}
                  label="Report/Overview"
                  value="4"
                  icon={<img style={{ marginRight: '6px', marginTop: '6px' }} src={report} />}
                />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Tasks
              </div>
            </TabPanel>
            <TabPanel value="2">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Board
              </div>
            </TabPanel>
            <TabPanel value="3">
                <div style={{width: '100%', float:'left',}}>
                    <TimeSheet />
                </div>
            </TabPanel>
            <TabPanel value="4">
              <div style={{ width: '100%', float: 'left', marginLeft: '5px', marginTop: '20px' }}>
                Reports
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </div>
  );
}

export default Tasks;
