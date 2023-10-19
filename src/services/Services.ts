import axios from "axios";
import APIS, { BASE_URL } from "../constants/APIS";

axios.defaults.baseURL = BASE_URL 

const SERVICES = {
    serverStatus: async () => {
        try{
            const response = await axios.get(APIS.SERVER_STATUS);
            return response.data;
        } catch(error) {
            throw error;
        }
    },
};

export default SERVICES;