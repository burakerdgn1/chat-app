import { useAppSelector } from "../redux/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Redirect = () => {
  const user = useAppSelector((state) => state.userState.user);
  const location = useLocation();

  return user ? (
    <Navigate to="/homepage" replace state={{ from: location }} />
  ) : (
    <Outlet />
  );
};

export default Redirect;
