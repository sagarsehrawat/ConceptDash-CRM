const APIS = {
    BASE_URL : 'https://crm-api.conceptdash.ca',
    //  BASE_URL : 'http://localhost:8080',
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
    GET_PROJECT_LIST : '/project/fetch/list',
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
    DELETE_PROPOSALS: 'proposal/delete/proposals',
    DELETE_PROJECT: '/project/delete',
    GET_INVOICES: '/finance/invoices',
    GET_PROJECT_INVOICES: '/finance/projects/id',
    GET_INVOICE_PROJECTS: '/finance/projects',
    GET_INVOICE_DETAILS: '/finance/invoice/details',
    GET_FINANCE_COUNT: '/finance/header',
    GENERATE_PROJECT_INVOICE: '/finance/invoice/generate',
    // CAMPAIGN
    CAMPAIGN_BASE_URL: "https://ses-campaign.conceptdash.ca",
    GET_CATEGORIES: "/ses/category/get?q=*",
    GET_TEMPLATES(q: string){
        return `/ses/template/get?q=${q}`;
    },
    SEND_CAMPAIGN: "/ses/campaign/send",
    GET_CAMPAIGN(text: string,page: number){
        return `/ses/campaign/get?text=${text === "" ? "*" : text}&page=${page}`
    },
    GET_CAMPAIGN_BY_ID(cmpId: number){
        return `/ses/campaign/report/number?cmpId=${cmpId}`
    },
    GET_CAMPAIGN_CONTACT_REPORT(cmpId: number, page: number, event: string){
        return `/ses/campaign/report/contact?cmpId=${cmpId}&page=${page}&event=${event}`
    },

    // Client 

    ORGANIZATION_COUNT:'/client/get/organization/count',
 PEOPLE_COUNT:'/client/get/people/count',
 ADD_PEOPLE : '/client/add/people',
 ADD_ORGANIZATION : '/client/add/organization',
 UPDATE_ORGANIZATION : '/client/update/organization',
 DELETE_ORGANIZATION : '/client/delete/organization',
 UPDATE_PEOPLE : '/client/update/people',
 DELETE_PEOPLE : '/client/delete/people',
 ALL_PEOPLE_IN_ORGANIZATION:'/client/get/people/all',
 GET_ORGANIZATION_LIST : '/client/get/organization/list',
 GET_ALL_ORGANIZATION:'/client/get/page/organization',
 GET_ALL_PEOPLE:'/client/get/page/people',
 ORGANIZATION_DETAILS:'/client/get/organization',
 PERSON_DETAILS:'/client/get/people',

 GENERAL_NOTES:'/client/get/people/generalchats',
 PROJECT_NOTES:'/client/get/people/projectspecific',
 ADD_GENERAL_NOTES:'/client/add/people/generalchats',
 ADD_PROJECT_NOTES:'/client/add/people/projectspecific', 

 UPDATE_GENERAL_NOTES:"/client/update/people/generalchats",
 UPDATE_PROJECT_NOTES:"/client/update/people/projectspecific",

 DELETE_GENERAL_NOTES:'/client/delete/people/generalchat',
 DELETE_PROJECT_NOTES:'/client/delete/people/projectspecific',
//  DELETE_GENERAL_NOTES:"/client/delete/people/generalchats"

 UPDATE_ORGANIZATION_LABEL : "/client/update/organization/label",
 UPDATE_PEOPLE_LABEL:'/client/update/people/label',
 UPDATE_ORGANIZATION_CONTACT_TPYE :"/client/update/organization/contacttype",
 UPDATE_PEOPLE_CONTACT_TPYE :"/client/update/people/contacttype"

};

export default APIS;