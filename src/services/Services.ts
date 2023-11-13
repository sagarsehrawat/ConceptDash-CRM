import axios from "axios";
import APIS from "../constants/APIS.ts";
import { AddResponse, DeleteResponse, ErrorResponse, GetCitiesResponse, GetDepartmetnsResponse, GetGoogleDriveUrlResponse, GetManagerNamesResponse, GetProjectCategoriesResponse, GetRfpsResponse, RfpCountResponse, ProjectCountResponse, GetRostersListResponse, GetEmployeesListResponse, GetProjectsResponse, UpdateResponse } from "Services";
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

    projectCount: async (): Promise<ProjectCountResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_CHART, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    chart: "Status",
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

    getProjectCategories: async (departmentId: string | number) : Promise<GetProjectCategoriesResponse> => {
        try {
            const response = await axios.get(APIS.GET_PROJECT_CATEGORIES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                    id: departmentId
                },
            });
            if(response.data.success === false){
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

    updateRfpStatus: async (rfpId: number, action: string): Promise<UpdateResponse> => {
        try {
            const response = await axios.post(APIS.UPDATE_RFP_STATUS,
                {
                    rfpId,
                    action,
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
            const response = await axios.post(APIS.UPDATE_RFP, form,
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
        teamMemberIds: {label:string, value: string | number}[],
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
        try{
            const extraInfo : any = {};
            if(projectType === 'Child Project')
                extraInfo.parentId = rosterId;
            if(departmentId === 1){
                extraInfo['clientResponse'] = clientResponse;
            }else if(departmentId === 8 && projectCategoryId === 68) {
                extraInfo.priority = priority;
                extraInfo.designCheckList = designCheckList;
                extraInfo.designInfo = designInfo;
            }else if(departmentId === 7){
                extraInfo['clientResponse'] = clientResponse;
                extraInfo.requestSentTo = requestSentTo;
                extraInfo.requestRecievedOn = moment(requestRecievedOn).format('YYYY-MM-DD');
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
                    dueDate: moment(dueDate).format('YYYY-MM-DD'),
                    followUpDate: moment(followUpDate).format('YYYY-MM-DD'),
                    contractAcceptedDate: moment(contractAcceptedDate).format('YYYY-MM-DD'),
                    contractExpiryDate: moment(contractExpiryDate).format('YYYY-MM-DD'),
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
        } catch(error) {
            throw error;
        }
    }
};

export default SERVICES;