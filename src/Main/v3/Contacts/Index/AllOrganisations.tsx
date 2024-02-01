
import React, {useState } from "react";
import Organisations from '../Pages/Organisations'
import Clients from "../Pages/Clients";
import Consultants from "../Pages/Consultants";
import Partners from "../Pages/Partners";
import SubConsultants from "../Pages/SubConsultants";
import Tabs from "../Tabs/Tabs";
type Props ={
  variant:"org"|"people"
  setnav: Function
  setOrganizationData: Function
}
const AllOrganisations = (props: Props) => {
  
const [selectedTab, setselectedTab] = useState<string>(props.variant ==="org"? "Organizations": "People");


  return (
    <div style ={{background: "#F8FAFB"}}>
      <Tabs
        variant={props.variant}
        selectedTab={selectedTab}
        setselectedTab={setselectedTab}
      />
                     {selectedTab === "Organizations" && <Organisations  name="org" setValue1={setselectedTab} setnav={props.setnav} setOrganizationData={props.setOrganizationData}/>}
                     {selectedTab === "Clients" &&  <Clients case={props.variant} setnav={props.setnav} setOrganizationData={props.setOrganizationData}/>}
                     {selectedTab === "Consultants" &&  <Consultants case={props.variant} setnav={props.setnav} setOrganizationData={props.setOrganizationData}/>}
                     {selectedTab === "Partners" && <Partners case={props.variant} setnav={props.setnav} setOrganizationData={props.setOrganizationData} />}
                     {selectedTab === "SubConsultants" && <SubConsultants case={props.variant} setnav={props.setnav} setOrganizationData={props.setOrganizationData} />}

    </div>
  )
}

export default AllOrganisations