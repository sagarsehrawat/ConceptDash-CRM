const ttm = [
  {
    TaskID: 1,
    parentID: 0,
    TaskName: "Project initiation",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 2,
        TaskName: "Project Initiation meeting",
        StartDate: new Date(),
        Duration: 0,
        Progress: 0,
        resources: [1],
        info: "Measure the total property area alloted for construction",
        hrs: [2, 3, 5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
        visibility: true,
        status: 1,
        childId: 0,
      },
      {
        TaskID: 3,
        TaskName: "Background data collection and Field review",
        StartDate: new Date(),
        Duration: 0,
        Progress: 0,
        Predecessor: "",
        resources: [2, 3, 5],
        info:
          "Obtain an engineered soil test of lot where construction is planned." +
          "From an engineer or company specializing in soil testing",
        hrs: [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 1,
        childId: 1,
      },
      {
        TaskID: 4,
        TaskName: "Public and Stakeholder Consultation",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 5,
        TaskName: "Review meeting with City/Municipality/Town/County",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 6,
        TaskName: "Obtaining necessary permits",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 7,
        TaskName: "Pre-design Site visit",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 5,
      },
      {
        TaskID: 8,
        TaskName: "Preliminary Survey",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 6,
      },
      {
        TaskID: 9,
        TaskName: "Traffic Count",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 7,
      },
      {
        TaskID: 10,
        TaskName: "Identification of Problem/ Opportunity",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 8,
      },
    ],
  },
  {
    TaskID: 11,
    parentID: 1,
    TaskName: "Environmental Assessment (Project Dependent)",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 12,
        TaskName: "Development of Alternative Solutions",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 13,
        TaskName:
          "Development of Alternative Design concepts for preferred solution",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 14,
        TaskName: "Environmental Study Report (ESR)",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 15,
        TaskName: "Public Information Centre",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 3,
      },
    ],
  },
  {
    TaskID: 16,
    parentID: 2,
    TaskName: "Site Investigations (Project Dependent)",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 17,
        TaskName: "Topographic Survey",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 18,
        TaskName: "Legal Survey",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 19,
        TaskName: "Geotechnical Investigation",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 20,
        TaskName: "SUE Investigation",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 21,
        TaskName: "CCTV Inspection",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 22,
        TaskName: "Hydrogeological Investigation",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 5,
      },
      {
        TaskID: 23,
        TaskName: "Environmental Assessment",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 6,
      },
    ],
  },
  {
    TaskID: 24,
    parentID: 3,
    TaskName: "Preliminary Design ",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 25,
        TaskName: "Preliminary Design (30%)",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 26,
        TaskName: "Preliminary Design - Submission and Review",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 27,
        TaskName: "Traffic Control Plan and Construction Staging",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 28,
        TaskName: "Review meeting with City/Municipality/Town/County",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 29,
        TaskName: "Coordination meeting with relevant authorities",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 30,
        TaskName: "Public Information Centre",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 5,
      },
    ],
  },
  {
    TaskID: 31,
    parentID: 4,
    TaskName: "Detailed Design (60%)",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 32,
        TaskName: "Detailed Design (60%)",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 33,
        TaskName: "Detailed Design (60%) - Submission and Review",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 34,
        TaskName: "Streetlight Design",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 35,
        TaskName: "Streetscaaping and Landscaping",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 36,
        TaskName: "Property Acquisition Plan",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 37,
        TaskName: "Soil Management Plan",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 5,
      },
      {
        TaskID: 38,
        TaskName: "Traffic Control Plan and Construction Staging",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 6,
      },
    ],
  },
  {
    TaskID: 39,
    parentID: 5,
    TaskName: "Detailed Design (90%)",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 40,
        TaskName: "Detailed Design (90%)",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 41,
        TaskName: "Detailed Design (90%) - Submission and Review",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 42,
        TaskName: "Traffic Control Plan and Construction Staging",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 43,
        TaskName: "Agency and Regulatory Approvals",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 44,
        TaskName: "Review meeting with City/Municipality/Town/County",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 45,
        TaskName: "Coordination with affected landowners and stakeholder",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 5,
      },
      {
        TaskID: 46,
        TaskName: "Finalization of Traffic Management Plan",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 6,
      },
    ],
  },
  {
    TaskID: 47,
    parentID: 6,
    TaskName: "Final Design",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 48,
        TaskName: "FInal Design - Submission and Review",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 49,
        TaskName: "Preparationa nd Submission of Final Engineering drawings",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 50,
        TaskName: "Draft Quantitiy Take-off and Cost Estimation",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 2,
      },
    ],
  },
  {
    TaskID: 47,
    parentID: 7,
    TaskName: "Tender",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 48,
        TaskName:
          "Preparation and submission of detailed cost estimate and tender documents",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 49,
        TaskName:
          "Review of tender submissions and provide recommendation letter for the award of the tender/construction contract",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
    ],
  },
  {
    TaskID: 50,
    parentID: 8,
    TaskName: "Contract Administration and Inscpection Services",
    StartDate: new Date(),
    EndDate: new Date(),
    subtasks: [
      {
        TaskID: 51,
        TaskName: "Pre-construction meeting",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 0,
      },
      {
        TaskID: 52,
        TaskName: "Contract Administration",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 1,
      },
      {
        TaskID: 53,
        TaskName: "Construction Inspection",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 2,
      },
      {
        TaskID: 54,
        TaskName: "As-built drawings",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: true,
        status: 0,
        childId: 3,
      },
      {
        TaskID: 55,
        TaskName: "Completion and Warranty site inspections",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 4,
      },
      {
        TaskID: 56,
        TaskName: "Maintenance Period Support",
        StartDate: new Date(),
        Duration: 0,
        Predecessor: "",
        Progress: 0,
        hrs: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        visibility: false,
        status: 0,
        childId: 5,
      },
    ],
  },
];

const designations = [
  {
    Designation: 'Project Management',
    children: ['Project Manager', 'Project director', 'QA/QC Lead and Risk Manager'],
  },
  {
    Designation: 'Design',
    children: ['Technical Design Lead', 'Transportation Planning and Engineering Lead'],
  },
  {
    Designation: 'Design Team',
    children: ['Roadway Designers', 'Watermain, Sanitary and Storm Sewer Designers', 'Cad Technician'],
  },
  {
    Designation: 'Transportation, Traffic Engineering, Traffic control plans and Utility Coordination',
    children: ['Transportation, Traffic Engineering, Traffic control plans and Utility Coordination'],
  },
  {
    Designation: 'Bids and Tender Preparation Team',
    children: ['Take off Engineer', 'Junior Engineer'],
  },
  {
    Designation: 'Contract administration and Construction Inspection',
    children: ['Contract Administrator', 'Site Inspector'],
  },
];

const employeeInfo = [
  ['Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1', 'Test 1'],
  [100, 200, 30, 60, 70, 80, 100, 30, 30, 30, 30, 30, 30],
];

export default {ttm, designations, employeeInfo};
