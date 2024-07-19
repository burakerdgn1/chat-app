import { useAppSelector } from "../redux/store";
import { AdminPage } from "./AdminPage/AdminPage";
import { UserPage } from "./UserPage/UserPage";

export const HomePage = () => {
  const user = useAppSelector((state) => state.userState.user);
  return user?.role === "admin" ? <AdminPage /> : <UserPage />;
};