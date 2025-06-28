import { configureStore } from "@reduxjs/toolkit";
import formBuilderReducer from "./formBuilderSlice";
import sidebarReducer from "./sidebarSlice";

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
