import { Avatar, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import theme from "../../theme";
export const StyledContainer = styled(Box)`
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
  gap: 1rem;
  background-image: url("/nbg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 600px) {
    margin-top: 50px;
  }
`;

export const StyledFormBox = styled(Box)`
  max-width: 300px; // Maximum width
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 20px;
  background: white;
  @media (min-width: 321px) {
    width: 80%;
  }

  @media (min-width: 376px) {
    width: 75%;
  }

  @media (min-width: 426px) {
    width: 70%;
  }
`;

export const StyledAvatar = styled(Avatar)`
  margin: 1rem;
  background-color: ${theme.palette.secondary.main};
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled(Button)`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  background-color: ${theme.palette.primary.main};
`;
