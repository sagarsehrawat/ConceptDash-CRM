declare module "Services"{
    export interface ErrorResponse {
        success : boolean,
        error : string,
        description : Object
    }

    export interface RfpCountResponse {
        success : boolean,
        res : Array<{
            Total : number | string,
            Month : number | string,
            Percent : number | string
        }>
    }

    export interface ProjectCountResponse {
        success : boolean,
        res : {
            total_projects: number,
            completed_projects: number,
            ongoing_projects: number,
            new_projects: number,
            percentage_change: number
        }
    }

    export interface BudgetCountResponse {
        success : boolean,
        res : {
            year_23: 'Not Found' | 'Draft Budget' | 'Done';
            count: number;
        }[]
    }

    export interface ProposalCountResponse {
        success : boolean,
        res : Array<{
            total_proposals: number ,
            won_proposals: number ,
            lost_proposals: number ,
            month: number ,
            percent: number
        }>
    }

    export interface GetCitiesResponse {
        success : boolean,
        res : Array<{
            City_ID : number | string,
            City : string,
        }>
    }

    export interface GetOrganizationsListResponse {
        success : boolean,
        res : Array<{
            company_id : number | string,
            company_name : string,
        }>
    }

    export interface GetDepartmetnsResponse {
        success : boolean,
        res : Array<{
            Department_ID : number | string,
            Department : string,
        }>
    }

    export interface GetRostersListResponse {
        success : boolean,
        res : Array<{
            project_id : number,
            project_name : string,
        }>
    }

    export interface GetProjectCategoriesResponse {
        success : boolean,
        res : Array<{
            Project_Cat_ID : number,
            Project_Category : string,
        }>
    }
    export interface GetManagerNamesResponse {
        success : boolean,
        res : Array<{
            Employee_ID : number,
            Full_Name : string,
        }>
    }

    export interface GetEmployeesListResponse {
        success: boolean,
        res: {
            Employee_ID : number,
            Full_Name : string
        }[]
    }

    export interface GetRfpsResponse {
        success : boolean,
        res : Array<RFP>,
        totalPages : number
    }

    export interface GetTrackingRfpsResponse {
        success : boolean,
        res : Array<RFP>
    }

    export interface GetProjectsResponse {
        success : boolean,
        res : Array<Project>,
        totalPages : number
    }

    export interface GetBudgetCitiesResponse {
        success : boolean,
        res : Array<City>,
    }

    export interface GetCityBudgetResponse {
        success : boolean,
        res : Array<Budget>,
        totalAmount: number
    }

    export interface GetProposalsResponse {
        success : boolean,
        res : Array<Proposal>,
        totalPages : number
    }

    export interface UpdateResponse {
        success : boolean,
    }

    export interface GetGoogleDriveUrlResponse {
        success : boolean,
        res : string | null
    }

    export interface AddResponse {
        success : boolean
    }

    export interface DeleteResponse {
        success : boolean
    }

    export interface UpdateRfpResponse {
        success : boolean,
        res : Object
    }

    export interface GetProjectById {
        success : boolean,
        res : Project
    }

    export interface GetProposalById {
        success : true,
        res : Proposal
    }

    export interface GetInvoicesResponse {
        success: boolean,
        res: Invoice[]
    }

    export interface GetInvoiceDetailResponse {
        success: boolean,
        res: Invoice
    }

    export interface GetFinanceCountResponse {
        success: boolean,
        res: {
            recieved: number | null;
            pending: number | null;
            overdue: number | null;
            total: number | null;
        }
    }
        
    export interface GetInvoiceProjectResponse {
        success: boolean,
        res: InvoiceProject[]
    }

    export interface orgLableUpdateResponce {
            success: boolean,
            res:Organization
    }
    export interface peopleLabelUpdateResponce {
        success : boolean,
        res: Person
    }

    export interface getOrganizationsResponce {
        success: boolean
        res: Array<Organization>
        totalPages: number
    }
    export interface getPeopleResponce {
        success: boolean
        res: Array<Person>
        totalPages: number
    }
    export interface OrganizationList {
        success : boolean
        res : Array<{company_id : number, company_name : string}>
    }
    export interface OrgPeopleCount {
        success:boolean
        res : Array <{
                company_type: string,
                count_per_type: string,
                total_count: string
        }>
    }

    export interface orgDetails {
        
           success : boolean,
           res : Array<Person>
        
    }
    export interface editProjectNote {
        success : boolean,
        res : Array <{
            date : string,
            name : string,
            note : string,
            reminder : boolean,
            reminderDate : string
        }>
    }
    export interface editGeneralNote {
        success : boolean,
        res : Array <{
            date : string,
            name : string,
            note : string,
            reminder : boolean,
            reminderDate : string
        }>
    }
        export interface generalNoteList {
            success : boolean
            res : Array<{
                general : Array<{
                    date : string,
                    name : string,
                    note : string,
                    reminder : boolean,
                    reminderDate : string 
                }>
            }>
    }
    export interface getAllPeopleInOrganization {
        success : boolean
        res : Array<Person>
    }
}