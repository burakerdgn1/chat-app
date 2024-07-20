import { ChatSearch } from "../SideBarComponents/ChatSearch/ChatSearch";
import { Divider } from "@mui/material";
import { ChatUserList } from "../SideBarComponents/ChatUserList/ChatUserList";
import { ChatNav } from "../SideBarComponents/ChatNav/ChatNav";
import { useGetChatUsersQuery } from "../../redux/api/userApi";
import { useDispatch } from "react-redux";
import { setChatUsers } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import { StyledDrawer } from "./SideBar.styles";

const SideBar = () => {
  const {
    data: chatUsers,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetChatUsersQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess && chatUsers) {
      dispatch(setChatUsers(chatUsers));
    }
    if (isError) {
      console.log(error);
    }
  }, [chatUsers, dispatch, isSuccess, isError, error]);

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <ChatNav />
      <Divider />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <ChatSearch />
          <Divider />
          <ChatUserList />
        </>
      )}
    </StyledDrawer>
  );
};

export default SideBar;
