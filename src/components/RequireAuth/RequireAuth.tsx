import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "../../store/redux/hooks";
import { loadUser } from "../../store/redux/user-slice";
import LoadingSpinner from "../ui/LoadingSpinner";

const RequireAuth = () => {
  const { userlogin } = useAppSelector((state) => state.users);
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          loadUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
          })
        );
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authChecked) {
    return <LoadingSpinner />;
  }

  return userlogin ? (
    <Outlet />
  ) : (
    <Navigate to={{ pathname: "/" }} state={{ from: location }} replace />
  );
};

export default RequireAuth;
