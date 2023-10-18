import axios from "axios";
import APIS from "../constants/APIS";

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