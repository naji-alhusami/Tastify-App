import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import MealsPage from "./components/Cuisines/MealsPage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import MealDetails from "./components/Cuisines/MealDetails.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { queryClient } from "./lib/http.ts";
import Admin from "./components/Admin/Admin.tsx";

function App() {

  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cuisines" element={<MealsPage />} />
          <Route path="/cuisines/:id" element={<MealDetails />} />
          <Route path="/dashboard/:restaurant" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
