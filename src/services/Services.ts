import axios from "axios";
import APIS from "../constants/APIS.ts";
import { AddResponse, DeleteResponse, ErrorResponse, GetCitiesResponse, GetDepartmetnsResponse, GetGoogleDriveUrlResponse, GetManagerNamesResponse, GetProjectCategoriesResponse, GetRfpsResponse, RfpCountResponse, ProjectCountResponse, GetRostersListResponse, GetEmployeesListResponse, GetProjectsResponse, UpdateResponse, GetProjectById, GetTrackingRfpsResponse, BudgetCountResponse, GetBudgetCitiesResponse, GetCityBudgetResponse, ProposalCountResponse ,GetProposalsResponse,GetProposalById, GetOrganizationsListResponse, GetInvoicesResponse, GetInvoiceProjectResponse, GetInvoiceDetailResponse, GetFinanceCountResponse, orgLableUpdateResponce, peopleLabelUpdateResponce, getPeopleResponce, getOrganizationsResponce,OrganizationList,OrgPeopleCount,orgDetails, editProjectNote, generalNoteList,getAllPeopleInOrganization, getProjectListResponse,projectNoteList} from "Services";
import moment from "moment";
axios.defaults.baseURL = APIS.BASE_URL

const SERVICES = {
    serverStatus: async () => {
        try {
            const response = await axios.get(APIS.SERVER_STATUS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    rfpCount: async (): Promise<RfpCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_RFP_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as RfpCountResponse;
        } catch (error) {
            throw error;
        }
    },

    proposalCount: async (): Promise<ProposalCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROPOSAL_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as ProposalCountResponse;
        } catch (error) {
            throw error;
        }
    },

    budgetCount: async (): Promise<BudgetCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_BUDGET_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as BudgetCountResponse;
        } catch (error) {
            throw error;
        }
    },


    projectCount: async (): Promise<ProjectCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as ProjectCountResponse;
        } catch (error) {
            throw error;
        }
    },

    getCities: async (): Promise<GetCitiesResponse> => {
        try {
            const response = await axios.get(APIS.GET_CITIES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetCitiesResponse;
        } catch (error) {
            throw error;
        }
    },

    getOrganizationsList: async (): Promise<GetOrganizationsListResponse> => {
        try {
            const response = await axios.get(APIS.GET_ORGANIZATION_LIST, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetOrganizationsListResponse;
        } catch (error) {
            throw error;
        }
    },

    getDepartments: async (): Promise<GetDepartmetnsResponse> => {
        try {
            const response = await axios.get(APIS.GET_DEPARTMENTS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetDepartmetnsResponse;
        } catch (error) {
            throw error;
        }
    },

    getProjectCategories: async (departmentId: string | number): Promise<GetProjectCategoriesResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_CATEGORIES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    id: departmentId
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetProjectCategoriesResponse;
        } catch (error) {
            throw error;
        }
    },

    getManagers: async (): Promise<GetManagerNamesResponse> => {
        try {
            const response = await axios.get(APIS.GET_MANAGERS_LIST, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetManagerNamesResponse;
        } catch (error) {
            throw error;
        }
    },

    getEmployeesList: async (): Promise<GetEmployeesListResponse> => {
        try {
            const response = await axios.get(APIS.GET_EMPLOYEES_LIST, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetEmployeesListResponse;
        } catch (error) {
            throw error;
        }
    },

    getRostersList: async (): Promise<GetRostersListResponse> => {
        try {
            const response = await axios.get(APIS.GET_ROSTERS_LIST, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetRostersListResponse;
        } catch (error) {
            throw error;
        }
    },

    getRfps: async (limit: number, currentPage: number, filter: Object, search: string, sort: string): Promise<GetRfpsResponse> => {
        try {
            const response = await axios.get(APIS.GET_RFPS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    limit,
                    offset: (currentPage - 1) * limit,
                    filter: JSON.stringify(filter),
                    search,
                    sort,
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetRfpsResponse;
        } catch (error) {
            throw error;
        }
    },

    getTrackingRfps: async (filter: Object, search: string, sort: string): Promise<GetTrackingRfpsResponse> => {
        try {
            const response = await axios.get(APIS.GET_TRACKING_RFPS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    filter: JSON.stringify(filter),
                    search,
                    sort,
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetTrackingRfpsResponse;
        } catch (error) {
            throw error;
        }
    },

    updateRfpStatus: async (rfpId: number, action: string, organizationIds: number[] | null=null): Promise<UpdateResponse> => {
        try {
            const response = await axios.post(APIS.UPDATE_RFP_STATUS,
                {
                    rfpId,
                    action,
                    organizationIds
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateBudgetCity1: async (year22: string, year23: string, year24: string, year25: string, remarks: string, id: number, population: string, geographicArea: string, municipalityType: string, cityId: number): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_BUDGET_CITY1,
                {
                    year22,
                    year23,
                    year24,
                    year25,
                    remarks,
                    id,
                    population,
                    geographicArea,
                    municipalityType,
                    cityId
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateBudgetCity2: async (year22: string, year23: string, year24: string, year25: string, remarks: string, id: number, website: string, website22: string, website23: string, website24: string, website25: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_BUDGET_CITY2,
                {
                    year22,
                    year23,
                    year24,
                    year25,
                    remarks,
                    id,
                    website,
                    website22,
                    website23,
                    website24,
                    website25
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateRfpRating: async (rfpId: number, rating: number): Promise<UpdateResponse> => {
        try {
            const response = await axios.post(APIS.UPDATE_RFP_RATING,
                {
                    rfpId,
                    rating,
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateProjectStatus: async (projectId: number, status: string, projectType: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_PROJECT_STATUS,
                {
                    projectId,
                    status,
                    projectType
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateProposalResult: async (proposalId: number, status: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_PROPOSAL_RESULT,
                {
                    proposalId,
                    status
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateProposalBookmark: async (proposalId: number, bookmark: number[]): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_PROPOSAL_BOOKMARK,
                {
                    proposalId: proposalId,
                    bookmark: JSON.stringify(bookmark)
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    updateProposalPriority: async (proposalId: number, priority: string,): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_PROPOSAL_PRIORITY,
                {
                    proposalId,
                    priority
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    deleteRfps: async (rfpIds: number[]): Promise<DeleteResponse> => {
        try {
            const response = await axios.post(APIS.DELETE_RFPS,
                {
                    ids: JSON.stringify(rfpIds)
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as DeleteResponse;
        } catch (error) {
            throw error;
        }
    },

    deleteBudget: async (budgetId: number): Promise<DeleteResponse> => {
        try {
            const response = await axios.delete(APIS.DELETE_BUDGET,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        id: budgetId
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as DeleteResponse;
        } catch (error) {
            throw error;
        }
    },

    updateRfpDate: async (rfpId: number, field: string, date: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.post(APIS.UPDATE_RFP_DATE,
                {
                    rfpId,
                    field,
                    date
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },


    updateRfp: async (id: number, departmentId: number | string, projectCatId: number | string, source: string, projectManagerId: number | string, startDate: string, submissionDate: string, projectName: string, rfpNumber: string, client: number | string, cityId: number | string, remarks: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.post(APIS.UPDATE_RFP,
                {
                    id,
                    departmentId,
                    projectCatId,
                    source,
                    projectManagerId,
                    startDate,
                    submissionDate,
                    projectName,
                    rfpNumber,
                    client,
                    cityId,
                    remarks
                },
                {
                    headers: { auth: "Rose " + localStorage.getItem("auth"), },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    getGoogleDriveUrl: async (id: number | string): Promise<GetGoogleDriveUrlResponse> => {
        try {
            const response = await axios.get(APIS.GET_GOOGLE_DRIVE_URL,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        id
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetGoogleDriveUrlResponse;
        } catch (error) {
            throw error;
        }
    },

    addRfp: async (form: FormData): Promise<AddResponse> => {
        try {
            const response = await axios.post(APIS.ADD_RFP, form,
                {
                    headers: {
                        auth: 'Rose ' + localStorage.getItem('auth'),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as AddResponse;
        } catch (error) {
            console.log(error)
            throw error;
        }
    },

    addProposals: async (form: FormData): Promise<AddResponse> => {
        try {
          const response = await axios.post(APIS.ADD_PROPOSAL, form, {
            headers: {
              auth: 'Rose ' + localStorage.getItem('auth'),
            },
          });
      
          if (response.data.success === false) {
            throw response.data as ErrorResponse;
          }
      
          return response.data as AddResponse;
        } catch (error) {
          console.error(error);
          throw error;
        }
      },
      
    getProjects: async (limit: number, currentPage: number, filter: Object, search: string, sort: string): Promise<GetProjectsResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECTS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    limit,
                    offset: (currentPage - 1) * limit,
                    filter: JSON.stringify(filter),
                    search,
                    sort,
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetProjectsResponse;
        } catch (error) {
            throw error;
        }
    },

    getProjectList : async () : Promise<getProjectListResponse> =>{
      try{
        const response = await axios.get(APIS.GET_PROJECT_LIST,{
            headers:{
                auth :"Rose " + localStorage.getItem("auth")
            }
        });
        if(response.data.success == false)
           throw response.data as ErrorResponse

           return response.data as getProjectListResponse
      }
      catch(error){
        throw error
      }
    },

    getProposals: async (limit: number, currentPage: number, filter: Object, search: string, sort: string, employeeId: string): Promise<GetProposalsResponse> => {
        console.log(employeeId)
        try {
            const response = await axios.get(APIS.GET_PROPOSALS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    limit,
                    offset: (currentPage - 1) * limit,
                    filter: JSON.stringify(filter),
                    search,
                    sort,
                    employeeId
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetProposalsResponse;
        } catch (error) {
            throw error;
        }
    },

    getBudgetCities: async (): Promise<GetBudgetCitiesResponse> => {
        try {
            const response = await axios.get(APIS.GET_BUDGET_CITIES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetBudgetCitiesResponse;
        } catch (error) {
            throw error;
        }
    },

    getCityBudgets: async (year: string, search: string, city: number, filter: { cat: (string | number)[], dept: (string | number)[], budgetCategory: (string | number)[] }): Promise<GetCityBudgetResponse> => {
        try {
            const response = await axios.get(APIS.GET_CITY_BUDGET, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    search,
                    year,
                    city,
                    filter: JSON.stringify(filter)
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetCityBudgetResponse;
        } catch (error) {
            throw error;
        }
    },

    getProjectById: async (projectid: string | number): Promise<GetProjectById> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_BY_ID, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    projectid
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetProjectById;
        } catch (error) {
            throw error;
        }
    },

    getProposalById: async (proposalId: string | number) : Promise<GetProposalById> => {
        try {
            const response = await axios.get(APIS.GET_PROPOSALS_BY_ID, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    proposalId
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetProposalById;
        } catch (error) {
            throw error;
        }
    },

    addProposal: async (
        departmentId: null | undefined | number,
        projectCatId: null | undefined | number,
        status: string | null | undefined,
        result: string | null | undefined,
        debriefing: string | null | undefined,
        projectManagerId: null | undefined | number,
        projectName: string | null | undefined,
        questionDeadline: string,
        closingDeadline: string,
        team: string | null | undefined,
        designPrice: string | number | undefined,
        provisionalItems: string | number,
        contractAdminPrice: string | number,
        subConsultantPrice: string | number,
        winningPrice: string | number,
        winningBidderId: string | number,
        cityId: null | number | undefined,
        rfpId: null | number | undefined
    ): Promise<AddResponse> => {
        try {
            const response = await axios.post(APIS.ADD_PROPOSAL,
                {
                    departmentId: departmentId,
                    projectCatId: projectCatId,
                    status: status,
                    result: result,
                    debriefing: debriefing,
                    projectManagerId: projectManagerId,
                    projectName: projectName,
                    questionDeadline: questionDeadline,
                    closingDeadline: closingDeadline,
                    team: team,
                    designPrice: designPrice,
                    provisionalItems: provisionalItems,
                    contractAdminPrice: contractAdminPrice,
                    subConsultantPrice: subConsultantPrice,
                    winningPrice: winningPrice,
                    winningBidderId: winningBidderId,
                    cityId: cityId,
                    rfpId: rfpId
                },
                {
                    headers: {
                        auth: 'Rose ' + localStorage.getItem('auth'),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as AddResponse;
        } catch (error) {
            throw error;
        }
    },

    addBudget: async (
        cityId: number,
        departmentId: string,
        categoryId: string,
        projectName: string,
        budgetCategory: string,
        budgetAmount: string,
        budgetYear: string,
        serialNumber: string
    ): Promise<AddResponse> => {
        try {
            const response = await axios.post(APIS.ADD_BUDGET,
                {
                    cityId,
                    departmentId,
                    categoryId,
                    projectName,
                    budgetAmount,
                    budgetCategory,
                    budgetYear,
                    serialNumber
                },
                {
                    headers: {
                        auth: 'Rose ' + localStorage.getItem('auth'),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as AddResponse;
        } catch (error) {
            throw error;
        }
    },

    updateBudget: async (
        cityId: number,
        departmentId: string,
        categoryId: string,
        projectName: string,
        budgetCategory: string,
        budgetAmount: string,
        budgetYear: string,
        serialNumber: string,
        id: number
        ): Promise<UpdateResponse> => {
            try {
                const response = await axios.put(APIS.UPDATE_BUDGET,
                    {
                        cityId,
                        departmentId,
                        categoryId,
                        projectName,
                        budgetAmount,
                        budgetCategory,
                        budgetYear,
                        serialNumber,
                        id
                    },
                    {
                        headers: {
                            auth: 'Rose ' + localStorage.getItem('auth'),
                        },
                    });
                if (response.data.success === false) {
                    throw response.data as ErrorResponse
                }
                return response.data as AddResponse;
            } catch (error) {
                throw error;
            }
        },

    addProject: async (
        projectName: string,
        projectType: string,
        departmentId: string | number,
        projectValue: string,
        projectCategoryId: string | number,
        cityId: string | number,
        clientId: string | number,
        status: string,
        dueDate: moment.Moment | string,
        followUpDate: moment.Moment | string,
        projectManagerId: string,
        teamMemberIds: { label: string, value: string | number }[],
        description: string,
        contractAcceptedDate: moment.Moment | string,
        contractExpiryDate: moment.Moment | string,
        rosterId: string | number,
        clientResponse: string,
        requestSentTo: string,
        requestRecievedOn: moment.Moment | string,
        priority: string,
        designCheckList: string[],
        designInfo: string[],
        taskList: Object
    ): Promise<AddResponse> => {
        try {
            const extraInfo: any = {};
            if (projectType === 'Child Project')
                extraInfo.parentId = rosterId;
            if (departmentId === 1) {
                extraInfo['clientResponse'] = clientResponse;
            } else if (departmentId === 8 && projectCategoryId === 68) {
                extraInfo.priority = priority;
                extraInfo.designCheckList = designCheckList;
                extraInfo.designInfo = designInfo;
            } else if (departmentId === 7) {
                extraInfo['clientResponse'] = clientResponse;
                extraInfo.requestSentTo = requestSentTo;
                extraInfo.requestRecievedOn = moment(requestRecievedOn).isValid() ? moment(requestRecievedOn).format('YYYY-MM-DD') : '';
            }
            const response = await axios.post(APIS.ADD_PROJECT,
                {
                    projectCategoryId,
                    projectManagerId,
                    projectValue,
                    projectName,
                    projectType,
                    departmentId,
                    description,
                    cityId,
                    clientId,
                    status,
                    teamMemberIds: teamMemberIds.map(item => item.value),
                    dueDate: moment(dueDate).isValid() ? moment(dueDate).format('YYYY-MM-DD') : '',
                    followUpDate: moment(followUpDate).isValid() ? moment(followUpDate).format('YYYY-MM-DD') : '',
                    contractAcceptedDate: moment(contractAcceptedDate).isValid() ? moment(contractAcceptedDate).format('YYYY-MM-DD') : '',
                    contractExpiryDate: moment(contractExpiryDate).isValid() ? moment(contractExpiryDate).format('YYYY-MM-DD') : '',
                    extraInfo,
                    taskList
                },
                {
                    headers: {
                        auth: 'Rose ' + localStorage.getItem('auth'),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as AddResponse;
        } catch (error) {
            throw error;
        }
    },

    updateProposal: async (
        source: string,
        cityId: string | number,
        departmentId: string | number,
        projectCategoryId: string | number,
        projectName: string,
        questionDeadline: moment.Moment | string,
        closingDeadline: moment.Moment | string,
        clientId: string | number,
        projectManagerId: string,
        designPrice: string,
        provisionalItems: string,
        contractAdminPrice: string,
        subConsultantPrice: string,
        winningPrice: string,
        winningBidder: string,
        result: string,
        debriefing: string,
        folderId: string,
        team: { label: string, value: string | number }[],
        bookmark: any[], 
        priority: string,
        proposalGeneratorLink: string,
        rating: string,
        bidderList: string[],
        plantakerList: string[],
        clientContactDetails: string,
        partners: { label: string, value: string | number }[],
        projectmanager: string,
        debriefingNotes: string,
        totalBidPrice: string | number,
        proposalId: number
      ): Promise<UpdateResponse> => {
        try {
      
          const response = await axios.put(APIS.UPDATE_PROPOSAL, {
            source,
            cityId,
            departmentId,
            projectCategoryId,
            projectName,
            questionDeadline: moment(questionDeadline).isValid() ? moment(questionDeadline).format('YYYY-MM-DD') : '',
            closingDeadline: moment(closingDeadline).isValid() ? moment(closingDeadline).format('YYYY-MM-DD') : '',
            clientId,
            projectManagerId,
            designPrice,
            provisionalItems,
            contractAdminPrice,
            subConsultantPrice,
            winningPrice,
            winningBidder,
            result,
            debriefing,
            folderId,
            team: team.map(item => item.value),
            bookmark,
            priority,
            proposalGeneratorLink,
            rating,
            bidderList,
            plantakerList,
            clientContactDetails,
            partners: partners.map(item => item.value),
            projectmanager,
            debriefingNotes,
            totalBidPrice,
            proposalId
          }, {
            headers: {
              auth: 'Rose ' + localStorage.getItem('auth'),
            },
          });
      
          if (response.data.success === false) {
            throw response.data as ErrorResponse;
          }
      
          return response.data as UpdateResponse;
        } catch (error) {
          throw error;
        }
      },      

    updateProject: async (
        projectName: string,
        projectType: string,
        departmentId: string | number,
        projectValue: string,
        projectCategoryId: string | number,
        cityId: string | number,
        status: string,
        dueDate: moment.Moment | string,
        followUpDate: moment.Moment | string,
        projectManagerId: string,
        teamMemberIds: { label: string, value: string | number }[],
        description: string,
        contractAcceptedDate: moment.Moment | string,
        contractExpiryDate: moment.Moment | string,
        rosterId: string | number,
        clientResponse: string,
        requestSentTo: string,
        requestRecievedOn: moment.Moment | string,
        priority: string,
        designCheckList: string[],
        designInfo: string[],
        taskList: Object,
        projectId: number
    ): Promise<UpdateResponse> => {
        try {
            const extraInfo: any = {};
            if (projectType === 'Child Project')
                extraInfo.parentId = rosterId;
            if (departmentId === 1) {
                extraInfo['clientResponse'] = clientResponse;
            } else if (departmentId === 8 && projectCategoryId === 68) {
                extraInfo.priority = priority;
                extraInfo.designCheckList = designCheckList;
                extraInfo.designInfo = designInfo;
            } else if (departmentId === 7) {
                extraInfo['clientResponse'] = clientResponse;
                extraInfo.requestSentTo = requestSentTo;
                extraInfo.requestRecievedOn = moment(requestRecievedOn).isValid() ? moment(requestRecievedOn).format('YYYY-MM-DD') : '';
            }
            const response = await axios.put(APIS.UPDATE_PROJECT,
                {
                    projectCategoryId,
                    projectManagerId,
                    projectValue,
                    projectName,
                    projectType,
                    departmentId,
                    description,
                    cityId,
                    status,
                    teamMemberIds: teamMemberIds.map(item => item.value),
                    dueDate: moment(dueDate).isValid() ? moment(dueDate).format('YYYY-MM-DD') : '',
                    followUpDate: moment(followUpDate).isValid() ? moment(followUpDate).format('YYYY-MM-DD') : '',
                    contractAcceptedDate: moment(contractAcceptedDate).isValid() ? moment(contractAcceptedDate).format('YYYY-MM-DD') : '',
                    contractExpiryDate: moment(contractExpiryDate).isValid() ? moment(contractExpiryDate).format('YYYY-MM-DD') : '',
                    extraInfo,
                    taskList,
                    projectId
                },
                {
                    headers: {
                        auth: 'Rose ' + localStorage.getItem('auth'),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as UpdateResponse;
        } catch (error) {
            throw error;
        }
    },

    deleteProposal: async (proposalId: number[]): Promise<DeleteResponse> => {
        try {
            const response = await axios.delete(APIS.DELETE_PROPOSALS,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        ids: JSON.stringify(proposalId),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as DeleteResponse;
        } catch (error) {
            throw error;
        }
    },

    deleteProject: async (projectId: number[], projectType: string): Promise<DeleteResponse> => {
        try {
            const response = await axios.delete(APIS.DELETE_PROJECT,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectid: JSON.stringify(projectId),
                        projecttype: projectType
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as DeleteResponse;
        } catch (error) {
            throw error;
        }
    },

    getInvoices: async (invoiceType: string): Promise<GetInvoicesResponse> => {
        try {
            const response = await axios.get(APIS.GET_INVOICES,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        type: invoiceType,
                        search: ''
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetInvoicesResponse;
        } catch (error) {
            throw error;
        }
    },

    getInvoiceProjects: async (): Promise<GetInvoiceProjectResponse> => {
        try {
            const response = await axios.get(APIS.GET_INVOICE_PROJECTS,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetInvoiceProjectResponse;
        } catch (error) {
            throw error;
        }
    },

    generateInvoice: async (projectId: number): Promise<AddResponse> => {
        try {
            const response = await axios.post(APIS.GENERATE_PROJECT_INVOICE,
                {projectId},
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as AddResponse;
        } catch (error) {
            throw error;
        }
    },

    getProjectInvoices: async (projectId: number): Promise<GetInvoicesResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_INVOICES,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectid: projectId
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetInvoicesResponse;
        } catch (error) {
            throw error;
        }
    },

    getInvoiceDetails: async (invoiceId: number): Promise<GetInvoiceDetailResponse> => {
        try {
            const response = await axios.get(APIS.GET_INVOICE_DETAILS,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        invoiceid: invoiceId
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetInvoiceDetailResponse;
        } catch (error) {
            throw error;
        }
    },

    getFinanceCount: async (): Promise<GetFinanceCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_FINANCE_COUNT,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                    },
                });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as GetFinanceCountResponse;
        } catch (error) {
            throw error;
        }
    },

    getOrganizations: async (search: string, caseType?: string, offset: number = 0): Promise<getOrganizationsResponce> => {
        try {
            // Making an HTTP GET request using Axios
            const response = await axios.get(APIS.GET_ALL_ORGANIZATION, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    search: search || '',
                    filter: JSON.stringify({
                        companyType: caseType ? [caseType] : [],
                    }),
                    sort: "company_name ASC",
                    offset: offset,
                    limit: 50
                },
            });
                if (response.data.success === false) {
                throw response.data as ErrorResponse;
            }
    
            return response.data as getOrganizationsResponce;
        } catch (error) {
            throw error;
        }
    },
    getPeople : async (search: string, caseType?: string, offset: number = 0): Promise<getPeopleResponce> => {
        try {
          const response = await axios.get(APIS.GET_ALL_PEOPLE, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
              search: search || '',
              filter: JSON.stringify({
                companyType: caseType ? [caseType] : []
              }),
              offset: offset,
              sort: "company_name ASC",
              limit: 50
            },
          });
      
          // Handling response
          if (response.data.success === false) {
            throw response.data as ErrorResponse;
          }
      
          return response.data as getPeopleResponce;
        } catch (error) {
          throw error;
        }
      },
      
      deleteOrganizations : async (selectedOrganizations: string[]): Promise<DeleteResponse> => {
        try {
          const response = await axios.post(APIS.DELETE_ORGANIZATION, {
            company_ids: selectedOrganizations,
          }, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
            },
          });
      
          if (response.data.success === false) {
            throw response.data as ErrorResponse;
          }
      
          return response.data as DeleteResponse;
        } catch (error) {
          throw error;
        }
      },
       
      deletePeople : async (selectedPeople: string[]): Promise<DeleteResponse> => {
        try {
          // Making an HTTP POST request using Axios
          const response = await axios.post(APIS.DELETE_PEOPLE, {
            ids: selectedPeople,
          }, {
            headers: {
              auth: "Rose " + localStorage.getItem("auth"),
            },
          });
      
          // Handling response
          if (response.data.success === false) {
            throw response.data as ErrorResponse;
          }
      
          return response.data as DeleteResponse;
        } catch (error) {
          throw error;
        }
      },
      orgLableUpdate : async (id: number, value : string) : Promise <orgLableUpdateResponce> =>{
        try{
            const response = await axios.post( APIS.UPDATE_ORGANIZATION_LABEL,
                {
                id: id,
                newCompanyType: value,
                },
              {
                headers: {
                  auth: "Rose " + localStorage.getItem("auth"),
                },
              });
              if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as orgLableUpdateResponce
        }
        catch(error){
            throw error
        }
      },
      peopleLableUpdate : async (id: number, value : string) : Promise <peopleLabelUpdateResponce> =>{
        try{
            const response = await axios.post( APIS.UPDATE_PEOPLE_LABEL,
                {
                id: id,
                newCompanyType: value,
                },
              {
                headers: {
                  auth: "Rose " + localStorage.getItem("auth"),
                },
              });
              if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as peopleLabelUpdateResponce
        }
        catch(error){
            throw error
        }
      },
      orgContacttypeUpdate : async (id: number, value : string) : Promise <orgLableUpdateResponce> =>{
        try{
            const response = await axios.post( APIS.UPDATE_ORGANIZATION_CONTACT_TPYE,
                {
                id: id,
                newContactType: value,
                },
              {
                headers: {
                  auth: "Rose " + localStorage.getItem("auth"),
                },
              });
              if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as orgLableUpdateResponce
        }
        catch(error){
            throw error
        }
      },
      peopleContacttypeUpdate : async (id: number, value : string) : Promise <orgLableUpdateResponce> =>{
        try{
            const response = await axios.post( APIS.UPDATE_PEOPLE_CONTACT_TPYE,
                {
                id: id,
                newContactType: value,
                },
              {
                headers: {
                  auth: "Rose " + localStorage.getItem("auth"),
                },
              });
              if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as orgLableUpdateResponce
        }
        catch(error){
            throw error
        }
      },
      getAllPeopleInOrganization : async(id:number , search: string) : Promise<getAllPeopleInOrganization> =>{
        try{
            const response = await axios.get(APIS.ALL_PEOPLE_IN_ORGANIZATION,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                         companyid: id,
                         search: search
                    },
                });
                if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as getAllPeopleInOrganization

        }
        catch(error){
            throw error;
        }
      },
      getOrganizationDetails : async(id: number) : Promise<orgDetails> =>{
        const response = await axios
        .get(APIS.ORGANIZATION_DETAILS, {
            headers: {
                auth: "Rose " + localStorage.getItem("auth"),
                companyId: id 
            },
        })
        if(response.data.success == false) 
          throw response.data as ErrorResponse
        return response.data as orgDetails

      },
      getOrganizationList : async() : Promise<OrganizationList> =>{
        try{
            const response = await axios.get(APIS.GET_ORGANIZATION_LIST,
                {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth")
                    },
                });
                if(response.data.success === false)
                throw response.data as ErrorResponse

              return response.data as OrganizationList

        }
        catch(error){
            throw error;
        }
      },
      addPeople : async (    
        name: string,
        job_title: string,
        company_type: string,
        company_id:  number,
        contact_type: string,
        email: string,
        phone: string,
         cv: string,
         address: string,
         remarks: string,
         alternate_phone: string
         ): Promise<AddResponse> =>{
            try {
                const response = await axios.post(APIS.ADD_PEOPLE,
                    {
                        name: name,
                        job_title: job_title,
                        company_type: company_type,
                        company_id: company_id,
                        contact_type: contact_type,
                        email: email,
                        phone: phone,
                         cv: cv,
                         address: address,
                        //  city_id: 1,
                         remarks: remarks,
                         alternate_phone: alternate_phone
                    },
                    {
                        headers: {
                            auth: 'Rose ' + localStorage.getItem('auth'),
                        },
                    });
                if (response.data.success === false) {
                    throw response.data as ErrorResponse
                }
                return response.data as AddResponse;
            } catch (error) {
                throw error;
            }
         },

         addOrganization : async (    
            company_name: string,
    address: string,
    business_phone:string,
    fax: string,
    email: string,
    website: string,
    contact_type: string,
    company_type: string ,
             ): Promise<AddResponse> =>{
                try {
                    const response = await axios.post(APIS.ADD_ORGANIZATION,
                        {
                            company_name,
                            address,
                            business_phone,
                            fax,
                            email,
                            website,
                            contact_type,
                            company_type 
                        },
                        {
                            headers: {
                                auth: 'Rose ' + localStorage.getItem('auth'),
                            },
                        });
                    if (response.data.success === false) {
                        throw response.data as ErrorResponse
                    }
                    return response.data as AddResponse;
                } catch (error) {
                    throw error;
                }
             },

         updatePeople : async (  
                id: number,
                name: string,
                job_title: string| null,
                company_type: string |null,
                company_id: string | number,
                contact_type: string | null,
                email: string| null,
                phone: string | null,
                 address: string | null,
                 remarks: string | null,
                 alternate_phone: string | null
                 ) : Promise<UpdateResponse> =>{
                    try {
                        const response = await axios.post(APIS.UPDATE_PEOPLE,
                            {
                                id: id,
                                name: name,
                                job_title: job_title,
                                company_type: company_type,
                                company_id: company_id,
                                contact_type: contact_type,
                                email: email,
                                phone: phone,
                                //  cv: cv,
                                 address: address,
                                //  city_id: 1,
                                 remarks: remarks,
                                 alternate_phone: alternate_phone
                            },
                            {
                                headers: {
                                    auth: 'Rose ' + localStorage.getItem('auth'),
                                },
                            });
                        if (response.data.success === false) {
                            throw response.data as ErrorResponse
                        }
                        return response.data as UpdateResponse;
                    } catch (error) {
                        throw error;
                    }
                 },
                 getOrgPeopleCount : async (caseType: string) : Promise <OrgPeopleCount> =>{
                    let apiUrl = caseType === "org" ? APIS.ORGANIZATION_COUNT :  APIS.PEOPLE_COUNT;
                 const response = await axios
                 .get(apiUrl, {
                     headers: {
                         auth: "Rose " + localStorage.getItem("auth"),
                     },
                 })
                 if(response.data.success === false)
                  throw response.data as ErrorResponse

                  return response.data as OrgPeopleCount
                 },
                 deleteProjectNotes : async (peopleId : number,projectId: number,index: number) : Promise<DeleteResponse> =>{
                    const  response = await  axios.post(APIS.DELETE_PROJECT_NOTES, {
                        peopleId: peopleId, 
                        projectId: projectId,
                        index: index,
                      }, {
                        headers: {
                          auth: "Rose " + localStorage.getItem("auth")
                        }
                      })
                      if(response.data.success == false)
                        throw response.data as ErrorResponse
                     return response.data as DeleteResponse
                 },
                 deleteGeneralNotes : async (peopleId : number,index: number) : Promise<DeleteResponse> =>{
                    const  response = await  axios.post(APIS.DELETE_PROJECT_NOTES, {
                        peopleId: peopleId, 
                        index: index,
                      }, {
                        headers: {
                          auth: "Rose " + localStorage.getItem("auth")
                        }
                      })
                      if(response.data.success == false)
                        throw response.data as ErrorResponse
                     return response.data as DeleteResponse
                 },

                 editProjectNotes :
                  async (nam: string,date: string,notes:string,peopleId:number,projectId:number,index:number,reminder:boolean,reminderDate:string)
                   : Promise <editProjectNote> =>{
                     const response = await axios.post(APIS.UPDATE_PROJECT_NOTES, {
                        name: nam,
                        date: date,
                        notes: notes,
                        peopleId: peopleId,
                        projectId:projectId,
                        index: index,
                        reminder: reminder,
                        reminderDate: reminderDate,
                      }, {
                        headers: {
                          auth: "Rose " + localStorage.getItem("auth")
                        }
                      })

                      if(response.data.success == false)
                        throw response.data as ErrorResponse
                    return response.data as editProjectNote
                   },
                   editGeneralNotes :
                   async (nam: string,date: string,notes:string,peopleId:number,index:number,reminder:boolean,reminderDate:string)
                    : Promise <editProjectNote> =>{
                      const response = await axios.post(APIS.UPDATE_PROJECT_NOTES, {
                         name: nam,
                         date: date,
                         notes: notes,
                         peopleId: peopleId,
                         index: index,
                         reminder: reminder,
                         reminderDate: reminderDate,
                       }, {
                         headers: {
                           auth: "Rose " + localStorage.getItem("auth")
                         }
                       })
 
                       if(response.data.success == false)
                         throw response.data as ErrorResponse
                     return response.data as editProjectNote
                    },
                    getPersonDetails : async(id: number) : Promise<Person> =>{
                        const response = await  axios
                        .get(APIS.PERSON_DETAILS, {
                            headers: {
                                auth: "Rose " + localStorage.getItem("auth"),
                                id: JSON.stringify(id) 
                            },
                        })
                        if(response.data.success == false)
                         throw response.data as ErrorResponse
                        return response.data.res[0] as Person
                        
                    },
                    getGeneralNote : async(id: number) :Promise<generalNoteList> =>{
                        const response = await  axios
                        .get(APIS.GENERAL_NOTES, {
                            headers: {
                                auth: "Rose " + localStorage.getItem("auth"),
                                peopleid: JSON.stringify(id)
                            },
                        })
                        if(response.data.success == false)
                         throw response.data as ErrorResponse
                        return response.data as generalNoteList
                    },
                    getProjectNote : async(peopleId: number, projectId: number) :Promise<projectNoteList> =>{
                        const response = await  axios
                        .get(APIS.PROJECT_NOTES, {
                            headers: {
                                auth: "Rose " + localStorage.getItem("auth"),
                                peopleid: JSON.stringify(peopleId),
                                projectid : projectId
                            },
                        })
                        if(response.data.success == false)
                         throw response.data as ErrorResponse
                        return response.data as projectNoteList
                   },
                   addGeneralNotes : async(name : string| null, date: string,note : string,reminder: string,peopleId: string | number) : Promise<AddResponse> =>{
                    const response = await axios.post(APIS.ADD_GENERAL_NOTES,
                        {
                          name: name,
                          date: date,
                          notes: note,
                          reminder: reminder,
                          peopleId: peopleId, 
                        },
                        {
                          headers: {
                            auth: "Rose " + localStorage.getItem("auth"),
                          },
                        }
                      );

                      if(response.data.success == false)
                       throw response.data as ErrorResponse

                       return response.data as AddResponse
                   },

                   addProjectNotes : async(name : string| null, date: string,note : string,reminder: string,peopleId: number, projectId : number) : Promise<AddResponse> =>{
                    const response = await axios.post(APIS.ADD_PROJECT_NOTES,
                        {
                          name: name,
                          date: date,
                          notes: note,
                          reminder: reminder,
                          peopleId: peopleId,
                          projectId : projectId 
                        },
                        {
                          headers: {
                            auth: "Rose " + localStorage.getItem("auth"),
                          },
                        }
                      );

                      if(response.data.success == false)
                       throw response.data as ErrorResponse

                       return response.data as AddResponse
                   }

                   }
                 
      

export default SERVICES;