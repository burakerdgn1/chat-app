import { CircularProgress } from "@mui/material";
import { StyledBox } from "./LoadingSpinner.styles";

const LoadingSpinner = () => {
  return (
    <>
      <StyledBox>
        <CircularProgress />
      </StyledBox>
    </>
  );
};

export default LoadingSpinner;
