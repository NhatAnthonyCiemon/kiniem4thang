import { configureStore } from '@reduxjs/toolkit';
import reogridReducer from './reogridSlice';

export const store = configureStore({
    reducer: {
        reogrid: reogridReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
