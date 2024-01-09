import moment from "moment";

export {};


declare global{
    interface RFP {
        rfp_id : number,
        action : string,
        city_id : number | null,
        city : string | null,
        client : string | null,
        client_id : number | null,
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
        submission_date : moment.Moment,
        organizations: {
            organization_id: number,
            organization_name: string
        }[] | null
    }

    interface Project {
        child_projects: number[] | null;
        child_projects_info: Project[] | null;
        city: string | null;
        city_id: string | null;
        client_id: string | null;
        company_name: string | null;
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

    interface Proposal {
        proposal_id : number,
        city_id : string | null,
        city : string | null,
        department_id: string | null,
        project_name: string | null,
        question_deadline: moment.Moment,
        closing_deadline: moment.Moment,
        client : string | null,
        client_id: string | null,
        project_manager_id: string | null,
        design_price : string | null,
        provisional_items: string | null,
        contract_admin_price: string | null,
        sub_consultant_price: string | null,
        winning_price: string | null,
        winning_bidder: string | null,
        project_category_id: string | null,
        created_at: moment.Moment,
        result: string,
        debriefing: string | null,
        folder_id: string | null,
        team_members:  {team_member_id: string | number, team_member_name: string}[];
        bookmark: number[] | null,
        priority: string,
        proposal_generator_link: string | null,
        rating: string | null,
        plantaker_list: string[] | null,
        bidder_list: string[] | null,
        client_contact_details: string | null,
        project_category: string | null,
        department: string | null,
        province: string | null,
        country: string | null,
        municipality_type: string | null,
        project_manager: string | null,
        total_bid_price: string | null,
        plantakers_list: string[] | null,
        bidders_list: string[] | null,
        project_cat_id: string | null,
        debriefing_notes: string | null,
        source: string | null,
        partner_names: string[] | null,
        partner_members: {partner_member_id: string | number, partner_member_name: string}[];
        
    }

    interface Department {
        department_id : number,
        department : string
    }

    type TypeaheadOptions =  Array<{label: string, value: string}>

    interface City {
        city_id: number;
        city: string;
        province: string;
        country: string;
        population_2021: string;
        website: string;
        municipality_type: string;
        municipality_status: string;
        geographic_area: string;
        geographical_coordinates: string[];
        city_budget_id: number;
        year_22: string;
        website_22: string;
        year_23: string;
        website_23: string;
        remarks: string;
        capital_budget_23: number | null;
        city_coordinates: string[];
    }

    interface Budget {
        budget_id: number;
        city_id: number;
        city: string;
        department_id: number | null;
        department: string | null;
        project_cat_id: number | null;
        project_category: string | null;
        project_name: string;
        budget_category: string;
        budget_amount: number | null;
        budget_year: string;
        source: string | null;
        serial_no: string | null;
    }

    interface Invoice {
        invoice_id: number;
        invoice_code: string;
        due_date: moment.Moment | string;
        date_created: moment.Moment | string;
        project_id: number;
        project_name: string;
        project_code: string;
        bill_to: number | null;
        ship_to: number | null;
        company_name: string;
        address: string | null;
        business_phone: string | null;
        payment_status: 'Recieved' | 'Overdue' | 'Pending';
        invoice_status: 'Pending' | 'Denied' | 'Approved';
        subtotal: number;
        total: number;
        project_value: number | null;
        discount: number | null;
        tax: number;
        recieved_amount: number | null;
        shipping: number | null;
        rows: {
            description: string;
            quantity: number;
            unit: number;
            unitPrice: number;
            total: number;
        }[];
    }

    interface InvoiceProject {
        project_id: number;
        project_code: string;
        project_name: string;
        recieved: number | null;
        pending: number | null;
        overdue: number | null;
        project_value: number | null;
        recieved_amount: number | null;
        balance: number | null;
    }
}