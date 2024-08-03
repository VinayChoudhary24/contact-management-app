import { configureStore } from '@reduxjs/toolkit';
import contactsReducer  from '../Slices/ContactSlices';
import loaderReducer from '../Slices/loaderSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;