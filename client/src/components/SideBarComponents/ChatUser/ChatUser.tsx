import { Person } from "@mui/icons-material";
import React from "react";
import {
  UserContainer,
  UserBadge,
  UserImage,
  UserAvatar,
  UserNameTypography,
} from "./ChatUser.styles";

interface ChatUserProps {
  id: string;
  userName: string;
  fullName: string;
  isOnline: boolean;
  profilePhotoSrc: string;
}

export const ChatUser: React.FC<ChatUserProps> = ({
  userName,
  fullName,
  id,
  isOnline,
  profilePhotoSrc,
}) => {
  return (
    <UserContainer>
      <UserBadge
        color={isOnline ? "success" : "default"}
        variant="dot"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        {profilePhotoSrc ? (
          <UserImage src={profilePhotoSrc} alt={fullName} id={id} />
        ) : (
          <UserAvatar>
            <Person />
          </UserAvatar>
        )}
      </UserBadge>
      <UserNameTypography as="span">{fullName}</UserNameTypography>
    </UserContainer>
  );
};
