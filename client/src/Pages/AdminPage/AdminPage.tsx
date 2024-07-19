import UsersTable from "../../components/UsersTable/UsersTable";
import { AdminPageContainer } from "./AdminPage.styles";

export const AdminPage = () => {
  return (
    <AdminPageContainer>
        <UsersTable />
    </AdminPageContainer>
  );
};
