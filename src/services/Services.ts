import axios from "axios";
import APIS, { BASE_URL } from "../constants/APIS";
import { ErrorResponse, RfpStatusResponse } from "Services";

axios.defaults.baseURL = BASE_URL

interface Services {
    serverStatus: () => Promise<any>;
    rfpStatus: () => Promise<RfpStatusResponse>;
}

const SERVICES : Services = {
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
    }
};

export default SERVICES;