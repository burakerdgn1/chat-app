import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const AdminPageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 0;
  height: calc(100vh - 100px);
  width: 100%;
  overflow: auto;
  background-image: url("/nbg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
