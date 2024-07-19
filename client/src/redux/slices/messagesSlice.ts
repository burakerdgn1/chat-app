import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types/Message";

interface MessageState {
    conversations: {
        [userId: string]: Message[];
    };
}

const initialState: MessageState = {
    conversations: {},
};

const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        setMessages(state, action: PayloadAction<{ userId: string, messages: Message[] }>) {
            state.conversations[action.payload.userId] = action.payload.messages;
        },
        addMessage(state, action: PayloadAction<{ userId: string, message: Message }>) {

            if (state.conversations[action.payload.userId]) {
                state.conversations[action.payload.userId].push(action.payload.message);
            } else {
                state.conversations[action.payload.userId] = [action.payload.message];
            }
        },
        resetMessagesState: () => initialState,
    }
});

export const { setMessages, addMessage, resetMessagesState } = messageSlice.actions;
export default messageSlice.reducer;