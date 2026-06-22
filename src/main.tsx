import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./screens/Dashboard";
import { Navbar } from "./components/layout/NavBar";
import { Log } from "./screens/Log";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Navbar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/log" element={<Log />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
