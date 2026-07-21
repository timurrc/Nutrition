import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Navbar } from "./components/layout/NavBar";
import { Log } from "./screens/Log";
import { Meal } from "./screens/Meal";
import { Auth } from "./screens/Auth";
import { OnBoarding } from "./screens/OnBoarding";
import { Stats } from "./screens/Stats";
import { Profile } from "./screens/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { GuestRoute } from "./components/routing/GuestRoute";
import { OnBoardingRoute } from "./components/routing/OnBoardingRoute";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path="/auth" element={<Auth />} />
      </Route>
      <Route element={<OnBoardingRoute />}>
        <Route path="/onBoarding" element={<OnBoarding />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route element={<Navbar />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/meal" element={<Meal />} />
          <Route path="/log" element={<Log />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>,
);
