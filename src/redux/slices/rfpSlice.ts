import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RFPState {
  newRFPs: number;
  percentage: number;
  totalRFPs: number;
  rfps: RFP[];
}

interface RFPStatus {
    Total : number | string,
    Month : number | string,
    Percentage : number | string
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
    initData: (state, action: PayloadAction<RFPStatus>) => {

    },
    addRFP: (state, action: PayloadAction<RFP>) => {
      state.rfps.push(action.payload);
    },
    updateRFP: (state, action: PayloadAction<{ rfpId: string | number; data: Partial<RFP> }>) => {
      const { rfpId, data } = action.payload;
      state.rfps = state.rfps.map((rfp) =>
        rfp.RFP_ID === rfpId ? { ...rfp, ...data } : rfp
      );
    },
    deleteRFP: (state, action: PayloadAction<string | number>) => {
      const rfpIdToDelete = action.payload;
      state.rfps = state.rfps.filter((rfp) => rfp.RFP_ID !== rfpIdToDelete);
    },
  },
});

export const {
  initRFPs,
  initData,
  addRFP,
  updateRFP,
  deleteRFP,
} = rfpSlice.actions;

export const selectNewRFPs = (state: { rfps: RFPState }) => state.rfps.newRFPs;
export const selectPercentage = (state: { rfps: RFPState }) => state.rfps.percentage;
export const selectTotalRFPs = (state: { rfps: RFPState }) => state.rfps.totalRFPs;
export const selectRFPs = (state: { rfps: RFPState }) => state.rfps.rfps;

export default rfpSlice.reducer;
