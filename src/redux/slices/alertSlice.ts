import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AlertState {
    successMessage: string;
    errorMessage: string;
}

const initialState: AlertState = {
    successMessage: '',
    errorMessage: ''
}

const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showSuccessModal: (state, action: PayloadAction<string>) => {
            state.successMessage = action.payload;
        },
        showErrorModal: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
        removeSuccessModal: (state) => {
            state.successMessage = "";
        },
        removeErrorModal: (state) => {
            state.errorMessage = "";
        }
    }
});

export const {
    showSuccessModal,
    showErrorModal,
    removeErrorModal,
    removeSuccessModal
} = alertSlice.actions;

export const selectSuccessMessage = (state: {alerts: AlertState}) : string => state.alerts.successMessage;
export const selectErrorMessage = (state: {alerts: AlertState}) : string => state.alerts.errorMessage;

export default alertSlice.reducer;