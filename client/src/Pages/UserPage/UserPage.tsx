import { SideBar } from "../../components/SideBar/SideBar";
import { ChatArea } from "../../components/ChatAreaComponents/ChatArea/ChatArea";
import { UserPageContainer } from "./UserPage.styles";

const UserPage = () => {
  return (
    <UserPageContainer>
      <SideBar />
      <ChatArea />
    </UserPageContainer>
  );
};

export default UserPage;
