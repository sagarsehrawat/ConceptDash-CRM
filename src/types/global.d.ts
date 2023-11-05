import moment from "moment";

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
        Start_Date : moment.Moment,
        Submission_Date : moment.Moment
    }

    interface Project {
        Project_Id : number,
        City : string | null,
        City_ID : number | null,
        Client_ID : number | null,
        Country : string | null,
        Date_Created : moment.Moment,
        Department_ID : number | null,
        Department: string | null,
        Employee_ID : number | null,
        Folder_ID : string | null,
        Follow_Up_Notes : string | null,
        Geaographic_Area : string | null,
        Manager_Name : string | null,
        Municipal_Status : string | null,
        Municipality_Type : string | number,
        Next_Follow_Up : string | null,
        Notes : string | null,
        PO : string | null,
        PO_Amount : number | null,
        PO_Date : moment.Moment,
        Population_2021 : string | number | null,
        Project_Cat_ID : number | null,
        Project_Code : string | null,
        Project_Due_Date : moment.Moment,
        Project_Manager_ID : numbner | null,
        Project_Name : string,
        Project_Value : number | null,
        Province : string | null,
        Status : string | null,
        Team_Members : string | null,
        Website : string | null,
        dept : string | null,
        project_type: string
    }

    interface Department {
        Department_ID : number,
        Department : string
    }
}