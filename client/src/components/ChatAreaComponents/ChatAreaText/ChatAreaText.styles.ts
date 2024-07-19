import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";

interface ChatBoxProps {
    disabled?: boolean;
}

export const ChatBoxContainer = styled(Box) <ChatBoxProps>`
    height: 100px;
    display: flex;
    width: 100%;
    padding: 0.5 0;
    box-sizing: border-box;
    overflow: hidden;
    min-height: 100px;
    border: 1px solid black;
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  `;

export const StyledTextField = styled(TextField)`
  margin: 8px;
  height: 100%;
  width: 100%;
`;
