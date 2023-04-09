import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,//dynamically referring apiSLice
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),//with getDefaultMiddleware you can get default also extra middlewares 
    devTools: true //default true
})

setupListeners(store.dispatch) //for refetchOnFocus and refetchOnReconnect behaviors.