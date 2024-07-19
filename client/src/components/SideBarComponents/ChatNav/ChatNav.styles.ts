import { Avatar, Toolbar, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #12DADA;
  height: 4vh;
  gap: 16px; /* Equivalent to gap={2} */
`;

export const LogoTypography = styled(Typography)`
  height: 35px;
  width: 60px;
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

export const UserContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Equivalent to gap={1} */
`;

export const UserImage = styled("img")`
  background-color: purple;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserAvatar = styled(Avatar)`
  background-color: purple;
  height: 24px;
  width: 24px;
`;

export const UserNameTypography = styled(Typography)`
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Changed textWrap to white-space */
`;

