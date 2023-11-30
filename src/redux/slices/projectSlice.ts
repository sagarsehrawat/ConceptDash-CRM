import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

interface ProjectState {
    newProjects: number,
    percentage: number,
    ongoingProjects: number,
    completedProjects: number,
    totalProjects: number,
    projects: Project[],
}

interface ProjectStatus {
    newProjects: number,
    percentage: number,
    ongoingProjects: number,
    completedProjects: number,
    totalProjects: number,
}

const initialState: ProjectState = {
    newProjects: 0,
    percentage: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    totalProjects: 0,
    projects: [],
}

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        initProjects: (state, action: PayloadAction<Project[]>) => {
            state.projects = action.payload.map(project => ({
                ...project,
                date_created: moment(project.date_created),
                due_date: moment(project.due_date),
                follow_up_date: moment(project.follow_up_date),
                contract_accepted_date: moment(project.contract_accepted_date),
                contract_expiry_date: moment(project.contract_expiry_date)
            }));
        },
        initData: (state, action: PayloadAction<ProjectStatus>) => {
            state.newProjects = action.payload.newProjects;
            state.percentage = action.payload.percentage;
            state.ongoingProjects = action.payload.ongoingProjects;
            state.completedProjects = action.payload.completedProjects;
            state.totalProjects = action.payload.totalProjects
        },
        increment: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case 'NEW_PROJECTS':
                    state.newProjects += 1;
                    state.percentage = parseFloat(((state.newProjects / state.totalProjects) * 100).toFixed(2));
                    break;
                case 'ONGOING_PROJECTS':
                    state.ongoingProjects += 1;
                    break;
                case 'COMPLETED_PROJECTS':
                    state.completedProjects += 1;
                    break;
                case 'TOTAL_PROJECTS':
                    state.totalProjects += 1;
                    break;
                default:
                    break;
            }
        },
        decrement: (state, action: PayloadAction<string>) => {
            switch (action.payload) {
                case 'NEW_PROJECTS':
                    state.newProjects -= 1;
                    state.percentage = parseFloat(((state.newProjects / state.totalProjects) * 100).toFixed(2));
                    break;
                case 'ONGOING_PROJECTS':
                    state.ongoingProjects -= 1;
                    break;
                case 'COMPLETED_PROJECTS':
                    state.completedProjects -= 1;
                    break;
                case 'TOTAL_PROJECTS':
                    state.totalProjects -= 1;
                    break;
                default:
                    break;
            }
        },
        addProject: (state, action: PayloadAction<Project>) => {
            state.projects.push(action.payload)
        },
        updateProject: (state, action: PayloadAction<{ projectId: number; data: Partial<Project>; parentId: number | null; }>) => {
            const { projectId, data, parentId } = action.payload;
            if (parentId === null) {
                state.projects = state.projects.map((project) =>
                    project.project_id === projectId ? { ...project, ...data } : project
                );
            } else {
                state.projects = state.projects.map((project) =>
                    project.project_id === parentId
                        ? {
                            ...project,
                            child_projects_info: project.child_projects_info ? project.child_projects_info.map((prev) =>
                                prev.project_id === projectId
                                    ? { ...prev, ...data }
                                    : prev
                            ) : null
                        }
                        : project
                );
            }
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            const projectIdToDelete = action.payload;
            state.projects = state.projects.filter((project) => project.project_id !== projectIdToDelete);
        }
    }
});

export const selectNewProjects = (state: { projects: ProjectState }) => state.projects.newProjects
export const selectPercentage = (state: { projects: ProjectState }) => state.projects.percentage
export const selectOngoingProjects = (state: { projects: ProjectState }) => state.projects.ongoingProjects
export const selectCompletedProjects = (state: { projects: ProjectState }) => state.projects.completedProjects
export const selectTotalProjects = (state: { projects: ProjectState }) => state.projects.totalProjects
export const selectProjects = (state: { projects: ProjectState }) => state.projects.projects

export const { increment, decrement, addProject, deleteProject, updateProject, initData, initProjects } = projectSlice.actions
export default projectSlice.reducer