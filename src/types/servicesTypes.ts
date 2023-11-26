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
        res : Array<{
            Count : number,
            Status : string
        }>
    }

    export interface GetCitiesResponse {
        success : boolean,
        res : Array<{
            City_ID : number | string,
            City : string,
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
}