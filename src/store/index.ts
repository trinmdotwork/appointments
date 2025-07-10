import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';

import appReducer from './app';
import appointmentsReducer from './appointments';

const store = configureStore({
  reducer: {
    app: appReducer,
    appointments: appointmentsReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type TRootState = ReturnType<typeof store.getState>;

// Infer the type of `store`
export type TAppStore = typeof store;
// Infer the `AppDispatch` type from the store itself
export type TAppDispatch = TAppStore['dispatch'];
export type TAppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  TRootState,
  unknown,
  Action
>;
export default store;
