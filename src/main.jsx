import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "./lib/apolloClient.jsx";

import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import PhotoOfTheMonthPage from "./pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import PaginaEventos from "./pages/Eventos/PageEventos.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import AdminLayout from './components/AdminLayout.jsx';
import EventsList from './pages/admin/EventsList.jsx';
import EventEdit from './pages/admin/EventEdit.jsx';
import LoginAdmin from './pages/admin/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import "./styles/index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "eventos", element: <PaginaEventos /> },
      { path: "foto-do-mes", element: <PhotoOfTheMonthPage /> },
      { path: "sobre", element: <AboutPage /> },
      { path: "contatos", element: <ContactPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: 'login', element: <LoginAdmin /> },
      { path: 'events', element: <ProtectedRoute requiredRole={'client'} /> , children: [
        { path: '', element: <EventsList /> },
        { path: 'new', element: <EventEdit /> },
        { path: ':id/edit', element: <EventEdit /> },
      ]},
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
