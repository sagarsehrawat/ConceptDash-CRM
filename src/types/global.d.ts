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
        child_projects: number[] | null;
        child_projects_info: Project[] | null;
        city: string | null;
        city_id: string | null;
        date_created: moment.Moment;
        department: string | null;
        department_id: string | null;
        roster: string | null;
        roster_id: string | null;
        project_category: string | null;
        project_category_id: string | null;
        due_date: moment.Moment;
        folder_id: string | null;
        follow_up_date: moment.Moment;
        contract_accepted_date: moment.Moment;
        contract_expiry_date: moment.Moment;
        project_code: string | null;
        project_id: number;
        project_manager: string | null;
        project_manager_id: string | null;
        project_name: string;
        project_type: string;
        project_value: string | null;
        status: string;
        description: string | null;
        team_member_ids: number[];
        team_members: {team_member_id: string | number, team_member_name: string}[];
        tasklist: any | null;
        extra_info: {
            priority: string;
            clientResponse: string | null;
            requestSentTo: string | null;
            requestRecievedOn: moment.Moment;
            designChecklist: string[] | null;
            designInfo: string[] | null;
        } | null;
    }

    interface Department {
        department_id : number,
        department : string
    }

    type TypeaheadOptions =  Array<{label: string, value: string}>
}