import { CircularProgress } from "@mui/material";
import { StyledBox } from "./LoadingSpinner.styles";

export const LoadingSpinner = () => {
  return (
    <>
      <StyledBox>
        <CircularProgress />
      </StyledBox>
    </>
  );
};
