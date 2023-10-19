import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Privilege {
  Privilege: string
}

interface PrivilegeState {
  privileges: Privilege[];
}

const initialState: PrivilegeState = {
    privileges: [],
};

const privilegeSlice = createSlice({
  name: 'privileges',
  initialState,
  reducers: {
    initPrivileges: (state, action: PayloadAction<Privilege[]>) => {
      state.privileges = action.payload;
    },
  },
});

export const {
  initPrivileges,
} = privilegeSlice.actions;

export const selectPrivileges = (state: { privileges: PrivilegeState }) => state.privileges.privileges;

export default privilegeSlice.reducer;
