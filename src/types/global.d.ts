export {};


declare global{
    interface RFP {
        rfp_id : number,
        action : string | null,
        city_id : number | null,
        city : string | null,
        client : string | null,
        created_at : string,
        department : string | null,
        department_id : number | null,
        folder_id : string | null,
        manager_name : string | null,
        project_cat_id : number | null,
        project_category: number | null,
        project_manager_id : number | null,
        project_manager : string | null,
        project_name : string,
        rfp_number : string | null,
        remarks : string | null,
        rating : number | null
        source : string | null,
        start_date : string | null,
        submission_date : string | null
    }
}