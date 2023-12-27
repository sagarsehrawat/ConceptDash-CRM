const APIS = {
    BASE_URL : 'https://crm-api.conceptdash.ca',
    // BASE_URL : 'http://localhost:8080',
    SERVER_STATUS : `/`,
    GET_RFP_COUNT : '/api/get/rfp/count',
    GET_PROJECT_COUNT: '/project/fetch/count',
    GET_BUDGET_COUNT: '/budget/count',
    GET_CITIES : '/api/get/list/cities',
    GET_ROSTERS_LIST: '/project/roster/list',
    GET_DEPARTMENTS : '/api/get/list/departments',
    GET_PROJECT_CATEGORIES : '/api/get/list/projectCategories',
    GET_MANAGERS_LIST : '/api/get/list/managers',
    GET_EMPLOYEES_LIST : '/api/get/employeeNames',
    GET_RFPS : '/api/get/page/rfps',
    GET_TRACKING_RFPS : '/api/get/page/trackingrfps',
    GET_PROJECTS : '/project/fetch',
    GET_BUDGET_CITIES : '/budget/cities',
    GET_CITY_BUDGET : '/budget/city/budgets',
    GET_PROJECT_BY_ID : '/project/fetch/id',
    UPDATE_RFP_STATUS : '/api/update/rfp/status',
    UPDATE_BUDGET_CITY1 : '/budget/city/update1',
    UPDATE_BUDGET_CITY2 : '/budget/city/update2',
    UPDATE_RFP_RATING : '/api/update/rfp/rating',
    UPDATE_PROJECT_STATUS : '/project/update/status',
    UPDATE_RFP_DATE : '/api/update/rfp/date',
    DELETE_RFPS : '/api/delete/rfp/id',
    DELETE_BUDGET : '/budget/delete',
    GET_GOOGLE_DRIVE_URL : '/google-api/get/fileLink',
    ADD_RFP : '/api/add/rfp',
    UPDATE_RFP : '/api/update/rfp',
    ADD_PROJECT: '/project/add',
    ADD_BUDGET: '/budget/add',
    UPDATE_BUDGET: '/budget/update',
    UPDATE_PROJECT: '/project/update',
    ADD_PROPOSAL: '/proposal/add/proposal',
    GET_PROPOSAL_COUNT: '/proposal/get/proposal/count',
    GET_PROPOSALS:  '/proposal/get/page/proposals',
    GET_PROPOSALS_BY_ID:  '/proposal/get/list/proposals/id',
    UPDATE_PROPOSAL:  '/proposal/update/proposal',
    UPDATE_PROPOSAL_RESULT:  '/proposal/update/proposal/result',
    UPDATE_PROPOSAL_PRIORITY:  '/proposal/update/proposal/priority',
    UPDATE_PROPOSAL_BOOKMARK:  '/proposal/update/proposal/bookmark',
    GET_ORGANIZATION_LIST: 'client/get/organization/list',
    DELETE_PROPOSALS: 'proposal/delete/proposals',
    DELETE_PROJECT: '/project/delete'
};

export default APIS;