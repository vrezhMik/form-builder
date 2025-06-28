import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SidebarState {
  currentTab: number;
}

const initialState: SidebarState = {
  currentTab: 0,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setCurrentTab(state, action: PayloadAction<number>) {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = sidebarSlice.actions;
export default sidebarSlice.reducer;
