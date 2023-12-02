import React, {useState} from 'react'
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import taskList from "../../../Images/TaskList.svg";
import timesheet from "../../../Images/Timesheet.svg";
import TTMTable from './tables/TTMTable';
import Timeline from './tables/Timeline';
import { PRIMARY_COLOR } from "../../../Main/Constants/Constants";
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function TTMMain(props) {
    const {setshowTTM, Name, Id} = props
    const [value1, setValue1] = useState("1");
  const handleChange = (event, newValue) => {
    setValue1(newValue);
  };
  const styles={
    heading: {
      color: "var(--Black-text, #3D424F)",
      fontFamily: "Roboto",
      fontSize: "18px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "28px",
      marginLeft:'12px'
    }
  }
  return (
      <div style={{ marginTop: "8px" }}>
        <div style={{display:'flex', flexDirection:'row'}}>
          
          <FontAwesomeIcon icon={faArrowLeft} color="#70757A" style={{ borderRadius:'20px', padding:'5px', backgroundColor:'#DBDBF4', border:'1px solid #DBDBF4', marginLeft: "16px", cursor: "pointer" }} onClick={()=>setshowTTM(false)}/>
          <div style={styles.heading}>TTM : {Name}</div>
        </div>
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
              <div style={{ width: '100%', float: 'left', marginTop: '20px' }}>
                <TTMTable Name={Name} Id={Id}/>
              </div>
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left', }}>
                <Timeline Name={Name} Id={Id}/>
              </div>
            </TabPanel>
            
          </TabContext>
        </Box>
      </div>
  )
}

export default TTMMain
