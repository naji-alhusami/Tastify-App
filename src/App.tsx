import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";
import Home from "./components/Home/HomePage.tsx";
import MealsPage from "./components/Cuisines/MealsPage.tsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cuisines" element={<MealsPage />} />
      </Routes>
    </>
  );
}

export default App;
