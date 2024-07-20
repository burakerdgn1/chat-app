import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Mail } from "@mui/icons-material";
import useSignIn from "../../hooks/useSignIn";
import {
  StyledAvatar,
  StyledBox,
  StyledButton,
  StyledContainer,
  StyledFormBox,
} from "./SignInPage.styles";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const SignInPage = () => {
  const { formData, handleFormChange, handleSignIn, isLoading } = useSignIn();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    // <Container component="main" maxWidth="xs" sx={{ height: "100%" }}>
    <StyledContainer maxWidth="xs">
      <StyledBox>
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <StyledFormBox component="form" onSubmit={handleSignIn}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleFormChange}
            value={formData.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Mail />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleFormChange}
            value={formData.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
          >
            Sign In
          </StyledButton>
          <Grid container justifyContent="center">
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </StyledFormBox>
      </StyledBox>
    </StyledContainer>
  );
};

export default SignInPage;
