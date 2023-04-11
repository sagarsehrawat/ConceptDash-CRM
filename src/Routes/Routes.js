import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../Components/Login/Login'
import Dashboard from '../Components/Dashboards/Dashboard';

const AllRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />

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