import axios from "axios";
import APIS from "../constants/APIS.ts";
import { AddRfpResponse, DeleteResponse, ErrorResponse, GetCitiesResponse, GetDepartmetnsResponse, GetGoogleDriveUrlResponse, GetManagerNamesResponse, GetProjectCategoriesResponse, GetRfpsResponse, RfpStatusResponse, UpdateRfpDateResponse, UpdateRfpResponse, UpdateRfpStatusResponse } from "Services";
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

    rfpStatus: async (): Promise<RfpStatusResponse> => {
        try {
            const response = await axios.get(APIS.GET_RFP_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if (response.data.success === false) {
                throw response.data as ErrorResponse
            }
            return response.data as RfpStatusResponse;
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
            const response = await axios.get(APIS.GET_MANAGERS, {
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

    updateRfpStatus: async (rfpId: number, action: string): Promise<UpdateRfpStatusResponse> => {
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
            return response.data as UpdateRfpStatusResponse;
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

    updateRfpDate: async (rfpId: number, field: string, date: string): Promise<UpdateRfpDateResponse> => {
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
            return response.data as UpdateRfpDateResponse;
        } catch (error) {
            throw error;
        }
    },


    updateRfp: async (id: number, departmentId: number | string, projectCatId: number | string, source: string, projectManagerId: number | string, startDate: string, submissionDate: string, projectName: string, rfpNumber: string, client: string, cityId: number | string, remarks: string): Promise<UpdateRfpResponse> => {
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
            return response.data as UpdateRfpResponse;
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

    addRfp: async (form: FormData): Promise<AddRfpResponse> => {
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
            return response.data as AddRfpResponse;
        } catch (error) {
            throw error;
        }
    },
};

export default SERVICES;