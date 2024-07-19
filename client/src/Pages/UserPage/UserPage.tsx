import { SideBar } from "../../components/SideBar/SideBar";
import { ChatArea } from "../../components/ChatAreaComponents/ChatArea/ChatArea";
import { UserPageContainer } from "./UserPage.styles";

export const UserPage = () => {
  return (
    <UserPageContainer>
      <SideBar />
      <ChatArea />
    </UserPageContainer>
  );
};
