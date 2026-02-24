import { configureStore } from '@reduxjs/toolkit';
import baseApi from './api/baseApi';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
