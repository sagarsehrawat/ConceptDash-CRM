import React, { useEffect, useRef, useState } from 'react'
import TFIcon from '../../../../components/ui/TFIcon/TFIcon'
import ICONS from '../../../../constants/Icons'
import LoadingSpinner from '../../../../Main/Loader/Loader'
import './ProjectDetail.css'
import TFTabGroup from '../../../../components/ui/TFTabGroup/TFTabGroup'
import FormUtils from '../../../../utils/FormUtils'
import TFTypeahead from '../../../../components/form/TFTypeahead/TFTypeahead'
import Utils from '../../../../utils/Utils'
import SERVICES from '../../../../services/Services'
import Transportation from '../../forms/department-projects/Transportation'
import Estimation from '../../forms/department-projects/Estimation'
import Default from '../../forms/department-projects/Default'
import Products from '../../forms/department-projects/Products'
import { useDispatch } from 'react-redux'
import { showErrorModal, showSuccessModal } from '../../../../redux/slices/alertSlice'
import moment from 'moment'
import Tasklist from '../Tasklist/Tasklist'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import ChildProjectList from './ChildProjectList'

type Props = {
    projectId: number;
    setProjectId: Function;
}

type ProjectForm = {
    projectName: string;
    department: string;
    departmentId: string;
    projectCategory: string;
    projectCategoryId: string;
    projectType: string;
    projectValue: string;
    city: string;
    cityId: string;
    status: string;
    dueDate: string;
    followUpDate: string;
    projectManager: string;
    projectManagerId: string;
    teamMembers: TypeaheadOptions;
    projectDescription: string;
    contractAcceptedDate: string;
    contractExpiryDate: string;
    roster: string;
    rosterId: string;
    clientResponse: string;
    requestSentTo: string;
    requestRecievedOn: string;
    priority: string;
    designChecklist: string[];
    designInfo: string[];
    childProjects: Project[];
}

const PROJECT_FORM: ProjectForm = {
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
    childProjects: []
};

const ProjectDetail = ({ projectId, setProjectId }: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [project, setProject] = useState<ProjectForm>(PROJECT_FORM);
    const [tasklist, setTasklist] = useState([]);
    const [openTasks, setOpenTasks] = useState([]);
    const [tab, setTab] = useState<number>(0);
    const [departments, setDepartments] = useState<TypeaheadOptions>([]);
    const [managers, setManagers] = useState<TypeaheadOptions>([]);
    const [employees, setEmployees] = useState<TypeaheadOptions>([]);
    const [projectCategories, setProjectCategories] = useState<TypeaheadOptions>([]);
    const [cities, setCities] = useState<TypeaheadOptions>([]);
    const formUtils = FormUtils(setProject);
    const dispatch = useDispatch();

    const tabRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

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

                const projectResponse = await SERVICES.getProjectById(projectId);
                console.log(projectResponse)
                setProject({
                    projectType: projectResponse.res.project_type,
                    department: projectResponse.res.department ?? '',
                    departmentId: projectResponse.res.department_id ?? '',
                    projectCategory: projectResponse.res.project_category ?? '',
                    projectCategoryId: projectResponse.res.project_category_id ?? '',
                    projectValue: projectResponse.res.project_value ?? '',
                    projectName: projectResponse.res.project_name,
                    city: projectResponse.res.city ?? '',
                    cityId: projectResponse.res.city_id ?? '',
                    status: projectResponse.res.status,
                    dueDate: moment(projectResponse.res.due_date).isValid() ? moment(projectResponse.res.due_date).format() : '',
                    followUpDate: moment(projectResponse.res.follow_up_date).isValid() ? moment(projectResponse.res.follow_up_date).format() : '',
                    projectManager: projectResponse.res.project_manager ?? '',
                    projectManagerId: projectResponse.res.project_manager_id ?? '',
                    teamMembers: projectResponse.res.team_members ? Utils.convertToTypeaheadOptions(projectResponse.res.team_members, 'team_member_name', 'team_member_id') : [],
                    projectDescription: projectResponse.res.description ?? '',
                    contractAcceptedDate: moment(projectResponse.res.contract_accepted_date).isValid() ? moment(projectResponse.res.contract_accepted_date).format() : '',
                    contractExpiryDate: moment(projectResponse.res.contract_expiry_date).isValid() ? moment(projectResponse.res.contract_expiry_date).format() : '',
                    roster: projectResponse.res.roster ?? '',
                    rosterId: projectResponse.res.roster_id ?? '',
                    clientResponse: projectResponse.res.extra_info?.clientResponse ?? '',
                    requestSentTo: projectResponse.res.extra_info?.requestSentTo ?? '',
                    requestRecievedOn: moment(projectResponse.res.extra_info?.requestRecievedOn).isValid() ? moment(projectResponse.res.extra_info?.requestRecievedOn).format() : '',
                    priority: projectResponse.res.extra_info?.priority ?? '',
                    designChecklist: projectResponse.res.extra_info?.designChecklist ?? [],
                    designInfo: projectResponse.res.extra_info?.designInfo ?? [],
                    childProjects: projectResponse.res.child_projects_info ?? []
                });

                console.log(project)
                if (projectResponse.res.tasklist) {
                    setTasklist(projectResponse.res.tasklist ?? []);
                    setOpenTasks(projectResponse.res.tasklist.map((task: any) => task.taskId));
                }

            } catch (error) {
                console.log(error);
                dispatch(showErrorModal('Something Went Wrong!'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const getProjectCategories = async () => {
            try {
                const projectCatoriesResponse = await SERVICES.getProjectCategories(project.departmentId);
                setProjectCategories(Utils.convertToTypeaheadOptions(projectCatoriesResponse.res, 'Project_Category', 'Project_Cat_ID'));
            } catch (error) {
                console.log(error);
            }
        }
        getProjectCategories();
    }, [project.departmentId]);

    const handleForm = (key: string, value: string | number) => {
        console.log(key, value);

        if (key === 'teamMembers') {
            formUtils.multiSelectForm(key, value);
        } else if (key === 'designChecklist' || key === 'designInfo') {
            formUtils.checkboxForm(key, value);
        } else if (key === 'department') {
            setProjectCategories([]);
        } else if (key === 'roster' || key === 'projectCategory' || key === 'projectManager' || key === 'city') {
            formUtils.typeaheadForm(key, value);
        } else {
            formUtils.typeInputForm(key, value);
        }
    }

    const handleTabChange = (tabValue: number | string) => {
        const tab = parseInt(tabValue.toString())
        setTab(tab);

        // Assuming 'Task List' is the tab that corresponds to the Tasklist component
        if (tabRefs[tab] && tabRefs[tab]?.current) {
            tabRefs[tab].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    const handleFormType = () => {
        if (project.projectType === 'Roster') return <></>;
        if (project.departmentId === '1') return <Transportation form={project} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
        else if (project.departmentId === '7') return <Estimation form={project} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
        else if (project.departmentId === '8' && project.projectCategoryId === '68') return <Products form={project} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />

        return <Default form={project} handleForm={handleForm} cities={cities} managers={managers} employees={employees} />
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            await SERVICES.updateProject(
                project.projectName,
                project.projectType,
                project.departmentId,
                project.projectValue,
                project.projectCategoryId,
                project.cityId,
                project.status,
                project.dueDate,
                project.followUpDate,
                project.projectManagerId,
                project.teamMembers,
                project.projectDescription,
                project.contractAcceptedDate,
                project.contractExpiryDate,
                project.rosterId,
                project.clientResponse,
                project.requestSentTo,
                project.requestRecievedOn,
                project.priority,
                project.designChecklist,
                project.designInfo,
                tasklist,
                projectId
            );
            dispatch(showSuccessModal('Project Updated!'))
        } catch (error) {
            console.log(error);
            dispatch(showErrorModal('Something went wrong!'))
        }
        finally {
            setIsLoading(false);
        }
    }

    return isLoading
        ? <div className='d-flex justify-content-center align-items-center w-100 h-100'><LoadingSpinner /></div>
        : (
            <>
                <div className='project-detail-wrapper'>
                    <div className='project-detail-header'>
                        <TFIcon icon={ICONS.CHEVRON_LEFT_BLACK} style={{ "cursor": "pointer" }} onClick={() => setProjectId(0)} />
                        <div className='project-detail-heading-wrapper'>
                            <p className='project-detail-heading'>{project.projectName}</p>
                        </div>
                    </div>

                    <div className='project-detail-tabs-wrapper'>
                        <TFTabGroup
                            selectedTab={tab}
                            onTabChange={handleTabChange}
                            tabs={[
                                { label: 'Project Details', value: 0 },
                                { label: 'Task List', value: 1 },
                            ]}
                        />
                    </div>

                    <div className='project-detail-body' ref={tabRefs[0]}>
                        <div className='w-100'>
                            <form>
                                {/* Project Name */}
                                <input
                                    type="text"
                                    name="projectName"
                                    className="project-input project-name-input"
                                    placeholder="Project Name"
                                    value={project.projectName}
                                    onChange={(e) => handleForm(e.target.name, e.target.value)}
                                />

                                {project.projectType !== 'Roster Project'
                                    && (<>
                                        {/* Department */}
                                        <div className="d-flex flex-start gap-8 w-100">
                                            <p className="project-label">
                                                Department <sup style={{ color: "#E13D19" }}>*</sup>
                                            </p>
                                            <TFTypeahead
                                                name='department'
                                                placeholder='Choose Department'
                                                width='100%'
                                                defaultValue={project.department}
                                                onChange={handleForm}
                                                options={departments}
                                            />
                                        </div>

                                        {/* Project Category */}
                                        {
                                            projectCategories.length !== 0 && project.departmentId !== ""
                                                ? <div className="d-flex flex-start gap-8 w-100">
                                                    <p className="project-label">Project Category</p>
                                                    <TFTypeahead
                                                        name='projectCategory'
                                                        placeholder='Choose Project Category'
                                                        width='100%'
                                                        defaultValue={project.projectCategory}
                                                        onChange={handleForm}
                                                        options={projectCategories}
                                                    />
                                                </div>
                                                : <></>
                                        }
                                    </>)
                                }

                                {handleFormType()}
                            </form>
                        </div>


                        <div className='w-100' ref={tabRefs[1]}>
                            <p className="heading-2" style={{marginBottom: "16px"}}>{project.projectType !== 'Roster Project' ? 'Project Milestone and Tasks' : 'Child Projects'}</p>
                            {
                                project.projectType !== 'Roster Project' ?
                                    <Tasklist taskList={tasklist} employees={employees} setTaskList={setTasklist} openTasks={openTasks} setOpenTasks={setOpenTasks} />
                                    : <ChildProjectList children={project.childProjects} />
                            }
                        </div>
                    </div>
                </div >

                <div className='project-modal-footer w-100'>
                    <TFButton
                        label='Save Changes'
                        handleClick={handleSubmit}
                        variant='primary'
                    />
                </div>
            </>
        )
}

export default ProjectDetail