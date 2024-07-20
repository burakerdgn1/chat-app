import {
  MoreHoriz,
  Person,
  PersonAdd,
  VideocamRounded,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/store";
import {
  ButtonBox,
  FlexBox,
  ProfilePicture,
  StyledAvatar,
  StyledToolbar,
} from "./ChatAreaNav.styles";

const ChatAreaNav = () => {
  const [selectedUser, setUser] = useState<{
    id: string;
    fullName: string;
    userName: string;
    email: string;
    profilePicture: string;
  }>({ id: "", userName: "", fullName: "", email: "", profilePicture: "" });
  const user = useAppSelector((state) => state.userState.selectedUser);

  useEffect(() => {
    if (user) {
      setUser({ ...user });
    }
  }, [user]);

  return (
    <StyledToolbar>
      {user ? (
        <>
          <FlexBox>
            {selectedUser.profilePicture ? (
              <ProfilePicture
                src={selectedUser.profilePicture}
                alt={selectedUser.fullName}
                id={selectedUser.id}
              />
            ) : (
              <StyledAvatar>
                <Person />
              </StyledAvatar>
            )}
            <Typography component="span" variant="h5">
              {selectedUser.userName}
            </Typography>
          </FlexBox>
          <ButtonBox>
            <IconButton disabled>
              <VideocamRounded />
            </IconButton>
            <IconButton disabled>
              <PersonAdd />
            </IconButton>
            <IconButton disabled>
              <MoreHoriz />
            </IconButton>
          </ButtonBox>
        </>
      ) : (
        <Typography component="span" variant="h5" color={"white"}>
          Select a user to chat
        </Typography>
      )}
    </StyledToolbar>
  );
};

export default ChatAreaNav;
