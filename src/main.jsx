// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// REMOVIDOS: ProtectedRoute, LoginPage, ProfilePage

import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./features/home/HomePage";
import EventsPage from "./features/events/EventsPage";
import PhotoOfTheMonthPage from "./pages/PhotoOfTheMonthPage";
import AboutPage from "./pages/AboutPage/AboutPage";

import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      // ROTA /login REMOVIDA
      // ROTA /perfil REMOVIDA
      {
        path: "eventos",
        element: <EventsPage />,
      },
      {
        path: "foto-do-mes",
        element: <PhotoOfTheMonthPage />,
      },
      {
        path: "sobre",
        element: <AboutPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
