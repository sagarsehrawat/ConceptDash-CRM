import { createSlice } from "@reduxjs/toolkit";

export const rfpSlice = createSlice({
    name: 'rfps',
    initialState: {
        newRFPs: 0,
        percentage: 0,
        totalRFPs: 0,
        rfps: [],
    },
    reducers: {
        initRFPs: (state, action) => {
            state.rfps = [];
            state.rfps.push(...action.payload)
        },
        addRFP: (state, action) => {
            state.rfps.push(action.payload)
        },
        updateRFP: (state, action) => {
            const { rfpId, data } = action.payload;
            state.rfps = state.rfps.map((rfp) =>
              rfp.RFP_ID === rfpId ? { ...rfp, ...data } : rfp
            );
        },
        deleteRFP: (state, action) => {
            const rfpIdToDelete = action.payload;
            state.rfps = state.rfps.filter((rfp) => rfp.RFP_ID !== rfpIdToDelete);
        }
    }
});

export const selectNewRFPs = (state) => state.rfps.newProjects
export const selectPercentage = (state) => state.rfps.percentage
export const selectTotalRFPs = (state) => state.rfps.totalProjects
export const selectRFPs = (state) => state.rfps.projects

export const { initRFPs, addRFP, updateRFP, deleteRFP } = rfpSlice.actions 
export default rfpSlice.reducer