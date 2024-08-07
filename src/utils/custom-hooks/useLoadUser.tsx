import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { useAppDispatch } from "../../store/redux/hooks";
import { loadUser } from "../../store/redux/user-slice";

const useLoadUser = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { loading };
};

export default useLoadUser;
