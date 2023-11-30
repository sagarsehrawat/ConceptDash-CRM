import React, { useEffect, useState } from 'react'
import './AddProject.css'
import headerIcon from '../../../Images/Projects.svg';
import tick from '../../../assets/icons/Primary_Color_Tick.svg'
import IndependentProject from './types/IndependentProject';
import RosterProject from './types/RosterProject';
import ChildProject from './types/ChildProject';
import FormUtils from '../../../utils/FormUtils';
import Tasklist from '../sections/Tasklist/Tasklist';
import TaskListUtils from '../utils/TaskListUtils';
import TFButton from '../../../components/ui/TFButton/TFButton';
import SERVICES from '../../../services/Services';
import LoadingSpinner from '../../../Main/Loader/Loader';
import Utils from '../../../utils/Utils';
import { useDispatch } from 'react-redux';
import { showErrorModal, showSuccessModal } from '../../../redux/slices/alertSlice';

const FORM = {
    projectType: "Independent Project",
    department: "",
    departmentId: '',
    projectCategory: '',
    projectCategoryId: '',
    projectValue: '',
    projectName: '',
    city: '',
    cityId: '',
    status: 'Not Started',
    dueDate: '',
    followUpDate: '',
    projectManager: '',
    projectManagerId: '',
    teamMembers: [],
    projectDescription: '',
    contractAcceptedDate: '',
    contractExpiryDate: '',
    roster: '',
    rosterId: '',
    clientResponse: 'Waiting',
    requestSentTo: '',
    requestRecievedOn: '',
    priority: 'Medium',
    designChecklist: [],
    designInfo: [],
}

const AddProject = ({ onHide, api, setApi }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(FORM)
    const formUtils = FormUtils(setForm)

    const [taskList, setTaskList] = useState([]);
    const [openTasks, setOpenTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [rosters, setRosters] = useState([]);
    const [projectCategories, setProjectCategories] = useState([]);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const departmentsResponse = await SERVICES.getDepartments();
                setDepartments(Utils.convertToTypeaheadOptions(departmentsResponse.res, 'Department', 'Department_ID'));

                const projectManagersResponse = await SERVICES.getManagers();
                setManagers(Utils.convertToTypeaheadOptions(projectManagersResponse.res, 'Full_Name', 'Employee_ID'));

                const employeesResponse = await SERVICES.getEmployeesList();
                setEmployees(Utils.convertToTypeaheadOptions(employeesResponse.res, 'Full_Name', 'Employee_ID'));

                const citiesResponse = await SERVICES.getCities();
                setCities(Utils.convertToTypeaheadOptions(citiesResponse.res, 'City', 'City_ID'));

                const rosterResponse = await SERVICES.getRostersList();
                setRosters(Utils.convertToTypeaheadOptions(rosterResponse.res, 'project_name', 'project_id'));
            } catch (error) {
                console.log(error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const getProjectCategories = async () => {
            try {
                const projectCatoriesResponse = await SERVICES.getProjectCategories(form.departmentId);
                setProjectCategories(Utils.convertToTypeaheadOptions(projectCatoriesResponse.res, 'Project_Category', 'Project_Cat_ID'));
            } catch (error) {
                console.log(error);
            }
        }
        getProjectCategories();
    }, [form.departmentId])


    const resetForm = (val) => {
        setForm({
            ...FORM,
            projectType: val,
        });
    }

    const handleForm = (key, value) => {
        console.log(key, value);

        switch (key) {
            case 'teamMembers':
                formUtils.multiSelectForm(key, value);
                break;
            case 'projectType':
                formUtils.radioButtonForm(key, value);
                resetForm(value)
                break;
            case 'designChecklist':
            case 'designInfo':
                formUtils.checkboxForm(key, value)
                break;
            case 'department':
                setProjectCategories([]);
                const tasks = TaskListUtils.taskListFormatter(value.label);
                setTaskList(tasks);
                setOpenTasks(tasks.map(task => task.taskId));
            case 'roster':
            case 'projectCategory':
            case 'projectManager':
            case 'city':
                formUtils.typeaheadForm(key, value);
                break;
            default:
                formUtils.typeInputForm(key, value);
                break;
        }
    }

    const handleProjectType = (projectType) => {
        switch (projectType) {
            case 'Independent Project':
                return <IndependentProject form={form} handleForm={handleForm} departments={departments} cities={cities} projectCategories={projectCategories} managers={managers} employees={employees} />
            case 'Roster Project':
                return <RosterProject form={form} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
            case 'Child Project':
                return <ChildProject form={form} handleForm={handleForm} departments={departments} cities={cities} projectCategories={projectCategories} rosters={rosters} managers={managers} employees={employees} />
            default:
                return <></>
        }
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await SERVICES.addProject(
                form.projectName,
                form.projectType,
                form.departmentId,
                form.projectValue,
                form.projectCategoryId,
                form.cityId,
                form.status,
                form.dueDate,
                form.followUpDate,
                form.projectManagerId,
                form.teamMembers,
                form.projectDescription,
                form.contractAcceptedDate,
                form.contractExpiryDate,
                form.rosterId,
                form.clientResponse,
                form.requestSentTo,
                form.requestRecievedOn,
                form.priority,
                form.designChecklist,
                form.designInfo,
                taskList
            );
            setApi(api + 1);
            onHide();
            dispatch(showSuccessModal('Project Added!'))
        } catch (error) {
            console.log(error);
            dispatch(showErrorModal('Something went wrong!'))
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div
                className='tf-modal-backdrop d-flex justify-content-end align-items-start'
            >
                <div className='project-modal'>
                    {
                        isLoading
                            ? <div className='w-100 h-100'>
                                <LoadingSpinner />
                            </div>
                            : <div className='project-modal-container'>
                                <div className='project-modal-header'>
                                    <div className='icon-container'>
                                        <img src={headerIcon} />
                                    </div>
                                    <p className='heading-2'>Create New Project</p>
                                </div>

                                <div className='d-flex justify-contents-center align-items-center w-100'>
                                    <div className={`project-type type-left ${form.projectType === 'Independent Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Independent Project') }}>
                                        {form.projectType === "Independent Project" ? <img src={tick} alt="" /> : <></>}
                                        Independent Project
                                    </div>
                                    <div className={`project-type ${form.projectType === 'Roster Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Roster Project') }}>
                                        {form.projectType === "Roster Project" ? <img src={tick} alt="" /> : <></>}
                                        Roster Project
                                    </div>
                                    <div className={`project-type type-right ${form.projectType === 'Child Project' ? 'project-type-active' : ''}`} onClick={(e) => { handleForm('projectType', 'Child Project') }}>
                                        {form.projectType === "Child Project" ? <img src={tick} alt="" /> : <></>}
                                        Child Project
                                    </div>
                                </div>

                                <form style={{ width: '100%' }}>
                                    {handleProjectType(form.projectType)}
                                </form>

                                {form.projectType !== 'Roster Project'
                                    ? <div className='w-100'>
                                        <p className="heading-2">Project Milestone and Tasks</p>
                                        <Tasklist taskList={taskList} employees={employees} setTaskList={setTaskList} openTasks={openTasks} setOpenTasks={setOpenTasks} />
                                    </div>
                                    : <></>}
                            </div>
                    }
                    <div className='project-modal-footer w-100'>
                        <TFButton
                            label='Cancel'
                            handleClick={onHide}
                            variant='secondary'
                        />
                        <TFButton
                            label='Add Project'
                            handleClick={handleSubmit}
                            variant='primary'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProject