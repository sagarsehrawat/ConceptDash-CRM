import React, { useEffect, useState } from 'react'
import './AddProject.css'
import headerIcon from '../../../Images/Projects.svg';
// import tick from '../../../assets/icons/Primary_Color_Tick.svg'
import IndependentProject from './types/IndependentProject';
import FormUtils from '../../../utils/FormUtils';
import TaskListUtils from '../utils/TaskListUtils';
import TFButton from '../../../components/ui/TFButton/TFButton';
import SERVICES from '../../../services/Services';
import LoadingSpinner from '../../../Main/Loader/Loader';
import Utils from '../../../utils/Utils';
import { useDispatch } from 'react-redux';
import { showErrorModal, showSuccessModal } from '../../../redux/slices/alertSlice';

const FORM = {
    cityId: '',
    department: "",
    departmentId: '',
    projectCategory: '',
    projectCategoryId: '',
    city: '',
    projectName: '',
    questionDeadline: '',
    closingDeadline: '',
    client: '',
    clientId: '',
    projectManagerId: '',
    designPrice: '',
    provisionalItems: '',
    contractAdminPrice: '',
    subConsultantPrice: '',
    totalBidPrice: '',
    winningPrice: '',
    winningBidder: '',
    createdAt: '',
    result: 'Pending',
    debriefing: 'No',
    folderId: '',
    team: [],
    bookmark: [],
    priority: 'Medium',
    proposalGeneratorLink: '',
    rating: '2',
    bidderList: ["","",""],
    plantakerList: ["","",""],
    clientContactDetails: '',
    source: '',
    partners: [],
    projectManager: '',
    debriefingNotes: ''
  };
  

const AddProposal = ({ onHide, api, setApi }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(FORM)
    const formUtils = FormUtils(setForm)

    const [isLoading, setIsLoading] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [managers, setManagers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [projectCategories, setProjectCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [clients, setClients] = useState([]);
    const [sources, setSources] = useState([
        {value: "Construct Connect",label: "Construct Connect"},
        {value: "Bids and Tenders",label: "Bids and Tenders"},
        {value: "Biddingo",label: "Biddingo"},
        {value: "Merx",label: "Merx"}
    ])

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
                console.log(employees);

                const citiesResponse = await SERVICES.getCities();
                setCities(Utils.convertToTypeaheadOptions(citiesResponse.res, 'City', 'City_ID'));

                const organizationListResponse = await SERVICES.getOrganizationsList();
                setClients(Utils.convertToTypeaheadOptions(organizationListResponse.res, 'company_name', 'company_id'));
                console.log(departments);

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


    const handleForm = (key, value, index) => {
        console.log('Handling form:', key, value, index);

        switch (key) {
            case 'bidderList':
                console.log(key)
                console.log(value)
                console.log(index);
                const updatedBidderList = [...form.bidderList];
                updatedBidderList[index] = value;
                setForm({ ...form, bidderList: updatedBidderList });
                break;
            case 'plantakerList':
                const updatedPlantakerList = [...form.plantakerList];
                updatedPlantakerList[index] = value;
                setForm({ ...form, plantakerList: updatedPlantakerList });
                break;
            case 'addBidder':
                setForm({ ...form, bidderList: [...form.bidderList, ''] });
                break;
            case 'addPlantaker':
            setForm({ ...form, plantakerList: [...form.plantakerList, ''] });
            break;
            case 'removeBidder':
            const filteredBidderList = form.bidderList.filter((_, i) => i !== index);
            setForm({ ...form, bidderList: filteredBidderList });
            break;
            case 'removePlantaker':
            const filteredPlantakerList = form.plantakerList.filter((_, i) => i !== index);
            setForm({ ...form, plantakerList: filteredPlantakerList });
            break;
            case 'team':
                formUtils.multiSelectForm(key, value);
                break;
            case 'partners':
                formUtils.multiSelectForm(key, value);
                break;
            case "projectName":
                formUtils.typeInputForm(key, value);
                break;
            case 'department':
                setProjectCategories([]);
                formUtils.typeaheadForm(key, value);
                break;
            case 'projectCategory':
                formUtils.typeaheadForm(key, value);
                break;
            case 'projectManager':
                formUtils.typeaheadForm(key, value);
                break;
            case 'source':
                formUtils.typeaheadForm(key, value);
                break;
            case 'client':
                formUtils.typeaheadForm(key, value);
                break;
            case 'city':
                formUtils.typeaheadForm(key, value);
                break;
            default:
                formUtils.typeInputForm(key, value);
                break;
        }
    }

    const handleSubmit = async () => {
        console.log(form);
        try {
            if(form.projectName==='')dispatch(showErrorModal('Enter Project Name!'))
            else{
            setIsLoading(true);
            await SERVICES.addProposals({
                cityId: form.cityId,
                departmentId: form.departmentId,
                projectCategoryId: form.projectCategoryId,
                projectName: form.projectName,
                questionDeadline: form.questionDeadline,
                closingDeadline: form.closingDeadline,
                clientId: form.clientId,
                projectManagerId: form.projectManagerId,
                designPrice: form.designPrice,
                provisionalItems: form.provisionalItems,
                contractAdminPrice: form.contractAdminPrice,
                subConsultantPrice: form.subConsultantPrice,
                winningPrice: form.winningPrice,
                winningBidder: form.winningBidder,
                createdAt: form.createdAt,
                result: form.result,
                debriefing: form.debriefing,
                folderId: form.folderId,
                team: form.team.map(item => item.value),
                bookmark: form.bookmark,
                priority: form.priority,
                proposalGeneratorLink: form.proposalGeneratorLink,
                rating: form.rating,
                bidderList: form.bidderList,
                plantakerList: form.plantakerList,
                clientContactDetails: form.clientContactDetails,
                totalBidPrice: (form.designPrice === '' ? 0 : parseInt(form.designPrice ))+(form.provisionalItems === '' ? 0 : parseInt(form.provisionalItems ))+ (form.contractAdminPrice === '' ? 0 : parseInt(form.contractAdminPrice ))+ (form.subConsultantPrice === '' ? 0 : parseInt(form.subConsultantPrice ))===0?'':
                (form.designPrice === '' ? 0 : parseInt(form.designPrice ))+(form.provisionalItems === '' ? 0 : parseInt(form.provisionalItems ))+ (form.contractAdminPrice === '' ? 0 : parseInt(form.contractAdminPrice ))+ (form.subConsultantPrice === '' ? 0 : parseInt(form.subConsultantPrice )),
                partners: form.partners.map(item => item.value),
                projectManager: form.projectManager,
                debriefingNotes: form.debriefingNotes,
                source: form.source
              });
              
              setApi(api + 1);
              
            onHide();
            dispatch(showSuccessModal('Proposal Added!'))
            }
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
                                    <p className='heading-2'>Create New Proposal</p>
                                </div>

                                <form style={{ width: '100%' }}>
                                <IndependentProject form={form} handleForm={handleForm} departments={departments} cities={cities} projectCategories={projectCategories} managers={managers} employees={employees} clients ={clients} sources = {sources}/>
                                </form>
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

export default AddProposal