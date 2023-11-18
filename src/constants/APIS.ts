const APIS = {
    // BASE_URL : 'https://crm-api.conceptdash.ca',
    BASE_URL : 'http://localhost:8080',
    SERVER_STATUS : `/`,
    GET_RFP_COUNT : '/api/get/rfp/count',
    GET_PROJECT_COUNT: '/project/fetch/count',
    GET_CITIES : '/api/get/list/cities',
    GET_ROSTERS_LIST: '/project/roster/list',
    GET_DEPARTMENTS : '/api/get/list/departments',
    GET_PROJECT_CATEGORIES : '/api/get/list/projectCategories',
    GET_MANAGERS_LIST : '/api/get/list/managers',
    GET_EMPLOYEES_LIST : '/api/get/employeeNames',
    GET_RFPS : '/api/get/page/rfps',
    GET_PROJECTS : '/project/fetch',
    GET_PROJECT_BY_ID : '/project/fetch/id',
    UPDATE_RFP_STATUS : '/api/update/rfp/status',
    UPDATE_PROJECT_STATUS : '/project/update/status',
    UPDATE_RFP_DATE : '/api/update/rfp/date',
    DELETE_RFPS : '/api/delete/rfp/id',
    GET_GOOGLE_DRIVE_URL : '/google-api/get/fileLink',
    ADD_RFP : '/api/add/rfp',
    UPDATE_RFP : '/api/update/rfp',
    ADD_PROJECT: '/project/add',
    UPDATE_PROJECT: '/project/update'
};

export default APIS;