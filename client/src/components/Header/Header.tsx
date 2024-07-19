import { Settings } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import {
  ButtonContainer,
  LogoContainer,
  StyledHeader,
  StyledTypography,
  ToolbarContainer,
} from "./Header.styles";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
export const Header = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const user = useAppSelector((state) => state.userState.user);

  return (
    <Box flexGrow={1} overflow={"hidden"}>
      <StyledHeader>
        <ToolbarContainer variant="dense" disableGutters>
          <LogoContainer onClick={() => navigate("/homepage")}>
            <img src="/chat.png" alt="logo" />
          </LogoContainer>
          <StyledTypography>Chat App</StyledTypography>
          <ButtonContainer>
            {!user ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: "30px" }}
                  onClick={() => navigate("/signin")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: "30px" }}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </>
            ) : (
              <>
                <IconButton sx={{ bgcolor: "white" }} onClick={handleClick}>
                  <Settings />
                </IconButton>
                <DropdownMenu
                  handleClose={handleClose}
                  open={open}
                  anchorEl={anchorEl}
                />
              </>
            )}
          </ButtonContainer>
        </ToolbarContainer>
      </StyledHeader>
    </Box>
  );
};
