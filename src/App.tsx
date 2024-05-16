import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import MealsPage from "./components/Cuisines/MealsPage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MealDetails from "./components/Cuisines/MealDetails.tsx";
import Footer from "./components/Footer/Footer.tsx";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuisines" element={<MealsPage />} />
          <Route path="/cuisines/:id" element={<MealDetails />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </>
  );
}

export default App;
