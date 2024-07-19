import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginResponse } from '../types/auth/login.response';
import { LoginRequest } from '../types/auth/login.request';
import { RegisterResponse } from '../types/auth/register.response';
import { RegisterRequest } from '../types/auth/register.request';
import { resetUserState } from '../slices/userSlice';
import { resetMessagesState } from '../slices/messagesSlice';
import { messageApi } from './messageApi';
import { userApi } from './userApi';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api/auth',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,

            }),
            async onQueryStarted(_args, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data.token && data.user) {
                        localStorage.setItem('token', data.token);
                    }
                } catch (error) { }
            },
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (newUser) => ({
                url: '/register',
                method: 'POST',
                body: newUser
            })
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    localStorage.removeItem('token');
                    dispatch(resetUserState());
                    dispatch(resetMessagesState());
                    dispatch(messageApi.util.resetApiState());
                    dispatch(authApi.util.resetApiState());
                    dispatch(userApi.util.resetApiState())

                } catch (error) {
                    console.error('Logout failed', error);
                }
            },

        })

    }),

});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;