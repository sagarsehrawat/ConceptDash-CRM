import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface RFPState {
  newRFPs: number | string;
  percentage: number | string;
  totalRFPs: number | string;
  rfps: RFP[];
}

interface RFPStatus {
    Total : number | string,
    Month : number | string,
    Percent : number | string
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
      state.rfps = action.payload.map(rfp => ({
        ...rfp,
        submission_date: moment(rfp.submission_date),
        created_at: moment(rfp.created_at),
        start_date: moment(rfp.start_date),
      }));
    },
    initData: (state, action: PayloadAction<RFPStatus>) => {
      state.newRFPs = action.payload.Month;
      state.percentage = action.payload.Percent;
      state.totalRFPs = action.payload.Total;
    },
    addRFP: (state, action: PayloadAction<RFP>) => {
      state.rfps = [action.payload, ...state.rfps];
    },
    updateRFP: (state, action: PayloadAction<{ rfpId: number; data: Partial<RFP> }>) => {
      const { rfpId, data } = action.payload;
      state.rfps = state.rfps.map((rfp) =>
        rfp.rfp_id === rfpId ? { ...rfp, ...data } : rfp
      );
    },
    deleteRFP: (state, action: PayloadAction<string | number>) => {
      const rfpIdToDelete = action.payload;
      state.rfps = state.rfps.filter((rfp) => rfp.rfp_id !== rfpIdToDelete);
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
