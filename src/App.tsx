import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import MealsPage from "./components/Cuisines/MealsPage.tsx";
import { useAppDispatch, useAppSelector } from "./store/redux/hooks.ts";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { loadUser } from "./store/redux/user-slice.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.users);
  const queryClient = new QueryClient();

  useEffect(() => {
    const load = () => {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        // console.log("user:", user);
        if (user) {
          dispatch(
            loadUser({ id: user.uid, emailVerified: user.emailVerified })
          );
        }
        // else {
        //   dispatch(loadUser({ id: "", emailVerified: false }));
        // }
      });
    };

    load();
  }, [dispatch]);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen"
        style={{ minHeight: "100vh" }}
      >
        Loading...
        {/* <ClipLoader
          color="#2DD3E3" // Customize the color of the spinner
          size={60} // Adjust the size of the spinner as desired
          loading={loading}
        /> */}
      </div>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuisines" element={<MealsPage />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
