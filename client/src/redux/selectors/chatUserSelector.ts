import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectChatUsersData = (state: RootState) => state.userState.chatUsers;
const selectSearchTerm = (state: RootState) => state.userState.userSearchTerm;

export const selectFilteredChatUsers = createSelector(
    [selectChatUsersData, selectSearchTerm],
    (chatUsers, searchTerm) => {
        if (!searchTerm) return chatUsers;
        return chatUsers?.filter((user) =>
            user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
);