// export const HOST = 'https://crm-api.conceptdash.ca'
export const HOST = 'http://localhost:8080'

// get apis
export const GET_ALL_USERS = '/api/get/customers'
export const GET_ALL_SHIPPERS = '/api/get/shippers'
export const LOGISTICS_DASHBOARD = '/api/getDashboard/logistics'
export const SUPPLIERS_DASHBOARD = '/api/getDashboard/suppliers'
export const GET_ALL_ORDERS = '/api/get/orders'
export const GET_ALL_SUPPLIERS = '/api/get/suppliers'
export const GET_PURCHASE_DETAILS = '/api/get/purchaseDetails'
export const INVENTORY_PURCHASED = '/api/get/inventoryPurchased'
export const TOP_SALES = '/api/topSales'
export const TOP_EMPLOYEES = '/api/topEmployees'
export const GET_PAGE_EMPLOYEES = '/api/get/page/employees'
export const GET_ALL_SALES = '/api/getAllSales'
export const GET_ALL_EMPLOYEES = '/api/get/employees'
export const GET_TIMESHEET = '/api/get/timesheet'
export const GET_EMPLOYEENAMES = '/api/get/employeeNames'
export const GET_CUSTOMERNAMES = '/api/get/customerNames'
export const GET_ASSETS = '/api/get/assets'
export const GET_SOFTWARES = '/api/get/softwares'
export const GET_BUDGETS = '/api/get/budgets'
export const GET_COMPANIES = '/api/get/COMPANIES'
export const GET_PROJECTS = '/api/get/projects'
export const GET_PROPOSALS = '/api/get/proposals'
export const GET_RFP = '/api/get/rfp'
export const GET_RFP_ID = '/api/get/rfp/id'
export const GET_RFP_NAMES = '/api/get/list/rfp'
export const GET_TASKS = '/api/get/tasks'
export const GET_CITIES = '/api/get/list/cities'
export const GET_DEPARTMENTS = '/api/get/list/departments'
export const GET_PROJECT_CATEGORIES = '/api/get/list/projectCategories'
export const GET_BUDGET_NAMES = '/api/get/list/budgets'
export const GET_COMPANY_NAMES= '/api/get/companyNames'
export const GET_JOB_TITLES= '/api/get/jobTitles'
export const GET_DISTRIBUTORS= '/api/get/distributors'
export const GET_CONTRACTORS= '/api/get/contractors'
export const GET_PROJECT_NAMES= '/api/get/projectNames'
export const GET_TASKS_BY_ID= '/api/get/tasksById'
export const GET_PROJECT_TASKS_BY_ID= '/api/get/projectTasks/id'
export const GET_EMPLOYEE_BY_ID= '/api/get/list/employeeById'
export const GET_CHART_MEET = '/api/get/chart/meet'
export const GET_WORK_HOURS = '/api/get/chart/work'
export const GET_PROJECT_STATUS = '/api/get/project/status'
export const GET_ALL_PRIVILEGES = '/api/get/privileges'
export const GET_EMPLOYEE_PRIVILEGES = '/api/get/privilegesById'
export const GET_CUSTOMER_JOBTITLES = '/api/get/list/jobTitles'
export const GET_EXPENSE_CATEGORIES = '/api/get/list/expenseCategories'
export const GET_BUDGET_CITIES = '/api/get/list/budgetCities'
export const GET_CITY_BUDGETS = '/api/get/cityBudgets'
export const GET_CITY_BUDGETS_DATA = '/api/get/city/id'
export const GET_BUDGET_CITY = '/api/get/budgetCities'


export const DOWNLOAD_BUDGET_DESIGN = '/api/get/file/budgets'



// add apis
export const ADD_NEW_USER = '/api/addNewUser'
export const ADD_NEW_SHIPPER = '/api/addNewShipper'
export const ADD_TASK = '/api/add/task'
export const ADD_ASSET = '/api/add/asset'
export const ADD_BUDGET = '/api/add/budget'
export const ADD_COMPANY = '/api/add/company'
export const ADD_CONTACT = '/api/add/contact'
export const ADD_EMPLOYEE = '/api/add/employee'
export const ADD_JOB_TITLE = '/api/add/jobTitle'
export const ADD_ORDER = '/api/add/order'
export const ADD_PROJECT = '/api/add/project'
export const ADD_NEW_PROJECT = '/api/add/newproject'
export const ADD_PROPOSAL = '/api/add/proposal'
export const ADD_RFP = '/api/add/rfp'
export const ADD_SOFTWARE = '/api/add/software'
export const ADD_TIMESHEET = '/api/add/timesheet'
export const ADD_CITY = '/api/add/city'
export const ADD_DEPARTMENT = '/api/add/department'
export const ADD_CATEGORY = '/api/add/category'
export const ADD_EXPENSE_TRANSACTION = '/api/add/expenseTransaction'
export const ADD_EXPENSE_CATEGORY = '/api/add/expenseCategory'


//Delete APIs
export const DELETE_BUDGET = '/api/delete/budget/id'
export const DELETE_PROPOSAL = '/api/delete/proposal/id'
export const DELETE_RFP = '/api/delete/rfp/id'
export const DELETE_PROJECT = '/api/delete/project/id'
export const DELETE_CONTACT = '/api/delete/customer/id'
export const DELETE_COMPANY = '/api/delete/company/id'
export const DELETE_TRANSACTION = '/api/delete/expenseTransaction/id'



// update apis
export const UPDATE_BUDGET = '/api/update/budget'
export const UPDATE_BUDGET_CITY = '/api/update/budgetCity'
export const UPDATE_COMPANY = '/api/update/company'
export const UPDATE_CLIENT = '/api/update/client'
export const UPDATE_EMPLOYEE = '/api/update/employee'
export const UPDATE_PROJECT = '/api/update/project'
export const UPDATE_PROPOSAL = '/api/update/proposal'
export const UPDATE_RFP = '/api/update/rfp'
export const UPDATE_TASK = '/api/update/task'
export const UPDATE_PROJECT_TASK_5 = '/api/update/projectTask5'
export const UPDATE_PROJECT_TASK_4 = '/api/update/projectTask4'
export const UPDATE_PRIVILEGE = '/api/update/privileges'
export const UPDATE_EXPENSE_TRANSACTION = '/api/update/expenseTransaction'

//counts
export const COUNTS = '/api/get/counts'
export const RFP_ANALYSIS = '/api/get/chart/rfp'
export const PROPOSAL_STATUS_COUNTS = '/api/get/status/proposal'
export const BUDGET_AMOUNT = '/api/get/chart/budget'

// login
export const LOGIN = '/api/login'


// Pagination and search and filtering
export const GET_PAGE_BUDGETS = '/api/get/page/budgets'
export const GET_PAGE_PROJECTS = '/api/v2/get/page/projects'
export const GET_PAGES_BUDGETS = '/api/get/pages/budgets'
export const GET_PAGE_COMPANIES = '/api/get/page/companies'
export const GET_PAGES_COMPANIES = '/api/get/pages/companies'
export const GET_PAGE_RFPS = '/api/get/page/rfps'
export const GET_PAGES_RFPS = '/api/get/pages/rfps'
export const GET_PAGE_PROPOSALS = '/api/get/page/proposals'
export const GET_PAGES_PROPOSALS = '/api/get/pages/proposals'
export const GET_PAGE_CUSTOMERS = '/api/get/customer'
export const GET_PAGES_CUSTOMERSS = '/api/get/pages/customers'
export const GET_EXPENSE_TRANSACTIONS = '/api/get/page/expenseTransactions'

//Google APIs
export const GET_GOOGLE_DRIVE_URL = '/google-api/get/fileLink'