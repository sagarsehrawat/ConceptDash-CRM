export const BASE_URL = 'https://crm-api.conceptdash.ca';
// export const BASE_URL = 'http://localhost:8080'

const APIS = {
    SERVER_STATUS : `/`,
    GET_RFP_COUNT : '/api/get/rfp/count',
    GET_CITIES : '/api/get/list/cities',
    GET_DEPARTMENTS : '/api/get/list/departments',
    GET_PROJECT_CATEGORIES : '/api/get/list/projectCategories',
    GET_MANAGERS : '/api/get/list/managers',
    GET_RFPS : '/api/get/page/rfps'
};

export default APIS;