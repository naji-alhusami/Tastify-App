import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer/Footer.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import { queryClient } from "./lib/http/AddMealHttp.ts";
import Meals from "./components/Meals/Meals.tsx";

function App() {
  return (
    <div className="relative">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/dashboard/:restaurant" element={<Dashboard />} />
        </Routes>
        <Footer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
