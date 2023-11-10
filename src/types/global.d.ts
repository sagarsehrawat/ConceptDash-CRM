import moment from "moment";

export {};


declare global{
    interface RFP {
        rfp_id : number,
        action : string,
        city_id : number | null,
        city : string | null,
        client : string | null,
        created_at : moment.Moment,
        department : string | null,
        department_id : number | null,
        folder_id : string | null,
        manager_name : string | null,
        project_cat_id : number | null,
        project_category: string | null,
        project_manager_id : number | null,
        project_manager : string | null,
        project_name : string,
        rfp_number : string | null,
        remarks : string | null,
        rating : number | null
        source : string | null,
        start_date : moment.Moment,
        submission_date : moment.Moment
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