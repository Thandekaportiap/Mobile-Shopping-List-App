import { configureStore } from '@reduxjs/toolkit';
import listsReducer from './src/features/listsSlice';
import authReducer from './src/features/authSlice';

export const store = configureStore({
  reducer: {
    lists: listsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
