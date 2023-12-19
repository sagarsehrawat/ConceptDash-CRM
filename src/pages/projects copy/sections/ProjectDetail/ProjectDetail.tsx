import React, { useEffect, useRef, useState } from 'react'
import TFIcon from '../../../../components/ui/TFIcon/TFIcon'
import ICONS from '../../../../constants/Icons'
import LoadingSpinner from '../../../../Main/Loader/Loader'
import './ProjectDetail.css'
import TFTabGroup from '../../../../components/ui/TFTabGroup/TFTabGroup'
import FormUtils from '../../../../utils/FormUtils'
import Utils from '../../../../utils/Utils'
import SERVICES from '../../../../services/Services'
import Estimation from '../../forms/department-projects/Estimation'
import { useDispatch } from 'react-redux'
import { showErrorModal, showSuccessModal } from '../../../../redux/slices/alertSlice'
import moment from 'moment'
import TFButton from '../../../../components/ui/TFButton/TFButton'
import Bidders from '../../forms/department-projects/Bidders'

type Props = {
    proposalId: number;
    setProposalId: Function;
}

type ProposalForm = {
    cityId: string;
    city: string;
    department: string;
    departmentId: string;
    projectName: string;
    questionDeadline: string; // assuming moment.Moment is converted to string
    closingDeadline: string;  // assuming moment.Moment is converted to string
    client: string;
    clientId: string;
    projectManagerId: string;
    designPrice: string;
    provisionalItems: string;
    contractAdminPrice: string;
    subConsultantPrice: string;
    winningPrice: string;
    winningBidder: string;
    projectCategoryId: string;
    createdAt: string; // assuming moment.Moment is converted to string
    result: string;
    debriefing: string;
    folderId: string;
    team: TypeaheadOptions;
    bookmark: number[];
    priority: string;
    proposalGeneratorLink: string;
    rating: string;
    plantakerList: string[];
    bidderList: string[];
    clientContactDetails: string;
    projectCategory: string;
    projectManager: string;
    province: string;
    country: string;
    municipalityType: string;
    source: string;
    partners: TypeaheadOptions;
    debriefingNotes: string,
    totalBidPrice: string,
};


const PROPOSALFORM: ProposalForm = {
    cityId: '',
    department: '',
    departmentId: '',
    projectCategory: '',
    projectCategoryId: '',
    city: '',
    projectName: '',
    questionDeadline: '',
    closingDeadline: '',
    client: '',
    projectManagerId: '',
    designPrice: '',
    provisionalItems: '',
    contractAdminPrice: '',
    subConsultantPrice: '',
    winningPrice: '',
    winningBidder: '',
    createdAt: '',
    result: 'Pending',
    debriefing: 'Yes',
    folderId: '',
    team: [],
    bookmark: [],
    priority: 'Medium',
    proposalGeneratorLink: '',
    rating: '2',
    plantakerList: [],
    bidderList: [],
    clientContactDetails: '',
    source: '',
    partners: [],
    clientId: '',
    projectManager: '',
    province: '',
    country: '',
    municipalityType: '',
    debriefingNotes: '',
    totalBidPrice: ''
};
const ProposalDetail = ({ proposalId, setProposalId }: Props) => {
    console.log('In project detail');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [proposal, setProposal] = useState<ProposalForm>(PROPOSALFORM);
    const [tab, setTab] = useState<number>(0);
    const [departments, setDepartments] = useState<TypeaheadOptions>([]);
    const [managers, setManagers] = useState<TypeaheadOptions>([]);
    const [employees, setEmployees] = useState<TypeaheadOptions>([]);
    const [projectCategories, setProjectCategories] = useState<TypeaheadOptions>([]);
    const [cities, setCities] = useState<TypeaheadOptions>([]);
    const [clients, setClients] = useState<TypeaheadOptions>([]);
    const formUtils = FormUtils(setProposal);
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

                const organizationListResponse = await SERVICES.getOrganizationsList();
                setClients(Utils.convertToTypeaheadOptions(organizationListResponse.res, 'company_name', 'company_id'));

                const proposalResponse = await SERVICES.getProposalById(proposalId);
                console.log(proposalResponse);

                const proposalData: ProposalForm = {
                cityId: proposalResponse.res.city_id ?? '',
                department: proposalResponse.res.department ?? '',
                departmentId: proposalResponse.res.department_id ?? '',
                projectCategory: proposalResponse.res.project_category ?? '',
                projectCategoryId: proposalResponse.res.project_cat_id ?? '',
                city: proposalResponse.res.city ?? '',
                projectName: proposalResponse.res.project_name ?? '',
                questionDeadline: moment(proposalResponse.res.question_deadline).isValid() ? moment(proposalResponse.res.question_deadline).format() : '',
                closingDeadline: moment(proposalResponse.res.closing_deadline).isValid() ? moment(proposalResponse.res.closing_deadline).format() : '',
                client: proposalResponse.res.client ?? '',
                projectManagerId: proposalResponse.res.project_manager_id ?? '',
                debriefingNotes: proposalResponse.res.debriefing_notes ?? '',
                projectManager: proposalResponse.res.project_manager ?? '',
                designPrice: proposalResponse.res.design_price ?? '',
                provisionalItems: proposalResponse.res.provisional_items ?? '',
                contractAdminPrice: proposalResponse.res.contract_admin_price ?? '',
                subConsultantPrice: proposalResponse.res.sub_consultant_price ?? '',
                winningPrice: proposalResponse.res.winning_price ?? '',
                winningBidder: proposalResponse.res.winning_bidder ?? '',
                createdAt: moment(proposalResponse.res.created_at).isValid() ? moment(proposalResponse.res.created_at).format() : '',
                result: proposalResponse.res.result ?? '',
                debriefing: proposalResponse.res.debriefing ?? '',
                folderId: proposalResponse.res.folder_id ?? '',
                team: Utils.convertToTypeaheadOptions(proposalResponse.res.team_members, 'team_member_name', 'team_member_id') ?? [],
                bookmark: proposalResponse.res.bookmark ?? [],
                priority: proposalResponse.res.priority ?? '',
                proposalGeneratorLink: proposalResponse.res.proposal_generator_link ?? '',
                rating: proposalResponse.res.rating ?? '',
                plantakerList: proposalResponse.res.plantakers_list ?? [],
                bidderList: proposalResponse.res.bidders_list ?? [],
                clientContactDetails: proposalResponse.res.client_contact_details ?? '',
                partners: Utils.convertToTypeaheadOptions(proposalResponse.res.partner_members, 'partner_member_name', 'partner_member_id') ?? [],
                clientId: proposalResponse.res.client_id ?? '',
                province: proposalResponse.res.province ?? '',
                country: proposalResponse.res.country ?? '',
                municipalityType: proposalResponse.res.municipality_type ?? '',
                source: proposalResponse.res.source ?? '',
                totalBidPrice: proposalResponse.res.total_bid_price ?? ''
                };

                console.log(proposalData);
                setProposal(proposalData) 


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
                const projectCatoriesResponse = await SERVICES.getProjectCategories(proposal.departmentId);
                setProjectCategories(Utils.convertToTypeaheadOptions(projectCatoriesResponse.res, 'Project_Category', 'Project_Cat_ID'));
            } catch (error) {
                console.log(error);
            }
        }
        getProjectCategories();
    }, [proposal.departmentId]);

    // const handleForm = (key: string, value: string | number) => {
    //     console.log(key, value);

    //     if (key === 'teamMembers') {
    //         formUtils.multiSelectForm(key, value);
    //     } else if (key === 'designChecklist' || key === 'designInfo') {
    //         formUtils.checkboxForm(key, value);
    //     } else if (key === 'department') {
    //         setProjectCategories([]);
    //     } else if (key === 'roster' || key === 'projectCategory' || key === 'projectManager' || key === 'city') {
    //         formUtils.typeaheadForm(key, value);
    //     } else {
    //         formUtils.typeInputForm(key, value);
    //     }
    // }
    const handleForm = (key:string, value:string, index: number = 0) => {
    
        switch (key) {
            case 'bidderList':
            case 'plantakerList':
                const updatedList = [...proposal[key]];
                updatedList[index] = value;
                setProposal({ ...proposal, [key]: updatedList });
                break;
            case 'addBidder':
            case 'addPlantaker':
                setProposal({ ...proposal, [key === 'addBidder' ? 'bidderList' : 'plantakerList']: [...proposal[key === 'addBidder' ? 'bidderList' : 'plantakerList'], ''] });
                break;
            case 'partners':
            case 'team':
                formUtils.multiSelectForm(key, value);
                break;
            case "projectName":
                formUtils.typeInputForm(key, value);
                break;
            case 'source':
            case 'projectName':
                formUtils.typeInputForm(key, value);
                break;
            case 'projectCategory':
            case 'projectManager':
            case 'client':
            case 'city':
                formUtils.typeaheadForm(key, value);
                break;
            case 'department':
                setProjectCategories([]);
                formUtils.typeaheadForm(key, value);
                break;
            default:
                formUtils.typeInputForm(key, value);
                break;
        }
    };
    


    const handleTabChange = (tabValue: number) => {
        setTab(tabValue);
        if (tabRefs[tabValue] && tabRefs[tabValue]?.current) {
            tabRefs[tabValue].current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    }

    const handleFormType = () => {
        return <Estimation form={proposal} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients={clients}/>
    }

    const handleFormType2 = () => {
        return <Bidders form={proposal} handleForm={handleForm} cities={cities} managers={managers} employees={employees} departments={departments} projectCategories={projectCategories} clients={clients}/>
    }

    const handleSubmit = async () => {
        try {
            console.log(proposal);
            setIsLoading(true);
            
            await SERVICES.updateProposal(
                proposal.source,
                proposal.cityId,
                proposal.departmentId,
                proposal.projectCategoryId,
                proposal.projectName,
                proposal.questionDeadline,
                proposal.closingDeadline,
                proposal.clientId,
                proposal.projectManagerId,
                proposal.designPrice,
                proposal.provisionalItems,
                proposal.contractAdminPrice,
                proposal.subConsultantPrice,
                proposal.winningPrice,
                proposal.winningBidder,
                proposal.result,
                proposal.debriefing,
                proposal.folderId,
                proposal.team,
                proposal.bookmark,
                proposal.priority,
                proposal.proposalGeneratorLink,
                proposal.rating,
                proposal.bidderList,
                proposal.plantakerList,
                proposal.clientContactDetails,
                proposal.partners,
                proposal.projectManager,
                proposal.debriefingNotes,
                (proposal.designPrice === '' ? 0 : parseInt(proposal.designPrice ))+(proposal.provisionalItems === '' ? 0 : parseInt(proposal.provisionalItems ))+ (proposal.contractAdminPrice === '' ? 0 : parseInt(proposal.contractAdminPrice ))+ (proposal.subConsultantPrice === '' ? 0 : parseInt(proposal.subConsultantPrice ))===0?'':
                (proposal.designPrice === '' ? 0 : parseInt(proposal.designPrice ))+(proposal.provisionalItems === '' ? 0 : parseInt(proposal.provisionalItems ))+ (proposal.contractAdminPrice === '' ? 0 : parseInt(proposal.contractAdminPrice ))+ (proposal.subConsultantPrice === '' ? 0 : parseInt(proposal.subConsultantPrice )),
                proposalId
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
        ? <div className='d-flex justify-content-center align-items-center w-100 h-100' ><LoadingSpinner /></div>
        : (
            <>
                <div className='project-detail-wrapper w-100'>
                    <div className='project-detail-header'>
                        <TFIcon icon={ICONS.CHEVRON_LEFT_BLACK} style={{ "cursor": "pointer" }} onClick={() => setProposalId(0)} />
                        <div className='project-detail-heading-wrapper'>
                            <p className='project-detail-heading'>{proposal.projectName}</p>
                        </div>
                    </div>

                    <div className='project-detail-tabs-wrapper'>
                        <TFTabGroup
                            selectedTab={tab}
                            onTabChange={handleTabChange}
                            tabs={[
                                { label: 'Proposal Details', value: 0 },
                                { label: 'Bid Details', value: 1 },
                            ]}
                        />
                    </div>

                    <div className='project-detail-body w-100' ref={tabRefs[0]}>
                        <div className='w-100'>
                            <form>
                                {/* Project Name */}
                                <input
                                type="text"
                                name="projectName"
                                className="project-input project-name-input"
                                placeholder="Project Name"
                                required={true}
                                value={proposal.projectName}
                                onChange={(e) => handleForm(e.target.name, e.target.value)}
                                   />
                                {handleFormType()}
                            </form>
                        </div>


                        <div className='w-100' ref={tabRefs[1]}>
                            {handleFormType2()}
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

export default ProposalDetail;