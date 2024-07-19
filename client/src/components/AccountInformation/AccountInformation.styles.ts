import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Box)`
  & .MuiTextField-root {
    width: 100%;
    margin-bottom: 16px;

    @media (min-width: 600px) {
      width: 90%;
    }
    @media (min-width: 960px) {
      width: 80%;
    }
  }
`;