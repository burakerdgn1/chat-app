import { Box, } from "@mui/material";
import { styled } from "@mui/system";

export const UserPageContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 1rem 1rem 2rem 1rem;
  gap: 1rem;
  background-image: url("/nbg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

