import axios from "axios";
import APIS, { BASE_URL } from "../constants/APIS";
import { RfpStatusResponse } from "Services";

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

    rfpStatus: async () : Promise<RfpStatusResponse | Error> => {
        try {
            const response = await axios.get(APIS.GET_RFP_COUNT, {
                headers: {
                    auth: "Rose " + localStorage.getItem("auth"),
                },
            });
            if(response.data.success === false)
            return response.data as RfpStatusResponse;
        } catch (error) {
            throw error;
            return error as 
        }
    }
};

export default SERVICES;