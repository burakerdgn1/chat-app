import UsersTable from "../../components/UsersTable/UsersTable";
import { AdminPageContainer } from "./AdminPage.styles";

const AdminPage = () => {
  return (
    <AdminPageContainer>
      <UsersTable />
    </AdminPageContainer>
  );
};

export default AdminPage;
