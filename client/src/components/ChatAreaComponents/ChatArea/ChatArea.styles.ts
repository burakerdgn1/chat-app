import { Box, styled } from "@mui/material";

export const StyledChatArea = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: auto;
  height: 100%; // Ensure the ChatArea takes the full height available in the container
`;

export const ChatMessagesContainer = styled(Box)`
  flex: 1;
  background-color: #e3f7ff;
  padding: 16px;
  gap: 8px;
  background-image: url("/jbg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  min-height: 250px;
  overflow: auto;
`;