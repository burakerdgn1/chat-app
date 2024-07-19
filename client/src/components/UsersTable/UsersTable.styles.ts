import { Paper, TableContainer } from "@mui/material";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)`
  padding: 1rem;
  margin: 1rem;
  overflow: auto;
`;
export const StyledTableContainer = styled(TableContainer)`
  max-height: 500px;
  overflow-x: auto;
  width: 100%;

  & > .MuiPaper-root {
    padding: 1rem;
    margin-top: 1rem;
    overflow: auto;
  }

  & .MuiAvatar-root {
    background-color: purple;
    height: 48px;
    width: 48px;
  }

  img {
    background-color: purple;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
