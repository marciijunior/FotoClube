import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageEventos from "./pages/Eventos/PageEventos.jsx";
import Home from "./pages/Home/Home.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eventos" element={<PageEventos />} />
      </Routes>
    </BrowserRouter>
  );
}
