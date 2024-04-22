import { createAction } from "@reduxjs/toolkit";

export const getGraphDataAction = createAction<{ eventType: string }>(
  "getGraphDataAction"
);

export const getTableDataAction = createAction<{ eventType: string }>(
  "getTableDataAction"
);
