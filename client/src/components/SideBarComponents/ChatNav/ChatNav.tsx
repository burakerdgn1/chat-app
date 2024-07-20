import { Person } from "@mui/icons-material";
import {
  StyledToolbar,
  LogoTypography,
  UserContainer,
  UserImage,
  UserAvatar,
  UserNameTypography,
} from "./ChatNav.styles";
import { useAppSelector } from "../../../redux/store";

const ChatNav = () => {
  const currentUser = useAppSelector((state) => state.userState.user);

  return (
    <StyledToolbar>
      <LogoTypography as="span">Users</LogoTypography>
      <UserContainer>
        {currentUser?.profilePicture ? (
          <UserImage src={currentUser?.profilePicture} alt="pp" />
        ) : (
          <UserAvatar>
            <Person />
          </UserAvatar>
        )}
        <UserNameTypography as="span">
          {currentUser?.userName}
        </UserNameTypography>
      </UserContainer>
    </StyledToolbar>
  );
};

export default ChatNav;
