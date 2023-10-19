interface RfpStatus {
    Total : number | string,
    Month : number | string,
    Percentage : number | string
}

declare module "Services"{
    export interface ErrorStatusResponse {
        success : boolean,
        error : string,
        description : Object
    }

    export interface RfpStatusResponse {
        success : boolean,
        res : Array<RfpStatus>
    }
}