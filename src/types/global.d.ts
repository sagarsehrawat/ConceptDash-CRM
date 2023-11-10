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
        project_id : number,
        city : string | null,
        city_id : number | null,
        client_id : number | null,
        country : string | null,
        date_created : moment.Moment,
        department_id : number | null,
        department: string | null,
        employee_id : number | null,
        folder_id : string | null,
        follow_up_notes : string | null,
        geaographic_area : string | null,
        manager_name : string | null,
        municipal_status : string | null,
        municipality_type : string | number,
        next_follow_up : string | null,
        notes : string | null,
        population_2021 : string | number | null,
        project_cat_id : number | null,
        project_code : string | null,
        project_due_date : moment.Moment,
        project_manager_id : numbner | null,
        project_name : string,
        project_value : number | null,
        province : string | null,
        status : string | null,
        team_members : string | null,
        website : string | null,
        dept : string | null,
        project_type: string
    }

    interface Department {
        department_id : number,
        department : string
    }
}