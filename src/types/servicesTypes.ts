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
            Percentage : number | string
        }>
    }
}