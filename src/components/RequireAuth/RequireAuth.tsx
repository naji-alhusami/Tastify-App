import { useLocation, Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../../store/redux/hooks";
import LoadingSpinner from "../ui/LoadingSpinner";

const RequireAuth = () => {
  const userLogin = useAppSelector((state) => state.users);
  const location = useLocation();
  
  if (userLogin.loading) {
    return <LoadingSpinner />;
  }
  return userLogin.userlogin ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/" }} state={{ from: location }} replace />
  );
};

export default RequireAuth;
