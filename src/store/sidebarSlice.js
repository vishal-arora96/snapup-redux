import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSidebarOpen: false
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSidebarOpen: (state) => {
      state.isSidebarOpen = true;
    },
    setSidebarClose: (state) => {
      state.isSidebarOpen = false;
    }
  }
});

export const { setSidebarOpen, setSidebarClose } = sidebarSlice.actions;
export const getSidebarStatus = (state) => state.sidebar.isSidebarOpen;
export const sidebarReducer = sidebarSlice.reducer;
