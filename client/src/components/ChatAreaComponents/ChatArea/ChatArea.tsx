import { ChatAreaMessages } from "../ChatAreaMessages/ChatAreaMessages";
import { ChatAreaNav } from "../ChatAreaNav/ChatAreaNav";
import { ChatAreaText } from "../ChatAreaText/ChatAreaText";
import { ChatMessagesContainer, StyledChatArea } from "./ChatArea.styles";

export const ChatArea = () => {
  return (
    <>
      <StyledChatArea>
        <ChatAreaNav />
        <ChatMessagesContainer>
          <ChatAreaMessages />
        </ChatMessagesContainer>
        <ChatAreaText />
      </StyledChatArea>
    </>
  );
};