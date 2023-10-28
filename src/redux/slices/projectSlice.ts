import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
            state.projects = [];
            state.projects.push(...action.payload)
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
        updateProject: (state, action: PayloadAction<{ projectId: number; data: Partial<Project> }>) => {
            const { projectId, data } = action.payload;
            state.projects = state.projects.map((project) =>
                project.Project_Id === projectId ? { ...project, ...data } : project
            );
        },
        deleteProject: (state, action: PayloadAction<number>) => {
            const projectIdToDelete = action.payload;
            state.projects = state.projects.filter((project) => project.Project_Id !== projectIdToDelete);
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