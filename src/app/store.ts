import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import baseApi from './api/baseApi/baseApi';
import modalReducer from './slices/modalSlice';
import { migrateOldCache } from './tokenManager';

// Eski 'rtk_cache' dan tokenlarni migrate qilish
migrateOldCache();

// RTK Query cache'ini localStorage'ga persist qilish
const persistConfig = {
  key: 'rtk_query_cache',
  storage,
  // Faqat RTK Query cache'ini saqlash
  // blacklist ichida hech narsa yo'q — butun baseApi state persist bo'ladi
};

const persistedBaseReducer = persistReducer(persistConfig, baseApi.reducer);

const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: persistedBaseReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // redux-persist action'larini serializableCheck'dan o'tkazmaslik
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
  devTools: import.meta.env.DEV,
});

// refetchOnFocus va refetchOnReconnect ni yoqish
setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
