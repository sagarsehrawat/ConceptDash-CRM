const APIS = {
    BASE_URL : 'https://crm-api.conceptdash.ca',
    // BASE_URL : 'http://localhost:8080',
    SERVER_STATUS : `/`,
    GET_RFP_COUNT : '/api/get/rfp/count',
    GET_PROJECT_CHART: '/api/get/chart/project',
    GET_CITIES : '/api/get/list/cities',
    GET_DEPARTMENTS : '/api/get/list/departments',
    GET_PROJECT_CATEGORIES : '/api/get/list/projectCategories',
    GET_MANAGERS : '/api/get/list/managers',
    GET_RFPS : '/api/get/page/rfps',
    UPDATE_RFP_STATUS : '/api/update/rfp/status',
    UPDATE_RFP_DATE : '/api/update/rfp/date',
    GET_GOOGLE_DRIVE_URL : '/google-api/get/fileLink'
};

export default APIS;