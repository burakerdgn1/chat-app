import { AddPhotoAlternate, AttachFile, Send } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { StyledTextField, ChatBoxContainer } from "./ChatAreaText.styles";
import useSendMessage from "../../../hooks/useSendMessage";

const ChatAreaText = () => {
  const { message, setMessage, handleSendMessage, selectedUser } =
    useSendMessage();

  return (
    <ChatBoxContainer
      component="form"
      onSubmit={handleSendMessage}
      disabled={!selectedUser}
    >
      <StyledTextField
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") handleSendMessage(e);
        }}
        variant="outlined"
        placeholder="Type a message"
        multiline
        rows={2}
        value={message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="attach file" disabled>
                <AttachFile />
              </IconButton>
              <IconButton aria-label="add photo" disabled>
                <AddPhotoAlternate />
              </IconButton>
              <IconButton aria-label="send message" type="submit">
                <Send />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </ChatBoxContainer>
  );
};

export default ChatAreaText;
