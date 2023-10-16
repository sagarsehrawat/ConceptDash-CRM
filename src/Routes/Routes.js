import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../Main/Login/Login'
import Dashboard from '../Main/Dashboards/Dashboard';
import NewUser from '../Main/Login/NewUser';
import ForgotPassword from '../Main/Login/ForgotPassword';
import EnterOtp from '../Main/Login/EnterOtp';
import ResetPassword from '../Main/Login/ResetPassword';
import PasswordChanged from '../Main/Login/PasswordChanged';
import LinkExpired from '../Main/Login/LinkExpired';
import TokenRegenerated from '../Main/Login/TokenRegenerated';
import Error404 from '../Main/Login/Error404';
import GaurdedRoutes from './GaurdedRoutes';
import DownPage from '../pages/server-down-page/DownPage';
import SERVICES from '../services/Services';

const AllRoutes = () => {
    
  const [serverStatus, setServerStatus] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await SERVICES.serverStatus();
        console.log('res', res)

        if (res === "Hello World!") {
          setServerStatus("up");
        } else {
          throw "Server did not respond!";
        }
      } catch (error) {
        setServerStatus("down");
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  if(serverStatus===null){
    return <div>Loading</div>
  }

    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<GaurdedRoutes serverStatus={serverStatus}/>}>
                        <Route exact path='/' element={<Login />} />
                        <Route exact path='/server-down' element={<DownPage />} />
                        <Route exact path='/passwordChanged' element={<PasswordChanged />} />
                        <Route exact path='/forgotPassword' element={<ForgotPassword />} />
                        <Route exact path='/otp' element={<EnterOtp />} />
                        <Route exact path='/resetPassword' element={<ResetPassword />} />
                        <Route exact path='/set/credentials' element={<NewUser />} />
                        <Route exact path='/link/expired' element={<LinkExpired />} />
                        <Route exact path='/regenerated/token' element={<TokenRegenerated />} />
                        <Route exact path='/404' element={<Error404 />} />

                        {/*******************Protected Routes******** */} 
                        <Route path='/' element={<ProtectedRoutes />} >
                            <Route exact path='/admin' element={<Dashboard />} />
                            <Route exact path='/engineers' element={<Dashboard />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes