import React from "react";
import { ChatUser } from "../ChatUser/ChatUser";
import { Divider, List, ListItem, ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../../../redux/slices/userSlice";
import { useAppSelector } from "../../../redux/store";
import { selectFilteredChatUsers } from "../../../redux/selectors/chatUserSelector";
const ChatUserList = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(selectFilteredChatUsers);

  const handleOnUserClick = (user: {
    id: string;
    fullName: string;
    userName: string;
    email: string;
    isOnline: boolean;
    role: string;
    profilePicture: string;
  }) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <List sx={{ flex: 1 }}>
      {users?.map((user) => (
        <React.Fragment key={user.id}>
          <ListItem
            disablePadding
            id={user.id}
            onClick={() => handleOnUserClick(user)}
          >
            <ListItemButton id={user.id}>
              <ChatUser
                userName={user.userName}
                fullName={user.fullName}
                id={user.id}
                isOnline={user.isOnline}
                profilePhotoSrc={user.profilePicture}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default ChatUserList;
