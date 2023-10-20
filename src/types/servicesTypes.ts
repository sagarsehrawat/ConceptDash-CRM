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
            Department_ID : number | string,
            Department : string,
        }>
    }

    export interface GetManagerNames {
        success : boolean,
        res : Array<{
            Employee_ID : number | string,
            Full_Name : string,
        }>
    }
}