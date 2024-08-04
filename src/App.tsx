import { Route, Routes } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Dashboard from "./components/SellerAndBuyer/SellerDashboard/Dashboard.tsx";
import MealsPage from "./components/SellerAndBuyer/BuyerMeals/MealsPage.tsx";
import { queryClient } from "./lib/http/AddMealHttp.ts";
import RequireAuth from "./components/RequireAuth/RequireAuth.tsx";

function App() {
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
