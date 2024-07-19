import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setMessages, addMessage } from "../slices/messagesSlice";
import { Message } from "../../types/Message";
import { GetMessages } from "../types/message/messages.response";
import { MessageResponse } from "../types/message/message.response";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/messages",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], GetMessages>({
      query: ({ currentUserId, requestedUserId }) => ({
        url: `/${currentUserId}/${requestedUserId}`,
        method: "GET",
      }),
      async onQueryStarted(
        { currentUserId, requestedUserId },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMessages({ userId: requestedUserId, messages: data }));
        } catch (err) {
          console.error("Failed to fetch messages:", err);
        }
      },
    }),
    sendMessage: builder.mutation<MessageResponse, Message>({
      query: (message) => ({
        url: "/create",
        method: "POST",
        body: message,
      }),
      transformResponse: (response: { data: { message: MessageResponse } }) =>
        response.data.message,
      async onQueryStarted(message, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            addMessage({
              userId: data.messageSent.receiverId!,
              message: data.messageSent,
            })
          );
        } catch (err) {
          console.error("Failed to send message:", err);
        }
      },
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messageApi;
