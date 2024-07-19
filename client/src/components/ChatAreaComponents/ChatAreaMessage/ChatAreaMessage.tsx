import { Typography } from "@mui/material";
import React from "react";
import { Person } from "@mui/icons-material";
import { IUser } from "../../../redux/types/user/user";
import { useAppSelector } from "../../../redux/store";
import { formatDate } from "../../../utils/formatDate";
import {
  MessageContainer,
  MessageInnerContainer,
  MessagePaper,
  StyledAvatar,
  StyledImage,
  TimestampTypography,
} from "./ChatAreaMessage.styles";
import { Message } from "../../../types/Message";

interface ChatMessageProps {
  user: IUser;
  message: Message;
}

export const ChatAreaMessage: React.FC<ChatMessageProps> = ({
  user,
  message,
}) => {
  const currentUser = useAppSelector((state) => state.userState.user);
  const formattedTimestamp = formatDate(message.timestamp);

  return (
    <MessageContainer
      justifyContent={
        message.senderId !== currentUser?.id ? "flex-start" : "flex-end"
      }
    >
      <MessageInnerContainer
        alignSelf={
          message.senderId !== currentUser?.id ? "flex-start" : "flex-end"
        }
      >
        {message.receiverId === currentUser?.id &&
          (user.profilePicture ? (
            <StyledImage src={user.profilePicture} alt="pp" />
          ) : (
            <StyledAvatar>
              <Person />
            </StyledAvatar>
          ))}
        <MessagePaper
          elevation={3}
          borderRadius={
            message.receiverId !== currentUser?.id
              ? "10px 0 10px 10px"
              : "0 10px 10px 10px"
          }
        >
          <Typography>{message.content}</Typography>
        </MessagePaper>
      </MessageInnerContainer>
      <TimestampTypography
        variant="body2"
        alignSelf={
          message.senderId !== currentUser?.id ? "flex-start" : "flex-end"
        }
      >
        {formattedTimestamp}
      </TimestampTypography>
    </MessageContainer>
  );
};
