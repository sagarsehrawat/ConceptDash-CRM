import { createSlice } from "@reduxjs/toolkit";

const campaignListSlice = createSlice({
  name: "campaignList",
  initialState: {
    unselectedLists: [],
    unselectedListsCopy: [],
    selectedLists: [],
    selectedListsCopy: [],
    lists: [],
    isLoading: false,
    isError: false,
    data: {
      // template: {
      //   tmpid: 4,
      //   tmpname: "Concept Dash",
      //   subject: "Hey {{contact.FIRSTNAME}}",
      //   params: ["mirror", "unsubscribe"],
      //   contactparams: ["FIRSTNAME"],
      //   status: "active",
      //   createdat: "2024-01-02T04:22:09.516Z",
      // },
      // params: { mirror: "", unsubscribe: "", "contact.FIRSTNAME": "" },
    },
    files: [],
    isFileAccedingMaxSize: false,
  },
  reducers: {
    setUnselectedLists: (state, action) => {
      state.unselectedLists = action.payload;
    },
    setUnselectedListsCopy: (state, action) => {
      state.unselectedListsCopy = action.payload;
    },
    setSelectedLists: (state, action) => {
      state.selectedLists = action.payload;
    },
    setSelectedListsCopy: (state, action) => {
      state.selectedListsCopy = action.payload;
    },
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setFiles: (state, action) => {
      state.files = action.payload;
    },
    setIsFileAccedingMaxSize: (state, action) => {
      state.isFileAccedingMaxSize = action.payload;
    },
    setToDefault: (state, action) => {
      state.selectedLists = [];
      state.selectedListsCopy = [];
      state.unselectedLists = action.payload;
      state.unselectedListsCopy = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.data = {};
      state.files = [];
      state.isFileAccedingMaxSize = false;
    },
  },
  //   extraReducers: (builder) => {
  //     builder.addCase(fetchLists.pending, (state, action) => {
  //         state.isLoading = true;
  //     })
  //     builder.addCase(fetchLists.fulfilled,(state, action) => {
  //         state.isLoading = false;
  //         let data = action.payload;
  //         data.sort(catSort);
  //         state.unselectedLists = data;
  //         state.unselectedListsCopy = data;
  //         state.lists = data;
  //     })
  //     builder.addCase(fetchLists.rejected,(state,action) => {
  //         state.isLoading = false;
  //         state.isError = true;
  //     })
  //   }
});

export const {
  setUnselectedLists,
  setUnselectedListsCopy,
  setSelectedLists,
  setSelectedListsCopy,
  setLists,
  setIsLoading,
  setIsError,
  setData,
  setFiles,
  setIsFileAccedingMaxSize,
  setToDefault,
} = campaignListSlice.actions;

export default campaignListSlice.reducer;
