
import React, { useState } from "react";
import Tabs from "../Tabs/Tabs";
import Consultants from "../Pages/Consultants";
import Partners from "../Pages/Partners";
import Clients from "../Pages/Clients";
import People from "../Pages/People";
import SubConsultants from "../Pages/SubConsultants";
type Props ={
  variant: "org" | "people"
  setContactPersonData: Function
  setnav: Function
}
const AllPeople = (props: Props) => {

  const [selectedTab, setselectedTab] = useState<string>(props.variant ==="org"? "Organizations": "People");

  return (
    <div style ={{ background: "#F8FAFB"}}>
      <Tabs
        variant={props.variant}
        selectedTab={selectedTab}
        setselectedTab={setselectedTab}
      />
                     {selectedTab === "People" && <People name="People" setValue1={setselectedTab} setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
                     {selectedTab === "Clients" &&  <Clients case={props.variant} setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
                     {selectedTab === "Consultants" &&  <Consultants case={props.variant} setnav={props.setnav}  setContactPersonData={props.setContactPersonData}/>}
                     {selectedTab === "Partners" && <Partners case={props.variant} setnav={props.setnav} setContactPersonData={props.setContactPersonData}/>}
                     {selectedTab === "SubConsultants" && <SubConsultants case={props.variant} setnav={props.setnav}  setContactPersonData={props.setContactPersonData}/>}

    </div>
  )
}

export default AllPeople