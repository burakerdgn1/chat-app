import { Badge, Avatar, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const UserContainer = styled(Box)`
  display: flex;
  height: 64px;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  gap: 8px; /* Equivalent to gap={1} */
  margin-left: 8px; /* Equivalent to ml={1} */
`;

export const UserBadge = styled(Badge)`
  .MuiBadge-dot {
    height: 12px;
    min-width: 12px;
    border-radius: 50%;
    background-color: ${({ theme, color }) =>
      color === "success" ? theme.palette.success.main : 'none'};
  }
`;

export const UserImage = styled("img")`
  background-color: purple;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserAvatar = styled(Avatar)`
  background-color: purple;
  height: 48px;
  width: 48px;
`;

export const UserNameTypography = styled(Typography)`
  font-size: 20px;
`;
