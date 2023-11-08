declare module "Services"{
    export interface ErrorResponse {
        success : boolean,
        error : string,
        description : Object
    }

    export interface RfpStatusResponse {
        success : boolean,
        res : Array<{
            Total : number | string,
            Month : number | string,
            Percent : number | string
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
            Employee_ID : number | string,
            Full_Name : string,
        }>
    }

    export interface GetRfpsResponse {
        success : boolean,
        res : Array<RFP>,
        totalPages : number
    }

    export interface UpdateRfpStatusResponse {
        success : boolean,
        res : Object
    }

    export interface UpdateRfpDateResponse {
        success : boolean,
        res : Object
    }

    export interface GetGoogleDriveUrlResponse {
        success : boolean,
        res : string | null
    }

    export interface AddRfpResponse {
        success : boolean
    }

    export interface DeleteResponse {
        success : boolean
    }
}