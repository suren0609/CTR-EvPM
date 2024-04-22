import { combineReducers } from "@reduxjs/toolkit";
import { graphSlice } from "./slices/graphSlice";
import { tableSlice } from "./slices/tableSlice";

export const rootReducer = combineReducers({
  [graphSlice.name]: graphSlice.reducer,
  [tableSlice.name]: tableSlice.reducer,
});
