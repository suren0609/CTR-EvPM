// import { configureStore } from "@reduxjs/toolkit";
// import saga from "redux-saga";
// import { all, fork } from "redux-saga/effects";

// import { rootReducer } from "./rootReducer";

// import { watchGraphSaga } from "./sagas/graphSaga";

// function* RootSaga() {
//   yield all([fork(watchGraphSaga)]);
// }

// const sagaMiddleware = saga();

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [sagaMiddleware],
//   devTools: process.env.NODE_ENV !== "production",
// });

// sagaMiddleware.run(RootSaga);

// export type RootState = ReturnType<typeof store.getState>;

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";

import { rootReducer } from "./rootReducer";
import { watchGraphSaga } from "./sagas/graphSaga";
import { watchTableSaga } from "./sagas/tableSaga";

function* rootSaga() {
  yield all([fork(watchGraphSaga), fork(watchTableSaga)]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
