import axios from "axios";
import APIS from "../constants/APIS.ts";
import { AddResponse, DeleteResponse, ErrorResponse, GetCitiesResponse, GetDepartmetnsResponse, GetGoogleDriveUrlResponse, GetManagerNamesResponse, GetProjectCategoriesResponse, GetRfpsResponse, RfpCountResponse, ProjectCountResponse, GetRostersListResponse, GetEmployeesListResponse, GetProjectsResponse, UpdateResponse, GetProjectById, GetTrackingRfpsResponse, BudgetCountResponse, GetBudgetCitiesResponse, GetCityBudgetResponse, ProposalCountResponse ,GetProposalsResponse,GetProposalById, GetOrganizationsListResponse} from "Services";
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

    updateBudgetCity1: async (year22: string, year23: string, remarks: string, id: number, population: string, geographicArea: string, municipalityType: string, cityId: number): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_BUDGET_CITY1,
                {
                    year22,
                    year23,
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

    updateBudgetCity2: async (year22: string, year23: string, remarks: string, id: number, website: string, website22: string, website23: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.put(APIS.UPDATE_BUDGET_CITY2,
                {
                    year22,
                    year23,
                    remarks,
                    id,
                    website,
                    website22,
                    website23
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


    updateRfp: async (id: number, departmentId: number | string, projectCatId: number | string, source: string, projectManagerId: number | string, startDate: string, submissionDate: string, projectName: string, rfpNumber: string, client: string, cityId: number | string, remarks: string): Promise<UpdateResponse> => {
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
};

export default SERVICES;