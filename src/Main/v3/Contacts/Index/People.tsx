import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import { PRIMARY_COLOR } from "../../../Constants/Constants";
import Consultants from "../Pages/Consultants";
import Partners from "../Pages/Partners";
import Clients from "../Pages/Clients";
import People from "../Pages/People";
import SubConsultants from "../Pages/SubConsultants";
type Props ={
  setContactPersonData: Function
  setnav: Function
}
const AllPeople = (props: Props) => {
  
const [value1, setValue1] = useState("1");
const handleChange =(event: React.SyntheticEvent, value: any)=> {
  setValue1(value);
};

  return (
    <div style ={{ background: "#F8FAFB"}}>
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
                  sx={{ fontSize: 16,textTransform :"none" }}
                  label="All People"
                  value="1"
                />
                <Tab
                  style={{
                    color: value1 == 2 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 16,textTransform :"none" }}
                  label="Clients"
                  value="2"
                />
                 <Tab
                  style={{
                    color: value1 == 3 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 16,textTransform :"none" }}
                  label="Consultant"
                  value="3"
                />
                 <Tab
                  style={{
                    color: value1 == 4 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 16,textTransform :"none" }}
                  label="Partners"
                  value="4"
                />
                 <Tab
                  style={{
                    color: value1 == 5 ? PRIMARY_COLOR : "#70757A",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: 0,
                  }}
                  sx={{ fontSize: 16,textTransform :"none" }}
                  label="Sub Consultants"
                  value="5"
                />
              </TabList>
            </Box>
            <TabPanel value="1" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', }}>
              <People name="People" setValue1={setValue1} setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>
              </div>
            </TabPanel>
            <TabPanel value="2" style={{padding:'0px'}}>
            <div style={{ width: '100%', float: 'left', }}>
            <Clients case="People" setnav={props.setnav} setContactPersonData={props.setContactPersonData} setOrganizationData={null}/>
              </div>
            </TabPanel>
            <TabPanel value="3" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left', }}>
             <Consultants  case="People" setnav={props.setnav} setContactPersonData={props.setContactPersonData} setOrganizationData={null}/>
              </div>
            </TabPanel>
            <TabPanel value="4" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left' }}>
              <Partners  case="People" setnav={props.setnav} setContactPersonData={props.setContactPersonData} setOrganizationData={null}/>
              </div>
            </TabPanel>
            <TabPanel value="5" style={{padding:'0px'}}>
              <div style={{ width: '100%', float: 'left' }}>
              <SubConsultants case="People" setnav={props.setnav} setContactPersonData={props.setContactPersonData} setOrganizationData={null}/>
              </div>
            </TabPanel>
          </TabContext>
      </Box>
    </div>
  )
}

export default AllPeople