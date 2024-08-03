import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../Slices/ContactSlices';
import loaderReducer from '../Slices/loaderSlice';

/**
 * Configures the Redux store with the provided reducers.
 * Here, we are combining the contacts and loader reducers.
 */
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    loader: loaderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
