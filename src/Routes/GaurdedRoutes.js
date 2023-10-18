import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SERVICES from "../services/Services";

const GaurdedRoutes = () => {
  const [serverStatus, setServerStatus] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SERVICES.serverStatus();

        if (res === "Hello World!") {
          setServerStatus("up");
        } else {
            throw "Server did not respond!";
        }
    } catch (error) {
          setServerStatus("down");
        }
    };
    fetchData();
}, []);

  if(serverStatus===null){
    return <></>
  }
  return serverStatus === "up" ?  <Outlet /> : <Navigate to="/server-down" />;
};

export default GaurdedRoutes;
