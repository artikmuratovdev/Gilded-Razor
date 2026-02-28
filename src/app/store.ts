import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import baseApi from './api/baseApi/baseApi';
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';
import { migrateOldCache } from './tokenManager';

// Eski 'rtk_cache' dan tokenlarni migrate qilish
migrateOldCache();

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

// refetchOnFocus va refetchOnReconnect ni yoqish
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
