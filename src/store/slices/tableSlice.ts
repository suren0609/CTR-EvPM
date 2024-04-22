import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITableData, ITableInitialState } from "store/types";

const initialState: ITableInitialState = {
  tableData: {},
  tableEventType: "mm_dma",
  tableLoading: true,
};

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData: (state, { payload }: PayloadAction<ITableData>) => {
      state.tableData = payload;
    },
    setTableEventType: (state, { payload }: PayloadAction<string>) => {
      state.tableEventType = payload;
    },
    setTableLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.tableLoading = payload;
    },
  },
});

export const { setTableData, setTableEventType, setTableLoading } =
  tableSlice.actions;
