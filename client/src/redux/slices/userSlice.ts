import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types/user/user";

interface IUserState {
    user: IUser | null;
    chatUsers: IUser[] | null;
    selectedUser: SelectedUser | null;
    userSearchTerm: string | null;

}
interface SelectedUser {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    isOnline: boolean;
    role: string;
    profilePicture: string;
}

const initialState: IUserState = {
    user: null,
    chatUsers: null,
    selectedUser: null,
    userSearchTerm: ''
}

const userSlice = createSlice({
    initialState,
    name: 'user',
    reducers: {
        setUser: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload;
        },
        setChatUsers: (state, action: PayloadAction<IUser[] | null>) => {
            state.chatUsers = action.payload;
        },
        setSelectedUser: (state, action: PayloadAction<SelectedUser>) => {
            state.selectedUser = action.payload;
        },
        updateOnlineUsers(state, action: PayloadAction<string[]>) {
            if (state.chatUsers) {
                state.chatUsers = state.chatUsers.map(user => ({
                    ...user,
                    isOnline: action.payload.includes(user.id),
                }));
            }
        },
        changeUserSearchTerm(state, action) {
            state.userSearchTerm = action.payload;
        },
        resetUserState: () => initialState
    }
});

export default userSlice.reducer;

export const { setUser, setChatUsers, setSelectedUser, changeUserSearchTerm, updateOnlineUsers, resetUserState } = userSlice.actions;