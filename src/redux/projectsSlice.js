import { createSlice } from "@reduxjs/toolkit";

export const projectSlice = createSlice({
    name: 'projects',
    initialState: {
        newProjects: 0,
        percentage: 0,
        ongoingProjects: 0,
        completedProjects: 0,
        totalProjects: 0,
        projects: [],
    },
    reducers: {
        initProjects: (state, action) => {
            state.projects = [];
            state.projects.push(...action.payload)
        },
        initData: (state, action) => {
            state.newProjects = action.payload.newProjects;
            state.percentage = action.payload.percentage;
            state.ongoingProjects = action.payload.ongoingProjects;
            state.completedProjects = action.payload.completedProjects;
            state.totalProjects = action.payload.totalProjects
        },
        increment: (state, action) => {
            switch(action.payload){
                case 'NEW_PROJECTS':
                    state.newProjects += 1;
                    state.percentage = ((state.newProjects/state.totalProjects)*100).toFixed(2)
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
            }
        },
        decrement: (state, action) => {
            switch(action.payload){
                case 'NEW_PROJECTS':
                    state.newProjects -= 1;
                    state.percentage = ((state.newProjects/state.totalProjects)*100).toFixed(2)
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
            }
        },
        addProject: (state, action) => {
            state.projects.push(action.payload)
        },
        updateProject: (state, action) => {
            const { projectId, data } = action.payload;
            state.projects = state.projects.map((project) =>
              project.projectId === projectId ? { ...project, ...data } : project
            );
        },
        deleteProject: (state, action) => {
            const projectIdToDelete = action.payload;
            state.projects = state.projects.filter((project) => project.projectId !== projectIdToDelete);
        }
    }
});

export const selectNewProjects = (state) => state.projects.newProjects
export const selectPercentage = (state) => state.projects.percentage
export const selectOngoingProjects = (state) => state.projects.ongoingProjects
export const selectCompletedProjects = (state) => state.projects.completedProjects
export const selectTotalProjects = (state) => state.projects.totalProjects
export const selectProjects = (state) => state.projects.projects

export const { increment, decrement, addProject, deleteProject, updateProject, initData, initProjects } = projectSlice.actions 
export default projectSlice.reducer