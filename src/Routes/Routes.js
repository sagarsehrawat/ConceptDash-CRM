import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import Login from '../Components/Login/Login'
import Admin from '../Components/Dashboards/Admin/Dashboard'
import Manager from '../Components/Dashboards/Manager/Dashboard'
import IT from '../Components/Dashboards/IT/It'
import Engineer from '../Components/Dashboards/Engineer/Engineer';
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
import UpdateCompany from '../Components/Form/UpdateCompany';
import BudgetsForm from '../Components/Form/BudgetsForm';
import UpdateBudget from '../Components/Form/UpdateBudget';
import RFPform from '../Components/Form/RFPform';
import UpdateRFP from '../Components/Form/UpdateRFP';
import ProposalForm from '../Components/Form/ProposalForm';
import UpdateProposal from '../Components/Form/UpdateProposal';
import UpdateCustomer from '../Components/Form/UpdateCustomer';
import RFPUpdate from '../Components/Update/RFPUpdate';
import BudgetUpdate from '../Components/Update/BudgetUpdate';
import ProposalsUpdate from '../Components/Update/ProposalsUpdate';
import AddMyTask from '../Components/Form/AddMyTask';
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
                        <Route exact path='/manager' element={<Manager />} />
                        <Route exact path='/customerform' element={<CustomerForm />} />
                        <Route exact path='/addProject' element={<ProjectForm />} />
                        <Route exact path='/generateInvoice' element={<InvoiceForm />} />
                        <Route exact path='/addquote' element={<QuoteForm />} />
                        <Route exact path='/orderform' element={<OrderForm />} />
                        <Route exact path='/engineers' element={<Engineer />} />
                        <Route exact path='/it' element={<IT />} />
                        <Route exact path='/companyform' element={<CompanyForm />} />
                        <Route exact path='/assetform' element={<AssetForm />} />
                        <Route exact path='/addsoftware' element={<SoftwareForm />} />
                        <Route exact path='/jobTitleform' element={<JobTitle />} />
                        <Route exact path='/addtimesheet' element={<Timesheet />} />
                        <Route exact path='/addTask' element={<AddTask />} />
                        <Route exact path='/addMyTask' element={<AddMyTask />} />
                        <Route exact path='/updateEmployee' element={<UpdateEmployeeForm />} />
                        <Route exact path='/updateTask' element={<UpdateTask />} />
                        <Route exact path='/updateProject' element={<ProjectUpdate />} />
                        <Route exact path='/updateProjectForm' element={<UpdateProjectForm />} />
                        <Route exact path='/updateCompany' element={<UpdateCompany />} />
                        <Route exact path='/budgetForm' element={<BudgetsForm />} />
                        <Route exact path='/updateBudget' element={<UpdateBudget />} />
                        <Route exact path='/addRFP' element={<RFPform />} />
                        <Route exact path='/updateRFP' element={<UpdateRFP />} />
                        <Route exact path='/RFPtable' element={<RFPUpdate />} />
                        <Route exact path='/Budgettable' element={<BudgetUpdate />} />
                        <Route exact path='/Proposaltable' element={<ProposalsUpdate />} />
                        <Route exact path='/addProposal' element={<ProposalForm />} />
                        <Route exact path='/updateProposal' element={<UpdateProposal />} />
                        <Route exact path='/customerUpdate' element={<UpdateCustomer />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default AllRoutes