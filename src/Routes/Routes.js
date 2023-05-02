import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../Components/Login/Login'
import Dashboard from '../Components/Dashboards/Dashboard';
import NewUser from '../Components/Login/NewUser';
import ForgotPassword from '../Components/Login/ForgotPassword';
import EnterOtp from '../Components/Login/EnterOtp';
import ResetPassword from '../Components/Login/ResetPassword';

const AllRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />
                    <Route exact path='/forgotPassword' element={<ForgotPassword />} />
                    <Route exact path='/otp' element={<EnterOtp />} />
                    <Route exact path='/resetPassword' element={<ResetPassword />} />

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