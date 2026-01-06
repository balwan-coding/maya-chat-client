import { configureStore } from "@reduxjs/toolkit";
import sagaMiddlerware, { rootSaga } from "./sagas";
import reduser from "./slices";

// type ActionCreater<T> = (...args: any) => { type: string; payload: T };

export type State = ReturnType<typeof reduser>;

const store = configureStore({
  reducer: reduser,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(sagaMiddlerware),
});

sagaMiddlerware.run(rootSaga);

export default store;
