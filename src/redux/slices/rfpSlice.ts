import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RFP {
  RFP_ID: string; // Change the type to match your data structure
  // Add other fields as needed
}

interface RFPState {
  newRFPs: number;
  percentage: number;
  totalRFPs: number;
  rfps: RFP[];
}

const initialState: RFPState = {
  newRFPs: 0,
  percentage: 0,
  totalRFPs: 0,
  rfps: [],
};

const rfpSlice = createSlice({
  name: 'rfps',
  initialState,
  reducers: {
    initRFPs: (state, action: PayloadAction<RFP[]>) => {
      state.rfps = action.payload;
    },
    addRFP: (state, action: PayloadAction<RFP>) => {
      state.rfps.push(action.payload);
    },
    updateRFP: (state, action: PayloadAction<{ rfpId: string; data: Partial<RFP> }>) => {
      const { rfpId, data } = action.payload;
      state.rfps = state.rfps.map((rfp) =>
        rfp.RFP_ID === rfpId ? { ...rfp, ...data } : rfp
      );
    },
    deleteRFP: (state, action: PayloadAction<string>) => {
      const rfpIdToDelete = action.payload;
      state.rfps = state.rfps.filter((rfp) => rfp.RFP_ID !== rfpIdToDelete);
    },
  },
});

export const {
  initRFPs,
  addRFP,
  updateRFP,
  deleteRFP,
} = rfpSlice.actions;

export const selectNewRFPs = (state: { rfps: RFPState }) => state.rfps.newRFPs;
export const selectPercentage = (state: { rfps: RFPState }) => state.rfps.percentage;
export const selectTotalRFPs = (state: { rfps: RFPState }) => state.rfps.totalRFPs;
export const selectRFPs = (state: { rfps: RFPState }) => state.rfps.rfps;

export default rfpSlice.reducer;
