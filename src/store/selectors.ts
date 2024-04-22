import { RootState } from "store";

export const graphSelector = (state: RootState) => state.graph;
export const tableSelector = (state: RootState) => state.table;
