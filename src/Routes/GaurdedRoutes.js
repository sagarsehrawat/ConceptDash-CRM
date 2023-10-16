import React, { useEffect, useState } from "react";
import SERVICES from "../services/Services";
import { Navigate, Outlet } from "react-router-dom";

const GaurdedRoutes = ({serverStatus}) => {
//   const [serverStatus, setServerStatus] = useState(null);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await SERVICES.serverStatus();

//         if (res === "Hello World!") {
//           setServerStatus("up");
//         } else {
//           throw "Server did not respond!";
//         }
//       } catch (error) {
//         console.log("error", error);
//         setServerStatus("down");
//       }
//     };
//     fetchData();
//   }, []);
//   if(serverStatus===null){
//     return <div>Loading</div>
//   }

  return serverStatus === "up" ?  <Outlet /> : <Navigate to="/server-down" />;
};

export default GaurdedRoutes;
