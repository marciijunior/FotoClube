import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { MantineProvider } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/pt-br";
import apolloClient from "./lib/apolloClient.jsx";

import AppLayout from "./components/layout/AppLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import PhotoOfTheMonthPage from "./pages/PhotoOfTheMonthPage/PhotoOfTheMonthPage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import PaginaEventos from "./pages/Eventos/PageEventos.jsx";
import ContactPage from "./pages/ContactPage/ContactPage.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import EventsList from "./pages/admin/EventsList.jsx";
import EventEdit from "./pages/admin/EventEdit.jsx";
import LoginAdmin from "./pages/admin/Login.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import CarouselManage from "./pages/admin/CarouselManage.jsx";
import WinnersList from "./pages/admin/WinnersList.jsx";
import WinnerEdit from "./pages/admin/WinnerEdit.jsx";
import MembersList from "./pages/admin/MembersList.jsx";
import MemberEdit from "./pages/admin/MemberEdit.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./styles/index.css";
import "@mantine/core/styles.css";

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
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "login", element: <LoginAdmin /> },
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          { path: "", element: <AdminHome /> },
          { path: "carousel", element: <CarouselManage /> },
          {
            path: "events",
            children: [
              { path: "", element: <EventsList /> },
              { path: "new", element: <EventEdit /> },
              { path: ":id/edit", element: <EventEdit /> },
            ],
          },
          {
            path: "winners",
            children: [
              { path: "", element: <WinnersList /> },
              { path: "new", element: <WinnerEdit /> },
              { path: ":id/edit", element: <WinnerEdit /> },
            ],
          },
          {
            path: "members",
            children: [
              { path: "", element: <MembersList /> },
              { path: "new", element: <MemberEdit /> },
              { path: ":id/edit", element: <MemberEdit /> },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider>
      <DatesProvider
        settings={{
          locale: "pt-br",
          firstDayOfWeek: 0,
          weekendDays: [0, 6],
          labelFormat: {
            weekday: "ddd",
          },
        }}
      >
        <ApolloProvider client={apolloClient}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </DatesProvider>
    </MantineProvider>
  </React.StrictMode>
);
