import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Login from '../Components/Login/Login'
import Admin from '../Components/Dashboards/Admin/Dashboard'
import Manager from '../Components/Dashboards/Manager/Dashboard'
import Supplier from '../Components/Dashboards/Supplier/Suppliers'
import ProtectedRoutes from './ProtectedRoutes';
import Logistics from '../Components/Dashboards/Logistics/Logistics'
import IT from '../Components/Dashboards/IT/It'
import Sales from '../Components/Dashboards/Sales/Sales';
import '../Components/Shipper-Tables/Tables'
import Tables from '../Components/Tables/Tables';
import Engineer from '../Components/Dashboards/Engineer/Engineer';
import EmployeeForm from '../Components/Form/EmployeeForm';
import ShipperForm from '../Components/Form/ShipperForm';
import SupplierForm from '../Components/Form/SupplierForm';
import CustomerForm from '../Components/Form/CustomerForm';
import OrderForm from '../Components/Form/OrderForm';
import ProjectForm from '../Components/Form/ProjectForm';
import InvoiceForm from '../Components/Form/InvoiceForm';
import QuoteForm from '../Components/Form/QuoteForm';
import CompanyForm from '../Components/Form/CompanyForm';
import AssetForm from '../Components/Form/AssetForm';
import SoftwareForm from '../Components/Form/SoftwareForm';
import JobTitle from '../Components/Form/JobTitle';
import Timesheet from '../Components/Form/Timesheet';
import AddTask from '../Components/Form/AddTask';
import UpdateEmployeeForm from '../Components/Form/UpdateEmployeeForm';
import UpdateTask from '../Components/Form/UpdateTask';
import ProjectUpdate from '../Components/Update/ProjectUpdate';
import UpdateProjectForm from '../Components/Form/UpdateProjectForm';

const AllRoutes = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Login />} />

                    {/*******************Protected Routes******** */}
                    <Route path='/' element={<ProtectedRoutes />} >
                        <Route exact path='/logistics' element={<Logistics />} />
                        <Route exact path='/admin' element={<Admin />} />
                        <Route exact path='/manager' element={<Manager />} />
                        <Route exact path='/suppliers' element={<Supplier />} />
                        <Route exact path='/employeeform' element={<EmployeeForm />} />
                        <Route exact path='/shipperform' element={<ShipperForm />} />
                        <Route exact path='/supplierform' element={<SupplierForm />} />
                        <Route exact path='/customerform' element={<CustomerForm />} />
                        <Route exact path='/addProject' element={<ProjectForm />} />
                        <Route exact path='/generateInvoice' element={<InvoiceForm />} />
                        <Route exact path='/addquote' element={<QuoteForm />} />
                        <Route exact path='/orderform' element={<OrderForm />} />
                        <Route exact path='/allUsers' element={<Tables />} />
                        <Route exact path='/getAllSales' element={<Sales />} />
                        <Route exact path='/engineers' element={<Engineer />} />
                        <Route exact path='/it' element={<IT />} />
                        <Route exact path='/companyform' element={<CompanyForm />} />
                        <Route exact path='/assetform' element={<AssetForm />} />
                        <Route exact path='/addsoftware' element={<SoftwareForm />} />
                        <Route exact path='/jobTitleform' element={<JobTitle />} />
                        <Route exact path='/jobTitleform' element={<JobTitle />} />
                        <Route exact path='/addtimesheet' element={<Timesheet />} />
                        <Route exact path='/addTask' element={<AddTask />} />
                        <Route exact path='/updateEmployee' element={<UpdateEmployeeForm />} />
                        <Route exact path='/updateTask' element={<UpdateTask />} />
                        <Route exact path='/updateProject' element={<ProjectUpdate />} />
                        <Route exact path='/updateProjectForm' element={<UpdateProjectForm />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes