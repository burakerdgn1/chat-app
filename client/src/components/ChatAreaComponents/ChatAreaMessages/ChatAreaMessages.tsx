import { Box } from "@mui/material";
import { useAppSelector } from "../../../redux/store";
import { LoadingSpinner } from "../../LoadingSpinner/LoadingSpinner";

import { ChatAreaMessage } from "../ChatAreaMessage/ChatAreaMessage";
import useChatMessages from "../../../hooks/useChatMessages";

export const ChatAreaMessages = () => {
  const currentUser = useAppSelector((state) => state.userState.user);
  const user = useAppSelector((state) => state.userState.selectedUser);
  const { conversations, lastMessageRef, isLoading, isSuccess } =
    useChatMessages(currentUser, user);

  return (
    <Box>
      {isLoading && <LoadingSpinner />}
      {isSuccess &&
        user &&
        Array.isArray(conversations[user?.id]) &&
        conversations[user.id]?.map((message, index) => (
          <div key={message.id} ref={lastMessageRef}>
            <ChatAreaMessage user={user} message={message} key={index} />
          </div>
        ))}
    </Box>
  );
};
