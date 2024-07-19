import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setChatUsers, setUser } from "../slices/userSlice";
import { authApi } from "./authApi";
import { IUser } from "../types/user/user";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/users",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<IUser, void>({
      query: () => "/me",
      transformResponse: (response: { data: { user: IUser } }) =>
        response.data.user,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error: any) {
          if (error.status === 401) {
            localStorage.removeItem("token");
            dispatch(authApi.endpoints.logout.initiate());
          }
        }
      },
    }),
    getChatUsers: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: (response: { data: { users: IUser[] } }) =>
        response.data.users,
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setChatUsers(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    uploadProfilePicture: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/upload-pp",
        method: "POST",
        body: formData,
      }),
    }),

    // update: builder.mutation<void, void>({
    //     query: (newUser) => ({
    //         url: '/update',
    //         method: 'PATCH',
    //         body: newUser
    //     })
    // }),
  }),
});

export const {
  useGetMeQuery,
  useGetChatUsersQuery,
  useUploadProfilePictureMutation,
} = userApi;
