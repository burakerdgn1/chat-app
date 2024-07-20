import {
  Container,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Error, LockOutlined } from "@mui/icons-material";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";
import useSignUp from "../../hooks/useSignUp";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import {
  StyledAvatar,
  StyledBox,
  StyledButton,
  StyledContainer,
  StyledFormBox,
} from "./SignUpPage.styles";

const SignUpPage = () => {
  const {
    handleFormChange,
    handleSignUp,
    handleBlur,
    formData,
    touched,
    isLoading,
  } = useSignUp();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <StyledContainer>
      <StyledBox>
        <StyledAvatar>
          <LockOutlined />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <StyledFormBox component="form" onSubmit={handleSignUp}>
          <TextField
            margin="normal"
            label="Full Name"
            type="text"
            required
            fullWidth
            id="fullName"
            name="fullName"
            onChange={handleFormChange}
            value={formData.fullName}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {touched.fullName && formData.fullName.length < 7 && (
                    <Tooltip title="Full name must be at least 7 characters">
                      <Error />
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            margin="normal"
            label="Username"
            required
            fullWidth
            type="text"
            id="userName"
            name="userName"
            onChange={handleFormChange}
            value={formData.userName}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {touched.userName && formData.userName.length < 5 && (
                    <Tooltip title="Username must be at least 5 characters">
                      <Error />
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
          ></TextField>
          <TextField
            margin="normal"
            label="Email Address"
            required
            fullWidth
            type="email"
            id="email"
            name="email"
            onChange={handleFormChange}
            value={formData.email}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {touched.email && !validator.isEmail(formData.email) && (
                    <Tooltip title="Invalid email address">
                      <Error />
                    </Tooltip>
                  )}
                </InputAdornment>
              ),
            }}
            autoComplete="email"
          ></TextField>
          <TextField
            margin="normal"
            label="Password"
            required
            fullWidth
            type="password"
            id="password"
            name="password"
            onChange={handleFormChange}
            value={formData.password}
            onBlur={handleBlur}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {touched.password &&
                    !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                      formData.password
                    ) && (
                      <Tooltip title="Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number">
                        <Error />
                      </Tooltip>
                    )}
                </InputAdornment>
              ),
            }}
          ></TextField>
          <StyledButton type="submit" fullWidth variant="contained">
            Register
          </StyledButton>
        </StyledFormBox>
      </StyledBox>
    </StyledContainer>
  );
};

export default SignUpPage;
