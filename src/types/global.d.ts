export {};


declare global{
    interface RFP {
        RFP_ID : number,
        Action : string | null,
        City_ID : number | null,
        City : string | null,
        Client : string | null,
        Created_At : moment.Moment,
        Department : string | null,
        Department_ID : number | null,
        Folder_ID : string | null,
        Manager_Name : string | null,
        Project_Cat_ID : number | null,
        Project_Category: number | null,
        Project_Manager_ID : number | null,
        Project_Manager : string | null,
        Project_Name : string,
        RFP_ID : number,
        RFP_Number : string | null,
        Remarks : string | null,
        Rating : number | null
        Source : string | null,
        Start_Date : moment.Moment | null,
        Submission_Date : moment.Moment | null
    }
}