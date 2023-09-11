import React from 'react'
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

const AllRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />
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
                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes