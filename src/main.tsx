import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Navbar } from "./components/layout/NavBar";
import { Log } from "./screens/Log";
import { Meal } from "./screens/Meal";
import { Auth } from "./screens/Auth";
import { OnBoarding } from "./screens/OnBoarding";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/onBoarding" element={<OnBoarding />} />
      <Route element={<Navbar />}>
        <Route path="/home" element={<Dashboard />} />
        <Route path="/meal" element={<Meal />} />
        <Route path="/log" element={<Log />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
