import { styled } from "@mui/system";
import { Grid, Paper, Box, Avatar, Button } from "@mui/material";

export const ContainerGrid = styled(Grid)`
  flex: 1;
  max-width: 400px;
`;

export const StyledPaper = styled(Paper)`
  overflow: hidden;
`;

export const AvatarContainer = styled(Box)`
  padding: 16px;
  text-align: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  object-fit: cover;

  @media (min-width: 600px) {
    width: 150px;
    height: 150px;
  }
  @media (min-width: 960px) {
    width: 200px;
    height: 200px;
  }
`;

export const InputContainer = styled(Box)`
  padding: 16px;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-left: 15%;
  
  & input {
    display: none;
  }

  & input[type="file"][data-edit-mode="true"] {
    display: flex;
  }
`;

export const ButtonContainer = styled(Box)`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

export const StyledButton = styled(Button)`
  margin: 0 8px;
`;
