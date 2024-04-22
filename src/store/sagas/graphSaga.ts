import { AxiosResponse } from "axios";
import { IGraphData } from "../types";
import { getGraphDataService } from "../../services/getGraphDataService";
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { setGraphData, setGraphLoading } from "../slices/graphSlice";
import { getGraphDataAction } from "../actions";

function* getGraphSaga(action: PayloadAction<{ eventType: string }>) {
  try {
    const { data }: AxiosResponse<IGraphData> = yield call(
      getGraphDataService,
      action.payload.eventType
    );
    yield put(setGraphData(data));
    yield put(setGraphLoading(false));
  } catch (error) {
    return error;
  }
}

export function* watchGraphSaga() {
  yield takeLatest(getGraphDataAction.type, getGraphSaga);
}
