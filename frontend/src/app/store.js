import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import scanReducer from "../features/scanSlice"
import reportReducer from "../features/reportSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        scan: scanReducer,
        report: reportReducer
    },
});

export default store;