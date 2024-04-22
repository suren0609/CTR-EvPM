import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGraphData, IGraphInitialState } from "../types";

const initialState: IGraphInitialState = {
  graphData: {},
  eventType: "click",
  graphLoading: true,
};

export const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {
    setGraphData: (state, { payload }: PayloadAction<IGraphData>) => {
      state.graphData = payload;
    },
    setEventType: (state, { payload }: PayloadAction<string>) => {
      state.eventType = payload;
    },
    setGraphLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.graphLoading = payload;
    },
  },
});

export const { setGraphData, setEventType, setGraphLoading } =
  graphSlice.actions;
