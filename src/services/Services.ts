import axios from "axios";
import APIS, { BASE_URL } from "../constants/APIS";
import { ErrorResponse, GetCitiesResponse, GetDepartmetnsResponse, GetManagerNames, RfpStatusResponse } from "Services";

axios.defaults.baseURL = BASE_URL

const SERVICES = {
    serverStatus: async () => {
        try {
            const response = await axios.get(APIS.SERVER_STATUS);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    rfpStatus: async () : Promise<RfpStatusResponse> => {
        try {
            const response = await axios.get(APIS.GET_RFP_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if(response.data.success === false){
                throw response.data as ErrorResponse
            }
            return response.data as RfpStatusResponse;
        } catch (error) {
            throw error;
        }
    },

    getCities: async () : Promise<GetCitiesResponse> => {
        try {
            const response = await axios.get(APIS.GET_CITIES, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if(response.data.success === false){
                throw response.data as ErrorResponse
            }
            return response.data as GetCitiesResponse;
        } catch (error) {
            throw error;
        }
    },

    getDepartments: async () : Promise<GetDepartmetnsResponse> => {
        try {
            const response = await axios.get(APIS.GET_DEPARTMENTS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if(response.data.success === false){
                throw response.data as ErrorResponse
            }
            return response.data as GetDepartmetnsResponse;
        } catch (error) {
            throw error;
        }
    },

    // getProjectCategories: async () : Promise<GetDepartmetnsResponse> => {
    //     try {
    //         const response = await axios.get(APIS.GET_PROJECT_CATEGORIES, {
    //             headers: {
    //                 auth: "Rose " + localStorage.getItem("auth"),
    //             },
    //         });
    //         if(response.data.success === false){
    //             throw response.data as ErrorResponse
    //         }
    //         return response.data as GetDepartmetnsResponse;
    //     } catch (error) {
    //         throw error;
    //     }
    // },

    getManagers: async () : Promise<GetManagerNames> => {
        try {
            const response = await axios.get(APIS.GET_MANAGERS, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if(response.data.success === false){
                throw response.data as ErrorResponse
            }
            return response.data as GetManagerNames;
        } catch (error) {
            throw error;
        }
    },
};

export default SERVICES;