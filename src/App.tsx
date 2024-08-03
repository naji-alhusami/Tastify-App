import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Dashboard from "./components/SellerAndBuyer/SellerDashboard/Dashboard.tsx";
import MealsPage from "./components/SellerAndBuyer/BuyerMeals/MealsPage.tsx";
import { queryClient } from "./lib/http/AddMealHttp.ts";
import RequireAuth from "./components/RequireAuth/RequireAuth.tsx";
import { useAppDispatch, useAppSelector } from "./store/redux/hooks.ts";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import LoadingSpinner from "./components/ui/LoadingSpinner.tsx";
import { loadUser } from "./store/redux/user-slice.ts";

function App() {
  const dispatch = useAppDispatch();
  const { loading: authLoading } = useAppSelector((state) => state.users);

  useEffect(() => {
    const load = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          dispatch(
            loadUser({
              uid: user.uid,
              email: user.email,
              // password: user.password,
              emailVerified: user.emailVerified,
            })
          );
        } else {
          dispatch(loadUser({ uid: "", emailVerified: false, email: "" }));
        }
      });
    };

    load();
  }, [dispatch]);

  if (authLoading) {
    return <h1>Loading</h1>
  }

  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<MealsPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard/:restaurant" element={<Dashboard />} />
          </Route>
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
