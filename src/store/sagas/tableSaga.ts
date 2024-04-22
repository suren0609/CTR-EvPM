import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { getTableDataService } from "services/getTableDataService";
import { getTableDataAction } from "store/actions";
import { setTableData, setTableLoading } from "store/slices/tableSlice";
import { ITableData } from "store/types";

function* getTableSaga(action: PayloadAction<{ eventType: string }>) {
  try {
    const { data }: AxiosResponse<ITableData> = yield call(
      getTableDataService,
      action.payload.eventType
    );

    yield put(setTableData(data));
    yield put(setTableLoading(false));
  } catch (error) {
    return error;
  }
}

export function* watchTableSaga() {
  yield takeLatest(getTableDataAction.type, getTableSaga);
}
