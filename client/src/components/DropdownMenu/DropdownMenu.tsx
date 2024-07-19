import { Logout } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Divider } from "@mui/material";
import { useLogoutMutation } from "../../redux/api/authApi";
import { useSocket } from "../../contexts/SocketContext";
import { useAppSelector } from "../../redux/store";
import { toast } from "react-toastify";
import { StyledMenu, StyledMenuItem } from "./DropdownMenu.styles";

interface SettingMenuProps {
  handleClose: () => void;
  open: boolean;
  anchorEl: null | HTMLElement;
}

export const DropdownMenu: React.FC<SettingMenuProps> = ({
  handleClose,
  open,
  anchorEl,
}) => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const socket = useSocket();

  function handleAccountClick() {
    navigate("/account");
  }

  const currentUser = useAppSelector((state) => state.userState.user);

  async function handleLogout(event: React.MouseEvent<HTMLLIElement>) {
    event.preventDefault();
    try {
      if (currentUser?.id && socket) {
        socket.emit("userDisconnected", currentUser.id);
      }
      await logout().unwrap();
      toast.success("Successfully logged out", {
        position: "top-center",
      });
    } catch (err) {
      const errorMessage =
        (err as any)?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage, {
        position: "top-center",
      });
    }
  }

  return (
    <StyledMenu
      disableScrollLock
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      id="account-setting-menu"
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <StyledMenuItem onClick={handleAccountClick}>
        <Avatar />
        Account
      </StyledMenuItem>
      <Divider />
      <StyledMenuItem onClick={(e) => handleLogout(e)}>
        <Avatar>
          <Logout />
        </Avatar>
        Logout
      </StyledMenuItem>
    </StyledMenu>
  );
};

export default DropdownMenu;
