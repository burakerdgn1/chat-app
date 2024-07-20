import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";

const ProtectedRoute = () => {
  const user = useAppSelector((state) => state.userState.user);
  const location = useLocation();

  if (!user) {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to="/signin" state={{ from: location }} replace />
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
