import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from './slices/userSlice';
import messageReducer from './slices/messagesSlice'
import { userApi } from "./api/userApi";
import { messageApi } from "./api/messageApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [messageApi.reducerPath]: messageApi.reducer,
        messageState: messageReducer,
        userState: userReducer,

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, messageApi.middleware])

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;